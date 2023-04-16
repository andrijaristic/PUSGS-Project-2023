using Server.Exceptions.Common;

namespace Server.Exceptions.UserExceptions
{
    public sealed class InvalidNameOfUserException : BadRequestException
    {
        public InvalidNameOfUserException(string name) : base($"Entered name ({name}) is not a valid name") 
        {
        
        }
    }
}
