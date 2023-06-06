using Google.Apis.Auth;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using UsersWebApi.Dto.UserDTOs;
using UsersWebApi.Enums;
using UsersWebApi.Models;
using UsersWebApi.Models.AppSettings;
using System.IdentityModel.Tokens.Jwt;
using System.Runtime;
using System.Security.Claims;
using System.Text;
using UsersWebApi.Interfaces.ServiceInterfaces.UtilityInterfaces;

namespace Server.Services.Utility
{
    public class AuthHelperService : IAuthHelperService
    {
        private readonly IOptions<AppSettings> _settings;
        public AuthHelperService(IOptions<AppSettings> settings) 
        {
            _settings = settings;
        }

        public string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>();

            if (user.Role == UserRole.BUYER) { claims.Add(new Claim(ClaimTypes.Role, "buyer")); }
            if (user.Role == UserRole.SELLER) { claims.Add(new Claim(ClaimTypes.Role, "seller")); }
            if (user.Role == UserRole.ADMIN) { claims.Add(new Claim(ClaimTypes.Role, "admin")); }
            claims.Add(new Claim("id", user.Id.ToString()));

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

        public Guid GetUserIdFromToken(ClaimsPrincipal user)
        {
            Guid id = Guid.Empty;
            Guid.TryParse(user.Claims.Where(c => c.Type == "id").Select(x => x.Value).FirstOrDefault(), out id);
            Console.WriteLine();
            return id;
        }

        public async Task<SocialMediaInfoDTO> VerifyGoogleToken(ExternalLoginDTO externalLoginDTO)
        {
            try
            {
                var validationSettings = new GoogleJsonWebSignature.ValidationSettings()
                {
                    Audience = new List<string>() { _settings.Value.GoogleClientId }
                };

                var googleUserInfo = await GoogleJsonWebSignature.ValidateAsync(externalLoginDTO.Token, validationSettings);

                SocialMediaInfoDTO socialMediaInfoDTO = new SocialMediaInfoDTO()
                {
                    Username = googleUserInfo.Email.Split("@")[0],
                    Name = googleUserInfo.Name,
                    Email = googleUserInfo.Email,
                    ImageSrc = googleUserInfo.Picture
                };

                return socialMediaInfoDTO;
            } catch
            {
                return null;
            }
        }
    }
}
