using Server.Exceptions.Common;

namespace Server.Exceptions.OrderExceptions
{
    public class InvalidOrderBuyerInRequestException : BadRequestException
    {
        public InvalidOrderBuyerInRequestException(Guid orderId, Guid buyerId) : base($"Order with ID: {orderId} does not have user with ID: {buyerId} as listed buyer")
        {

        }
    }
}
