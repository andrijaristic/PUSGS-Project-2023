using AutoMapper;
using ProductsOrdersWebApi.Dto.OrderDTOs;
using ProductsOrdersWebApi.Models;

namespace ProductsOrdersWebApi.Mapping
{
    public class OrderMappingProfile : Profile
    {
        public OrderMappingProfile() 
        {
            CreateMap<Order, NewOrderDTO>().ReverseMap();
            CreateMap<Order, DisplayOrderDTO>().ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                                               .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price))
                                               .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))
                                               .ForMember(dest => dest.TimeOfDelivery, opt => opt.MapFrom(src => src.TimeOfDelivery))
                                               .ForMember(dest => dest.CancellationWindow, opt => opt.MapFrom(src => src.CancellationWindow))
                                               .ReverseMap();

            CreateMap<Order, DetailedOrderDTO>().ReverseMap(); 
        }    
    }
}
