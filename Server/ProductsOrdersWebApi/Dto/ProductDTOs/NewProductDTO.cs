using ProductsOrdersWebApi.Models;

namespace ProductsOrdersWebApi.Dto.ProductDTOs
{
    public class NewProductDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Amount { get; set; }
        public double IndividualPrice { get; set; }
        public string Description { get; set; }
        public IFormFile Image { get; set; }
        public Guid SellerId { get; set; }
    }
}
