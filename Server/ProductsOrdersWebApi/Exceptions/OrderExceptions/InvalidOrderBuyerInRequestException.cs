using ProductsOrdersWebApi.Exceptions.Common;

namespace ProductsOrdersWebApi.Exceptions.OrderExceptions
{
    public class InvalidOrderBuyerInRequestException : BadRequestException
    {
        public InvalidOrderBuyerInRequestException(Guid orderId, Guid buyerId) : base($"Order with ID: {orderId} does not have user with ID: {buyerId} as listed buyer")
        {

        }
    }
}
