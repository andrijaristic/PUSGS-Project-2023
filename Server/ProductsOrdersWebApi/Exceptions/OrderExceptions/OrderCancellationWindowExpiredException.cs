using ProductsOrdersWebApi.Exceptions.Common;

namespace ProductsOrdersWebApi.Exceptions.OrderExceptions
{
    public class OrderCancellationWindowExpiredException : BadRequestException
    {
        public OrderCancellationWindowExpiredException(string cancellationWindow) : base($"Current time is past cancellation date ({cancellationWindow})")
        {

        }
    }
}
