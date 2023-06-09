import React from "react";
import { Box, Tooltip, IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import { useDispatch } from "react-redux";
import { verifySellerAction } from "../../store/verificationSlice";
import { useLocation, useNavigate } from "react-router-dom";

const SellerListItemActions = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { pathname } = location;
  const nav = useNavigate();

  const buttonProps = (value) => ({
    onClick: () => {
      dispatch(verifySellerAction({ userId: props.id, verified: value }));
    },
  });

  const viewSellerHandler = () => {
    nav(`${pathname}/${props.id}`);
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
      {!props.verified && (
        <>
          <Tooltip title={"Verify seller"}>
            <IconButton {...buttonProps(true)}>
              <CheckIcon fontSize="large" />
            </IconButton>
          </Tooltip>
          <Tooltip title={"Decline seller"}>
            <IconButton {...buttonProps(false)}>
              <CloseIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </>
      )}
      <Tooltip title={"View seller"}>
        <IconButton onClick={viewSellerHandler}>
          <ContactPageIcon fontSize="large" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default SellerListItemActions;
