using UsersWebApi.Exceptions.Common;

namespace UsersWebApi.Exceptions.UserExceptions
{
    public sealed class InvalidUserUsernameException : BadRequestException
    {
        public InvalidUserUsernameException(string username) : base($"Entered username ({username}) is not a valid username")
        {

        }
    }
}
