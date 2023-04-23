using Server.Dto.OrderDTOs;

namespace Server.Interfaces.ServiceInterfaces
{
    public interface IOrderService
    {
        Task<DisplayOrderDTO> CreateOrder(NewOrderDTO newOrderDTO);
        Task CancelOrder(CancelOrderDTO cancelOrderDTO);
    }
}
