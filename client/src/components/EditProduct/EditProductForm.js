import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProductAction,
  restockProductAction,
} from "../../store/productsSlice";
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
  InputLabel,
} from "@mui/material";

import EditProductFormImageItem from "./EditProductFormImageItem";
import EditProductFormItem from "./EditProductFormItem";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

const EditProductForm = (props) => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.user.token);
  const { id: sellerId } = jwtDecode(token);

  const imageInput = useRef(null);
  const [displayImage, setDisplayImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [editable, setEditable] = useState(false);

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
    formData.append("id", props.product.id);

    const name = formData.get("name");
    const individualPrice = formData.get("individualPrice");
    const description = formData.get("description");

    if (!name || !individualPrice || isNaN(individualPrice) || !description) {
      toast.error("Please fill in all fields correctly", {
        position: "top-center",
        autoClose: 2500,
        closeOnClick: true,
        pauseOnHover: false,
      });
      return;
    }

    formData.append("sellerId", sellerId);
    if (uploadedImage !== null) {
      formData.append("image", uploadedImage);
    }

    dispatch(updateProductAction(formData));
  };

  const restockSubmitHandler = (event) => {
    event.preventDefault();

    const amount = document.getElementById("restockAmount").value;

    if (isNaN(amount)) {
      return;
    }

    const data = {
      id: props.product.id,
      amount,
      sellerId: sellerId,
    };

    dispatch(restockProductAction(data));
  };

  if (props.product) {
    return (
      <Container>
        <CssBaseline />
        <Zoom in={true}>
          <Box
            component="form"
            onSubmit={submitHandler}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "65vh",
            }}
          >
            <Grid
              container
              spacing={2}
              direction="column"
              wrap="nowrap"
              sx={{ overflow: "auto" }}
            >
              <Grid item>
                <Card sx={{ p: 1, border: 1, display: "flex" }}>
                  <EditProductFormImageItem
                    disabled={editable}
                    image={
                      displayImage
                        ? displayImage
                        : props.image
                        ? props.image.imageSrc
                        : null
                    }
                    imageInput={imageInput}
                    uploadHandler={imageChangeHandler}
                    avatarClickHandler={imageUploadHandler}
                  ></EditProductFormImageItem>
                  <Box sx={{ ml: 2, width: "100%" }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Switch onChange={editEnableHandler} color="warning" />
                      <InputLabel>{"Enable product editing"}</InputLabel>
                    </Box>
                    <EditProductFormItem
                      id="name"
                      label="Product name"
                      initialValue={props.product.name}
                      editable={editable}
                    ></EditProductFormItem>

                    <EditProductFormItem
                      id="individualPrice"
                      label="Individual item price"
                      type="number"
                      initialValue={props.product.individualPrice}
                      editable={editable}
                      inputProps={true}
                    ></EditProductFormItem>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Grid container spacing={2} sx={{ display: "flex" }}>
                        <Grid item xs={3}>
                          <EditProductFormItem
                            id="amount"
                            label="Current amount"
                            initialValue={props.product.amount}
                            value={props.product.amount}
                            editable={false}
                            sx={{ mr: 2 }}
                          ></EditProductFormItem>
                        </Grid>

                        <Grid item xs>
                          <EditProductFormItem
                            id="restockAmount"
                            label="Amount to be added"
                            initialValue={0}
                            type="number"
                            editable={editable}
                          ></EditProductFormItem>
                        </Grid>
                      </Grid>

                      <Button
                        color="secondary"
                        variant="contained"
                        onClick={restockSubmitHandler}
                        disabled={!editable}
                        sx={{
                          mt: 1,
                          mb: 2,
                          ml: "auto",
                          border: 1,
                          width: "40%",
                          ":hover": {
                            bgcolor: "#e0dcdc",
                          },
                        }}
                      >
                        Restock products
                      </Button>
                    </Box>
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={1}>
                <Box>
                  <Card sx={{ p: 2, border: 1 }}>
                    <EditProductFormItem
                      id="description"
                      label="Description"
                      multiline={true}
                      rows={4}
                      initialValue={props.product.description}
                      editable={editable}
                    ></EditProductFormItem>
                  </Card>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      color="secondary"
                      variant="contained"
                      type="submit"
                      disabled={!editable}
                      sx={{
                        mt: 1,
                        mb: 2,
                        border: 1,
                        ":hover": {
                          bgcolor: "#e0dcdc",
                        },
                      }}
                    >
                      Update product information
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Zoom>
      </Container>
    );
  } else {
    return <LoadingModal show={true} />;
  }
};

export default EditProductForm;
