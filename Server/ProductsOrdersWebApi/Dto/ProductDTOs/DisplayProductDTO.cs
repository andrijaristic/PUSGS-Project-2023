using Microsoft.AspNetCore.Mvc;
using ProductsOrdersWebApi.Models;

namespace ProductsOrdersWebApi.Dto.ProductDTOs
{
    public class DisplayProductDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Amount { get; set; }
        public double IndividualPrice { get; set; }
        public string Description { get; set; }
        public DateTime Timestamp { get; set; }
        public Guid SellerId { get; set; }
    }
}
