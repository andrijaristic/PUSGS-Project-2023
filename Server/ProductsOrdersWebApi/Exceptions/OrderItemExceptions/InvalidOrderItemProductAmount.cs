using ProductsOrdersWebApi.Exceptions.Common;

namespace ProductsOrdersWebApi.Exceptions.OrderItemExceptions
{
    public class InvalidOrderItemProductAmount : BadRequestException
    {
        public InvalidOrderItemProductAmount(string name, int productAmount, int itemAmount) : base($"Product ({name}) does not have appropriate amount. Requested: {itemAmount} | Available: {productAmount}") 
        {
        
        }
    }
}
