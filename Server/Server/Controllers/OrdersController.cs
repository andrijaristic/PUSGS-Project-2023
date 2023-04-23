using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Dto.OrderDTOs;
using Server.Interfaces.ServiceInterfaces;
using Server.Interfaces.ServiceInterfaces.UtilityInterfaces;

namespace Server.Controllers
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

        [HttpGet("buyer-orders")]
        [Authorize(Roles = "buyer")]
        public async Task<IActionResult> Get()
        {
            Guid buyerId = _authHelperService.GetUserIdFromToken(User);
            List<DisplayOrderDTO> displayOrderDTOs = await _orderService.GetBuyerOrders(buyerId);
            return Ok(displayOrderDTOs);
        }

        [HttpPost]
        [Authorize(Roles = "buyer")]
        public async Task<IActionResult> Post([FromBody]NewOrderDTO newOrderDTO)
        {
            newOrderDTO.BuyerId = _authHelperService.GetUserIdFromToken(User);

            DisplayOrderDTO displayOrderDTO = await _orderService.CreateOrder(newOrderDTO);
            return CreatedAtAction(nameof(Get), new { Id = displayOrderDTO.Id }, displayOrderDTO);
        }

        [HttpPut("cancel-order")]
        [Authorize(Roles = "buyer")]
        public async Task<IActionResult> Put(CancelOrderDTO cancelOrderDTO)
        {
            cancelOrderDTO.BuyerId = _authHelperService.GetUserIdFromToken(User);
            await _orderService.CancelOrder(cancelOrderDTO);
            return Ok();
        }
    }
}
