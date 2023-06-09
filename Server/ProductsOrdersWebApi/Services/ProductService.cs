﻿using AutoMapper;
using Dapr.Client;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using ProductsOrdersWebApi.Dto.ProductDTOs;
using ProductsOrdersWebApi.Dto.UserDTOs;
using ProductsOrdersWebApi.Enums;
using ProductsOrdersWebApi.Exceptions.ProductExceptions;
//using ProductsOrdersWebApi.Exceptions.UserExceptions;
using ProductsOrdersWebApi.Interfaces.RepositoryInterfaces;
using ProductsOrdersWebApi.Interfaces.ServiceInterfaces;
using ProductsOrdersWebApi.Interfaces.ServiceInterfaces.UtilityInterfaces;
using ProductsOrdersWebApi.Models;
using ProductsOrdersWebApi.Models.AppSettings;
using System.ComponentModel;
using System.Runtime.InteropServices;
using System.Security.Cryptography;

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
            //Product product = await _daprClient.InvokeMethodAsync<Product>(HttpMethod.Get, "productsorderswebapi", $"/api/products");

            //User user = await _unitOfWork.Users.Find(sellerId);
            //if (user == null)
            //{
            //    throw new UserByIdNotFoundException(sellerId);
            //}

            //if (user.Role != UserRole.SELLER)
            //{
            //    throw new InvalidProductSellerTypeException(user.Id);
            //}

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

            //User seller = await _unitOfWork.Users.Find(newProductDTO.SellerId);
            //if (seller == null)
            //{
            //    throw new UserByIdNotFoundException(newProductDTO.SellerId);
            //}

            //if (seller.Role != UserRole.SELLER)
            //{
            //    throw new InvalidProductSellerTypeException(seller.Id);
            //}

            //if (seller.VerificationStatus == VerificationStatus.PENDING || seller.VerificationStatus == VerificationStatus.DENIED)
            //{
            //    throw new InvalidSellerVerificationException(seller.Id);
            //}

            Product product = _mapper.Map<Product>(newProductDTO);
            product.Timestamp = DateTime.Now.ToLocalTime();

            product.ImageURL = Path.Combine(_hostEnvironment.ContentRootPath, "Images", _settings.Value.DefaultProductImagePath); ;
            if (newProductDTO.Image != null)
            {
                string name = $"{product.Name}";

                product.ImageURL = await _imageService.SaveImage(newProductDTO.Image, name, _hostEnvironment.ContentRootPath);
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

            FileStream stream = _imageService.DownloadImage(product.ImageURL, _hostEnvironment.ContentRootPath);

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
                if (!String.Equals(product.ImageURL, _settings.Value.DefaultProductImagePath))
                {
                    _imageService.DeleteImage(product.ImageURL);
                }

                string imagePath = "Images\\Products";
                string name = product.Name;

                product.ImageURL = await _imageService.SaveImage(updateProductDTO.Image, name, imagePath);
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

            //bool sellerExists = await _unitOfWork.Users.Find(productRestockDTO.UserId) != null;
            //if (!sellerExists)
            //{
            //    throw new UserByIdNotFoundException(productRestockDTO.UserId);
            //}

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
            product.Timestamp = DateTime.Now.ToLocalTime();
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
