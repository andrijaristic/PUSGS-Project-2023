﻿namespace ProductsOrdersWebApi.Dto.ProductDTOs
{
    public class DeleteProductDTO
    {
        public Guid ProductId { get; set; }
        public Guid UserId { get; set; }
    }
}