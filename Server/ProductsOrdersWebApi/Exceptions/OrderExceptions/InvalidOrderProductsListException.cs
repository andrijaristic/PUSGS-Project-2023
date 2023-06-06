using ProductsOrdersWebApi.Exceptions.Common;

namespace ProductsOrdersWebApi.Exceptions.OrderExceptions
{
    public class InvalidOrderProductsListException : BadRequestException
    {
        public InvalidOrderProductsListException() : base("Product list in order cannot be empty") 
        {
        
        }
    }
}
