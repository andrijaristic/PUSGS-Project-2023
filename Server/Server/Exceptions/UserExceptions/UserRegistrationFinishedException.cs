using Server.Exceptions.Common;

namespace Server.Exceptions.UserExceptions
{
    public class UserRegistrationFinishedException : BadRequestException
    {
        public UserRegistrationFinishedException(Guid id) : base($"User with ID: {id} has already finished registering")
        {

        }
    }
}
