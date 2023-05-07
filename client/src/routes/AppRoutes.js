import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import UserProfilePage from "../pages/UserProfilePage";
import FinishRegisterPage from "../pages/FinishRegisterPage";

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
      {isLoggedIn && finishedRegistration && (
        <>
          <Route path="/profile" element={<UserProfilePage />}></Route>
          <Route
            path="*"
            element={<Navigate replace to={"/profile"} />}
          ></Route>
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
    </Routes>
  );
};

export default AppRoutes;
