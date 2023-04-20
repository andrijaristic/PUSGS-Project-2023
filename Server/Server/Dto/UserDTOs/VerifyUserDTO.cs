namespace Server.Dto.UserDTOs
{
    public class VerifyUserDTO
    {
        public Guid UserId { get; set; }
        public bool Verified { get; set; }
    }
}
