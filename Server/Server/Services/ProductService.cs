using AutoMapper;
using Microsoft.AspNetCore.Components.Web;
using Server.Dto.ProductDTOs;
using Server.Dto.UserDTOs;
using Server.Enums;
using Server.Exceptions.ProductExceptions;
using Server.Exceptions.UserExceptions;
using Server.Interfaces.RepositoryInterfaces;
using Server.Interfaces.ServiceInterfaces;
using Server.Interfaces.ServiceInterfaces.UtilityInterfaces;
using Server.Models;
using System.ComponentModel;
using System.Runtime.InteropServices;

namespace Server.Services
{
    public class ProductService : IProductService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IImageService _imageService;
        private readonly IMapper _mapper;

        public ProductService(IUnitOfWork unitOfWork, IMapper mapper, IImageService imageService) 
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _imageService = imageService;
        }

        public async Task<List<DisplayProductDTO>> GetAllProducts()
        {
            List<Product> products = await _unitOfWork.Products.GetAllProducts();

            return _mapper.Map<List<DisplayProductDTO>>(products);
        }

        public async Task<DisplayProductDTO> GetProductById(Guid id)
        {
            Product product = await _unitOfWork.Products.Find(id);
            if (product == null || product.IsDeleted) 
            {
                throw new ProductNotFoundException(id);
            }

            return _mapper.Map<DisplayProductDTO>(product);
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

        public async Task<DisplayProductDTO> CreateProduct(NewProductDTO newProductDTO)
        {
            ValidateProduct(newProductDTO);

            User seller = await _unitOfWork.Users.Find(newProductDTO.SellerId);
            if (seller == null)
            {
                throw new UserByIdNotFoundException(newProductDTO.SellerId);
            }

            if (seller.Role != UserRole.SELLER)
            {
                throw new InvalidProductSellerTypeException(seller.Id);
            }

            if (seller.VerificationStatus == VerificationStatus.PENDING || seller.VerificationStatus == VerificationStatus.DENIED)
            {
                throw new InvalidSellerVerificationException(seller.Id);
            }

            Product product = _mapper.Map<Product>(newProductDTO);

            product.ImageURL = $"Images\\Default\\product.png";
            if (newProductDTO.Image != null)
            {
                string path = "Products";
                string name = $"{product.Name}_{DateTime.Now.ToLocalTime()}";

                product.ImageURL = await _imageService.SaveImage(newProductDTO.Image, name, path);
            }

            await _unitOfWork.Products.Add(product);
            await _unitOfWork.Save();

            return _mapper.Map<DisplayProductDTO>(product);
        }

        public async Task<ProductImageDTO> GetProductImage(Guid id)
        {
            Product product = await _unitOfWork.Products.Find(id);
            if (product == null)
            {
                throw new ProductNotFoundException(id);
            }

            string fileName = product.ImageURL.Split('\\')[2];
            FileStream stream = _imageService.DownloadImage(product.ImageURL);

            ProductImageDTO productImageDTO = new ProductImageDTO()
            {
                Stream = stream,
                FileName = product.Id.ToString()
            };

            return productImageDTO;
        }

        public async Task DeleteProduct(DeleteProductDTO deleteProductDTO)
        {
            Product product = await _unitOfWork.Products.Find(deleteProductDTO.ProductId);
            if (product == null || product.IsDeleted)
            {
                throw new ProductNotFoundException(deleteProductDTO.ProductId);
            }

            if (product.SellerId != deleteProductDTO.UserId)
            {
                throw new InvalidProductUserInRequestException(deleteProductDTO.ProductId, deleteProductDTO.UserId);
            }

            bool inOrder = await _unitOfWork.OrderItems.FindOrderForItem(deleteProductDTO.ProductId);
            if (!inOrder)
            {
                _unitOfWork.Products.Remove(product);
            } else
            {
                product.IsDeleted = true;
            }

            await _unitOfWork.Save();
        }

        public async Task<DisplayProductDTO> UpdateProduct(UpdateProductDTO updateProductDTO)
        {
            ValidateProduct(_mapper.Map<NewProductDTO>(updateProductDTO), true);
            Product product = await _unitOfWork.Products.Find(updateProductDTO.Id);
            if (product == null || product.IsDeleted)
            {
                throw new ProductNotFoundException(updateProductDTO.Id);
            }

            if (product.SellerId != updateProductDTO.SellerId)
            {
                throw new InvalidProductUserInRequestException(updateProductDTO.Id, updateProductDTO.SellerId);
            }

            if (updateProductDTO.Image != null)
            {
                string defaultImagePath = "Images\\Default";
                if (!String.Equals(product.ImageURL, $"{defaultImagePath}\\product.png"))
                {
                    _imageService.DeleteImage(product.ImageURL);
                }

                defaultImagePath = "Images\\Products";
                string name = product.Name;

                product.ImageURL = await _imageService.SaveImage(updateProductDTO.Image, name, defaultImagePath);
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
            if (product == null || product.IsDeleted)
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

