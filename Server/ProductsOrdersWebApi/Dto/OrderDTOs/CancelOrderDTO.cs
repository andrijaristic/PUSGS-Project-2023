namespace ProductsOrdersWebApi.Dto.OrderDTOs
{
    public class CancelOrderDTO
    {
        public Guid OrderId { get; set; }    
        public Guid BuyerId { get; set; }
    }
}
