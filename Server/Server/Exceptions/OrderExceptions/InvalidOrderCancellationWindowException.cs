using Server.Exceptions.Common;

namespace Server.Exceptions.OrderExceptions
{
    public class InvalidOrderCancellationWindowException : BadRequestException
    {
        public InvalidOrderCancellationWindowException(string cancellationWindow) : base($"Order cancellation window is not 1h long ({cancellationWindow})")
        {

        }
    }
}
