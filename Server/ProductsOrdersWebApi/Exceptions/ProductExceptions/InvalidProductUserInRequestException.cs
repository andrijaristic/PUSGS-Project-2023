using ProductsOrdersWebApi.Exceptions.Common;

namespace ProductsOrdersWebApi.Exceptions.ProductExceptions
{
    public sealed class InvalidProductUserInRequestException : BadRequestException
    {
        public InvalidProductUserInRequestException(Guid productId, Guid userId) : base($"User with ID: {userId} is not seller of product with ID: {productId}") 
        {
        
        }
    }
}
