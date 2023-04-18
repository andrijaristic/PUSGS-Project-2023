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

        [HttpPost]
        [Authorize(Roles = "seller")]
        public async Task<IActionResult> Post([FromBody]NewProductDTO newProductDTO)
        {
            DisplayProductDTO displayProductDTO = await _productService.CreateProduct(newProductDTO);
            return Ok(displayProductDTO);
        }

        [HttpDelete("")]
        [Authorize(Roles = "seller")]
        public async Task<IActionResult> Delete(DeleteProductDTO deleteProductDTO)
        {
            await _productService.DeleteProduct(deleteProductDTO);
            return Ok();
        }
    }
}
