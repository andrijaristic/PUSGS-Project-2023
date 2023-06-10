import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductAction } from "../../../store/productsSlice";
import jwtDecode from "jwt-decode";

const SellerDeleteAction = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const { id: sellerId } = jwtDecode(token);

  const clickHandler = () => {
    dispatch(deleteProductAction(props.id));
  };

  return (
    <IconButton
      onClick={clickHandler}
      size="medium"
      sx={{ mt: -0.5, mb: 2, mr: 0, ml: 1 }}
    >
      <DeleteIcon />
    </IconButton>
  );
};

export default SellerDeleteAction;
