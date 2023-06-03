import React from "react";
import { Box, CardContent, Typography, Grid, InputLabel } from "@mui/material";
import SellerListItemActions from "./SellerListItemActions";
import SellerListItemCardSection from "./SellerListItemCardSection";

const SellerListItemCardContent = (props) => {
  if (props.seller) {
    return (
      <>
        <Box
          sx={{
            minWidth: "100%",
          }}
        >
          <CardContent>
            <Grid container direction="row" spacing={3} sx={{ flexGrow: 1 }}>
              <SellerListItemCardSection xs={8}>
                <InputLabel sx={{ fontSize: "20px" }}>Name</InputLabel>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  {props.seller.name}
                </Typography>
              </SellerListItemCardSection>
              <SellerListItemCardSection
                xs={4}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <SellerListItemActions
                  id={props.seller.id}
                  verified={props.verified}
                />
              </SellerListItemCardSection>
            </Grid>
          </CardContent>
        </Box>
      </>
    );
  } else {
    return null;
  }
};

export default SellerListItemCardContent;
