using UsersWebApi.Exceptions.Common;

namespace UsersWebApi.Exceptions.UserExceptions
{
    public sealed class UserUsernameExistsException : BadRequestException
    {
        public UserUsernameExistsException(string username) : base($"Username {username} already exists") 
        {
        
        }
    }
}
