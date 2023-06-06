namespace ProductsOrdersWebApi.Interfaces.RepositoryInterfaces
{
    public interface IUnitOfWork
    {
        IProductRepository Products { get; }
        IOrderRepository Orders { get; }
        IOrderItemRepository OrderItems { get; }
        Task Save();
    }
}
