using Server.Exceptions.Common;

namespace Server.Exceptions.UserExceptions
{
    public class InvalidUserGoogleTokenException : BadRequestException
    {
        public InvalidUserGoogleTokenException() : base("Provided Google token is not a valid token") 
        {
        
        }
    }
}
