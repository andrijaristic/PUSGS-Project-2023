import React, { useEffect } from "react";
import OrdersList from "../components/Orders/OrdersList";
import { useDispatch, useSelector } from "react-redux";
import {
  clearNewSellerOrders,
  getAllNewSellerOrdersAction,
} from "../store/ordersSlice";

const NewOrdersPage = () => {
  const dispatch = useDispatch();
  const sellerNewOrders = useSelector((state) => state.orders.sellerNewOrders);

  useEffect(() => {
    return () => {
      dispatch(clearNewSellerOrders());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllNewSellerOrdersAction());
  }, [dispatch]);

  return <OrdersList orders={sellerNewOrders} active={true} />;
};

export default NewOrdersPage;
