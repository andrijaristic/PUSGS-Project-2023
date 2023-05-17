import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutItem from "../Checkout/CheckoutItem";
import {
  Box,
  Card,
  Container,
  CssBaseline,
  Grid,
  InputLabel,
  TextField,
  Typography,
  Zoom,
  FormHelperText,
  Button,
} from "@mui/material";
import EuroIcon from "@mui/icons-material/Euro";
import { clearCart } from "../../store/cartSlice";
import { getProductImageAction } from "../../store/productsSlice";
import { createOrderAction } from "../../store/ordersSlice";

const CheckoutList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart.items);
  const cartPrice = useSelector((state) => state.cart.price);
  const productImages = useSelector((state) => state.products.productImages);
  const apiState = useSelector((state) => state.orders.apiState);

  const [isAddressValid, setIsAddressValid] = useState(false);
  const [isAddressTouched, setIsAddressTouched] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    for (let i = 0; i < items.length; i++) {
      const execute = async (index) => {
        dispatch(getProductImageAction(items[index].id));
      };

      execute(i);
    }
  }, [dispatch, items]);

  const addressChangeHandler = (event) => {
    setIsAddressValid(event.target.value.trim().length > 0);
  };

  const addressBlurHandler = () => {
    setIsAddressTouched(true);
  };

  const clearCartHandler = () => {
    dispatch(clearCart());
  };

  const content = items.map((item) => {
    const image = productImages.find((image) => image.id === item.id);

    return (
      <CheckoutItem
        key={item.id}
        id={item.id}
        item={item.item}
        imgSrc={image ? image.imageSrc : ""}
        amount={item.amount}
      />
    );
  });

  const submitHandler = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const deliveryAddress = formData.get("address");
    const comment = formData.get("comment");

    if (!deliveryAddress) {
      return;
    }

    const data = {
      deliveryAddress,
      comment,
      price: cartPrice,
      products: items.map((item) => {
        return {
          productId: item.item.id,
          amount: item.amount,
          itemPrice: item.item.individualPrice,
        };
      }),
    };

    dispatch(createOrderAction(data));
    setRequestSent(true);
  };

  useEffect(() => {
    if (!requestSent) {
      return;
    }

    if (apiState !== "COMPLETED") {
      return;
    }

    // Just in time for toast notification to drop
    setTimeout(() => {
      dispatch(clearCart());
    }, 500);
    navigate("/active-orders");
  }, [dispatch, navigate, requestSent, apiState]);

  return (
    <Container component="main">
      <CssBaseline />
      <Zoom in={true}>
        <Grid
          container
          justifyContent="center"
          spacing={2}
          sx={{ display: "flex", flexDirection: "row", minWidth: "90rem" }}
        >
          <Grid
            item
            sx={{
              minWidth: "50rem",
              overflow: "auto",
            }}
          >
            <Card
              wrap="nowrap"
              sx={{
                border: 1,
                display: "flex",
                flexDirection: "column",
                minHeight: "40rem",
                maxHeight: "40rem",
                minWidth: "50rem",
                maxWidth: "50rem",
                overflow: "auto",
                mt: 4,
              }}
            >
              {content}
            </Card>
          </Grid>
          <Grid
            item
            sx={{
              minWidth: "30rem",
            }}
          >
            <Box component="form" onSubmit={submitHandler}>
              <Card
                sx={{
                  mt: 4,
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "4px",
                  border: 1,
                  width: "100%",
                  maxWidth: "100%",
                  maxHeight: "30rem",
                  minHeight: "30rem",
                }}
              >
                <InputLabel sx={{ fontSize: "20px", mb: -1 }}>Price</InputLabel>
                <Typography
                  sx={{
                    fontSize: "36px",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <EuroIcon fontSize="small" />
                    {cartPrice ? cartPrice.toFixed(2) : 0}
                  </Box>
                  <FormHelperText sx={{ mt: -1.4 }}>
                    {"* Delivery fee not included"}
                  </FormHelperText>
                </Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  key="address"
                  id="address"
                  label="Delivery address"
                  name="address"
                  error={isAddressTouched && !isAddressValid}
                  onChange={addressChangeHandler}
                  onBlur={addressBlurHandler}
                ></TextField>
                <TextField
                  margin="normal"
                  fullWidth
                  key="comment"
                  id="comment"
                  label="Comment"
                  name="comment"
                  multiline
                  rows={4}
                ></TextField>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: "auto",
                  }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={clearCartHandler}
                    sx={{
                      mt: 3.8,
                      mr: "auto",
                      border: 1,
                      ":hover": {
                        bgcolor: "#e0dcdc",
                      },
                    }}
                  >
                    {"Clear cart"}
                  </Button>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <FormHelperText sx={{ pt: 0 }}>
                      {"* Delivery address is required"}
                    </FormHelperText>
                    <Button
                      variant="contained"
                      color="secondary"
                      type="submit"
                      disabled={!isAddressValid}
                      sx={{
                        mt: 1,
                        border: 1,
                        ":hover": {
                          bgcolor: "#e0dcdc",
                        },
                      }}
                    >
                      {"Complete purchase"}
                    </Button>
                  </Box>
                </Box>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Zoom>
    </Container>
  );
};

export default CheckoutList;
