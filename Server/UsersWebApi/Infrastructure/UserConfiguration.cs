using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using UsersWebApi.Enums;
using UsersWebApi.Models;

namespace UsersWebApi.Infrastructure.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();
            
            builder.HasIndex(x => x.Username).IsUnique();

            builder.Property(x => x.Role)
                   .HasConversion(
                        x => x.ToString(), 
                        x => Enum.Parse<UserRole>(x)
                    );

            builder.Property(x => x.VerificationStatus)
                   .HasConversion(
                        x => x.ToString(),
                        x => Enum.Parse<VerificationStatus>(x)
        );
        }
    }
}
