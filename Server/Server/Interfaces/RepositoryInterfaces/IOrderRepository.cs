using Server.Models;

namespace Server.Interfaces.RepositoryInterfaces
{
    public interface IOrderRepository : IGenericRepository<Order>
    {
        Task<Order> GetFullOrder(Guid id);
        Task<List<Order>> GetAllOrdersFull();
        Task<List<Order>> GetBuyerOrders(Guid buyerId);
        Task<List<Order>> GetSellerOrders(Guid sellerId);
    }
}
