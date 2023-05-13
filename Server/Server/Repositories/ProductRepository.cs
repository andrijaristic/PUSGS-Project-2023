using Microsoft.EntityFrameworkCore;
using Server.Infrastructure;
using Server.Interfaces.RepositoryInterfaces;
using Server.Models;

namespace Server.Repositories
{
    public class ProductRepository : GenericRepository<Product>, IProductRepository
    {
        public ProductRepository(eShopDbContext dbContext) : base(dbContext) 
        {

        }

        public async Task<List<Product>> GetAllProducts()
        {
            List<Product> products = await _dbContext.Products.Where(x => !x.IsDeleted).ToListAsync();
            return products;
        }

        public async Task<List<Product>> GetProductsForSeller(Guid sellerId)
        {
            List<Product> products = await _dbContext.Products.Where(x => x.SellerId == sellerId && !x.IsDeleted).ToListAsync();
            return products;
        }
    }
}
