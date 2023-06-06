using ProductsOrdersWebApi.Exceptions.Common;

namespace ProductsOrdersWebApi.Exceptions.OrderExceptions
{
    public class InvalidOrderPriceAmountException : BadRequestException
    {
        public InvalidOrderPriceAmountException(double price) : base($"Order price ({price}) cannot be negative or zero")
        {

        }
    }
}
