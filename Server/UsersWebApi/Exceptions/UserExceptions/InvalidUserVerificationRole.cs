using UsersWebApi.Exceptions.Common;

namespace UsersWebApi.Exceptions.UserExceptions
{
    public sealed class InvalidUserVerificationRole : BadRequestException
    {
        public InvalidUserVerificationRole(Guid id) : base($"User with ID: {id} is not a SELLER. Verification failed")
        {

        }
    }
}
