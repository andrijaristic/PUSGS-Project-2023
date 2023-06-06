using UsersWebApi.Exceptions.Common;

namespace UsersWebApi.Exceptions.UserExceptions
{
    public class InvalidUserGoogleTokenException : BadRequestException
    {
        public InvalidUserGoogleTokenException() : base("Provided Google token is not a valid token") 
        {
        
        }
    }
}
