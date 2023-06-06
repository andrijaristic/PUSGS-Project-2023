using ProductsOrdersWebApi.Exceptions.Common;

namespace ProductsOrdersWebApi.Exceptions.OrderExceptions
{
    public class InvalidOrderDeliveryAddressException : BadRequestException
    {
        public InvalidOrderDeliveryAddressException(string deliveryAddress) : base($"Order delivery address ({deliveryAddress}) is not a valid delivery address")
        {

        }
    }
}
