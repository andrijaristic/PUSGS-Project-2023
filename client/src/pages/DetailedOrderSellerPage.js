import React, { useEffect } from "react";
import DetailedOrderUserInformation from "../components/DetailedOrder/DetailedOrderUserInformation";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFetchedUser,
  getUserAvatarAction,
  getUserInformationByIdAction,
} from "../store/userSlice";

const DetailedOrderSellerPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.fetchedUser);
  const avatar = useSelector((state) => state.user.avatar);
  const id = params.sellerId || "";

  console.log(id);
  useEffect(() => {
    return () => {
      dispatch(clearFetchedUser());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserInformationByIdAction(id));
    dispatch(getUserAvatarAction(id));
  }, [dispatch, id]);

  return <DetailedOrderUserInformation user={user} avatar={avatar} />;
};

export default DetailedOrderSellerPage;
