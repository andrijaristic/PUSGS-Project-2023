using Server.Dto.ProductDTOs;

namespace Server.Interfaces.ServiceInterfaces
{
    public interface IProductService
    {
        Task<DisplayProductDTO> CreateProduct(NewProductDTO newProductDTO);
        Task DeleteProduct(DeleteProductDTO deleteProductDTO);
        Task<DisplayProductDTO> UpdateProduct(UpdateProductDTO updateProductDTO);
        Task<List<DisplayProductDTO>> GetAllProducts();
        Task<List<DisplayProductDTO>> GetSellerProducts(Guid sellerId);
        //Task<List<DisplayProductDTO>> GetSellerProducts(string username);
        Task<DisplayProductDTO> RestockProduct(ProductRestockDTO productRestockDTO);
    }
}
