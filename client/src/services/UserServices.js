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

export const GetUserInformation = async (requestBody) => {
  return await axiosClient.get(`${process.env.REACT_APP_API_ENDPOINT}/users`);
};

export const GetUserAvatar = async (userId) => {
  return await axiosClient.get(
    `${process.env.REACT_APP_API_ENDPOINT}/users/avatar/${userId}`,
    {
      responseType: "blob",
    }
  );
};
