using AutoMapper;
using Server.Dto.UserDTOs;
using Server.Enums;
using Server.Exceptions.UserExceptions;
using Server.Interfaces.RepositoryInterfaces;
using Server.Interfaces.ServiceInterfaces;
using Server.Interfaces.ServiceInterfaces.UtilityInterfaces;
using Server.Models;

namespace Server.Services
{
    public class UserService : IUserService
    {
        private readonly IAuthHelperService _authHelperService;
        private readonly IMailingService _mailingService;
        private readonly IImageService _imageService;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UserService(IAuthHelperService authHelperService, IUnitOfWork unitOfWork, IMapper mapper, IMailingService mailingService, IImageService imageService)
        {
            _authHelperService = authHelperService;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _mailingService = mailingService;
            _imageService = imageService;
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

            user.ImageURL = $"Images/Default/user.jpg";
            if (newUserDTO.Image != null)
            {
                string path = "Users";
                string name = user.Email.Split("@")[0];

                user.ImageURL = await _imageService.SaveImage(newUserDTO.Image, name, path);
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
                    Password = "",
                    Address = "",
                    DateOfBirth = DateTime.Now.ToLocalTime(),
                    Email = socialMediaInfoDTO.Email,
                    Role = UserRole.BUYER
                };

                await _unitOfWork.Users.Add(user);
                await _unitOfWork.Save();
            }

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

            user.Update(updateUserDTO.Address.Trim(), updateUserDTO.Name.Trim(), updateUserDTO.DateOfBirth);
            await _unitOfWork.Save();

            return _mapper.Map<DisplayUserDTO>(user);
        }

        public async Task<List<DisplayUserDTO>> GetSellers()
        {
            List<User> sellers = await _unitOfWork.Users.GetSellers();
            
            return _mapper.Map<List<DisplayUserDTO>>(sellers);
        }

        public async Task<DisplayUserDTO> GetUserInformation(Guid id)
        {
            User user = await _unitOfWork.Users.Find(id);
            if (user == null)
            {
                throw new UserByIdNotFoundException(id);
            }

            return _mapper.Map<DisplayUserDTO>(user);
        }

        public async Task<UserAvatarDTO> GetUserAvatar(Guid id)
        {
            User user = await _unitOfWork.Users.Find(id);
            if (user == null)
            {
                throw new UserByIdNotFoundException(id);
            }

            string fileName = user.ImageURL.Split('/')[2];
            FileStream stream = _imageService.DownloadImage(user.ImageURL);
            
            UserAvatarDTO userAvatarDTO = new UserAvatarDTO()
            {
                Stream = stream,
                FileName = fileName
            };

            return userAvatarDTO;
        }

        private void ValidateUser(NewUserDTO newUserDTO, bool registered = false)
        {
            if (String.IsNullOrWhiteSpace(newUserDTO.Username))
            {
                throw new InvalidUserUsernameException(newUserDTO.Username);
            }

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