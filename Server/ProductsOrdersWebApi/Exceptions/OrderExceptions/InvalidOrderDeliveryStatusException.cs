using ProductsOrdersWebApi.Exceptions.Common;

namespace ProductsOrdersWebApi.Exceptions.OrderExceptions
{
    public class InvalidOrderDeliveryStatusException : BadRequestException
    {
        public InvalidOrderDeliveryStatusException() : base("Order status cannot be DELIVERED on order creation")
        {

        }
    }
}
