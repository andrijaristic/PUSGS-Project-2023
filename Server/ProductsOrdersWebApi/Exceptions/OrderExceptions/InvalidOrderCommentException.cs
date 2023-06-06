using ProductsOrdersWebApi.Exceptions.Common;

namespace ProductsOrdersWebApi.Exceptions.OrderExceptions
{
    public class InvalidOrderCommentException : BadRequestException
    {
        public InvalidOrderCommentException(string comment) : base($"Order comment ({comment}) is not a valid comment") 
        { 
        
        }
    }
}
