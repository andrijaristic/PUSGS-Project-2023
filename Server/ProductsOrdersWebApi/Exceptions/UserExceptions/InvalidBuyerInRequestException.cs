using ProductsOrdersWebApi.Exceptions.Common;

namespace ProductsOrdersWebApi.Exceptions.UserExceptions
{
    public class InvalidBuyerInRequestException : BadRequestException
    {
        public InvalidBuyerInRequestException(Guid id) : base($"Buyer with ID: {id} is not order buyer") { }
    }
}
