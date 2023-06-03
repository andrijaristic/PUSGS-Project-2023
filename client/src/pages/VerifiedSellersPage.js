import React, { useEffect } from "react";
import SellerList from "../components/Sellers/SellerList";
import { useDispatch, useSelector } from "react-redux";
import {
  clearVerifiedSellers,
  getAllVerifiedSellersAction,
} from "../store/verificationSlice";
import LoadingModal from "../components/UI/Modal/LoadingModal";

const VerifiedSellersPage = () => {
  const dispatch = useDispatch();
  const sellers = useSelector((state) => state.verification.allSellers);

  useEffect(() => {
    return () => {
      dispatch(clearVerifiedSellers());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllVerifiedSellersAction());
  }, [dispatch]);

  if (sellers) {
    return <SellerList sellers={sellers} verified={true} />;
  } else {
    <LoadingModal show={true} />;
  }
};

export default VerifiedSellersPage;
