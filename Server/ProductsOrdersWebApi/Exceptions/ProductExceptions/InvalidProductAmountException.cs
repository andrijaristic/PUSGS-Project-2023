using ProductsOrdersWebApi.Exceptions.Common;

namespace ProductsOrdersWebApi.Exceptions.ProductExceptions
{
    public sealed class InvalidProductAmountException : BadRequestException
    {
        public InvalidProductAmountException(int amount) : base($"Product amount ({amount}) cannot be negative")
        {

        }
    }
}
