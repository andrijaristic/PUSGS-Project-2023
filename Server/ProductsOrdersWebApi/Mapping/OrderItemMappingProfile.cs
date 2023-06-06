using AutoMapper;
using ProductsOrdersWebApi.Dto.OrderItemDTOs;
using ProductsOrdersWebApi.Models;

namespace ProductsOrdersWebApi.Mapping
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
