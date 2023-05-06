import React from "react";
import axios from "axios";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token === null) {
      return config;
    }

    if (config === undefined) {
      config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      return config;
    }

    if (config.headers === undefined) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };

      return config;
    }

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function App() {
  return (
    <>
      <AppRoutes />
      <ToastContainer />
    </>
  );
}

export default App;
