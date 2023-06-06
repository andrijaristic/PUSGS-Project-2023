using UsersWebApi.Enums;

namespace UsersWebApi.Dto.UserDTOs
{
    public class DisplayUserDTO
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string VerificationStatus { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public string Role { get; set; }
        public string ImageSrc { get; set; }
        public string FinishedRegistration { get; set; }
    }
}
