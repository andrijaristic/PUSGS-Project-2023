import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthContext from "../store/auth-context";
import { UserContextProvider } from "../store/user-context";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import UserProfilePage from "../pages/UserProfilePage";

const AppRoutes = () => {
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
};

export default AppRoutes;
