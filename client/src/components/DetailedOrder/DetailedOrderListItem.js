import React from "react";
import { Grid, Card, Zoom } from "@mui/material";
import DetailedOrderListItemCardContent from "./DetailedOrderListItemCardContent";

const DetailedOrderListItem = (props) => {
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
          <DetailedOrderListItemCardContent
            id={props.id}
            item={{ ...props.item, imgSrc: props.imgSrc }}
            admin={props.admin}
            seller={props.seller}
          />
        </Card>
      </Zoom>
    </Grid>
  );
};

export default DetailedOrderListItem;
