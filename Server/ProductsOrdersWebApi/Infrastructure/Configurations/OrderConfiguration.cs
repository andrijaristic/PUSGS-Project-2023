using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProductsOrdersWebApi.Enums;
using ProductsOrdersWebApi.Models;

namespace ProductsOrdersWebApi.Infrastructure.Configurations
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.HasMany(x => x.Products)
                   .WithOne(x => x.Order)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.Property(x => x.Status)
                   .HasConversion(
                        x => x.ToString(),
                        x => Enum.Parse<OrderStatus>(x)
                    );
        }
    }
}
