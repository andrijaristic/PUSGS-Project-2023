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
  return await axiosClient
    .put(`${process.env.REACT_APP_API_ENDPOINT}/users`, requestBody)
    .then((data) => {
      return {
        userData: data.data,
        status: data.status,
      };
    })
    .catch((error) => {
      if (error.response) {
        return {
          error: error.response.data.error,
          status: error.response.status,
        };
      } else if (error.request) {
        return {
          error: error.request.respons,
          status: error.request.status,
        };
      }

      return {
        error: "Endpoint not hit",
        status: 404,
      };
    });
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
