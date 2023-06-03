import React from "react";
import {
  Box,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Divider,
  FormHelperText,
  Button,
} from "@mui/material";
import EuroIcon from "@mui/icons-material/Euro";
import { useLocation, useNavigate } from "react-router-dom";

const DetailedOrderListItemCardContent = (props) => {
  const nav = useNavigate();
  const { pathname } = useLocation();

  const viewSellerHandler = () => {
    nav(`${pathname}/seller/${props.item.product.sellerId}`);
  };

  return (
    <>
      <Box
        sx={{
          minWidth: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <CardMedia
          component="img"
          alt="alt text"
          image={props.item.imgSrc}
          sx={{
            width: "100px",
            height: "100px",
            objectFit: "contain",
          }}
        ></CardMedia>
        <Divider />
        <CardContent>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography gutterBottom variant="h5" component="div">
                {props.item.product.name}
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                mt: -3,
                display: "flex",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  width: "20rem",
                  maxWidth: "20rem",
                }}
              >
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <EuroIcon fontSize="small" />
                  {`${props.item.itemPrice.toFixed(2)}`}
                </Typography>
                <FormHelperText sx={{ fontStyle: "italic", ml: 1, mt: 1 }}>
                  {`(${props.item.amount} / € ${
                    props.item.itemPrice / props.item.amount
                  } each)`}
                </FormHelperText>
              </Box>
              {props.admin && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    minWidth: "20rem",
                    maxWidth: "20rem",
                  }}
                >
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={viewSellerHandler}
                    sx={{
                      mt: 1,
                      mb: 2,
                      border: 1,
                      width: "50%",
                      ":hover": {
                        bgcolor: "#e0dcdc",
                      },
                    }}
                  >
                    VIEW SELLER
                  </Button>
                </Box>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Box>
    </>
  );
};

export default DetailedOrderListItemCardContent;
