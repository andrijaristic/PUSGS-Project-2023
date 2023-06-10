import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductByIdAction,
  clearEditProduct,
  getProductImageAction,
  updateProductAction,
  restockProductAction,
} from "../../store/productsSlice";
import { useParams } from "react-router-dom";
import LoadingModal from "../UI/Modal/LoadingModal";
import {
  Box,
  Button,
  Card,
  Container,
  CssBaseline,
  Grid,
  Switch,
  Zoom,
} from "@mui/material";
import EditProductFormImageItem from "./EditProductFormImageItem";
import EditProductFormItem from "./EditProductFormItem";
import jwtDecode from "jwt-decode";

const EditProductForm = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.user.token);
  const { id: sellerId } = jwtDecode(token);

  const params = useParams();
  const imageInput = useRef(null);
  const [displayImage, setDisplayImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [editable, setEditable] = useState(false);
  const editProduct = useSelector((state) => state.products.editProduct);
  const productImages = useSelector((state) => state.products.productImages);
  const id = params.productId || "";

  useEffect(() => {
    dispatch(clearEditProduct());
  }, [dispatch]);

  useEffect(() => {
    const execute = async () => {
      dispatch(getProductByIdAction(id));
      dispatch(getProductImageAction(id));
    };

    execute();
  }, [dispatch, id]);

  const editEnableHandler = (event) => {
    setEditable((editState) => !editState);
  };

  const imageUploadHandler = () => {
    if (!imageInput.current) {
      return;
    }

    imageInput.current.children[0].click();
  };

  const imageChangeHandler = (event) => {
    if (!event.target.files) {
      return;
    }

    const file = event.target.files[0];
    const reader = new FileReader();
    if (file) {
      setUploadedImage(file);
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setDisplayImage(reader.result.toString());
      };
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    formData.delete("amount");
    formData.append("id", editProduct.id);

    const individualPrice = formData.get("individualPrice");
    const description = formData.get("description");

    if (!individualPrice || isNaN(individualPrice) || !description) {
      return;
    }

    formData.append("sellerId", sellerId);
    if (uploadedImage !== null) {
      formData.append("image", uploadedImage);
    }

    console.log(formData);
    dispatch(updateProductAction(formData));
  };

  const restockSubmitHandler = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const amount = formData.get("restockAmount");
    if (isNaN(amount)) {
      return;
    }

    const data = {
      id: editProduct.id,
      amount,
      sellerId: sellerId,
    };

    dispatch(restockProductAction(data));
  };

  if (editProduct) {
    return (
      <Container
        margin="normal"
        component="main"
        sx={{
          position: "static",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <CssBaseline />
        <Zoom in={true}>
          <Grid container spacing={2}>
            <Grid item>
              <Card
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  bgcolor: "black",
                }}
              >
                <Switch onChange={editEnableHandler} color="warning" />
                <EditProductFormImageItem
                  disabled={editable}
                  image={
                    displayImage
                      ? displayImage
                      : productImages[0]
                      ? productImages[0].imageSrc
                      : null
                  }
                  imageInput={imageInput}
                  uploadHandler={imageChangeHandler}
                  avatarClickHandler={imageUploadHandler}
                ></EditProductFormImageItem>
              </Card>
            </Grid>
            <Grid item>
              <Card
                wrap="nowrap"
                sx={{
                  height: "32rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "20rem",
                  overflow: "auto",
                }}
              >
                <Box component="form" onSubmit={submitHandler} sx={{ mt: 2 }}>
                  <EditProductFormItem
                    id="name"
                    label="Product name"
                    initialValue={editProduct.name}
                    editable={editable}
                  ></EditProductFormItem>
                  <EditProductFormItem
                    id="individualPrice"
                    label="Individual item price"
                    type="number"
                    initialValue={editProduct.individualPrice}
                    editable={editable}
                  ></EditProductFormItem>
                  <EditProductFormItem
                    id="description"
                    label="Description"
                    multiline={true}
                    initialValue={editProduct.description}
                    editable={editable}
                  ></EditProductFormItem>
                  <Button
                    color="secondary"
                    variant="contained"
                    type="submit"
                    disabled={!editable}
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
                    Update product information
                  </Button>
                </Box>

                <Box component="form" onSubmit={restockSubmitHandler}>
                  <EditProductFormItem
                    id="amount"
                    label="Current amount"
                    initialValue={editProduct.amount}
                    value={editProduct.amount}
                    editable={false}
                  ></EditProductFormItem>
                  <EditProductFormItem
                    id="restockAmount"
                    label="Amount to be added"
                    initialValue={0}
                    type="number"
                    editable={editable}
                  ></EditProductFormItem>
                  <Button
                    color="secondary"
                    variant="contained"
                    type="submit"
                    disabled={!editable}
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
                    Restock
                  </Button>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Zoom>
      </Container>
    );
  } else {
    return <LoadingModal show={true} />;
  }
};

export default EditProductForm;
