import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import UserProfilePage from "../pages/UserProfilePage";

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <Routes>
      {!isLoggedIn && (
        <>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="*" element={<Navigate replace to={"/login"} />}></Route>
        </>
      )}
      {isLoggedIn && (
        <>
          <Route path="/profile" element={<UserProfilePage />}></Route>
          <Route
            path="*"
            element={<Navigate replace to={"/profile"} />}
          ></Route>
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;
