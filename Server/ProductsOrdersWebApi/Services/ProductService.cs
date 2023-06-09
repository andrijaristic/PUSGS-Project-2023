using AutoMapper;
using Dapr.Client;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using ProductsOrdersWebApi.Dto.ProductDTOs;
using ProductsOrdersWebApi.Dto.UserDTOs;
using ProductsOrdersWebApi.Enums;
using ProductsOrdersWebApi.Exceptions.Common;
using ProductsOrdersWebApi.Exceptions.ProductExceptions;
using ProductsOrdersWebApi.Interfaces.RepositoryInterfaces;
using ProductsOrdersWebApi.Interfaces.ServiceInterfaces;
using ProductsOrdersWebApi.Interfaces.ServiceInterfaces.UtilityInterfaces;
using ProductsOrdersWebApi.Models;
using ProductsOrdersWebApi.Models.AppSettings;
using System.ComponentModel;
using System.Runtime.InteropServices;
using System.Security.Cryptography;
using ProductsOrdersWebApi.Exceptions.UserExceptions;

namespace Server.Services
{
    public class ProductService : IProductService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IImageService _imageService;
        private readonly IMapper _mapper;
        private readonly IOptions<AppSettings> _settings;
        private readonly DaprClient _daprClient;
        private readonly IHostEnvironment _hostEnvironment;

        public ProductService(IUnitOfWork unitOfWork,
                              IMapper mapper,
                              IImageService imageService,
                              IOptions<AppSettings> settings,
                              DaprClient daprClient,
                              IHostEnvironment hostEnvironment) 
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _imageService = imageService;
            _settings = settings;
            _daprClient = daprClient;
            _hostEnvironment = hostEnvironment;
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
            DisplayUserDTO seller = null;
            try
            {
                seller = await _daprClient.InvokeMethodAsync<DisplayUserDTO>(HttpMethod.Get, "userswebapi", $"api/users/{sellerId}");
            }
            catch (Exception e)
            {
                throw new DaprBadRequestException(e.Message);
            }

            if (seller == null)
            {
                throw new UserByIdNotFoundException(sellerId);
            }

            if (!Enum.TryParse(seller.Role, out UserRole role))
            {
                throw new InvalidProductSellerTypeException(sellerId);
            }

            List<Product> products = await _unitOfWork.Products.GetProductsForSeller(sellerId);
            if (products == null)
            {
                throw new SellerProductsNotFoundException(sellerId);
            }

            return _mapper.Map<List<DisplayProductDTO>>(products);
        }

        public async Task<ProductImageDTO> GetProductImage(Guid id)
        {
            Product product = await _unitOfWork.Products.Find(id);
            if (product == null)
            {
                throw new ProductNotFoundException(id);
            }

            FileStream stream = _imageService.DownloadImage(product.ImageURL, _hostEnvironment.ContentRootPath);

            ProductImageDTO productImageDTO = new ProductImageDTO()
            {
                Stream = stream,
                FileName = product.Id.ToString()
            };

            return productImageDTO;
        }

        public async Task<DisplayProductDTO> CreateProduct(NewProductDTO newProductDTO, Guid tokenId)
        {
            ValidateProduct(newProductDTO);

            if (tokenId != newProductDTO.SellerId)
            {
                throw new InvalidProductSellerException(newProductDTO.SellerId);
            }

            DisplayUserDTO seller = null;
            try
            {
                seller = await _daprClient.InvokeMethodAsync<DisplayUserDTO>(HttpMethod.Get, "userswebapi", $"api/users/{newProductDTO.SellerId}");
            }
            catch (Exception e)
            {
                throw new DaprBadRequestException(e.Message);
            }

            if (seller == null)
            {
                throw new UserByIdNotFoundException(newProductDTO.SellerId);
            }

            if (!Enum.TryParse(seller.Role, out UserRole role) && role != UserRole.SELLER)
            {
                throw new InvalidProductSellerTypeException(newProductDTO.SellerId);
            }

            if (!Enum.TryParse(seller.VerificationStatus, out VerificationStatus status) &&
               (status == VerificationStatus.PENDING || status == VerificationStatus.DENIED))
            {
                throw new InvalidSellerVerificationException(newProductDTO.SellerId);
            }

            Product product = _mapper.Map<Product>(newProductDTO);
            product.Timestamp = DateTime.Now.ToUniversalTime();

            product.ImageURL = _settings.Value.DefaultProductImagePath;
            if (newProductDTO.Image != null)
            {
                string name = $"{product.Name}";

                product.ImageURL = await _imageService.SaveImage(newProductDTO.Image, name, _hostEnvironment.ContentRootPath);
            }

            await _unitOfWork.Products.Add(product);
            await _unitOfWork.Save();

            return _mapper.Map<DisplayProductDTO>(product);
        }

        public async Task DeleteProduct(DeleteProductDTO deleteProductDTO, Guid tokenId)
        {
            Product product = await _unitOfWork.Products.Find(deleteProductDTO.ProductId);
            if (product == null || product.IsDeleted)
            {
                throw new ProductNotFoundException(deleteProductDTO.ProductId);
            }

            if (product.SellerId != deleteProductDTO.SellerId)
            {
                throw new InvalidProductUserInRequestException(deleteProductDTO.ProductId, deleteProductDTO.SellerId);
            }

            if (tokenId != deleteProductDTO.SellerId)
            {
                throw new InvalidProductSellerException(deleteProductDTO.SellerId);
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

        public async Task<DisplayProductDTO> UpdateProduct(UpdateProductDTO updateProductDTO, Guid tokenId)
        {
            ValidateProduct(_mapper.Map<NewProductDTO>(updateProductDTO), true);

            if (tokenId != updateProductDTO.SellerId)
            {
                throw new InvalidProductSellerException(updateProductDTO.SellerId);
            }

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
                if (!String.Equals(product.ImageURL, _settings.Value.DefaultProductImagePath))
                {
                    _imageService.DeleteImage(product.ImageURL, _hostEnvironment.ContentRootPath);
                }

                string name = product.Name;

                product.ImageURL = await _imageService.SaveImage(updateProductDTO.Image, name, _hostEnvironment.ContentRootPath);
            }

            product.Update(updateProductDTO.Description, updateProductDTO.IndividualPrice);
            await _unitOfWork.Save();

            return _mapper.Map<DisplayProductDTO>(product);
        }

        public async Task<DisplayProductDTO> RestockProduct(ProductRestockDTO productRestockDTO, Guid tokenId)
        {
            if (productRestockDTO.Amount <= 0)
            {
                throw new InvalidProductAmountException(productRestockDTO.Amount);
            }

            if (tokenId != productRestockDTO.SellerId)
            {
                throw new InvalidProductSellerException(productRestockDTO.SellerId);
            }

            DisplayUserDTO seller = null;
            try
            {
                seller = await _daprClient.InvokeMethodAsync<DisplayUserDTO>(HttpMethod.Get, "userswebapi", $"api/users/{productRestockDTO.SellerId}");
            }
            catch (Exception e)
            {
                throw new DaprBadRequestException(e.Message);
            }

            if (seller == null)
            {
                throw new UserByIdNotFoundException(productRestockDTO.SellerId);
            }

            if (!Enum.TryParse(seller.Role, out UserRole role) && role != UserRole.SELLER)
            {
                throw new InvalidProductSellerTypeException(productRestockDTO.SellerId);
            }

            Product product = await _unitOfWork.Products.Find(productRestockDTO.Id);
            if (product == null || product.IsDeleted)
            {
                throw new ProductNotFoundException(productRestockDTO.Id);
            }

            if (product.SellerId != productRestockDTO.SellerId)
            {
                throw new InvalidProductUserInRequestException(productRestockDTO.Id, productRestockDTO.SellerId);
            }

            product.Amount += productRestockDTO.Amount;
            product.Timestamp = DateTime.Now.ToUniversalTime();
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

