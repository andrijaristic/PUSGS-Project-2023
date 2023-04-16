using Server.Dto.UserDTOs;

namespace Server.Interfaces.ServiceInterfaces
{
    public interface IUserService
    {
        Task<DisplayUserDTO> CreateUser(NewUserDTO newUserDTO);
        Task<AuthDTO> Login(LoginDTO loginDTO);
        Task<DisplayUserDTO> UpdateUser(UpdateUserDTO updateUserDTO);
        Task VerifyUser(Guid userId);
    }
}
