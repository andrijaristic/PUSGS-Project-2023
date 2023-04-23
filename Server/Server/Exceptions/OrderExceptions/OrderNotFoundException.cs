using Server.Exceptions.Common;

namespace Server.Exceptions.OrderExceptions
{
    public class OrderNotFoundException : NotFoundException
    {
        public OrderNotFoundException(Guid id) : base($"Order with ID: {id} was not found")
        {

        }
    }
}
