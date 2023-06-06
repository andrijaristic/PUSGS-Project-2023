using System;

namespace ProductsOrdersWebApi.Models
{
    public class Product
    {
        public Guid Id { get; set; }    
        public string Name { get; set; }
        public int Amount { get; set; }
        public double IndividualPrice { get; set; }
        public string Description { get; set; }
        public string ImageURL { get; set; }
        public Guid SellerId { get; set; }
        public DateTime Timestamp { get; set; }
        public bool IsDeleted { get; set; } = false;
        
        public void Update(string description, double individualPrice)
        {
            Description = description;
            IndividualPrice = individualPrice;
            Timestamp = DateTime.Now.ToLocalTime();
        }
    }
}
