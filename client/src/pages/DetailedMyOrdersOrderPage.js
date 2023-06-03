import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSellerDetailedOrderAction,
  clearDetailedOrder,
} from "../store/ordersSlice";
import { useParams } from "react-router-dom";
import DetailedOrderList from "../components/DetailedOrder/DetailedOrderList";

const DetailedMyOrdersOrderPage = () => {
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
    dispatch(getSellerDetailedOrderAction(id));
  }, [dispatch, id]);

  return (
    <DetailedOrderList order={detailedOrder} admin={false} seller={true} />
  );
};

export default DetailedMyOrdersOrderPage;
