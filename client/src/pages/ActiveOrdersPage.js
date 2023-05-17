import React, { useEffect } from "react";
import OrdersList from "../components/Orders/OrdersList";
import { useDispatch, useSelector } from "react-redux";
import {
  clearNewBuyerOrders,
  getAllNewBuyerOrdersAction,
} from "../store/ordersSlice";

const ActiveOrdersPage = () => {
  const dispatch = useDispatch();
  const buyerNewOrders = useSelector((state) => state.orders.buyerNewOrders);

  useEffect(() => {
    return () => {
      dispatch(clearNewBuyerOrders());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllNewBuyerOrdersAction());
  }, [dispatch]);
  console.log(buyerNewOrders);
  return <OrdersList orders={buyerNewOrders} active={true} />;
};

export default ActiveOrdersPage;
