namespace UsersWebApi.Interfaces.ServiceInterfaces.UtilityInterfaces
{
    public interface IMailingService
    {
        Task SendEmail(string email, string subject, string body);
    }
}
