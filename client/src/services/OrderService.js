import { axiosClient } from "./AxiosClient";

export const GetAllOrders = async () => {
  return await axiosClient.get(`${process.env.REACT_APP_API_ENDPOINT}/orders`);
};

export const GetAllOldBuyerOrders = async () => {
  return await axiosClient.get(
    `${process.env.REACT_APP_API_ENDPOINT}/orders/buyer-orders`
  );
};

export const GetAllOldSellerOrders = async () => {
  return await axiosClient.get(
    `${process.env.REACT_APP_API_ENDPOINT}/orders/seller-orders`
  );
};

export const GetAllNewBuyerOrders = async () => {
  return await axiosClient.get(
    `${process.env.REACT_APP_API_ENDPOINT}/orders/buyer-orders/new`
  );
};

export const GetAllNewSellerOrders = async () => {
  return await axiosClient.get(
    `${process.env.REACT_APP_API_ENDPOINT}/orders/seller-orders/new`
  );
};

export const GetDetailedOrder = async (id) => {
  return await axiosClient.get(
    `${process.env.REACT_APP_API_ENDPOINT}/orders/${id}`
  );
};

export const GetSellerDetailedOrder = async (id) => {
  return await axiosClient.get(
    `${process.env.REACT_APP_API_ENDPOINT}/orders/seller-orders/${id}`
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
