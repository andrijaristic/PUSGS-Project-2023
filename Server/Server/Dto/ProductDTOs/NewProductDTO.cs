using Server.Models;

namespace Server.Dto.ProductDTOs
{
    public class NewProductDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Amount { get; set; }
        public double IndividualPrice { get; set; }
        public string Description { get; set; }
        // public string ImageURL { get; set; }
        public Guid UserId { get; set; }
    }
}
