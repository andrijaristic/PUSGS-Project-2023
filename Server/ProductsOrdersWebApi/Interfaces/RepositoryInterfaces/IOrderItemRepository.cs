using ProductsOrdersWebApi.Models;

namespace ProductsOrdersWebApi.Interfaces.RepositoryInterfaces
{
    public interface IOrderItemRepository : IGenericRepository<OrderItem>
    {
        Task<bool> FindOrderForItem(Guid productId);
    }
}
