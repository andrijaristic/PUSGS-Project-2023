import React, { useEffect } from "react";
import OrdersList from "../components/Orders/OrdersList";
import { useDispatch, useSelector } from "react-redux";
import {
  clearOldBuyerOrders,
  getAllOldBuyerOrdersAction,
} from "../store/ordersSlice";

const HistoryPage = () => {
  const dispatch = useDispatch();
  const buyerOldOrders = useSelector((state) => state.orders.buyerOldOrders);

  useEffect(() => {
    return () => {
      dispatch(clearOldBuyerOrders());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllOldBuyerOrdersAction());
  }, [dispatch]);

  return <OrdersList orders={buyerOldOrders} active={false} />;
};

export default HistoryPage;
