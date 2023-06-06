using Microsoft.EntityFrameworkCore;
using ProductsOrdersWebApi.Infrastructure;
using ProductsOrdersWebApi.Interfaces.RepositoryInterfaces;
using ProductsOrdersWebApi.Models;

namespace ProductsOrdersWebApi.Repositories
{
    public class ProductRepository : GenericRepository<Product>, IProductRepository
    {
        public ProductRepository(ProductOrdersDbContext dbContext) : base(dbContext) 
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
