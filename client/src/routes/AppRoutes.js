import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProfilePage from "../pages/ProfilePage";
import FinishRegisterPage from "../pages/FinishRegisterPage";
import Navigation from "../components/UI/Navigation/Navigation";
import HomePage from "../pages/HomePage";
import SellerProductsPage from "../pages/SellerProductsPage";

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const finishedRegistration = useSelector(
    (state) => state.user.finishedRegistration
  );
  return (
    <Routes>
      {!isLoggedIn && !finishedRegistration && (
        <>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="*" element={<Navigate replace to={"/login"} />}></Route>
        </>
      )}
      {isLoggedIn && !finishedRegistration && (
        <>
          <Route
            path="/finish-registration"
            element={<FinishRegisterPage />}
          ></Route>
          <Route
            path="*"
            element={<Navigate replace to={"/finish-registration"} />}
          ></Route>
        </>
      )}
      {isLoggedIn && finishedRegistration && (
        <Route element={<Navigation />}>
          <Route path="" element={<HomePage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/my-products" element={<SellerProductsPage />}></Route>
          <Route path="*" element={<Navigate replace to={""} />}></Route>
        </Route>
      )}
    </Routes>
  );
};

export default AppRoutes;
