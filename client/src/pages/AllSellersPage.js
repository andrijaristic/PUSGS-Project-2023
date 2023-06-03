import React, { useEffect } from "react";
import SellerList from "../components/Sellers/SellerList";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllSellers,
  getAllSellersAction,
} from "../store/verificationSlice";
import LoadingModal from "../components/UI/Modal/LoadingModal";

const AllSellersPage = () => {
  const dispatch = useDispatch();
  const sellers = useSelector((state) => state.verification.allSellers);

  useEffect(() => {
    return () => {
      dispatch(clearAllSellers());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllSellersAction());
  }, [dispatch]);

  if (sellers) {
    return <SellerList sellers={sellers} />;
  } else {
    <LoadingModal show={true} />;
  }
};

export default AllSellersPage;
