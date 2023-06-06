using ProductsOrdersWebApi.Exceptions.Common;

namespace ProductsOrdersWebApi.Exceptions.ProductExceptions
{
    public class SellerProductsNotFoundException : NotFoundException
    {
        public SellerProductsNotFoundException(Guid id) : base($"SELLER with ID: {id} has no products")
        {

        }
    }
}
