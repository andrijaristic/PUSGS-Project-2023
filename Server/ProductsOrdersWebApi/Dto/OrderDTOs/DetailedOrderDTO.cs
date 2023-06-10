﻿using ProductsOrdersWebApi.Dto.OrderItemDTOs;
using ProductsOrdersWebApi.Dto.UserDTOs;

namespace ProductsOrdersWebApi.Dto.OrderDTOs
{
    public class DetailedOrderDTO
    {
        public Guid Id { get; set; }
        public List<DisplayOrderItemDTO> Products { get; set; }
        public string Comment { get; set; }
        public string DeliveryAddress { get; set; }
        public double Price { get; set; }
        public double DeliveryFee { get; set; } 
        public string Status { get; set; }
        public DateTime CancellationWindow { get; set; }    // 1 Hour from creation
        public DateTime TimeOfDelivery { get; set; }
        public Guid BuyerId { get; set; }
    }
}
