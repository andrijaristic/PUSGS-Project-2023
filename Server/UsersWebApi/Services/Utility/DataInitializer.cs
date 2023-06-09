using Microsoft.Extensions.Options;
using UsersWebApi.Interfaces.RepositoryInterfaces;
using UsersWebApi.Interfaces.ServiceInterfaces.UtilityInterfaces;
using UsersWebApi.Models;
using UsersWebApi.Models.AppSettings;

namespace UsersWebApi.Services.Utility
{
    public class DataInitializer : IDataInitializer
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IOptions<AppSettings> _settings;

        public DataInitializer(IUnitOfWork unitOfWork, IOptions<AppSettings> settings)
        {
            _unitOfWork = unitOfWork;
            _settings = settings;
        }

        public void InitializeData()
        {
            Task<User> task = _unitOfWork.Users.FindByUsername("admin");
            task.Wait();

            User user = task.Result;
            if (user != null)
            {
                return;
            }

            User newUser = new User()
            {
                Name = "Andrija Ristic",
                Username = "admin",
                Password = BCrypt.Net.BCrypt.HashPassword("admin", BCrypt.Net.BCrypt.GenerateSalt()),
                Role = Enums.UserRole.ADMIN,
                Email = "andra.rs@outlook.com",
                Address = _settings.Value.DefaultAddress,
                DateOfBirth = DateTime.Parse(_settings.Value.DefaultDateOfBirth),
                VerificationStatus = Enums.VerificationStatus.EXEMPT,
                FinishedRegistration = true,
                ImageURL = _settings.Value.DefaultUserImagePath
            };

            _unitOfWork.Users.Add(newUser).Wait();
            _unitOfWork.Save().Wait();
        }
    }
}
