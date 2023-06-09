using ProductsOrdersWebApi.Exceptions.Common;

namespace ProductsOrdersWebApi.Exceptions.UserExceptions
{
    public sealed class UserByIdNotFoundException : NotFoundException
    {
        public UserByIdNotFoundException(Guid id) : base($"User with ID: {id} was not found")
        { 
        
        }
    }
}
