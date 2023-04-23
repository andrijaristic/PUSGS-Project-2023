using Server.Exceptions.Common;

namespace Server.Exceptions.OrderExceptions
{
    public class InvalidOrderStatusException : BadRequestException
    {
        public InvalidOrderStatusException(string status) : base($"Order status ({status}) is not a valid status")
        {

        }
    }
}
