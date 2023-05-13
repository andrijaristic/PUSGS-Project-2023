using Microsoft.EntityFrameworkCore;
using Server.Infrastructure;
using Server.Interfaces.RepositoryInterfaces;
using Server.Models;

namespace Server.Repositories
{
    public class OrderItemRepository : GenericRepository<OrderItem>, IOrderItemRepository
    {
        public OrderItemRepository(eShopDbContext dbContext) : base(dbContext) 
        {
        
        }

        public async Task<bool> FindOrderForItem(Guid productId)
        {
            bool orderExists = await _dbContext.OrderItems.Where(x => x.ProductId == productId).FirstOrDefaultAsync() != null;
            return orderExists;
        }
    }
}
