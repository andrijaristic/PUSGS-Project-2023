import React from "react";
import {
  Box,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Divider,
} from "@mui/material";
import SellerEditAction from "./SellerProducts/SellerEditAction";

const ProductListItemContent = (props) => {
  return (
    <>
      <Box
        sx={{
          width: 400,
        }}
      >
        <CardMedia
          component="img"
          alt="alt text"
          image={props.item.imgSrc}
          height="150"
          sx={{
            objectFit: "contain",
          }}
        ></CardMedia>
        <Divider />
        <CardContent>
          <Grid container direction="row" spacing={2}>
            <Grid item>
              <Typography gutterBottom variant="h5" component="div">
                {props.item.name}
              </Typography>
              <Typography
                gutterBottom
                variant="body1"
                component="div"
                sx={{ mt: -1, fontSize: "0.8rem", fontStyle: "italic" }}
              >
                {`(${props.item.amount} articles left)`}
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                flexGrow: 1,
                justifyContent: "right",
              }}
            >
              <Typography variant="h5" component="div">
                {`$${props.item.individualPrice}`}
              </Typography>
              {props.showSellerActions && (
                <SellerEditAction id={props.item.id} />
              )}
            </Grid>
          </Grid>
          <Divider />
          <Grid item>
            <Typography gutterBottom variant="body2" component="div">
              {props.item.description}
            </Typography>
          </Grid>
        </CardContent>
      </Box>
    </>
  );
};

export default ProductListItemContent;
