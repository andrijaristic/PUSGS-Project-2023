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
using System.ComponentModel;
using System.Runtime.InteropServices;

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

        public async Task<List<DisplayProductDTO>> GetAllProducts()
        {
            List<Product> products = await _unitOfWork.Products.GetAll();
            
            return _mapper.Map<List<DisplayProductDTO>>(products);
        }

        public async Task<List<DisplayProductDTO>> GetSellerProducts(Guid sellerId)
        {
            User user = await _unitOfWork.Users.Find(sellerId);
            if (user == null)
            {
                throw new UserByIdNotFoundException(sellerId);
            }

            if (user.Role != UserRole.SELLER)
            {
                throw new InvalidProductSellerTypeException(user.Id);
            }

            List<Product> products = await _unitOfWork.Products.GetProductsForSeller(sellerId);
            if (products == null)
            {
                throw new SellerProductsNotFoundException(sellerId);
            }

            return _mapper.Map<List<DisplayProductDTO>>(products);
        }

        //public async Task<List<DisplayProductDTO>> GetSellerProducts(string username)
        //{
        //    Guid sellerId = await _unitOfWork.Users.FindUserIdByUsername(username);
        //    if (sellerId == Guid.Empty)
        //    {
        //        throw new UserNotFoundException();
        //    }

        //    List<Product> products = await _unitOfWork.Products.GetProductsForSeller(sellerId);
        //    if (products == null)
        //    {
        //        throw new SellerProductsNotFoundException(sellerId);
        //    }

        //    return _mapper.Map<List<DisplayProductDTO>>(products);
        //}

        public async Task<DisplayProductDTO> CreateProduct(NewProductDTO newProductDTO)
        {
            ValidateProduct(newProductDTO);

            User seller = await _unitOfWork.Users.Find(newProductDTO.UserId);
            if (seller == null)
            {
                throw new UserByIdNotFoundException(newProductDTO.UserId);
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

        public async Task DeleteProduct(DeleteProductDTO deleteProductDTO)
        {
            Product product = await _unitOfWork.Products.Find(deleteProductDTO.ProductId);
            if (product == null)
            {
                throw new ProductNotFoundException(deleteProductDTO.ProductId);
            }

            if (product.SellerId != deleteProductDTO.UserId)
            {
                throw new InvalidProductUserInRequestException(deleteProductDTO.ProductId, deleteProductDTO.UserId);
            }

            // TODO: Decide whether allowed to delete products that are parts of existing and or delivered orders
            // Potentially only logically delete product in that scenario, not physically
            _unitOfWork.Products.Remove(product);
            await _unitOfWork.Save();
        }

        public async Task<DisplayProductDTO> UpdateProduct(UpdateProductDTO updateProductDTO)
        {
            ValidateProduct(_mapper.Map<NewProductDTO>(updateProductDTO), true);
            Product product = await _unitOfWork.Products.Find(updateProductDTO.Id);
            if (product == null)
            {
                throw new ProductNotFoundException(updateProductDTO.Id);
            }

            if (product.SellerId != updateProductDTO.SellerId)
            {
                throw new InvalidProductUserInRequestException(updateProductDTO.Id, updateProductDTO.SellerId);
            }

            product.Update(updateProductDTO.Description, updateProductDTO.IndividualPrice);
            await _unitOfWork.Save();

            return _mapper.Map<DisplayProductDTO>(product);
        }

        public async Task<DisplayProductDTO> RestockProduct(ProductRestockDTO productRestockDTO)
        {
            if (productRestockDTO.Amount <= 0)
            {
                throw new InvalidProductAmountException(productRestockDTO.Amount);
            }

            bool sellerExists = await _unitOfWork.Users.Find(productRestockDTO.UserId) != null;
            if (!sellerExists)
            {
                throw new UserByIdNotFoundException(productRestockDTO.UserId);
            }

            Product product = await _unitOfWork.Products.Find(productRestockDTO.Id);
            if (product == null)
            {
                throw new ProductNotFoundException(productRestockDTO.Id);
            }

            if (product.SellerId != productRestockDTO.UserId)
            {
                throw new InvalidProductUserInRequestException(productRestockDTO.Id, productRestockDTO.UserId);
            }

            product.Amount += productRestockDTO.Amount;
            await _unitOfWork.Save();

            return _mapper.Map<DisplayProductDTO>(product);
        }

        private void ValidateProduct(NewProductDTO newProductDTO, bool registered = false)
        {
            if (!registered && String.IsNullOrWhiteSpace(newProductDTO.Name)) 
            {
                throw new InvalidProductNameException(newProductDTO.Name);
            }

            if (String.IsNullOrWhiteSpace(newProductDTO.Description))
            {
                throw new InvalidProductDescriptionException(newProductDTO.Description);
            }

            if (!registered && newProductDTO.Amount < 0)
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

