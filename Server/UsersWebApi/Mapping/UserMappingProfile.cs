using AutoMapper;
using UsersWebApi.Dto.UserDTOs;
using UsersWebApi.Models;

namespace UsersWebApi.Mapping
{
    public class UserMappingProfile : Profile
    {
        public UserMappingProfile() 
        {
            CreateMap<User, AuthDTO>().ReverseMap().AfterMap((authDTO, user) => StringTrimmer(user));
            CreateMap<User, LoginDTO>().ReverseMap().AfterMap((authDTO, user) => StringTrimmer(user));
            CreateMap<User, NewUserDTO>().ReverseMap().AfterMap((authDTO, user) => StringTrimmer(user));
            CreateMap<User, DisplayUserDTO>().ReverseMap().AfterMap((authDTO, user) => StringTrimmer(user));
            CreateMap<User, UpdateUserDTO>().ReverseMap().AfterMap((authDTO, user) => StringTrimmer(user));
            CreateMap<User, FinishRegistrationDTO>().ReverseMap();
            CreateMap<NewUserDTO, UpdateUserDTO>().ReverseMap();
        }

        private static void StringTrimmer(User user)
        {
            user.Username = user.Username.Trim();
            user.Name = user.Name.Trim();
            user.Email = user.Email.Trim();
            user.Address = user.Address.Trim();
        }
    }
}
