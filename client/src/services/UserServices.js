import { axiosClient } from "./AxiosClient";

export const Login = async (requestBody) => {
  return await axiosClient.post(
    `${process.env.REACT_APP_API_ENDPOINT}/users/login`,
    requestBody
  );
};

export const GoogleLogin = async (requestBody) => {
  console.log("google");
  return await axiosClient.post(
    `${process.env.REACT_APP_API_ENDPOINT}/users/external-login`,
    requestBody
  );
};

export const Register = async (requestBody) => {
  return await axiosClient.post(
    `${process.env.REACT_APP_API_ENDPOINT}/users`,
    requestBody
  );
};

export const FinishRegistration = async (requestBody) => {
  return await axiosClient.put(
    `${process.env.REACT_APP_API_ENDPOINT}/users/finish-registration`,
    requestBody
  );
};

export const UpdateUser = async (requestBody) => {
  return await axiosClient.put(
    `${process.env.REACT_APP_API_ENDPOINT}/users`,
    requestBody
  );
};

export const GetUserInformation = async () => {
  return await axiosClient.get(`${process.env.REACT_APP_API_ENDPOINT}/users`);
};

export const GetUserInformationById = async (id) => {
  return await axiosClient.get(
    `${process.env.REACT_APP_API_ENDPOINT}/users/${id}`
  );
};

export const GetUserAvatar = async (userId) => {
  return await axiosClient.get(
    `${process.env.REACT_APP_API_ENDPOINT}/users/avatar/${userId}`,
    {
      responseType: "blob",
    }
  );
};

export const GetAllSellers = async () => {
  return await axiosClient.get(
    `${process.env.REACT_APP_API_ENDPOINT}/users/all-sellers`
  );
};

export const GetAllVerifiedSellers = async () => {
  return await axiosClient.get(
    `${process.env.REACT_APP_API_ENDPOINT}/users/verified-sellers`
  );
};

export const VerifySeller = async (data) => {
  return await axiosClient.put(
    `${process.env.REACT_APP_API_ENDPOINT}/users/verify`,
    data
  );
};

export const ChangePassword = async (id, data) => {
  return await axiosClient.put(
    `${process.env.REACT_APP_API_ENDPOINT}/users/${id}/change-password`,
    data
  );
};
