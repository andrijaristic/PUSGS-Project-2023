using AutoMapper;
using Microsoft.Extensions.Options;
using Server.Dto.OrderDTOs;
using Server.Dto.UserDTOs;
using Server.Enums;
using Server.Exceptions.OrderExceptions;
using Server.Exceptions.OrderItemExceptions;
using Server.Exceptions.ProductExceptions;
using Server.Exceptions.UserExceptions;
using Server.Interfaces.RepositoryInterfaces;
using Server.Interfaces.ServiceInterfaces;
using Server.Models;
using Server.Models.AppSettings;

namespace Server.Services
{
    public class OrderService : IOrderService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IOptions<AppSettings> _settings;
        public OrderService(IUnitOfWork unitOfWork, IMapper mapper, IOptions<AppSettings> settings) 
        { 
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _settings = settings;
        }

        public async Task CancelOrder(CancelOrderDTO cancelOrderDTO)
        {
            Order order = await _unitOfWork.Orders.GetFullOrder(cancelOrderDTO.OrderId);
            if (order == null)
            {
                throw new OrderNotFoundException(cancelOrderDTO.OrderId);
            }

            if (order.BuyerId != cancelOrderDTO.BuyerId)
            {
                throw new InvalidOrderBuyerInRequestException(cancelOrderDTO.OrderId, cancelOrderDTO.BuyerId);
            }

            if (order.CancellationWindow <= DateTime.Now.ToLocalTime())
            {
                throw new OrderCancellationWindowExpiredException(order.CancellationWindow.ToLongDateString());
            }

            if (order.Status != OrderStatus.PENDING)
            {
                throw new InvalidOrderStatusForCancelException(order.Status.ToString());
            }

            order.Status = OrderStatus.CANCELED;
            
            foreach (var item in order.Products)
            {
                Product product = await _unitOfWork.Products.Find(item.ProductId);
                if (product == null) 
                {
                    throw new ProductNotFoundException(item.ProductId);
                }

                product.Amount += item.Amount;
            }

            await _unitOfWork.Save();
        }

        public async Task<DisplayOrderDTO> CreateOrder(NewOrderDTO newOrderDTO)
        {
            newOrderDTO.CancellationWindow = DateTime.Now.AddMinutes(60).ToLocalTime();
            newOrderDTO.TimeOfDelivery = RandomDate();
            newOrderDTO.Status = "PENDING";

            ValidateOrder(newOrderDTO);

            User user = await _unitOfWork.Users.Find(newOrderDTO.BuyerId);
            if (user == null)
            {
                throw new UserByIdNotFoundException(newOrderDTO.BuyerId);
            }

            if (user.Role != UserRole.BUYER)
            {
                throw new InvalidOrderUserInRequestException(newOrderDTO.BuyerId);
            }

            newOrderDTO.Price = 0;
            foreach (var item in newOrderDTO.Products)
            {
                Product product = await _unitOfWork.Products.Find(item.ProductId);
                if (product == null)
                {
                    throw new ProductNotFoundException(item.Id);
                }

                if (product.Amount < item.Amount)
                {
                    throw new InvalidOrderItemProductAmount(product.Name, product.Amount, item.Amount);
                }

                product.Amount -= item.Amount;
                item.ItemPrice = product.IndividualPrice * item.Amount;
                newOrderDTO.Price += item.ItemPrice;
            }

            if (newOrderDTO.Price <= 0)
            {
                throw new InvalidOrderPriceAmountException(newOrderDTO.Price);
            }

            newOrderDTO.Price += _settings.Value.DeliveryFee;
            
            Order order = _mapper.Map<Order>(newOrderDTO);
            await _unitOfWork.Orders.Add(order);
            await _unitOfWork.Save();

            return _mapper.Map<DisplayOrderDTO>(order);
        }

        public async Task<List<DisplayOrderDTO>> GetBuyerOrders(Guid buyerId)
        {
            List<Order> orders = await _unitOfWork.Orders.GetBuyerOrders(buyerId);

            return _mapper.Map<List<DisplayOrderDTO>>(orders);
        }

        public async Task<List<DisplayOrderDTO>> GetSellerOrders(Guid sellerId)
        {
            List<Order> orders = await _unitOfWork.Orders.GetSellerOrders(sellerId);

            return _mapper.Map<List<DisplayOrderDTO>>(orders);
        }

        public async Task<List<DisplayOrderDTO>> GetNewBuyerOrders(Guid buyerId)
        {
            List<Order> orders = await _unitOfWork.Orders.GetBuyerOrders(buyerId, true);

            return _mapper.Map<List<DisplayOrderDTO>>(orders);
        }

        public async Task<List<DisplayOrderDTO>> GetNewSellerOrders(Guid sellerId)
        {
            List<Order> orders = await _unitOfWork.Orders.GetSellerOrders(sellerId, true);

            return _mapper.Map<List<DisplayOrderDTO>>(orders);
        }

        public async Task<List<DisplayOrderDTO>> GetOrders()
        {
            List<Order> orders = await _unitOfWork.Orders.GetAllOrdersFull();

            return _mapper.Map<List<DisplayOrderDTO>>(orders);
        }

        private static DateTime RandomDate()
        {
            Random gen = new Random();
            int deliveryHoursWindow = 7 * 24 * 3; // 3 weeks into future

            int randomHoursIntoFuture = gen.Next(deliveryHoursWindow);
            return DateTime.Now.AddHours(randomHoursIntoFuture).ToLocalTime();
        }

        public static void ValidateOrder(NewOrderDTO newOrderDTO)
        {
            if (newOrderDTO.Products.Count == 0) 
            {
                throw new InvalidOrderProductsListException();
            }

            if (String.IsNullOrWhiteSpace(newOrderDTO.Comment))
            {
                throw new InvalidOrderCommentException(newOrderDTO.Comment);
            }

            if (String.IsNullOrWhiteSpace(newOrderDTO.DeliveryAddress))
            {
                throw new InvalidOrderDeliveryAddressException(newOrderDTO.DeliveryAddress);
            }

            if (newOrderDTO.Price <= 0)
            {
                throw new InvalidOrderPriceAmountException(newOrderDTO.Price);
            }

            //if (newOrderDTO.CancellationWindow.ToLocalTime() < DateTime.Now.AddMinutes(60).ToLocalTime())
            //{
            //    throw new InvalidOrderCancellationWindowException(newOrderDTO.CancellationWindow.ToLongDateString());
            //}

            if (newOrderDTO.TimeOfDelivery.ToLocalTime() <= DateTime.Now.AddMinutes(60).ToLocalTime())
            {
                throw new InvalidOrderTimeOfDeliveryException(newOrderDTO.TimeOfDelivery.ToLongDateString());
            }

            bool enumParseResult = Enum.TryParse(newOrderDTO.Status.ToUpper(), out OrderStatus orderStatus);
            if (!enumParseResult)
            {
                throw new InvalidOrderStatusException(newOrderDTO.Status.ToUpper());
            }

            if (orderStatus == OrderStatus.DELIVERED)
            {
                throw new InvalidOrderDeliveryStatusException();
            }
        }
    }
}
