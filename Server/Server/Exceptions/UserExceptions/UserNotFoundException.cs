using Server.Exceptions.Common;

namespace Server.Exceptions.UserExceptions
{
    public sealed class UserNotFoundException : NotFoundException
    {
        public UserNotFoundException(Guid id) : base($"User with ID: {id} was not found")
        {

        }
    }
}
