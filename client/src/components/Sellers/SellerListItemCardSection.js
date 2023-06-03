import React from "react";
import { Grid, Box } from "@mui/material";

const SellerListItemCardSection = (props) => {
  return (
    <Grid
      item
      xs={props.xs}
      sx={{
        display: "flex",
        flexWrap: "auto",
        ...props.gridSx,
      }}
    >
      <Box
        sx={{
          minWidth: "4rem",
          minHeight: "100%",
          maxWidth: "16rem",
          ...props.sx,
        }}
      >
        {props.children}
      </Box>
    </Grid>
  );
};

export default SellerListItemCardSection;
