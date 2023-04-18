using Server.Exceptions.Common;

namespace Server.Exceptions.UserExceptions
{
    public sealed class InvalidUserVerificationRole : BadRequestException
    {
        public InvalidUserVerificationRole(Guid id) : base($"User with ID: {id} is not a SELLER. Verification failed")
        {

        }
    }
}
