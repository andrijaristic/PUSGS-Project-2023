﻿namespace Server.Dto.ProductDTOs
{
    public class UpdateProductDTO
    {
        public Guid Id { get; set; }
        public double IndividualPrice { get; set; }
        public string Description { get; set; }
        // public string ImageURL { get; set; }
        public Guid SellerId { get; set; }
    }
}
