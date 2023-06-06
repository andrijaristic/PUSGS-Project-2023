using UsersWebApi.Exceptions.Common;

namespace UsersWebApi.Exceptions.UserExceptions
{
    public sealed class UserAlreadyVerifiedException : BadRequestException
    {
        public UserAlreadyVerifiedException(Guid id) : base($"User with ID: {id} is already verified")
        {

        }
    }
}
