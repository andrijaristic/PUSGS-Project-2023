using UsersWebApi.Exceptions.Common;

namespace UsersWebApi.Exceptions.UserExceptions
{
    public sealed class UserNotFoundException : NotFoundException
    {
        public UserNotFoundException() : base($"User with provided information was not found")
        {

        }
    }
}
