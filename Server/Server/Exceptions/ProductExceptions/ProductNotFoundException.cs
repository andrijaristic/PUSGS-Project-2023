using Server.Exceptions.Common;

namespace Server.Exceptions.ProductExceptions
{
    public sealed class ProductNotFoundException : NotFoundException
    {
        public ProductNotFoundException(Guid id) : base($"Product with ID: {id} was not found")
        {

        }
    }
}
