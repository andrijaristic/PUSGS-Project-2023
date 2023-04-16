using Server.Exceptions.Common;

namespace Server.Exceptions.UserExceptions
{
    public sealed class UserUsernameExistsException : BadRequestException
    {
        public UserUsernameExistsException(string username) : base($"Username {username} already exists") 
        {
        
        }
    }
}
