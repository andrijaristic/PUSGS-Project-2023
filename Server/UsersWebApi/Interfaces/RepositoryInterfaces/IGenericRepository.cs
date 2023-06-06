namespace UsersWebApi.Interfaces.RepositoryInterfaces
{
    public interface IGenericRepository<T> where T : class
    {
        Task<T> Add(T entity);
        Task<List<T>> GetAll();
        Task<T> Find(Guid id);
        void Remove(T entity);
    }
}
