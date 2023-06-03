import React from "react";
import { Box, Tooltip, IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import { useDispatch } from "react-redux";
import { verifySellerAction } from "../../store/verificationSlice";

const SellerListItemActions = (props) => {
  const dispatch = useDispatch();

  const verifyHandler = (verified) => {
    dispatch(verifySellerAction({ userId: props.id, verified: verified }));
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        minWidth: "20rem",
        maxWidth: "20rem",
      }}
    >
      {props.verified && (
        <>
          <Tooltip title={"Verify seller"}>
            <IconButton onClick={verifyHandler(true)}>
              <CheckIcon fontSize="large" />
            </IconButton>
          </Tooltip>
          <Tooltip title={"Decline seller"}>
            <IconButton onClick={verifyHandler(false)}>
              <CloseIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </>
      )}
      <Tooltip title={"View seller"}>
        <IconButton>
          <ContactPageIcon fontSize="large" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default SellerListItemActions;
