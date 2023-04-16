namespace Server.Exceptions.Common
{
    public abstract class BadRequestException : Exception
    {
        protected BadRequestException(string message) : base(message)
        {
        
        }
    }
}
