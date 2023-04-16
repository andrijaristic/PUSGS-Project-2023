using Server.Models;

namespace Server.Interfaces.RepositoryInterfaces
{
    public interface IUserRepository : IGenericRepository<User>
    {
        Task<User> FindByUsername(string username);
    }
}
