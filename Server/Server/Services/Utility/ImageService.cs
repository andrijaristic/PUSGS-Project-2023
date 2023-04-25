using Server.Interfaces.ServiceInterfaces.UtilityInterfaces;

namespace Server.Services.Utility
{
    public class ImageService : IImageService
    {
        public async Task<string> SaveImage(IFormFile imageFile, string name, string path)
        {
            //string imageName = new string(Path.GetFileNameWithoutExtension(imageFile.FileName));
            string imageName = $"{name}_{DateTime.Now.ToLocalTime()}{Path.GetExtension(imageFile.FileName)}";
            var imagePath = @$"Images/{path}/{imageName}";

            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }

            return imagePath;
        }

        public FileStream DownloadImage(string path)
        {
            if (File.Exists(path))
            {
                FileStream stream = new FileStream(path, FileMode.Open);
                return stream;
            }

            return null;
        }
    }
}
