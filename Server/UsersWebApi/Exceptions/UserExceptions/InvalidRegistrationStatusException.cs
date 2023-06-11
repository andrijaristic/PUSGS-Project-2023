using UsersWebApi.Exceptions.Common;

namespace UsersWebApi.Exceptions.UserExceptions
{
    public class InvalidRegistrationStatusException : BadRequestException
    {
        public InvalidRegistrationStatusException() : base("Please finish registration first") { }
    }
}
