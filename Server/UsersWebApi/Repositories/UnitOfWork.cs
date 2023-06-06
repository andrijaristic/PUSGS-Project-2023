using UsersWebApi.Infrastructure;
using UsersWebApi.Interfaces.RepositoryInterfaces;

namespace UsersWebApi.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly UsersDbContext _dbContext;
        public IUserRepository Users { get;}

        public UnitOfWork(UsersDbContext dbContext, IUserRepository users) 
        {
            _dbContext = dbContext;
            Users = users;
        }

        public async Task Save()
        {
            await _dbContext.SaveChangesAsync();
        }
    }
}
