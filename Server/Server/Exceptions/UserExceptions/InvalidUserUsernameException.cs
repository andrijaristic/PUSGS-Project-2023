using Server.Exceptions.Common;

namespace Server.Exceptions.UserExceptions
{
    public sealed class InvalidUserUsernameException : BadRequestException
    {
        public InvalidUserUsernameException(string username) : base($"Entered username ({username}) is not a valid username")
        {

        }
    }
}
