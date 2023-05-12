import { Grid, Card, Zoom } from "@mui/material";
import React from "react";
import ProductListItemContent from "./ProductListItemContent";

const ProductListItem = (props) => {
  return (
    <Zoom in={true}>
      <Grid item>
        <Card
          sx={{
            m: 2,
            borderRadius: "4px",
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ProductListItemContent
            item={{ ...props.item, imgSrc: props.imgSrc }}
          />
        </Card>
      </Grid>
    </Zoom>
  );
};

export default ProductListItem;
