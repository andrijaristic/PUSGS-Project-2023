import React from "react";
import { Grid, Card, Zoom } from "@mui/material";
import OrderItemCardContent from "./OrderItemCardContent";

const OrderItem = (props) => {
  return (
    <Grid item>
      <Zoom in={true}>
        <Card
          sx={{
            m: 2,
            mb: 1,
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: 1,
          }}
        >
          <OrderItemCardContent
            id={props.id}
            item={{ ...props.item, imgSrc: props.imgSrc }}
            amount={props.amount}
            active={props.active}
          />
        </Card>
      </Zoom>
    </Grid>
  );
};

export default OrderItem;
