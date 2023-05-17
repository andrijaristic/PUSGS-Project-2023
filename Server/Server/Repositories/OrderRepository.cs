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

        public async Task<List<Order>> GetAllOrdersFull()
        {
            List<Order> orders = await _dbContext.Orders.Include(x => x.Products).ThenInclude(x => x.Product).ToListAsync();
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
            Order order = await _dbContext.Orders.Where(x => Guid.Equals(x.Id, id)).Include(x => x.Products).FirstOrDefaultAsync();
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
