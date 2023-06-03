using Server.Exceptions.Common;

namespace Server.Exceptions.ProductExceptions
{
    public class OutdatedProductException : BadRequestException
    {
        public OutdatedProductException(string name) : base($"Product {name} in order is outdated")
        {

        }
    }
}
