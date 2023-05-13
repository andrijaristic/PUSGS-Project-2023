import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

const SellerEditAction = (props) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`/my-products/${props.id}/edit`);
  };

  return (
    <IconButton
      onClick={clickHandler}
      size="medium"
      sx={{ mt: -0.5, mb: 2, mr: 0, ml: 1 }}
    >
      <EditIcon />
    </IconButton>
  );
};

export default SellerEditAction;
