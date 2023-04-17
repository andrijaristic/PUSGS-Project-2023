using AutoMapper;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Server.Dto.UserDTOs;
using Server.Enums;
using Server.Exceptions.UserExceptions;
using Server.Interfaces.RepositoryInterfaces;
using Server.Interfaces.ServiceInterfaces;
using Server.Models;
using Server.Models.AppSettings;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Server.Services
{
    public class UserService : IUserService
    {
        private readonly IOptions<AppSettings> _settings;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UserService(IOptions<AppSettings> settings, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _settings = settings;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task VerifyUser(Guid userId)
        {
            User user = await _unitOfWork.Users.Find(userId);
            if (user == null)
            {
                throw new UserNotFoundException(userId);
            }

            if (user.Role != UserRole.SELLER)
            {
                throw new InvalidUserVerificationRole(userId);
            }

            if (user.isVerified)
            {
                throw new UserAlreadyVerifiedException(userId);
            }

            user.isVerified = true;
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

            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password, BCrypt.Net.BCrypt.GenerateSalt());
            await _unitOfWork.Users.Add(user);
            await _unitOfWork.Save();

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
            authDTO.Token = CreateToken();

            return authDTO;

            string CreateToken()
            {
                List<Claim> claims = new List<Claim>();

                if (user.Role == UserRole.BUYER) { claims.Add(new Claim(ClaimTypes.Role, "buyer")); }
                if (user.Role == UserRole.SELLER) { claims.Add(new Claim(ClaimTypes.Role, "seller")); }
                if (user.Role == UserRole.ADMIN) { claims.Add(new Claim(ClaimTypes.Role, "admin")); }

                claims.Add(new Claim(ClaimTypes.Name, user.Username));

                var signInCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_settings.Value.SecretKey)), SecurityAlgorithms.HmacSha256);
                var tokenOptions = new JwtSecurityToken(
                                  issuer: "http://localhost:7060",
                                  claims: claims,
                                  expires: DateTime.Now.AddMinutes(60),
                                  signingCredentials: signInCredentials
                            );

                string token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
                return token;
            }
        }

        public async Task<DisplayUserDTO> UpdateUser(UpdateUserDTO updateUserDTO)
        {
            ValidateUser(_mapper.Map<NewUserDTO>(updateUserDTO), true);
            User user = await _unitOfWork.Users.Find(updateUserDTO.Id);
            if (user == null)
            {
                throw new UserNotFoundException(user.Id);
            }

            bool usernameUpdate = !String.Equals(user.Username, updateUserDTO.Username);
            bool userUsernameExists = await _unitOfWork.Users.FindByUsername(updateUserDTO.Username) != null && usernameUpdate;
            if (userUsernameExists)
            {
                throw new UserUsernameExistsException(updateUserDTO.Username);
            }

            user.Update(updateUserDTO.Username.Trim(), updateUserDTO.Email.Trim(), updateUserDTO.Name.Trim(), updateUserDTO.DateOfBirth);
            await _unitOfWork.Save();

            return _mapper.Map<DisplayUserDTO>(user);
        }

        public async Task<List<DisplayUserDTO>> GetSellers()
        {
            List<User> sellers = await _unitOfWork.Users.GetSellers();

            return _mapper.Map<List<DisplayUserDTO>>(sellers);
        }

        private void ValidateUser(NewUserDTO newUserDTO, bool registered = false)
        {
            if (String.IsNullOrWhiteSpace(newUserDTO.Username))
            {
                throw new InvalidUserUsernameException(newUserDTO.Username);
            }

            if (!registered && String.IsNullOrWhiteSpace(newUserDTO.Password))
            {
                throw new InvalidUserPasswordException(newUserDTO.Password);
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

            if (String.IsNullOrWhiteSpace(newUserDTO.Email))
            {
                throw new InvalidUserEmailException(newUserDTO.Email);
            }

            bool enumParseResult = Enum.TryParse(newUserDTO.Role.ToUpper(), out UserRole role);
            if (!registered && !enumParseResult)
            {
                throw new InvalidUserRoleException(newUserDTO.Role.ToString().ToUpper());
            }

            if (!registered && role == UserRole.ADMIN)
            {
                throw new InvalidUserAdminRoleException();
            }
        }
    }
}
