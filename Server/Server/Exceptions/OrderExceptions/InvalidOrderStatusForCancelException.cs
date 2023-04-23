using Server.Exceptions.Common;

namespace Server.Exceptions.OrderExceptions
{
    public class InvalidOrderStatusForCancelException : BadRequestException
    {
        public InvalidOrderStatusForCancelException(string status) : base($"Order has status of {status.ToUpper()} which cannot be cancelled")
        {

        }
    }
}
