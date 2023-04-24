using Microsoft.Extensions.Options;
using Server.Interfaces.ServiceInterfaces.UtilityInterfaces;
using Server.Models.AppSettings;
using System.Net;
using System.Net.Mail;

namespace Server.Services.Utility
{
    public class MailingService : IMailingService
    {
        private readonly IOptions<AppSettings> _settings;
        public MailingService(IOptions<AppSettings> settings)
        {
            _settings = settings;
        }

        public Task SendEmail(string email, string subject, string body)
        {
            var smtpClient = new SmtpClient(_settings.Value.StmpHost, _settings.Value.StmpPort)
            {
                EnableSsl = true,
                Credentials = new NetworkCredential(_settings.Value.StmpEmailUsername, _settings.Value.StmpEmailPassword)
            };

            return smtpClient.SendMailAsync(new MailMessage(from: _settings.Value.StmpEmailUsername,
                                                            to: email,
                                                            subject: subject,
                                                            body: body));
        }
    }
}
