using Server.Dto.OrderDTOs;

namespace Server.Interfaces.ServiceInterfaces
{
    public interface IOrderService
    {
        Task<DisplayOrderDTO> CreateOrder(NewOrderDTO newOrderDTO);
        Task CancelOrder(CancelOrderDTO cancelOrderDTO);
        Task<List<DisplayOrderDTO>> GetBuyerOrders(Guid buyerId);
        Task<List<DisplayOrderDTO>> GetNewBuyerOrders(Guid buyerId);
        Task<List<DisplayOrderDTO>> GetOrders();
        Task<List<DisplayOrderDTO>> GetSellerOrders(Guid sellerId);
        Task<List<DisplayOrderDTO>> GetNewSellerOrders(Guid sellerId);
        Task<DetailedOrderDTO> GetDetailedOrder(Guid id);
        Task<DetailedOrderDTO> GetSellerDetailedOrder(SellerDetailedOrderDTO sellerDetailedOrderDTO);
    }
}
