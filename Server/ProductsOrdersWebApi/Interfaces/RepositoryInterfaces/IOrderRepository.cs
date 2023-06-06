using ProductsOrdersWebApi.Models;

namespace ProductsOrdersWebApi.Interfaces.RepositoryInterfaces
{
    public interface IOrderRepository : IGenericRepository<Order>
    {
        Task<Order> GetFullOrder(Guid id);
        Task<List<Order>> GetAllOrders();
        Task<List<Order>> GetBuyerOrders(Guid buyerId, bool newOrder = false);
        Task<List<Order>> GetSellerOrders(Guid sellerId, bool newOrder = false);
        Task<Order> GetSellerFullOrder(Guid orderId, Guid sellerId);
    }
}
