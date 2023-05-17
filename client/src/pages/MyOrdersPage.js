import React, { useEffect } from "react";
import OrdersList from "../components/Orders/OrdersList";
import { useDispatch, useSelector } from "react-redux";
import {
  clearOldSellerOrders,
  getAllOldSellerOrdersAction,
} from "../store/ordersSlice";

const MyOrdersPage = () => {
  const dispatch = useDispatch();
  const sellerOldOrders = useSelector((state) => state.orders.sellerOldOrders);

  useEffect(() => {
    return () => {
      dispatch(clearOldSellerOrders());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllOldSellerOrdersAction());
  }, [dispatch]);

  return <OrdersList orders={sellerOldOrders} active={false} />;
};

export default MyOrdersPage;
