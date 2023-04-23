using Server.Models;

namespace Server.Dto.OrderItemDTOs
{
    public class NewOrderItemDTO
    {
        public Guid Id { get; set; }
        public Guid ProductId { get; set; }
        public int Amount { get; set; }
        public double ItemPrice { get; set; }
        public Guid OrderId { get; set; }
    }
}
