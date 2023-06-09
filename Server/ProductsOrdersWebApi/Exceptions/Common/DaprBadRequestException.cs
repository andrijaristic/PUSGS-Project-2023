namespace ProductsOrdersWebApi.Exceptions.Common
{
    public class DaprBadRequestException : BadRequestException
    {
        public DaprBadRequestException(string message) : base(message) { }
    }
}
