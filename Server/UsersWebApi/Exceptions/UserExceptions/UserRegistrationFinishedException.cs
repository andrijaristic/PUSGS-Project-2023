using UsersWebApi.Exceptions.Common;

namespace UsersWebApi.Exceptions.UserExceptions
{
    public class UserRegistrationFinishedException : BadRequestException
    {
        public UserRegistrationFinishedException(Guid id) : base($"User with ID: {id} has already finished registering")
        {

        }
    }
}
