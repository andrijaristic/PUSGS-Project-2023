using Microsoft.EntityFrameworkCore;
using ProductsOrdersWebApi.Models;

namespace ProductsOrdersWebApi.Infrastructure
{
    public class ProductOrdersDbContext : DbContext
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }

        public ProductOrdersDbContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(ProductOrdersDbContext).Assembly);
        }
    }
}
