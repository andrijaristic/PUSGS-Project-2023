using Server.Exceptions.Common;

namespace Server.Exceptions.OrderExceptions
{
    public class OrderCancellationWindowExpiredException : BadRequestException
    {
        public OrderCancellationWindowExpiredException(string cancellationWindow) : base($"Current time is past cancellation date ({cancellationWindow})")
        {

        }
    }
}
