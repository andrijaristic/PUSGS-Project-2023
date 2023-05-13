using System;

namespace Server.Models
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
        public User Seller { get; set; }
        public bool IsDeleted { get; set; } = false;
        
        public void Update(string description, double individualPrice)
        {
            Description = description;
            IndividualPrice = individualPrice;
        }
    }
}
