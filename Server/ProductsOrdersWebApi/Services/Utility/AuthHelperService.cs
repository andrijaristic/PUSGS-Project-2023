using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ProductsOrdersWebApi.Dto.UserDTOs;
using ProductsOrdersWebApi.Enums;
using ProductsOrdersWebApi.Interfaces.ServiceInterfaces.UtilityInterfaces;
using ProductsOrdersWebApi.Models;
using ProductsOrdersWebApi.Models.AppSettings;
using System.IdentityModel.Tokens.Jwt;
using System.Runtime;
using System.Security.Claims;
using System.Text;

namespace ProductsOrdersWebApi.Services.Utility
{
    public class AuthHelperService : IAuthHelperService
    {
        private readonly IOptions<AppSettings> _settings;
        public AuthHelperService(IOptions<AppSettings> settings) 
        {
            _settings = settings;
        }

        public Guid GetUserIdFromToken(ClaimsPrincipal user)
        {
            Guid id = Guid.Empty;
            Guid.TryParse(user.Claims.Where(c => c.Type == "id").Select(x => x.Value).FirstOrDefault(), out id);
            Console.WriteLine();
            return id;
        }
    }
}
