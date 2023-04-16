namespace Server.Dto.UserDTOs
{
    public class AuthDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Role { get; set; }
        public string Token { get; set; }   
    }
}
