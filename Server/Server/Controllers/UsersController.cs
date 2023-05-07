using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Dto.UserDTOs;
using Server.Interfaces.ServiceInterfaces;
using Server.Interfaces.ServiceInterfaces.UtilityInterfaces;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IAuthHelperService _authHelperService;

        public UsersController(IUserService userService, IAuthHelperService authHelperService) 
        {
            _userService = userService;
            _authHelperService = authHelperService;
        }

        [HttpGet("all-sellers")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> Get()
        {
            List<DisplayUserDTO> displayUserDTOs = await _userService.GetSellers();
            return Ok(displayUserDTOs);
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserInformation()
        {
            Guid id = _authHelperService.GetUserIdFromToken(User);

            DisplayUserDTO displayUserDTO = await _userService.GetUserInformation(id);
            return Ok(displayUserDTO);
        }

        [HttpGet("avatar/{id}")]
        [Authorize]
        public async Task<IActionResult> GetAvatar(Guid id)
        {
            UserAvatarDTO userAvatarDTO = await _userService.GetUserAvatar(id);
            return File(userAvatarDTO.Stream, "application/octet-stream", userAvatarDTO.FileName);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromForm]NewUserDTO newUserDTO)
        {
            DisplayUserDTO displayUserDTO = await _userService.CreateUser(newUserDTO);
            return CreatedAtAction(nameof(Get), new { id = displayUserDTO.Id }, displayUserDTO);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]LoginDTO loginDTO)
        {
            AuthDTO authDTO = await _userService.Login(loginDTO);
            return Ok(authDTO);
        }

        [HttpPost("external-login")]
        public async Task<IActionResult> ExternalLogin([FromBody]ExternalLoginDTO externalLoginDTO)
        {
            AuthDTO authDTO = await _userService.ExternalLogin(externalLoginDTO);
            return Ok(authDTO);
        }

        [HttpPut("finish-registration")]
        [Authorize]
        public async Task<IActionResult> FinishRegistration([FromBody]FinishRegistrationDTO finishRegistrationDTO)
        {
            finishRegistrationDTO.Id = _authHelperService.GetUserIdFromToken(User);

            AuthDTO authDTO = await _userService.FinishRegistration(finishRegistrationDTO);
            return Ok(authDTO);
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Put([FromBody]UpdateUserDTO updateUserDTO)
        {
            updateUserDTO.Id = _authHelperService.GetUserIdFromToken(User);

            DisplayUserDTO displayUserDTO = await _userService.UpdateUser(updateUserDTO);
            return Ok(displayUserDTO);
        }

        [HttpPut("verify")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> Verify(VerifyUserDTO verifyUserDTO)
        {
            await _userService.VerifyUser(verifyUserDTO);
            return Ok();
        }
    }
}
