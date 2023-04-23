using Server.Dto.ProductDTOs;

namespace Server.Dto.OrderItemDTOs
{
    public class DisplayOrderItemDTO
    {
        public Guid Id { get; set; }
        public DisplayProductDTO Product { get; set; }
        public int Amount { get; set; }
        public double ItemPrice { get; set; }
    }
}
