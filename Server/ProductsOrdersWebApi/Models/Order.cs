using ProductsOrdersWebApi.Enums;
using System;
using System.Collections.Generic;

namespace ProductsOrdersWebApi.Models
{
    public class Order
    {
        public Guid Id { get; set; }
        public List<OrderItem> Products { get; set; } = new List<OrderItem>();
        public string Comment { get; set; }
        public string DeliveryAddress { get; set; }
        public double Price { get; set; }
        public double DeliveryFee { get; set; }
        public OrderStatus Status { get; set; }
        public DateTime CancellationWindow { get; set; }    // 1 Hour from creation
        public DateTime TimeOfDelivery { get; set; }
        public Guid BuyerId { get; set; }
    }
}
