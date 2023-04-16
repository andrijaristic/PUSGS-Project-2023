using Server.Exceptions.Common;

namespace Server.Exceptions.UserExceptions
{
    public sealed class InvalidUsernameException : BadRequestException
    {
        public InvalidUsernameException() : base("Invalid username") 
        {
        
        }
    }
}
