using ProductsOrdersWebApi.Exceptions.Common;

namespace ProductsOrdersWebApi.Exceptions.ProductExceptions
{
    public class OutdatedProductException : BadRequestException
    {
        public OutdatedProductException(string name) : base($"Product {name} in order is outdated")
        {

        }
    }
}
