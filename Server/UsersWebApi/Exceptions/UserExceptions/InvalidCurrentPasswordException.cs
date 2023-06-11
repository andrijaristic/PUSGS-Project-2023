using UsersWebApi.Exceptions.Common;

namespace UsersWebApi.Exceptions.UserExceptions
{
    public class InvalidCurrentPasswordException : BadRequestException
    {
        public InvalidCurrentPasswordException(): base("Invalid current password") { }
    }
}
