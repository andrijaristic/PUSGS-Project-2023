using Microsoft.EntityFrameworkCore;
using UsersWebApi.Infrastructure;
using UsersWebApi.Interfaces.RepositoryInterfaces;

namespace UsersWebApi.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected readonly UsersDbContext _dbContext;

        public GenericRepository(UsersDbContext dbContext) 
        {
            _dbContext = dbContext;
        }

        public async Task<T> Add(T entity)
        {
            await _dbContext.Set<T>().AddAsync(entity);
            return entity;
        }

        public void Remove(T entity)
        {
            _dbContext.Set<T>().Remove(entity);
        }

        public async Task<T> Find(Guid id)
        {
            T entity = await _dbContext.Set<T>().FindAsync(id);
            return entity;
        }

        public async Task<List<T>> GetAll()
        {
            List<T> entities = await _dbContext.Set<T>().ToListAsync();
            return entities;
        }
    }
}
