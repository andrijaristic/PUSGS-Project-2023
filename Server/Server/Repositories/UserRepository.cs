using Microsoft.EntityFrameworkCore;
using Server.Infrastructure;
using Server.Interfaces.RepositoryInterfaces;
using Server.Models;

namespace Server.Repositories
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(eShopDbContext dbContext) : base(dbContext) 
        {
        
        }

        public async Task<User> FindByUsername(string username)
        {
            User user = await _dbContext.Users.FirstOrDefaultAsync(x => String.Equals(x.Username, username));
            return user;
        }

        public async Task<List<User>> GetSellers()
        {
            List<User> sellers = await _dbContext.Users.Where(x => x.Role == Enums.UserRole.SELLER && x.VerificationStatus != Enums.VerificationStatus.ACCEPTED)
                                                       .ToListAsync();
            return sellers;
        }

        public async Task<Guid> FindUserIdByUsername(string username)
        {
            Guid id = await _dbContext.Users.Where(x => String.Equals(x.Username, username)).Select(x => x.Id).FirstOrDefaultAsync();
            return id;
        }
    }
}
