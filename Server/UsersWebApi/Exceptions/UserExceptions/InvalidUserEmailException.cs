using UsersWebApi.Exceptions.Common;

namespace UsersWebApi.Exceptions.UserExceptions
{
    public sealed class InvalidUserEmailException : BadRequestException
    {
        public InvalidUserEmailException(string email) : base($"Entered email ({email}) is not a valid email address")
        {

        }
    }
}
