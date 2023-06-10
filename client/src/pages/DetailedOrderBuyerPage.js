import React, { useEffect } from "react";
import DetailedOrderUserInformation from "../components/DetailedUserInformation/DetailedOrderUserInformation";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFetchedUser,
  clearFetchedUserAvatar,
  getFetchedUserAvatarAction,
  getUserInformationByIdAction,
  setFetchedUserAvatar,
} from "../store/userSlice";

const DetailedOrderBuyerPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.fetchedUser);
  const avatar = useSelector((state) => state.user.fetchedUserAvatar);
  const id = params.buyerId || "";

  useEffect(() => {
    return () => {
      dispatch(clearFetchedUser());
      dispatch(clearFetchedUserAvatar());
    };
  }, [dispatch]);

  useEffect(() => {
    const execute = async () => {
      const postAction = await dispatch(getUserInformationByIdAction(id));
      const { imageSrc } = postAction.payload;
      if (imageSrc) {
        dispatch(setFetchedUserAvatar(imageSrc));
      } else {
        dispatch(getFetchedUserAvatarAction(id));
      }
    };

    execute();
  }, [dispatch, id]);

  return <DetailedOrderUserInformation user={user} avatar={avatar} />;
};

export default DetailedOrderBuyerPage;
