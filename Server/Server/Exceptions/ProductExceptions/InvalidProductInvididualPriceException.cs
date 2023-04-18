using Server.Exceptions.Common;

namespace Server.Exceptions.ProductExceptions
{
    public sealed class InvalidProductInvididualPriceException : BadRequestException
    {
        public InvalidProductInvididualPriceException(double individualPrice) : base($"Individual product price ({individualPrice}) cannot be negative or 0")
        {

        }
    }
}
