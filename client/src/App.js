import React, { useContext } from "react";
import AuthContext from "./store/auth-context";
import axios from "axios";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserProfilePage from "./pages/UserProfilePage";

import { UserContextProvider } from "./store/user-context";

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
  const ctx = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />}></Route>
      {ctx.isLoggedIn && (
        <Route
          path="/profile"
          element={
            <UserContextProvider>
              <UserProfilePage />
            </UserContextProvider>
          }
        ></Route>
      )}
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route path="*" element={<Navigate to="/login" />}></Route>
    </Routes>
  );
}

export default App;
