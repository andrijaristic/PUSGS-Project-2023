import React from "react";
import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { cancelOrderAction } from "../../store/ordersSlice";

const OrderItemActions = (props) => {
  const dispatch = useDispatch();

  const cancelOrderHandler = () => {
    dispatch(cancelOrderAction({ orderId: props.id }));
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        variant="contained"
        color="secondary"
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
    </Box>
  );
};

export default OrderItemActions;
