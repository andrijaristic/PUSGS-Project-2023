using ProductsOrdersWebApi.Exceptions.Common;

namespace ProductsOrdersWebApi.Exceptions.UserExceptions
{
    public class InvalidProductSellerException : BadRequestException
    {
        public InvalidProductSellerException(Guid id) : base($"Seller with ID: {id} in request is not logged in user") { }
    }
}
