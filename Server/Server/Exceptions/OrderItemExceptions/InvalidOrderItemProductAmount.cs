using Server.Exceptions.Common;

namespace Server.Exceptions.OrderItemExceptions
{
    public class InvalidOrderItemProductAmount : BadRequestException
    {
        public InvalidOrderItemProductAmount(string name, int productAmount, int itemAmount) : base($"Product ({name}) does not have appopriate amount. Requested: {itemAmount}\nAvailable: {productAmount}") 
        {
        
        }
    }
}
