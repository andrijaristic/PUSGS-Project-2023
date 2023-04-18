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
            DisplayProductDTO displayProductDTO = await _productService.CreateProduct(newProductDTO);
            return CreatedAtAction(nameof(Get), new { id = displayProductDTO.Id}, displayProductDTO);
        }

        [HttpPut]
        [Authorize(Roles = "seller")]
        public async Task<IActionResult> Put([FromBody]UpdateProductDTO updateProductDTO)
        {
            DisplayProductDTO displayProductDTO = await _productService.UpdateProduct(updateProductDTO);
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
