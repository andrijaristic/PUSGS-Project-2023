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
import EditProductPage from "../pages/EditProductPage";
import NewProductPage from "../pages/NewProductPage";
import CheckoutPage from "../pages/CheckoutPage";
import ActiveOrdersPage from "../pages/ActiveOrdersPage";
import HistoryPage from "../pages/HistoryPage";
import MyOrdersPage from "../pages/MyOrdersPage";
import NewOrdersPage from "../pages/NewOrdersPage";
import OrdersPage from "../pages/OrdersPage";
import DetailedOrderPage from "../pages/DetailedOrderPage";
import DetailedOrderBuyerPage from "../pages/DetailedOrderBuyerPage";

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const user = useSelector((state) => state.user.user);
  const finishedRegistration = useSelector(
    (state) => state.user.finishedRegistration
  );

  const isVerifiedSeller =
    user &&
    user.role === "SELLER" &&
    user.verificationStatus === "ACCEPTED" &&
    finishedRegistration;

  const isBuyer = user && user.role === "BUYER" && finishedRegistration;
  const isAdmin = user && user.role === "ADMIN" && finishedRegistration;

  return (
    <Routes>
      {!isLoggedIn && (
        <>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="*" element={<Navigate replace to={"/login"} />}></Route>
        </>
      )}
      {isLoggedIn && !finishedRegistration && (
        <>
          <Route path="/finish-registration" element={<FinishRegisterPage />} />
          <Route
            path="*"
            element={<Navigate replace to={"/finish-registration"} />}
          />
        </>
      )}
      {isLoggedIn && finishedRegistration && (
        <Route element={<Navigation />}>
          <Route path="" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          {isVerifiedSeller && (
            <Route path="/my-products" element={<SellerProductsPage />} />
          )}
          {isVerifiedSeller && (
            <Route
              path="/my-products/:productId/edit"
              element={<EditProductPage />}
            />
          )}
          {isVerifiedSeller && (
            <Route path="/new-product" element={<NewProductPage />} />
          )}
          {isBuyer && <Route path="/checkout" element={<CheckoutPage />} />}
          {isBuyer && (
            <Route path="/active-orders" element={<ActiveOrdersPage />} />
          )}
          {isBuyer && <Route path="/history" element={<HistoryPage />} />}
          {isVerifiedSeller && (
            <Route path="/my-orders" element={<MyOrdersPage />} />
          )}
          {isVerifiedSeller && (
            <Route path="/new-orders" element={<NewOrdersPage />} />
          )}
          {isAdmin && <Route path="/orders" element={<OrdersPage />} />}
          {isAdmin && (
            <Route path="/orders/:orderId" element={<DetailedOrderPage />} />
          )}
          {isAdmin && (
            <Route
              path="/orders/:orderId/buyer/:buyerId"
              element={<DetailedOrderBuyerPage />}
            />
          )}{" "}
          {isAdmin && (
            <Route
              path="/orders/:orderId/seller/:sellerId"
              element={<DetailedOrderBuyerPage />}
            />
          )}
          <Route path="*" element={<Navigate replace to={""} />} />
        </Route>
      )}
    </Routes>
  );
};

export default AppRoutes;
