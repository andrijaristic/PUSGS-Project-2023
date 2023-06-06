using UsersWebApi.Exceptions.Common;

namespace UsersWebApi.Exceptions.UserExceptions
{
    public sealed class InvalidSellerVerificationException : BadRequestException
    {
        public InvalidSellerVerificationException(Guid id) : base($"SELLER with ID: {id} is not verified")
        {

        }
    }
}
