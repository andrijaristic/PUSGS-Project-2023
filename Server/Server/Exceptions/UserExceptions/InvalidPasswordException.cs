using Server.Exceptions.Common;

namespace Server.Exceptions.UserExceptions
{
    public sealed class InvalidPasswordException : BadRequestException
    {
        public InvalidPasswordException() : base("Invalid password")
        {
        
        }
    }
}
