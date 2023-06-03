import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const AddProductAction = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const isBuyer = user && user.role === "BUYER";

  const clickHandler = () => {
    console.log(props.item);
    dispatch(addToCart(props.item));
  };

  return (
    <>
      {isBuyer && (
        <IconButton
          onClick={clickHandler}
          disabled={props.item && props.item.amount === 0}
          size="medium"
          sx={{ mt: -0.5, mb: 2, mr: 0, ml: 1 }}
        >
          <AddShoppingCartIcon />
        </IconButton>
      )}
    </>
  );
};

export default AddProductAction;
