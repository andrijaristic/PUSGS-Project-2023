using ProductsOrdersWebApi.Exceptions.Common;

namespace ProductsOrdersWebApi.Exceptions.ProductExceptions
{
    public sealed class InvalidProductNameException : BadRequestException
    {
        public InvalidProductNameException(string name) : base($"Product name ({name}) is not a valid product name") 
        {
        
        }
    }
}
