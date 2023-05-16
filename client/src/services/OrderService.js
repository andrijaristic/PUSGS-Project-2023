import { axiosClient } from "./AxiosClient";

export const GetAllOrders = async () => {
  return await axiosClient.get(`${process.env.REACT_APP_API_ENDPOINT}/orders`);
};

export const GetAllValidBuyerOrders = async () => {
  return await axiosClient.get(
    `${process.env.REACT_APP_API_ENDPOINT}/orders/buyer-orders`
  );
};

export const GetAllValidSellerOrders = async () => {
  return await axiosClient.get(
    `${process.env.REACT_APP_API_ENDPOINT}/orders/seller-orders`
  );
};

export const CreateOrder = async (data) => {
  return await axiosClient.post(
    `${process.env.REACT_APP_API_ENDPOINT}/orders`,
    data
  );
};

export const CancelOrder = async (data) => {
  return await axiosClient.put(
    `${process.env.REACT_APP_API_ENDPOINT}/orders/cancel-order`,
    data
  );
};
