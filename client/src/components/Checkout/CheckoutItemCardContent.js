import React from "react";
import {
  Box,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Divider,
  FormHelperText,
  IconButton,
  Tooltip,
} from "@mui/material";
import EuroIcon from "@mui/icons-material/Euro";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { useDispatch } from "react-redux";
import { decrease, increase, removeFromCart } from "../../store/cartSlice";

const CheckoutItemCardContent = (props) => {
  const dispatch = useDispatch();

  const increaseHandler = () => {
    dispatch(increase(props.item));
  };

  const decreaseHandler = () => {
    dispatch(decrease(props.item));
  };

  const removeHandler = () => {
    dispatch(removeFromCart(props.item));
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
                {props.item.name}
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
                  {`${(props.item.individualPrice * props.amount).toFixed(2)}`}
                </Typography>
                <FormHelperText sx={{ fontStyle: "italic", ml: 1, mt: 1 }}>
                  {`(${props.amount} / € ${props.item.individualPrice} each)`}
                </FormHelperText>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  minWidth: "20rem",
                  maxWidth: "20rem",
                }}
              >
                <Tooltip title={"Increase quantity (1)"}>
                  <IconButton onClick={increaseHandler}>
                    <AddIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Decrease quantity (1)"}>
                  <IconButton onClick={decreaseHandler}>
                    <RemoveIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Remove from cart"}>
                  <IconButton onClick={removeHandler}>
                    <RemoveShoppingCartIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Box>
    </>
  );
};

export default CheckoutItemCardContent;
