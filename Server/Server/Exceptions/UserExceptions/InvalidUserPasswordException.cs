using Server.Exceptions.Common;

namespace Server.Exceptions.UserExceptions
{
    public sealed class InvalidUserPasswordException : BadRequestException
    {
        public InvalidUserPasswordException(string password) : base($"Entered password ({password}) is not a valid password")
        {

        }
    }
}
