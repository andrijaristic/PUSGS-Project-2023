using Server.Enums;

namespace Server.Dto.UserDTOs
{
    public class NewUserDTO
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public string Role { get; set; }
        public IFormFile Image { get; set; }
    }
}
