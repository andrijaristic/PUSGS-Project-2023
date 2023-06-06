using ProductsOrdersWebApi.Infrastructure;
using ProductsOrdersWebApi.Interfaces.RepositoryInterfaces;

namespace ProductsOrdersWebApi.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ProductOrdersDbContext _dbContext;
        public IProductRepository Products { get; }
        public IOrderRepository Orders { get; }
        public IOrderItemRepository OrderItems { get; }

        public UnitOfWork(ProductOrdersDbContext dbContext, IProductRepository products, IOrderRepository orders, IOrderItemRepository orderItems) 
        {
            _dbContext = dbContext;
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
