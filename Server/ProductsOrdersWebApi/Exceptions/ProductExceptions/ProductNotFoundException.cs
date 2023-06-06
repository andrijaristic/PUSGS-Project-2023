using ProductsOrdersWebApi.Exceptions.Common;

namespace ProductsOrdersWebApi.Exceptions.ProductExceptions
{
    public sealed class ProductNotFoundException : NotFoundException
    {
        public ProductNotFoundException(Guid id) : base($"Product with ID: {id} was not found")
        {

        }
    }
}
