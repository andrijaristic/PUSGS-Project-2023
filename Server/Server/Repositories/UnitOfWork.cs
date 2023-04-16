using Server.Infrastructure;
using Server.Interfaces.RepositoryInterfaces;

namespace Server.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly eShopDbContext _dbContext;
        public IUserRepository Users { get;}
        public IProductRepository Products { get; }
        public IOrderRepository Orders { get; }
        public IOrderItemRepository OrderItems { get; }

        public UnitOfWork(eShopDbContext dbContext, IUserRepository users, IProductRepository products, IOrderRepository orders, IOrderItemRepository orderItems) 
        {
            _dbContext = dbContext;
            Users = users;
            Products = products;
            Orders = orders;
            OrderItems = orderItems;
        }

        public async Task Save()
        {
            await _dbContext.SaveChangesAsync();
        }
    }
}
