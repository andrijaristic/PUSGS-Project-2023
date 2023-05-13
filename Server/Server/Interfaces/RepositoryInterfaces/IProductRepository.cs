using Server.Models;

namespace Server.Interfaces.RepositoryInterfaces
{
    public interface IProductRepository : IGenericRepository<Product>
    {
        Task<List<Product>> GetAllProducts();
        Task<List<Product>> GetProductsForSeller(Guid sellerId);
    }
}
