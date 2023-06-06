namespace ProductsOrdersWebApi.Interfaces.ServiceInterfaces.UtilityInterfaces
{
    public interface IImageService
    {
        Task<string> SaveImage(IFormFile imageFile, string name, string path);
        FileStream DownloadImage(string path);
        void DeleteImage(string path);
    }
}
