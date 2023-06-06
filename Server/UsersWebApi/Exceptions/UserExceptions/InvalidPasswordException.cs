using UsersWebApi.Exceptions.Common;

namespace UsersWebApi.Exceptions.UserExceptions
{
    public sealed class InvalidPasswordException : BadRequestException
    {
        public InvalidPasswordException() : base("Invalid password")
        {
        
        }
    }
}
