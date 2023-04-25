namespace Server.Interfaces.ServiceInterfaces.UtilityInterfaces
{
    public interface IImageService
    {
        Task<string> SaveImage(IFormFile imageFile, string name, string path);
    }
}
