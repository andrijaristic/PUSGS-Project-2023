using Microsoft.AspNetCore.Http.Metadata;
using ProductsOrdersWebApi.Interfaces.ServiceInterfaces.UtilityInterfaces;

namespace ProductsOrdersWebApi.Services.Utility
{
    public class ImageService : IImageService
    {
        public async Task<string> SaveImage(IFormFile imageFile, string name, string rootPath)
        {
            string imageName = new string(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + name + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(rootPath, "Images", imageName);

            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }

            return imageName;
        }

        public FileStream DownloadImage(string imagePath, string rootPath)
        {
            //var imagePath = Path.Combine(rootPath, "Images", path);
            if (File.Exists(imagePath))
            {
                FileStream stream = new FileStream(imagePath, FileMode.Open, FileAccess.Read);
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
