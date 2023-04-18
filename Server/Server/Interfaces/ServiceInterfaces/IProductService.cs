using Server.Dto.ProductDTOs;

namespace Server.Interfaces.ServiceInterfaces
{
    public interface IProductService
    {
        Task<DisplayProductDTO> CreateProduct(NewProductDTO newProductDTO);
        Task DeleteProduct(DeleteProductDTO deleteProductDTO);
        Task<DisplayProductDTO> UpdateProduct(UpdateProductDTO updateProductDTO);
    }
}
