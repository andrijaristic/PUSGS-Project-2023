using UsersWebApi.Dto.UserDTOs;
using UsersWebApi.Models;
using System.Security.Claims;

namespace UsersWebApi.Interfaces.ServiceInterfaces.UtilityInterfaces
{
    public interface IAuthHelperService
    {
        Guid GetUserIdFromToken(ClaimsPrincipal user);
        string CreateToken(User user);
        Task<SocialMediaInfoDTO> VerifyGoogleToken(ExternalLoginDTO externalLoginDTO);
    }
}
