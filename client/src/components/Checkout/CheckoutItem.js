import React from "react";
import { Grid, Card, Zoom } from "@mui/material";
import CheckoutItemCardContent from "./CheckoutItemCardContent";

const CheckoutItem = (props) => {
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
          }}
        >
          <CheckoutItemCardContent
            id={props.id}
            item={{ ...props.item, imgSrc: props.imgSrc }}
            amount={props.amount}
          />
        </Card>
      </Zoom>
    </Grid>
  );
};

export default CheckoutItem;
