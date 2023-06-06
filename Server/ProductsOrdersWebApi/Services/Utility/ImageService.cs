using Microsoft.AspNetCore.Http.Metadata;
using ProductsOrdersWebApi.Interfaces.ServiceInterfaces.UtilityInterfaces;

namespace ProductsOrdersWebApi.Services.Utility
{
    public class ImageService : IImageService
    {
        public async Task<string> SaveImage(IFormFile imageFile, string name, string path)
        {
            //string imageName = new string(Path.GetFileNameWithoutExtension(imageFile.FileName));
            string currentTime = DateTime.Now.ToLocalTime().ToString().Replace(':', '-');
            string imageName = name + "_" + currentTime + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(path, imageName);

            using (var fileStream = new FileStream(imagePath, FileMode.Create, FileAccess.Write))
            {
                await imageFile.CopyToAsync(fileStream);
            }

            return imagePath;
        }

        public FileStream DownloadImage(string path)
        {
            if (File.Exists(path))
            {
                FileStream stream = new FileStream(path, FileMode.Open, FileAccess.Read);
                return stream;
            }

            return null;
        }

        public void DeleteImage(string path)
        {
            if (File.Exists(path))
            {
                File.Delete(path);
            }
        }
    }
}
