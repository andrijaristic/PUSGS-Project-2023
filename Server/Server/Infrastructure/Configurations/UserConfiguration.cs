using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Server.Enums;
using Server.Models;

namespace Server.Infrastructure.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();
            
            builder.HasIndex(x => x.Username).IsUnique();

            builder.HasMany(x => x.Products)
                   .WithOne(x => x.Seller)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(x => x.Orders)
                   .WithOne(x => x.Buyer)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.Property(x => x.Role)
                   .HasConversion(
                        x => x.ToString(), 
                        x => Enum.Parse<UserRole>(x)
                    );
        }
    }
}
