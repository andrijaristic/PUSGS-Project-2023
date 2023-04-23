using Server.Models;

namespace Server.Interfaces.RepositoryInterfaces
{
    public interface IOrderRepository : IGenericRepository<Order>
    {
        Task<Order> GetFullOrder(Guid id);
    }
}
