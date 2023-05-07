import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Field from "../UI/Field/Field";
import styles from "../Profile/UserProfile.module.css";
import {
  getUserAvatarAction,
  getUserInformationAction,
} from "../../store/userSlice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const execute = async () => {
      const postAction = await dispatch(getUserInformationAction());
      const { id, imageSrc } = postAction.payload;
      if (imageSrc === "") {
        dispatch(getUserAvatarAction(id));
      }
    };

    execute();
  }, [dispatch]);

  if (user) {
    const dateOfBirth = new Date(user.dateOfBirth)
      .toLocaleString("en-GB")
      .split(",")[0];
    return (
      <div className={styles["profile_container"]}>
        <img src={user.imageSrc} width="200" height="200" alt=""></img>
        <Field label="Name" value={user.name} />
        <Field label="Email" value={user.email} />
        <Field label="Date of Birth" value={dateOfBirth} />
        <Field label="Role" value={user.role} />
        <Field label="Verification status" value={user.verificationStatus} />
      </div>
    );
  } else {
    return null;
  }
};

export default UserProfile;

/*     <div className={styles["profile_container"]}>
      <img src={user.imageSrc} width="200" height="200" alt=""></img>
      <Field label="Name" value={user.name} />
      <Field label="Email" value={user.email} />
      <Field label="Date of Birth" value={dateOfBirth} />
      <Field label="Role" value={user.role} />
      <Field label="Verification status" value={user.verificationStatus} />
    </div>*/
