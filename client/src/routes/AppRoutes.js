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
import DetailedOrderSellerPage from "../pages/DetailedOrderSellerPage";
import DetailedNewOrderPage from "../pages/DetailedNewOrderPage";
import DetailedMyOrdersOrderPage from "../pages/DetailedMyOrdersOrderPage";
import DetailedHistoryOrderPage from "../pages/DetailedHistoryOrderPage";
import DetailedActiveOrdersOrderPage from "../pages/DetailedActiveOrdersOrderPage";
import AllSellersPage from "../pages/AllSellersPage";
import VerifiedSellersPage from "../pages/VerifiedSellersPage";

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
          {isBuyer && (
            <Route
              path="/active-orders/:orderId"
              element={<DetailedActiveOrdersOrderPage />}
            />
          )}
          {isBuyer && <Route path="/history" element={<HistoryPage />} />}
          {isBuyer && (
            <Route
              path="/history/:orderId"
              element={<DetailedHistoryOrderPage />}
            />
          )}
          {isVerifiedSeller && (
            <Route path="/my-orders" element={<MyOrdersPage />} />
          )}
          {isVerifiedSeller && (
            <Route
              path="/my-orders/:orderId"
              element={<DetailedMyOrdersOrderPage />}
            />
          )}
          {isVerifiedSeller && (
            <Route
              path="/my-orders/:orderId/buyer/:buyerId"
              element={<DetailedOrderBuyerPage />}
            />
          )}
          {isVerifiedSeller && (
            <Route path="/new-orders" element={<NewOrdersPage />} />
          )}
          {isVerifiedSeller && (
            <Route
              path="/new-orders/:orderId"
              element={<DetailedNewOrderPage />}
            />
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
          )}
          {isAdmin && (
            <Route
              path="/orders/:orderId/seller/:sellerId"
              element={<DetailedOrderSellerPage />}
            />
          )}
          {isAdmin && (
            <Route path="/all-sellers" element={<AllSellersPage />} />
          )}
          {isAdmin && (
            <Route path="/verified-sellers" element={<VerifiedSellersPage />} />
          )}
          <Route path="*" element={<Navigate replace to={""} />} />
        </Route>
      )}
    </Routes>
  );
};

export default AppRoutes;
