import { axiosClient } from "./AxiosClient";

export const GetAllProducts = async () => {
  return await axiosClient.get(
    `${process.env.REACT_APP_API_ENDPOINT}/products`
  );
};

export const GetProductsForLoggedInSeller = async () => {
  return await axiosClient.get(
    `${process.env.REACT_APP_API_ENDPOINT}/products/seller`
  );
};

export const GetSellerProducts = async (sellerId) => {
  return await axiosClient.get(
    `${process.env.REACT_APP_API_ENDPOINT}/products/seller/${sellerId}`
  );
};

export const GetProductById = async (productId) => {
  return await axiosClient.get(
    `${process.env.REACT_APP_API_ENDPOINT}/products/${productId}`
  );
};

export const GetProductImage = async (productId) => {
  return await axiosClient.get(
    `${process.env.REACT_APP_API_ENDPOINT}/products/image/${productId}`,
    {
      responseType: "blob",
    }
  );
};

export const CreateNewProduct = async (data) => {
  return await axiosClient.post(
    `${process.env.REACT_APP_API_ENDPOINT}/products`,
    data
  );
};

export const UpdateExistingProduct = async (data) => {
  return await axiosClient.put(
    `${process.env.REACT_APP_API_ENDPOINT}/products`,
    data
  );
};

export const RestockProduct = async (data) => {
  return await axiosClient.put(
    `${process.env.REACT_APP_API_ENDPOINT}/products/restock`,
    data
  );
};

export const DeleteExistingProduct = async (data) => {
  return await axiosClient.delete(
    `${process.env.REACT_APP_API_ENDPOINT}/products`,
    data
  );
};
