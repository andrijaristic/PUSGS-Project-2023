using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Dto.ProductDTOs;
using Server.Interfaces.ServiceInterfaces;
using Server.Interfaces.ServiceInterfaces.UtilityInterfaces;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/products")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly IAuthHelperService _authHelperService;

        public ProductsController(IProductService productService, IAuthHelperService authHelperService)
        {
            _productService = productService;
            _authHelperService = authHelperService;
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
            Guid userId = _authHelperService.GetUserIdFromToken(User);

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
            newProductDTO.SellerId = _authHelperService.GetUserIdFromToken(User);

            DisplayProductDTO displayProductDTO = await _productService.CreateProduct(newProductDTO);
            return CreatedAtAction(nameof(Get), new { id = displayProductDTO.Id}, displayProductDTO);
        }

        [HttpPut]
        [Authorize(Roles = "seller")]
        public async Task<IActionResult> Put([FromBody]UpdateProductDTO updateProductDTO)
        {
            updateProductDTO.SellerId = _authHelperService.GetUserIdFromToken(User);

            DisplayProductDTO displayProductDTO = await _productService.UpdateProduct(updateProductDTO);
            return Ok(displayProductDTO);
        }

        [HttpPut("restock")]
        [Authorize(Roles = "seller")]
        public async Task<IActionResult> ProductRestock(ProductRestockDTO productRestockDTO)
        {
            productRestockDTO.UserId = _authHelperService.GetUserIdFromToken(User);

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
