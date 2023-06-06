using ProductsOrdersWebApi.Exceptions.Common;

namespace ProductsOrdersWebApi.Exceptions.ProductExceptions
{
    public sealed class InvalidProductDescriptionException : BadRequestException
    {
        public InvalidProductDescriptionException(string description) : base($"Product description \n({description})\nis not a valid description")
        {
        
        }
    }
}
