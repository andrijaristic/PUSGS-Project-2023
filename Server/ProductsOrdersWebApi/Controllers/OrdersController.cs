using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProductsOrdersWebApi.Dto.OrderDTOs;
using ProductsOrdersWebApi.Interfaces.ServiceInterfaces;
using ProductsOrdersWebApi.Interfaces.ServiceInterfaces.UtilityInterfaces;

namespace ProductsOrdersWebApi.Controllers
{
    [ApiController]
    [Route("api/orders")]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly IAuthHelperService _authHelperService;
        public OrdersController(IOrderService orderService, IAuthHelperService authHelperService)
        {
            _orderService = orderService;
            _authHelperService = authHelperService;
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> Get()
        {
            List<DisplayOrderDTO> displayOrderDTOs = await _orderService.GetOrders();
            return Ok(displayOrderDTOs);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "admin, buyer")]
        public async Task<IActionResult> GetDetailedOrder(Guid id)
        {
            DetailedOrderDTO detailedOrderDTO = await _orderService.GetDetailedOrder(id);
            return Ok(detailedOrderDTO);    
        }

        [HttpGet("seller-orders/{id}")]
        [Authorize(Roles = "seller")]
        public async Task<IActionResult> GetSellerDetailedOrder(Guid id)
        {
            SellerDetailedOrderDTO sellerDetailedOrderDTO = new SellerDetailedOrderDTO()
            {
                OrderId = id,
                SellerId = _authHelperService.GetUserIdFromToken(User)
            };

            DetailedOrderDTO detailedOrderDTO = await _orderService.GetSellerDetailedOrder(sellerDetailedOrderDTO);
            return Ok(detailedOrderDTO);
        }

        [HttpGet("buyer-orders")]
        [Authorize(Roles = "buyer")]
        public async Task<IActionResult> GetBuyerOrders()
        {
            Guid buyerId = _authHelperService.GetUserIdFromToken(User);

            List<DisplayOrderDTO> displayOrderDTOs = await _orderService.GetBuyerOrders(buyerId);
            return Ok(displayOrderDTOs);
        }

        [HttpGet("buyer-orders/new")]
        [Authorize(Roles = "buyer")]
        public async Task<IActionResult> GetNewBuyerOrders()
        {
            Guid buyerId = _authHelperService.GetUserIdFromToken(User);

            List<DisplayOrderDTO> displayOrderDTOs = await _orderService.GetNewBuyerOrders(buyerId);
            return Ok(displayOrderDTOs);
        }

        [HttpGet("seller-orders")]
        [Authorize(Roles = "seller")]
        public async Task<IActionResult> GetSellerOrders()
        {
            Guid sellerId = _authHelperService.GetUserIdFromToken(User);

            List<DisplayOrderDTO> displayOrderDTOs = await _orderService.GetSellerOrders(sellerId);
            return Ok(displayOrderDTOs);
        }

        [HttpGet("seller-orders/new")]
        [Authorize(Roles = "seller")]
        public async Task<IActionResult> GetNewSellerOrders()
        {
            Guid sellerId = _authHelperService.GetUserIdFromToken(User);

            List<DisplayOrderDTO> displayOrderDTOs = await _orderService.GetNewSellerOrders(sellerId);
            return Ok(displayOrderDTOs);
        }

        [HttpPost]
        [Authorize(Roles = "buyer")]
        public async Task<IActionResult> Post([FromBody]NewOrderDTO newOrderDTO)
        {
            DisplayOrderDTO displayOrderDTO = await _orderService.CreateOrder(newOrderDTO, _authHelperService.GetUserIdFromToken(User));
            return CreatedAtAction(nameof(Get), new { Id = displayOrderDTO.Id }, displayOrderDTO);
        }

        [HttpPut("cancel-order")]
        [Authorize(Roles = "buyer")]
        public async Task<IActionResult> Put([FromBody]CancelOrderDTO cancelOrderDTO)
        {
            await _orderService.CancelOrder(cancelOrderDTO, _authHelperService.GetUserIdFromToken(User));
            return Ok();
        }
    }
}
