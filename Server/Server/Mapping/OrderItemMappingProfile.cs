using AutoMapper;
using Server.Dto.OrderItemDTOs;
using Server.Models;

namespace Server.Mapping
{
    public class OrderItemMappingProfile : Profile
    {
        public OrderItemMappingProfile() 
        {
            CreateMap<OrderItem, NewOrderItemDTO>().ReverseMap();
            CreateMap<OrderItem, DisplayOrderItemDTO>().ReverseMap();
        }
    }
}
