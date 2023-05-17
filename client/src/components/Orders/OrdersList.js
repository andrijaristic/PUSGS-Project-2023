import React from "react";
import OrderItem from "../Orders/OrderItem";
import { Card, Container, CssBaseline, Zoom } from "@mui/material";

const OrdersList = (props) => {
  const items = props.orders.map((order) => {
    return <OrderItem key={order.id} item={order} active={props.active} />;
  });

  return (
    <>
      {props.orders.length > 0 && (
        <Container component="main">
          <CssBaseline />
          <Zoom in={true}>
            <Card
              wrap="nowrap"
              sx={{
                border: 1,
                display: "flex",
                flexDirection: "column",
                minHeight: "50rem",
                maxHeight: "50rem",
                minWidth: "50rem",
                maxWidth: "100%",
                overflow: "auto",
                mt: 4,
              }}
            >
              {items}
            </Card>
          </Zoom>
        </Container>
      )}
    </>
  );
};

export default OrdersList;
