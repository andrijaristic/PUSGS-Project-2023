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
            CreateMap<Product, NewProductDTO>().ReverseMap().AfterMap((newProductDTO, product) => StringTrimmer(product)); ;
            CreateMap<Product, UpdateProductDTO>().ReverseMap().AfterMap((updateProductDTO, product) => StringTrimmer(product)); ;
            CreateMap<NewProductDTO, UpdateProductDTO>().ReverseMap();
        }

        private static void StringTrimmer(Product product)
        {
            product.Name = product.Name.Trim();
            product.Description = product.Description.Trim();
        }
    }
}
