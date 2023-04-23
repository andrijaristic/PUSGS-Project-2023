using Server.Exceptions.Common;

namespace Server.Exceptions.OrderExceptions
{
    public class InvalidOrderProductsListException : BadRequestException
    {
        public InvalidOrderProductsListException() : base("Product list in order cannot be empty") 
        {
        
        }
    }
}
