using Server.Exceptions.Common;

namespace Server.Exceptions.ProductExceptions
{
    public sealed class InvalidProductSellerTypeException : BadRequestException
    {
        public InvalidProductSellerTypeException(Guid id) : base($"Product seller with ID: {id} is not a SELLER")
        {

        }
    }
}
