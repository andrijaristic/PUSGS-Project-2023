import React from "react";
import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrderAction } from "../../store/ordersSlice";
import { useLocation, useNavigate } from "react-router-dom";

const OrderItemActions = (props) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const nav = useNavigate();
  const user = useSelector((state) => state.user.user);
  const isBuyer = user.role === "BUYER";

  const cancelOrderHandler = () => {
    dispatch(cancelOrderAction({ orderId: props.id }));
  };

  const viewOrderHandler = () => {
    nav(`${pathname}/${props.id}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Button
        variant="contained"
        color="secondary"
        onClick={viewOrderHandler}
        sx={{
          mt: 1,
          border: 1,
          ":hover": {
            bgcolor: "#e0dcdc",
          },
        }}
      >
        View order
      </Button>
      {isBuyer && props.active && (
        <Button
          variant="contained"
          color="secondary"
          onClick={cancelOrderHandler}
          sx={{
            mt: 1,
            ml: 2,
            border: 1,
            ":hover": {
              bgcolor: "warning",
              color: "#fff",
              border: 1,
              borderColor: "#000",
              outline: "none",
            },
          }}
        >
          Cancel order
        </Button>
      )}
    </Box>
  );
};

export default OrderItemActions;
