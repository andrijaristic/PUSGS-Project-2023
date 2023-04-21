using Server.Models;
using System.Security.Claims;

namespace Server.Interfaces.ServiceInterfaces.UtilityInterfaces
{
    public interface IAuthHelperService
    {
        Guid GetUserIdFromToken(ClaimsPrincipal user);
        string CreateToken(User user);
    }
}
