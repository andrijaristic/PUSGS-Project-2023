import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Zoom,
} from "@mui/material";
import EuroSymbolIcon from "@mui/icons-material/EuroSymbol";
import { useDispatch, useSelector } from "react-redux";
import NewProductFormImageItem from "../NewProduct/NewProductFormImageItem";
import { createNewProductAction } from "../../store/productsSlice";
import jwtDecode from "jwt-decode";

const NewProductForm = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.user.token);
  const { id } = jwtDecode(token);

  const [isNameValid, setIsNameValid] = useState(false);
  const [isNameTouched, setIsNameTouched] = useState(false);
  const [isAmountValid, setIsAmountValid] = useState(false);
  const [isAmountTouched, setIsAmountTouched] = useState(false);
  const [isPriceValid, setIsPriceValid] = useState(false);
  const [isPriceTouched, setIsPriceTouched] = useState(false);
  const [isDescriptionValid, setIsDescriptionValid] = useState(false);
  const [isDescriptionTouched, setIsDescriptionTouched] = useState(false);

  const imageInput = useRef(null);
  const [displayImage, setDisplayImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const nameChangeHandler = (event) => {
    setIsNameValid(event.target.value.trim().length > 0);
  };

  const nameBlurHandler = () => {
    setIsNameTouched(true);
  };

  const amountChangeHandler = (event) => {
    setIsAmountValid(!isNaN(event.target.value) && event.target.value > 0);
  };

  const amountBlurHandler = () => {
    setIsAmountTouched(true);
  };

  const priceChangeHandler = (event) => {
    setIsPriceValid(!isNaN(event.target.value) && event.target.value > 0);
  };

  const priceBlurHandler = () => {
    setIsPriceTouched(true);
  };

  const descriptionChangeHandler = (event) => {
    setIsDescriptionValid(event.target.value.trim().length > 0);
  };

  const descriptionBlurHandler = () => {
    setIsDescriptionTouched(true);
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
    const name = formData.get("name");
    const amount = formData.get("amount");
    const price = formData.get("individualPrice");
    const description = formData.get("description");

    if (
      name == null ||
      amount == null ||
      price == null ||
      description == null
    ) {
      return;
    }

    formData.append("sellerId", id);

    if (uploadedImage !== null) {
      formData.append("image", uploadedImage);
    }

    dispatch(createNewProductAction(formData));
  };

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
                <NewProductFormImageItem
                  image={displayImage}
                  imageInput={imageInput}
                  uploadHandler={imageChangeHandler}
                  avatarClickHandler={imageUploadHandler}
                />
                <Box>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    key="name"
                    id="name"
                    label="Name"
                    name="name"
                    error={isNameTouched && !isNameValid}
                    onChange={nameChangeHandler}
                    onBlur={nameBlurHandler}
                    autoComplete="off"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    type="number"
                    key="amount"
                    id="amount"
                    label="Amount"
                    name="amount"
                    error={isAmountTouched && !isAmountValid}
                    onChange={amountChangeHandler}
                    onBlur={amountBlurHandler}
                    autoComplete="off"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    key="individualPrice"
                    id="individualPrice"
                    label="Individual price"
                    name="individualPrice"
                    error={isPriceTouched && !isPriceValid}
                    onChange={priceChangeHandler}
                    onBlur={priceBlurHandler}
                    autoComplete="off"
                    InputProps={{
                      startAdornment: (
                        <EuroSymbolIcon position="start"></EuroSymbolIcon>
                      ),
                    }}
                  />
                </Box>
              </Card>
            </Grid>
            <Grid item xs={1}>
              <Box>
                <Card sx={{ p: 2, border: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    multiline
                    rows={4}
                    key="description"
                    id="description"
                    label="Description"
                    name="description"
                    error={isDescriptionTouched && !isDescriptionValid}
                    onChange={descriptionChangeHandler}
                    onBlur={descriptionBlurHandler}
                    autoComplete="off"
                  />
                </Card>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    color="secondary"
                    size="large"
                    type="submit"
                    variant="contained"
                    disabled={
                      !isNameValid ||
                      !isAmountValid ||
                      !isPriceValid ||
                      !isDescriptionValid
                    }
                    sx={{
                      mt: 1,
                      mb: 2,
                      border: 1,
                      ":hover": {
                        bgcolor: "#e0dcdc",
                      },
                    }}
                  >
                    Create new product
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Zoom>
    </Container>
  );
};

export default NewProductForm;
