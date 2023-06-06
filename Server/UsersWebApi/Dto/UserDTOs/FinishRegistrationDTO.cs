namespace UsersWebApi.Dto.UserDTOs
{
    public class FinishRegistrationDTO
    {
        public Guid Id { get; set; }
        public string Password { get; set; }
        public string Address { get;set; }
        public DateTime DateOfBirth { get; set; }
        public string Role { get; set; }
    }
}
