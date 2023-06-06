using ProductsOrdersWebApi.Exceptions.Common;

namespace ProductsOrdersWebApi.Exceptions.OrderExceptions
{
    public class InvalidOrderUserInRequestException : BadRequestException
    {
        public InvalidOrderUserInRequestException(Guid userId) : base($"User with ID: {userId} is not a BUYER") 
        {
        
        }
    }
}
