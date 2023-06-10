using AutoMapper;
using Microsoft.Extensions.Options;
using System.IO;
using UsersWebApi.Dto.UserDTOs;
using UsersWebApi.Enums;
using UsersWebApi.Exceptions.UserExceptions;
using UsersWebApi.Interfaces.RepositoryInterfaces;
using UsersWebApi.Interfaces.ServiceInterfaces;
using UsersWebApi.Interfaces.ServiceInterfaces.UtilityInterfaces;
using UsersWebApi.Models;
using UsersWebApi.Models.AppSettings;

namespace UsersWebApi.Services
{
    public class UserService : IUserService
    {
        private readonly IAuthHelperService _authHelperService;
        private readonly IMailingService _mailingService;
        private readonly IImageService _imageService;
        private readonly IOptions<AppSettings> _settings;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IHostEnvironment _hostEnvironment;

        public UserService(IAuthHelperService authHelperService,
                           IUnitOfWork unitOfWork,
                           IMapper mapper,
                           IMailingService mailingService,
                           IImageService imageService,
                           IOptions<AppSettings> settings,
                           IHostEnvironment hostEnvironment)
        {
            _authHelperService = authHelperService;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _mailingService = mailingService;
            _imageService = imageService;
            _settings = settings;
            _hostEnvironment = hostEnvironment;
        }

        public async Task VerifyUser(VerifyUserDTO verifyUserDTO)
        {
            User user = await _unitOfWork.Users.Find(verifyUserDTO.UserId);
            if (user == null)
            {
                throw new UserByIdNotFoundException(verifyUserDTO.UserId);
            }

            if (user.Role != UserRole.SELLER)
            {
                throw new InvalidUserVerificationRole(verifyUserDTO.UserId);
            }

            if (user.VerificationStatus == VerificationStatus.ACCEPTED || user.VerificationStatus == VerificationStatus.DENIED)
            {
                throw new UserAlreadyVerifiedException(verifyUserDTO.UserId);
            }

            user.VerificationStatus = verifyUserDTO.Verified ? VerificationStatus.ACCEPTED : VerificationStatus.DENIED;
            await _unitOfWork.Save();

            string subject = "Seller verification status";
            string body;
            body = $"Your verification status has been updated to {user.VerificationStatus}";

            await _mailingService.SendEmail(user.Email, subject, body);
        }

        public async Task<DisplayUserDTO> CreateUser(NewUserDTO newUserDTO)
        {
            ValidateUser(newUserDTO);
            User user = _mapper.Map<User>(newUserDTO);

            bool userUsernameExists = await _unitOfWork.Users.FindByUsername(user.Username) != null;
            if (userUsernameExists)
            {
                throw new UserUsernameExistsException(user.Username);
            }

            if (user.Role != UserRole.SELLER)
            {
                user.VerificationStatus = VerificationStatus.EXEMPT;
            }

            user.ImageURL = _settings.Value.DefaultUserImagePath;
            if (newUserDTO.Image != null)
            {
                string name = user.Email.Split("@")[0];

                user.ImageURL = await _imageService.SaveImage(newUserDTO.Image, name, _hostEnvironment.ContentRootPath);
            }

            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password, BCrypt.Net.BCrypt.GenerateSalt());
            await _unitOfWork.Users.Add(user);
            await _unitOfWork.Save();

            string subject = "Registration status";
            string body;
            if (user.Role == UserRole.BUYER)
            {
                body = "Registration successful. Happy shopping!";
            } else
            {
                body = "Registration pending. Waiting on admin to verify account to enable product selling";
            }

            await _mailingService.SendEmail(user.Email, subject, body);

            return _mapper.Map<DisplayUserDTO>(user);
        }

        public async Task<AuthDTO> Login(LoginDTO loginDTO)
        {
            User user = await _unitOfWork.Users.FindByUsername(loginDTO.Username);
            if (user == null)
            {
                throw new InvalidUsernameException();
            }

            if (!BCrypt.Net.BCrypt.Verify(loginDTO.Password, user.Password))
            {
                throw new InvalidPasswordException();
            }

            AuthDTO authDTO = _mapper.Map<AuthDTO>(user);
            authDTO.Token = _authHelperService.CreateToken(user);
            authDTO.FinishedRegistration = true;

            return authDTO;
        }

        public async Task<AuthDTO> ExternalLogin(ExternalLoginDTO externalLoginDTO)
        {
            SocialMediaInfoDTO socialMediaInfoDTO = await _authHelperService.VerifyGoogleToken(externalLoginDTO);
            if (socialMediaInfoDTO == null)
            {
                throw new InvalidUserGoogleTokenException();
            }

            User user = await _unitOfWork.Users.FindByUsername(socialMediaInfoDTO.Username);
            if (user == null)
            {
                user = new User()
                {
                    Name = socialMediaInfoDTO.Name,
                    Username = socialMediaInfoDTO.Username,
                    Password = _settings.Value.DefaultPassword,
                    Address = _settings.Value.DefaultAddress,
                    DateOfBirth = DateTime.Parse(_settings.Value.DefaultDateOfBirth),
                    Email = socialMediaInfoDTO.Email,
                    Role = UserRole.BUYER,
                    FinishedRegistration = false,
                    ImageURL = socialMediaInfoDTO.ImageSrc
                };

                await _unitOfWork.Users.Add(user);
                await _unitOfWork.Save();
            }

            if (!string.Equals(user.ImageURL, socialMediaInfoDTO.ImageSrc))
            {
                user.ImageURL = socialMediaInfoDTO.ImageSrc;
                await _unitOfWork.Save();
            }

            AuthDTO authDTO = _mapper.Map<AuthDTO>(user);
            authDTO.Token = _authHelperService.CreateToken(user);

            return authDTO;
        }

        public async Task<AuthDTO> FinishRegistration(FinishRegistrationDTO finishRegistrationDTO)
        {
            User user = await _unitOfWork.Users.Find(finishRegistrationDTO.Id);
            if (user == null)
            {
                throw new UserByIdNotFoundException(finishRegistrationDTO.Id);
            }

            if (user.FinishedRegistration)
            {
                throw new UserRegistrationFinishedException(finishRegistrationDTO.Id);
            }

            if (finishRegistrationDTO.DateOfBirth > new DateTime(year: 2018, month: 1, day: 1, hour: 0, minute: 0, second: 0))
            {
                throw new InvalidUserDateOfBirthException($"{finishRegistrationDTO.DateOfBirth.Day}/{finishRegistrationDTO.DateOfBirth.Month}/{finishRegistrationDTO.DateOfBirth.Year}");
            }

            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password, BCrypt.Net.BCrypt.GenerateSalt());
            user.Address = finishRegistrationDTO.Address.Trim();
            user.DateOfBirth = finishRegistrationDTO.DateOfBirth.ToUniversalTime();

            if (!Enum.TryParse(finishRegistrationDTO.Role, out UserRole role))
            {
                throw new InvalidUserRoleException(role.ToString());
            }

            if (role != UserRole.SELLER)
            {
                user.VerificationStatus = VerificationStatus.EXEMPT;
            }

            user.Role = role;
            user.FinishedRegistration = true;
            
            await _unitOfWork.Save();

            AuthDTO authDTO = _mapper.Map<AuthDTO>(user);
            authDTO.Token = _authHelperService.CreateToken(user);

            return authDTO;
        }

        public async Task<DisplayUserDTO> UpdateUser(UpdateUserDTO updateUserDTO)
        {
            ValidateUser(_mapper.Map<NewUserDTO>(updateUserDTO), true);
            User user = await _unitOfWork.Users.Find(updateUserDTO.Id);
            if (user == null)
            {
                throw new UserByIdNotFoundException(updateUserDTO.Id);
            }

            if (updateUserDTO.Image != null)
            {
                if (!String.Equals(user.ImageURL, _settings.Value.DefaultUserImagePath))
                {
                    _imageService.DeleteImage(user.ImageURL, _hostEnvironment.ContentRootPath);
                }

                string name = user.Email.Split("@")[0];

                user.ImageURL = await _imageService.SaveImage(updateUserDTO.Image, name, _hostEnvironment.ContentRootPath);
            }

            user.Update(updateUserDTO.Address.Trim(), updateUserDTO.Name.Trim(), updateUserDTO.DateOfBirth);
            await _unitOfWork.Save();

            return _mapper.Map<DisplayUserDTO>(user);
        }

        public async Task<List<DisplayUserDTO>> GetSellers()
        {
            List<User> sellers = await _unitOfWork.Users.GetSellers();
            
            return _mapper.Map<List<DisplayUserDTO>>(sellers);
        }

        public async Task<List<DisplayUserDTO>> GetVerifiedSellers()
        {
            List<User> sellers = await _unitOfWork.Users.GetVerifiedSellers();

            return _mapper.Map<List<DisplayUserDTO>>(sellers);
        }

        public async Task<DisplayUserDTO> GetUserInformation(Guid id)
        {
            User user = await _unitOfWork.Users.Find(id);
            if (user == null)
            {
                throw new UserByIdNotFoundException(id);
            }

            DisplayUserDTO displayUserDTO = _mapper.Map<DisplayUserDTO>(user);

            string googlePicture = "googleusercontent";
            if (user.ImageURL.Contains(googlePicture))
            {
                displayUserDTO.ImageSrc = user.ImageURL;
            }

            return displayUserDTO;
        }

        public async Task<UserAvatarDTO> GetUserAvatar(Guid id)
        {
            User user = await _unitOfWork.Users.Find(id);
            if (user == null)
            {
                throw new UserByIdNotFoundException(id);
            }

            string fileName = user.ImageURL;
            FileStream stream = _imageService.DownloadImage(user.ImageURL, _hostEnvironment.ContentRootPath);
            
            UserAvatarDTO userAvatarDTO = new UserAvatarDTO()
            {
                Stream = stream,
                FileName = fileName
            };

            return userAvatarDTO;
        }

        private void ValidateUser(NewUserDTO newUserDTO, bool registered = false)
        {
            if (String.IsNullOrWhiteSpace(newUserDTO.Name))
            {
                throw new InvalidNameOfUserException(newUserDTO.Name);
            }

            if (String.IsNullOrWhiteSpace(newUserDTO.Address))
            {
                throw new InvalidUserAddressException(newUserDTO.Address);
            }

            if (newUserDTO.DateOfBirth > new DateTime(year: 2018, month: 1, day: 1, hour: 0, minute: 0, second: 0))
            {
                throw new InvalidUserDateOfBirthException($"{newUserDTO.DateOfBirth.Day}/{newUserDTO.DateOfBirth.Month}/{newUserDTO.DateOfBirth.Year}");
            }

            if (!registered)
            {
                if (String.IsNullOrWhiteSpace(newUserDTO.Username))
                {
                    throw new InvalidUserUsernameException(newUserDTO.Username);
                }

                if (String.IsNullOrWhiteSpace(newUserDTO.Password))
                {
                    throw new InvalidUserPasswordException(newUserDTO.Password);
                }

                if (String.IsNullOrWhiteSpace(newUserDTO.Email) || !newUserDTO.Email.Contains('@'))
                {
                    throw new InvalidUserEmailException(newUserDTO.Email);
                }

                bool enumParseResult = Enum.TryParse(newUserDTO.Role.ToUpper(), out UserRole role);
                if (!enumParseResult)
                {
                    throw new InvalidUserRoleException(newUserDTO.Role.ToString().ToUpper());
                }

                if (role == UserRole.ADMIN)
                {
                    throw new InvalidUserAdminRoleException();
                }
            }
        }
    }
}