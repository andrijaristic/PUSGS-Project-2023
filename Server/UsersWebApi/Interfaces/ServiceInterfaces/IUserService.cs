using UsersWebApi.Dto.UserDTOs;

namespace UsersWebApi.Interfaces.ServiceInterfaces
{
    public interface IUserService
    {
        Task<DisplayUserDTO> CreateUser(NewUserDTO newUserDTO);
        Task<AuthDTO> Login(LoginDTO loginDTO);
        Task<DisplayUserDTO> UpdateUser(UpdateUserDTO updateUserDTO);
        Task VerifyUser(VerifyUserDTO verifyUserDTO);
        Task<List<DisplayUserDTO>> GetSellers();
        Task<List<DisplayUserDTO>> GetVerifiedSellers();
        Task<AuthDTO> ExternalLogin(ExternalLoginDTO externalLoginDTO);
        Task<UserAvatarDTO> GetUserAvatar(Guid id);
        Task<DisplayUserDTO> GetUserInformation(Guid id);
        Task<AuthDTO> FinishRegistration(FinishRegistrationDTO finishRegistrationDTO);
        Task<DisplayUserDTO> ChangePassword(Guid id, ChangePasswordDTO changePasswordDTO, Guid tokenId);
    }
}
