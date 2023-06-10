﻿namespace ProductsOrdersWebApi.Dto.ProductDTOs
{
    public class UpdateProductDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public double IndividualPrice { get; set; }
        public string Description { get; set; }
        public IFormFile Image { get; set; }
        public Guid SellerId { get; set; }
    }
}
