namespace Server.Models.AppSettings
{
    public class AppSettings
    {
        public string SecretKey { get; set; }
        public string GoogleClientId { get; set; }
        public string StmpHost { get; set; }
        public int StmpPort { get; set; }
        public string StmpEmailUsername { get; set; }
        public string StmpEmailPassword { get; set; }
        public string DefaultAddress { get; set; }
        public string DefaultPassword { get; set; }
        public string DefaultUserImagePath { get; set; }
        public string DefaultProductImagePath { get; set; }
        public string DefaultDateOfBirth { get; set; }
        public int DeliveryFee { get; set; }
    }
}
