namespace ProductsOrdersWebApi.Interfaces.ServiceInterfaces.UtilityInterfaces
{
    public interface IImageService
    {
        Task<string> SaveImage(IFormFile imageFile, string name, string rootPath);
        FileStream DownloadImage(string path, string rootPath);
        void DeleteImage(string path);
    }
}
