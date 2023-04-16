using AutoMapper;
using Server.Dto.UserDTOs;
using Server.Models;

namespace Server.Mapping
{
    public class UserMappingProfile : Profile
    {
        public UserMappingProfile() 
        {
            CreateMap<User, AuthDTO>().ReverseMap();
            CreateMap<User, LoginDTO>().ReverseMap();
            CreateMap<User, NewUserDTO>().ReverseMap();
            CreateMap<User, DisplayUserDTO>().ReverseMap();
            CreateMap<User, UpdateUserDTO>().ReverseMap();
            CreateMap<NewUserDTO, UpdateUserDTO>().ReverseMap();
        }
    }
}
