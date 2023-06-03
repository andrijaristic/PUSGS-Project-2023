import React from "react";
import { Card, Container, CssBaseline, Zoom } from "@mui/material";
import SellerListItem from "./SellerListItem";

const SellerList = (props) => {
  const items = props.sellers.map((seller) => {
    return (
      <SellerListItem
        key={seller.id}
        id={seller.id}
        seller={seller}
        verified={props.verified}
      />
    );
  });

  return (
    <>
      {props.sellers.length > 0 && (
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

export default SellerList;
