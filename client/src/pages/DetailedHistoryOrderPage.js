import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDetailedOrderAction,
  clearDetailedOrder,
} from "../store/ordersSlice";
import { useParams } from "react-router-dom";
import DetailedOrderList from "../components/DetailedOrder/DetailedOrderList";

const DetailedHistoryOrderPage = () => {
  const dispatch = useDispatch();
  const detailedOrder = useSelector((state) => state.orders.detailedOrder);
  const params = useParams();
  const id = params.orderId || "";

  useEffect(() => {
    return () => {
      dispatch(clearDetailedOrder());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDetailedOrderAction(id));
  }, [dispatch, id]);

  return (
    <DetailedOrderList order={detailedOrder} admin={false} seller={false} />
  );
};

export default DetailedHistoryOrderPage;
