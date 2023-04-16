using Server.Exceptions.Common;

namespace Server.Exceptions.UserExceptions
{
    public sealed class InvalidUserAddressException : BadRequestException
    {
        public InvalidUserAddressException(string address) : base($"Entered address ({address}) is not a valid address")
        {

        }
    }
}
