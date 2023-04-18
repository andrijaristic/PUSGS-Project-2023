using Server.Exceptions.Common;

namespace Server.Exceptions.UserExceptions
{
    public sealed class UserNotFoundException : NotFoundException
    {
        public UserNotFoundException() : base($"User with provided information was not found")
        {

        }
    }
}
