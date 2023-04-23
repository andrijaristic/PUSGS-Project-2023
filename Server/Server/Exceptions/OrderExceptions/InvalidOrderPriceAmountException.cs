using Server.Exceptions.Common;

namespace Server.Exceptions.OrderExceptions
{
    public class InvalidOrderPriceAmountException : BadRequestException
    {
        public InvalidOrderPriceAmountException(double price) : base($"Order price ({price}) cannot be negative or zero")
        {

        }
    }
}
