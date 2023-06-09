using ProductsOrdersWebApi.Exceptions.Common;

namespace ProductsOrdersWebApi.Exceptions.UserExceptions
{
    public sealed class InvalidSellerVerificationException : BadRequestException
    {
        public InvalidSellerVerificationException(Guid id) : base($"SELLER with ID: {id} is not verified")
        {

        }
    }
}
