using Server.Enums;

namespace Server.Dto.UserDTOs
{
    public class DisplayUserDTO
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public bool isVerified { get; set; } = false;
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public string Role { get; set; }
    }
}
