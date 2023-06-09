using Microsoft.EntityFrameworkCore;
using ProductsOrdersWebApi.Infrastructure;
using ProductsOrdersWebApi.Interfaces.RepositoryInterfaces;
using ProductsOrdersWebApi.Models;

namespace ProductsOrdersWebApi.Repositories
{
    public class OrderRepository : GenericRepository<Order>, IOrderRepository
    {
        public OrderRepository(ProductOrdersDbContext dbContext) : base(dbContext) 
        {

        }

        public async Task<List<Order>> GetAllOrders()
        {
            List<Order> orders = await _dbContext.Orders.ToListAsync();
            return orders;
        }

        public async Task<List<Order>> GetBuyerOrders(Guid buyerId, bool newOrder = false)
        {
            List<Order> orders = await _dbContext.Orders.Where(x => Guid.Equals(x.BuyerId, buyerId) && 
                                                               (newOrder ? x.CancellationWindow > DateTime.Now : 
                                                                           x.CancellationWindow <= DateTime.Now) && 
                                                               x.Status != Enums.OrderStatus.CANCELED)
                                                        .Include(x => x.Products)
                                                        .ThenInclude(x => x.Product)
                                                        .ToListAsync();
            return orders;
        }

        public async Task<Order> GetFullOrder(Guid id)
        {
            Order order = await _dbContext.Orders.Where(x => Guid.Equals(x.Id, id))
                                                 .Include(x => x.Products)
                                                 .ThenInclude(x => x.Product)
                                                 .FirstOrDefaultAsync();
            return order;
        }

        public async Task<Order> GetSellerFullOrder(Guid orderId, Guid sellerId)
        {
            Order order = await _dbContext.Orders.Where(x => Guid.Equals(x.Id, orderId))
                                                 .Include(x => x.Products.Where(x => Guid.Equals(x.Product.SellerId, sellerId)))
                                                 .ThenInclude(x => x.Product)
                                                 .FirstOrDefaultAsync();
            return order;
        }

        public async Task<List<Order>> GetSellerOrders(Guid sellerId, bool newOrder = false)
        {
            List<Order> orders = await _dbContext.Orders.Where(x => x.Status != Enums.OrderStatus.CANCELED &&
                                                              (newOrder ? x.CancellationWindow > DateTime.Now :
                                                                          x.CancellationWindow <= DateTime.Now))
                                                        .Include(x => x.Products.Where(x => Guid.Equals(x.Product.SellerId, sellerId)))
                                                        .ThenInclude(x => x.Product)
                                                        .ToListAsync();
            
            return orders.FindAll(x => x.Products.FindAll(x => x.Product.SellerId == sellerId).Count != 0);
        }
    }
}
