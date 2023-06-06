using UsersWebApi.Exceptions.Common;

namespace UsersWebApi.Exceptions.UserExceptions
{
    public sealed class UserByIdNotFoundException : NotFoundException
    {
        public UserByIdNotFoundException(Guid id) : base($"User with ID: {id} was not found")
        { 
        
        }
    }
}
