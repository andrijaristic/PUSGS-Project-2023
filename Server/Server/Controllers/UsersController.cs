﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Dto.UserDTOs;
using Server.Interfaces.ServiceInterfaces;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService) 
        {
            _userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]NewUserDTO newUserDTO)
        {
            DisplayUserDTO displayUserDTO = await _userService.CreateUser(newUserDTO);
            return Ok(displayUserDTO);
            //return CreatedAtAction(typeof(Get), new { id = displayUserDTO.Id}, displayUserDTO);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]LoginDTO loginDTO)
        {
            AuthDTO authDTO = await _userService.Login(loginDTO);
            return Ok(authDTO);
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Put([FromBody]UpdateUserDTO updateUserDTO)
        {
            DisplayUserDTO displayUserDTO = await _userService.UpdateUser(updateUserDTO);
            return Ok(displayUserDTO);
        }

        [HttpPut("verify/{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> Verify(Guid id)
        {
            await _userService.VerifyUser(id);
            return Ok();
        }
    }
}
