﻿using AutoMapper;
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

namespace Server.Services
{
    public class OrderService : IOrderService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public OrderService(IUnitOfWork unitOfWork, IMapper mapper) 
        { 
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }   

        public async Task<DisplayOrderDTO> CreateOrder(NewOrderDTO newOrderDTO)
        {
            newOrderDTO.CancellationWindow = DateTime.Now.AddHours(1).AddMinutes(1);
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

            double priceSum = 0;
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
                priceSum += item.ItemPrice;
            }

            newOrderDTO.Price = priceSum;
            if (newOrderDTO.Price <= 0)
            {
                throw new InvalidOrderPriceAmountException(newOrderDTO.Price);
            }
            
            Order order = _mapper.Map<Order>(newOrderDTO);
            await _unitOfWork.Orders.Add(order);
            await _unitOfWork.Save();

            return _mapper.Map<DisplayOrderDTO>(order);
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

            if (newOrderDTO.CancellationWindow.ToLocalTime() < DateTime.Now.AddHours(1).ToLocalTime())
            {
                throw new InvalidOrderCancellationWindowException(newOrderDTO.CancellationWindow.ToLongDateString());
            }

            if (newOrderDTO.TimeOfDelivery.ToLocalTime() <= DateTime.Now.AddHours(1).ToLocalTime())
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