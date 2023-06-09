using AutoMapper;
using Dapr.Client;
using Microsoft.Extensions.Options;
using ProductsOrdersWebApi.Dto.OrderDTOs;
using ProductsOrdersWebApi.Dto.UserDTOs;
using ProductsOrdersWebApi.Enums;
using ProductsOrdersWebApi.Exceptions.Common;
using ProductsOrdersWebApi.Exceptions.OrderExceptions;
using ProductsOrdersWebApi.Exceptions.OrderItemExceptions;
using ProductsOrdersWebApi.Exceptions.ProductExceptions;
using ProductsOrdersWebApi.Exceptions.UserExceptions;
using ProductsOrdersWebApi.Interfaces.RepositoryInterfaces;
using ProductsOrdersWebApi.Interfaces.ServiceInterfaces;
using ProductsOrdersWebApi.Models;
using ProductsOrdersWebApi.Models.AppSettings;

namespace ProductsOrdersWebApi.Services
{
    public class OrderService : IOrderService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IOptions<AppSettings> _settings;
        private readonly DaprClient _daprClient;
        public OrderService(IUnitOfWork unitOfWork, IMapper mapper, IOptions<AppSettings> settings, DaprClient daprClient) 
        { 
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _settings = settings;
            _daprClient = daprClient;
        }

        public async Task CancelOrder(CancelOrderDTO cancelOrderDTO, Guid tokenId)
        {
            if (tokenId != cancelOrderDTO.BuyerId)
            {
                throw new InvalidBuyerInRequestException(cancelOrderDTO.BuyerId);
            }

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

        public async Task<DisplayOrderDTO> CreateOrder(NewOrderDTO newOrderDTO, Guid tokenId)
        {
            if (tokenId != newOrderDTO.BuyerId)
            {
                throw new InvalidBuyerInRequestException(newOrderDTO.BuyerId);
            }

            newOrderDTO.CancellationWindow = DateTime.Now.AddMinutes(60).ToLocalTime();
            newOrderDTO.TimeOfDelivery = RandomDate();
            newOrderDTO.Status = "PENDING";

            ValidateOrder(newOrderDTO);

            DisplayUserDTO buyer = null;
            try
            {
                buyer = await _daprClient.InvokeMethodAsync<DisplayUserDTO>(HttpMethod.Get, "userswebapi", $"api/users/{newOrderDTO.BuyerId}");
            }
            catch (Exception e)
            {
                throw new DaprBadRequestException(e.Message);
            }

            if (buyer == null)
            {
                throw new UserByIdNotFoundException(newOrderDTO.BuyerId);
            }

            if (!Enum.TryParse(buyer.Role, out UserRole role) && role != UserRole.BUYER)
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

                if (item.Timestamp < product.Timestamp && item.ItemPrice != product.IndividualPrice)
                {
                    throw new OutdatedProductException(product.Name);
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
            List<Order> orders = await _unitOfWork.Orders.GetAllOrders();

            return _mapper.Map<List<DisplayOrderDTO>>(orders);
        }

        public async Task<DetailedOrderDTO> GetDetailedOrder(Guid id)
        {
            Order order = await _unitOfWork.Orders.GetFullOrder(id);
            if (order == null) 
            {
                throw new OrderNotFoundException(id);
            }

            return _mapper.Map<DetailedOrderDTO>(order);
        }

        public async Task<DetailedOrderDTO> GetSellerDetailedOrder(SellerDetailedOrderDTO sellerDetailedOrderDTO)
        {
            Order order = await _unitOfWork.Orders.GetSellerFullOrder(sellerDetailedOrderDTO.OrderId, sellerDetailedOrderDTO.SellerId);
            if (order == null)
            {
                throw new OrderNotFoundException(sellerDetailedOrderDTO.OrderId);
            }

            return _mapper.Map<DetailedOrderDTO>(order);
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
