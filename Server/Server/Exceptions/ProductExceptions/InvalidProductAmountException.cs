using Server.Exceptions.Common;

namespace Server.Exceptions.ProductExceptions
{
    public sealed class InvalidProductAmountException : BadRequestException
    {
        public InvalidProductAmountException(int amount) : base($"Product amount ({amount}) cannot be negative")
        {

        }
    }
}
