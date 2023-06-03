import React from "react";
import { Grid, Card, Zoom } from "@mui/material";
import SellerListItemCardContent from "./SellerListItemCardContent";

const SellerListItem = (props) => {
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
          <SellerListItemCardContent
            id={props.id}
            seller={props.seller}
            verified={props.verified}
          />
        </Card>
      </Zoom>
    </Grid>
  );
};

export default SellerListItem;
