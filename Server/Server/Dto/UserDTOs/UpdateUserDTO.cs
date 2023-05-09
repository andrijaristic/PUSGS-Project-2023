namespace Server.Dto.UserDTOs
{
    public class UpdateUserDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public IFormFile Image { get; set; }
    }
}
