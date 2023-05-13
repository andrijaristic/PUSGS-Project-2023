import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SellerProductListItem from "./SellerProductListItem";
import {
  clearSellerProducts,
  getProductImageAction,
  getProductsForLoggedInSellerAction,
} from "../../../store/productsSlice";
import { Container, CssBaseline, Grid } from "@mui/material";

const SellerProductsList = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const sellerProducts = useSelector((state) => state.products.sellerProducts);
  const sellerProductsLoaded = useSelector(
    (state) => state.products.sellerProductsLoaded
  );
  const productImages = useSelector((state) => state.products.productImages);

  useEffect(() => {
    clearSellerProducts();
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      return;
    }

    dispatch(getProductsForLoggedInSellerAction());
  }, [user, dispatch]);

  useEffect(() => {
    if (!sellerProductsLoaded) {
      return;
    }

    for (let i = 0; i < sellerProducts.length; i++) {
      const execute = async (index) => {
        await dispatch(getProductImageAction(sellerProducts[index].id));
      };

      execute(i);
    }
  }, [dispatch, sellerProductsLoaded, sellerProducts]);

  const items = sellerProducts.map((product) => {
    const image = productImages.find((image) => image.id === product.id);

    if (image) {
      return (
        <SellerProductListItem
          key={product.id}
          item={product}
          imgSrc={image.imageSrc}
        />
      );
    } else {
      return null;
    }
  });

  return (
    sellerProducts.length > 0 && (
      <Container
        margin="normal"
        component="main"
        maxWidth
        sx={{
          padding: 0,
          position: "static",
          display: "flex",
          alignItems: "center",
          ml: 20,
        }}
      >
        <CssBaseline />
        <Grid container sx={{ display: "flex", flexDirection: "row" }}>
          {items}
        </Grid>
      </Container>
    )
  );
};

export default SellerProductsList;
