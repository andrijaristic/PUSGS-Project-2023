using UsersWebApi.Interfaces.RepositoryInterfaces;

namespace UsersWebApi.Interfaces.RepositoryInterfaces
{
    public interface IUnitOfWork
    {
        IUserRepository Users { get; }
        Task Save();
    }
}
