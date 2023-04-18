using Server.Exceptions.Common;

namespace Server.Exceptions.UserExceptions
{
    public sealed class UserByIdNotFoundException : NotFoundException
    {
        public UserByIdNotFoundException(Guid id) : base($"User with ID: {id} was not found")
        { 
        
        }
    }
}
