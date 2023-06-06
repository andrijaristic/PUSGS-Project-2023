using ProductsOrdersWebApi.Dto.UserDTOs;
using ProductsOrdersWebApi.Models;
using System.Security.Claims;

namespace ProductsOrdersWebApi.Interfaces.ServiceInterfaces.UtilityInterfaces
{
    public interface IAuthHelperService
    {
        Guid GetUserIdFromToken(ClaimsPrincipal user);
    }
}
