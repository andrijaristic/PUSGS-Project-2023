namespace ProductsOrdersWebApi.Models.AppSettings
{
    public class AppSettings
    {
        public string SecretKey { get; set; }
        public string DefaultAddress { get; set; }
        public string DefaultPassword { get; set; }
        public string DefaultProductImagePath { get; set; }
        public string DefaultDateOfBirth { get; set; }
        public int DeliveryFee { get; set; }
    }
}
