import axios from "axios";

export const Login = async (requestBody) => {
  return axios
    .post(`${process.env.REACT_APP_API_ENDPOINT}/users/login`, requestBody)
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

export const Register = async (requestBody) => {
  return axios
    .post(`${process.env.REACT_APP_API_ENDPOINT}/users`, requestBody)
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

export const UpdateUser = async (requestBody) => {
  return axios
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
  return axios
    .get(`${process.env.REACT_APP_API_ENDPOINT}/users`, requestBody)
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

export const GetUserAvatar = async (userId) => {
  return axios
    .get(`${process.env.REACT_APP_API_ENDPOINT}/users/avatar/${userId}`, {
      responseType: "blob",
    })
    .then((data) => {
      const imageSrc = URL.createObjectURL(new Blob([data.data]));

      return {
        imageSrc,
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