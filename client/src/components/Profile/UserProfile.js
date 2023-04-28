import React, { useContext } from "react";
import UserContext from "../../store/user-context";

import Field from "../UI/Field/Field";
import styles from "../Profile/UserProfile.module.css";

const UserProfile = () => {
  const ctx = useContext(UserContext);
  const dateOfBirth = new Date(ctx.user.dateOfBirth)
    .toLocaleString("en-GB")
    .split(",")[0];

  return (
    <div className={styles["profile_container"]}>
      <img src={ctx.user.image} width="200" height="200" alt=""></img>
      <Field label="Name" value={ctx.user.name} />
      <Field label="Email" value={ctx.user.email} />
      <Field label="Date of Birth" value={dateOfBirth} />
      <Field label="Role" value={ctx.user.role} />
      <Field label="Verification status" value={ctx.user.verificationStatus} />
    </div>
  );
};

export default UserProfile;
