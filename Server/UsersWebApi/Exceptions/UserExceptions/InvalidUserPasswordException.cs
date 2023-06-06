using UsersWebApi.Exceptions.Common;

namespace UsersWebApi.Exceptions.UserExceptions
{
    public sealed class InvalidUserPasswordException : BadRequestException
    {
        public InvalidUserPasswordException(string password) : base($"Entered password ({password}) is not a valid password")
        {

        }
    }
}
