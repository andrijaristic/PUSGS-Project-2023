using Server.Dto.OrderItemDTOs;
using Server.Enums;
using Server.Models;

namespace Server.Dto.OrderDTOs
{
    public class NewOrderDTO
    {
        public Guid Id { get; set; }
        public List<NewOrderItemDTO> Products { get; set; }
        public string Comment { get; set; }
        public string DeliveryAddress { get; set; }
        public double Price { get; set; }
        public string Status { get; set; }
        public DateTime CancellationWindow { get; set; }    // 1 Hour from creation
        public DateTime TimeOfDelivery { get; set; }
        public Guid BuyerId { get; set; }
    }
}
