using AutoMapper;
using Server.Dto.OrderDTOs;
using Server.Models;

namespace Server.Mapping
{
    public class OrderMappingProfile : Profile
    {
        public OrderMappingProfile() 
        {
            CreateMap<Order, NewOrderDTO>().ReverseMap();
            CreateMap<Order, DisplayOrderDTO>().ReverseMap();
        }    
    }
}
