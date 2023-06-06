using UsersWebApi.Exceptions.Common;

namespace UsersWebApi.Exceptions.UserExceptions
{
    public sealed class InvalidUsernameException : BadRequestException
    {
        public InvalidUsernameException() : base("Invalid username") 
        {
        
        }
    }
}
