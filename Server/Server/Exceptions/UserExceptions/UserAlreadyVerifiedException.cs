using Server.Exceptions.Common;

namespace Server.Exceptions.UserExceptions
{
    public sealed class UserAlreadyVerifiedException : BadRequestException
    {
        public UserAlreadyVerifiedException(Guid id) : base($"User with ID: {id} is already verified")
        {

        }
    }
}
