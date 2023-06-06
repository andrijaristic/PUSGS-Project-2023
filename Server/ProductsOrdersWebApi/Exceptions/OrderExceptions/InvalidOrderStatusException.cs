using ProductsOrdersWebApi.Exceptions.Common;

namespace ProductsOrdersWebApi.Exceptions.OrderExceptions
{
    public class InvalidOrderStatusException : BadRequestException
    {
        public InvalidOrderStatusException(string status) : base($"Order status ({status}) is not a valid status")
        {

        }
    }
}
