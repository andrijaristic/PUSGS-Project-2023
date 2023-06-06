using ProductsOrdersWebApi.Exceptions.Common;

namespace ProductsOrdersWebApi.Exceptions.OrderExceptions
{
    public class InvalidOrderCancellationWindowException : BadRequestException
    {
        public InvalidOrderCancellationWindowException(string cancellationWindow) : base($"Order cancellation window is not 1h long ({cancellationWindow})")
        {

        }
    }
}
