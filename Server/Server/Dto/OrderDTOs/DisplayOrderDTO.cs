﻿using Server.Dto.OrderItemDTOs;
using Server.Dto.UserDTOs;
using Server.Enums;
using Server.Models;

namespace Server.Dto.OrderDTOs
{
    public class DisplayOrderDTO
    {
        public Guid Id { get; set; }
        public double Price { get; set; }
        public string Status { get; set; }
        public DateTime CancellationWindow { get; set; }    // 1 Hour from creation
        public DateTime TimeOfDelivery { get; set; }
    }
}
