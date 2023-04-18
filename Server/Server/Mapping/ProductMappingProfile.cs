using AutoMapper;
using Server.Dto.ProductDTOs;
using Server.Models;

namespace Server.Mapping
{
    public class ProductMappingProfile : Profile
    {
        public ProductMappingProfile() 
        {
            CreateMap<Product, DisplayProductDTO>().ReverseMap();
            CreateMap<Product, NewProductDTO>().ReverseMap();
        }
    }
}
