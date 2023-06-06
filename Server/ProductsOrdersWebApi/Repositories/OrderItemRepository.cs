using Microsoft.EntityFrameworkCore;
using ProductsOrdersWebApi.Infrastructure;
using ProductsOrdersWebApi.Interfaces.RepositoryInterfaces;
using ProductsOrdersWebApi.Models;

namespace ProductsOrdersWebApi.Repositories
{
    public class OrderItemRepository : GenericRepository<OrderItem>, IOrderItemRepository
    {
        public OrderItemRepository(ProductOrdersDbContext dbContext) : base(dbContext) 
        {
        
        }

        public async Task<bool> FindOrderForItem(Guid productId)
        {
            bool orderExists = await _dbContext.OrderItems.Where(x => x.ProductId == productId).FirstOrDefaultAsync() != null;
            return orderExists;
        }
    }
}
