using Microsoft.EntityFrameworkCore;
using UsersWebApi.Infrastructure;
using UsersWebApi.Interfaces.RepositoryInterfaces;
using UsersWebApi.Models;

namespace UsersWebApi.Repositories
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(UsersDbContext dbContext) : base(dbContext) 
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

        public async Task<List<User>> GetVerifiedSellers()
        {
            List<User> sellers = await _dbContext.Users.Where(x => x.Role == Enums.UserRole.SELLER && x.VerificationStatus == Enums.VerificationStatus.ACCEPTED)
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
