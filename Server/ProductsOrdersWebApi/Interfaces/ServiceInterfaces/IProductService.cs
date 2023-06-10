using ProductsOrdersWebApi.Dto.ProductDTOs;

namespace ProductsOrdersWebApi.Interfaces.ServiceInterfaces
{
    public interface IProductService
    {
        Task<DisplayProductDTO> CreateProduct(NewProductDTO newProductDTO, Guid tokenId);
        Task DeleteProduct(DeleteProductDTO deleteProductDTO);
        Task<DisplayProductDTO> UpdateProduct(UpdateProductDTO updateProductDTO, Guid tokenId);
        Task<DisplayProductDTO> RestockProduct(ProductRestockDTO productRestockDTO, Guid tokenId);
        Task<List<DisplayProductDTO>> GetAllProducts();
        Task<List<DisplayProductDTO>> GetSellerProducts(Guid sellerId);
        Task<ProductImageDTO> GetProductImage(Guid id);
        Task<DisplayProductDTO> GetProductById(Guid id);
    }
}
