namespace Server.Dto.ProductDTOs
{
    public class ProductRestockDTO
    {
        public Guid Id { get; set; }
        public int Amount { get; set; }
        public Guid UserId { get; set; }
    }
}
