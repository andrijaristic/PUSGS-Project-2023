import React, { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  CssBaseline,
  Grid,
  InputLabel,
  TextField,
  Typography,
  Zoom,
} from "@mui/material";
import EuroIcon from "@mui/icons-material/Euro";
import DetailedOrderListItem from "./DetailedOrderListItem";
import { useDispatch, useSelector } from "react-redux";
import { getProductImageAction } from "../../store/productsSlice";
import LoadingModal from "../UI/Modal/LoadingModal";
import { useLocation, useNavigate } from "react-router-dom";

const DetailedOrderList = (props) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const nav = useNavigate();
  const productImages = useSelector((state) => state.products.productImages);

  const isBuyer = !props.admin && !props.seller;

  useEffect(() => {
    if (!props.order) {
      return;
    }

    for (let i = 0; i < props.order.products.length; i++) {
      const execute = async (index) => {
        dispatch(getProductImageAction(props.order.products[index].product.id));
      };

      execute(i);
    }
  }, [dispatch, props.order]);

  let content;
  if (props.order) {
    content = props.order.products.map((item) => {
      const image = productImages.find((image) => image.id === item.product.id);

      return (
        <DetailedOrderListItem
          key={item.id}
          id={item.id}
          item={item}
          imgSrc={image ? image.imageSrc : ""}
          admin={props.admin}
          seller={props.seller}
        />
      );
    });
  }

  const viewBuyerHandler = () => {
    nav(`${pathname}/buyer/${props.order.buyerId}`);
  };

  if (props.order) {
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
              <Box>
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
                  <InputLabel sx={{ fontSize: "20px", mb: -1 }}>
                    Price
                  </InputLabel>
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
                      {props.order.price}
                    </Box>
                  </Typography>
                  <TextField
                    margin="normal"
                    disabled
                    fullWidth
                    value={props.order.deliveryAddress}
                    key="address"
                    id="address"
                    label="Delivery address"
                    name="address"
                  ></TextField>
                  <TextField
                    margin="normal"
                    disabled
                    fullWidth
                    value={props.order.comment}
                    key="comment"
                    id="comment"
                    label="Comment"
                    name="comment"
                    multiline
                    rows={4}
                  ></TextField>
                  <TextField
                    margin="normal"
                    disabled
                    fullWidth
                    value={props.order.status}
                    key="status"
                    id="status"
                    label="STATUS"
                    name="status"
                  ></TextField>
                  {!isBuyer && (
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={viewBuyerHandler}
                      sx={{
                        mt: 1,
                        mb: 2,
                        border: 1,
                        width: "100%",
                        ":hover": {
                          bgcolor: "#e0dcdc",
                        },
                      }}
                    >
                      VIEW BUYER
                    </Button>
                  )}
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Zoom>
      </Container>
    );
  } else {
    return <LoadingModal show={true} />;
  }
};

export default DetailedOrderList;
