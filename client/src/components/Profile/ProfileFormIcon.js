import React from "react";
import PendingIcon from "@mui/icons-material/Pending";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import CancelIcon from "@mui/icons-material/Cancel";
import { Box, Tooltip } from "@mui/material";

const pendingIcon = (
  <>
    <Tooltip title={<h2>{"Verification pending"}</h2>}>
      <PendingIcon fontsize="large" color="warning" />
    </Tooltip>
  </>
);

const verifiedIcon = (
  <>
    <Tooltip title={<h2>{"Verified seller"}</h2>}>
      <VerifiedUserIcon fontSize="large" color="success" />
    </Tooltip>
  </>
);

const rejectedIcon = (
  <>
    <Tooltip title={<h2>{"Rejected seller"}</h2>}>
      <CancelIcon fontSize="large" color="error" />
    </Tooltip>
  </>
);

const ProfileFormIcon = (props) => {
  const icon =
    props.verificationStatus !== undefined &&
    ((props.verificationStatus === "PENDING" && pendingIcon) ||
      (props.verificationStatus === "ACCEPTED" && verifiedIcon) ||
      (props.verificationStatus === "DENIED" && rejectedIcon));

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      {icon}
    </Box>
  );
};

export default ProfileFormIcon;
