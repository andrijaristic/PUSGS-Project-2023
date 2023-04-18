using AutoMapper;
using Microsoft.AspNetCore.Components.Web;
using Server.Dto.ProductDTOs;
using Server.Dto.UserDTOs;
using Server.Enums;
using Server.Exceptions.ProductExceptions;
using Server.Exceptions.UserExceptions;
using Server.Interfaces.RepositoryInterfaces;
using Server.Interfaces.ServiceInterfaces;
using Server.Models;

namespace Server.Services
{
    public class ProductService : IProductService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        
        public ProductService(IUnitOfWork unitOfWork, IMapper mapper) 
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<DisplayProductDTO> CreateProduct(NewProductDTO newProductDTO)
        {
            ValidateProduct(newProductDTO);

            User seller = await _unitOfWork.Users.Find(newProductDTO.SellerId);
            if (seller == null)
            {
                throw new UserNotFoundException(newProductDTO.SellerId);
            }

            if (seller.Role != UserRole.SELLER)
            {
                throw new InvalidProductSellerTypeException(seller.Id);
            }

            if (!seller.isVerified)
            {
                throw new InvalidSellerVerificationException(seller.Id);
            }

            Product product = _mapper.Map<Product>(newProductDTO);

            await _unitOfWork.Products.Add(product);
            await _unitOfWork.Save();

            return _mapper.Map<DisplayProductDTO>(product);
        }

        private void ValidateProduct(NewProductDTO newProductDTO)
        {
            if (String.IsNullOrWhiteSpace(newProductDTO.Name)) 
            {
                throw new InvalidProductNameException(newProductDTO.Name);
            }

            if (String.IsNullOrWhiteSpace(newProductDTO.Description))
            {
                throw new InvalidProductDescriptionException(newProductDTO.Description);
            }

            if (newProductDTO.Amount < 0)
            {
                throw new InvalidProductAmountException(newProductDTO.Amount);
            }

            if (newProductDTO.IndividualPrice <= 0)
            {
                throw new InvalidProductInvididualPriceException(newProductDTO.IndividualPrice);
            }
        } 
    }
}

