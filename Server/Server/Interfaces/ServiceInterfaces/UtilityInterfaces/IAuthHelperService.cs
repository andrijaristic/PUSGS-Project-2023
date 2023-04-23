using Server.Dto.UserDTOs;
using Server.Models;
using System.Security.Claims;

namespace Server.Interfaces.ServiceInterfaces.UtilityInterfaces
{
    public interface IAuthHelperService
    {
        Guid GetUserIdFromToken(ClaimsPrincipal user);
        string CreateToken(User user);
        Task<SocialMediaInfoDTO> VerifyGoogleToken(ExternalLoginDTO externalLoginDTO);
    }
}
