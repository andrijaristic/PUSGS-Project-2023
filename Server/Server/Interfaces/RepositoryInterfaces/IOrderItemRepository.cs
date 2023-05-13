using Server.Models;

namespace Server.Interfaces.RepositoryInterfaces
{
    public interface IOrderItemRepository : IGenericRepository<OrderItem>
    {
        Task<bool> FindOrderForItem(Guid productId);
    }
}
