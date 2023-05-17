import React, { useEffect } from "react";
import OrdersList from "../components/Orders/OrdersList";
import { useDispatch, useSelector } from "react-redux";
import { clearAllOrders, getAllOrdersAction } from "../store/ordersSlice";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const allOrders = useSelector((state) => state.orders.allOrders);

  useEffect(() => {
    return () => {
      dispatch(clearAllOrders());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllOrdersAction());
  }, [dispatch]);

  return <OrdersList orders={allOrders} active={false} />;
};

export default OrdersPage;
