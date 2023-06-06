using ProductsOrdersWebApi.Exceptions.Common;

namespace ProductsOrdersWebApi.Exceptions.OrderExceptions
{
    public class InvalidOrderStatusForCancelException : BadRequestException
    {
        public InvalidOrderStatusForCancelException(string status) : base($"Order has status of {status.ToUpper()} which cannot be cancelled")
        {

        }
    }
}
