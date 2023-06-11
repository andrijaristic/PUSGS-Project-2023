using UsersWebApi.Exceptions.Common;

namespace UsersWebApi.Exceptions.UserExceptions
{
    public class InvalidUserException : BadRequestException
    {
        public InvalidUserException() : base("You can only change your own password") { }
    }
}
