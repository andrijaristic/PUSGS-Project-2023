import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProductsAction,
  getProductImageAction,
} from "../../store/productsSlice";
import { getUserInformationAction } from "../../store/userSlice";
import ProductListItem from "./ProductListItem";
import { Container, CssBaseline, Grid } from "@mui/material";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const productImages = useSelector((state) => state.products.productImages);
  const productsLoaded = useSelector((state) => state.products.productsLoaded);

  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    if (userLoaded) {
      return;
    }

    setUserLoaded(true);
    dispatch(getUserInformationAction());
  }, [dispatch, userLoaded]);

  useEffect(() => {
    if (!userLoaded) {
      return;
    }

    dispatch(getAllProductsAction());
  }, [dispatch, userLoaded]);

  useEffect(() => {
    if (!productsLoaded) {
      return;
    }

    for (let i = 0; i < products.length; i++) {
      const execute = async (index) => {
        await dispatch(getProductImageAction(products[index].id));
      };

      execute(i);
    }
  }, [dispatch, products, productsLoaded]);

  let index = 0;
  const items = products.map((product) => {
    return (
      <ProductListItem
        key={product.id}
        item={product}
        imgSrc={productImages[index++]}
      />
    );
  });

  return (
    products.length > 0 && (
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

export default ProductList;
