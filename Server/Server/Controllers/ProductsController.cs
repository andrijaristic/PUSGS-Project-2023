using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Dto.ProductDTOs;
using Server.Interfaces.ServiceInterfaces;

namespace Server.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Get()
        {
            List<DisplayProductDTO> displayProductDTOs = await _productService.GetAllProducts();
            return Ok(displayProductDTOs);
        }

        [HttpGet("seller")]
        [Authorize]
        public async Task<IActionResult> GetSellersProducts()
        {
            Guid userId = Guid.Empty;
            Guid.TryParse(User.Identity.Name, out userId);

            List<DisplayProductDTO> displayProductDTOs = await _productService.GetSellerProducts(userId);
            return Ok(displayProductDTOs);
        }

        [HttpGet("seller/{id}")]
        [Authorize]
        public async Task<IActionResult> Get(Guid id)
        {
            List<DisplayProductDTO> displayProductDTOs = await _productService.GetSellerProducts(id);
            return Ok(displayProductDTOs);
        }

        [HttpPost]
        [Authorize(Roles = "seller")]
        public async Task<IActionResult> Post([FromBody]NewProductDTO newProductDTO)
        {
            Guid userId = Guid.Empty;
            Guid.TryParse(User.Identity.Name, out userId);
            newProductDTO.UserId = userId;

            DisplayProductDTO displayProductDTO = await _productService.CreateProduct(newProductDTO);
            return CreatedAtAction(nameof(Get), new { id = displayProductDTO.Id}, displayProductDTO);
        }

        [HttpPut]
        [Authorize(Roles = "seller")]
        public async Task<IActionResult> Put([FromBody]UpdateProductDTO updateProductDTO)
        {
            Guid userId = Guid.Empty;
            Guid.TryParse(User.Identity.Name, out userId);
            updateProductDTO.SellerId = userId;

            DisplayProductDTO displayProductDTO = await _productService.UpdateProduct(updateProductDTO);
            return Ok(displayProductDTO);
        }

        [HttpPut("restock")]
        [Authorize(Roles = "seller")]
        public async Task<IActionResult> ProductRestock(ProductRestockDTO productRestockDTO)
        {
            Guid userId = Guid.Empty;
            Guid.TryParse(User.Identity.Name, out userId);
            productRestockDTO.UserId = userId;

            DisplayProductDTO displayProductDTO = await _productService.RestockProduct(productRestockDTO);
            return Ok(displayProductDTO);
        }

        [HttpDelete]
        [Authorize(Roles = "seller")]
        public async Task<IActionResult> Delete(DeleteProductDTO deleteProductDTO)
        {
            await _productService.DeleteProduct(deleteProductDTO);
            return Ok();
        }
    }
}
