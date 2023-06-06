using ProductsOrdersWebApi.Dto.OrderItemDTOs;
using ProductsOrdersWebApi.Dto.UserDTOs;
using ProductsOrdersWebApi.Enums;
using ProductsOrdersWebApi.Models;

namespace ProductsOrdersWebApi.Dto.OrderDTOs
{
    public class DisplayOrderDTO
    {
        public Guid Id { get; set; }
        public double Price { get; set; }
        public string Status { get; set; }
        public DateTime CancellationWindow { get; set; }    // 1 Hour from creation
        public DateTime TimeOfDelivery { get; set; }
    }
}
