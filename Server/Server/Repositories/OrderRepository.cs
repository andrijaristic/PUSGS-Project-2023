using Microsoft.EntityFrameworkCore;
using Server.Infrastructure;
using Server.Interfaces.RepositoryInterfaces;
using Server.Models;

namespace Server.Repositories
{
    public class OrderRepository : GenericRepository<Order>, IOrderRepository
    {
        public OrderRepository(eShopDbContext dbContext) : base(dbContext) 
        {

        }

        public async Task<Order> GetFullOrder(Guid id)
        {
            Order order = await _dbContext.Orders.Where(x => Guid.Equals(x.Id, id)).Include(x => x.Products).FirstOrDefaultAsync();
            return order;
        }
    }
}
