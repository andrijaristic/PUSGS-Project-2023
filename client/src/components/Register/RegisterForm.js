import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { registerAction } from "../../store/userSlice";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Fade,
  MenuItem,
  TextField,
  Zoom,
} from "@mui/material";
import RegisterFormImageItem from "./RegisterFormImage";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import styles from "../Register/RegisterForm.module.css";
import { toast } from "react-toastify";

const USER_TYPES = ["BUYER", "SELLER"];

const RegisterForm = () => {
  const dispatch = useDispatch();
  const imageInput = useRef(null);

  const [secondaryInformation, setSecondaryInformation] = useState(false);
  const [addImage, setAddImage] = useState(false);

  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isUsernameTouched, setIsUsernameTouched] = useState(false);

  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);

  const [isConfirmPasswordValid, setIsConfirmedPasswordValid] = useState(false);
  const [isConfirmPasswordTouched, setIsConfirmPasswordTouched] =
    useState(false);
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(false);

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isEmailTouched, setIsEmailTouched] = useState(false);

  const [isNameValid, setIsNameValid] = useState(false);
  const [isNameTouched, setIsNameTouched] = useState(false);

  const [isAddressValid, setIsAddressValid] = useState(false);
  const [isAddressTouched, setIsAddressTouched] = useState(false);

  const [isUserTypeValid, setIsUserTypeValid] = useState(false);
  const [isUserTypeTouched, setIsUserTypeTouched] = useState(false);

  const [date, setDate] = useState(null);
  const [isDateValid, setIsDateValid] = useState(false);
  const [isDateTouched, setIsDateTouched] = useState(false);

  const [displayImage, setDisplayImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const roles = USER_TYPES.map((item) => {
    return (
      <MenuItem key={item} value={item}>
        {item}
      </MenuItem>
    );
  });

  const usernameChangeHandler = (event) => {
    setIsUsernameValid(
      event.target.value !== "" && event.target.value.trim().length >= 5
    );
  };

  const usernameBlurHandler = () => {
    setIsUsernameTouched(true);
  };

  const passwordChangeHandler = (event) => {
    setIsPasswordValid(
      event.target.value !== "" && event.target.value.trim().length >= 5
    );
    setDoPasswordsMatch(true);
  };

  const passwordBlurHandler = () => {
    setIsPasswordTouched(true);
  };

  const confirmPasswordChangeHandler = (event) => {
    setIsConfirmedPasswordValid(
      event.target.value !== "" && event.target.value.trim().length >= 5
    );
    setDoPasswordsMatch(true);
  };

  const confirmPasswordBlurHandler = () => {
    setIsConfirmPasswordTouched(true);
  };

  const emailChangeHandler = (event) => {
    setIsEmailValid(event.target.value !== "");
  };

  const emailBlurHandler = () => {
    setIsEmailTouched(true);
  };

  const nameChangeHandler = (event) => {
    setIsNameValid(event.target.value !== "");
  };

  const nameBlurHandler = () => {
    setIsNameTouched(true);
  };

  const addressChangeHandler = (event) => {
    setIsAddressValid(event.target.value !== "");
  };

  const addressBlurHandler = () => {
    setIsAddressTouched(true);
  };

  const dateChangeHandler = (value) => {
    setDate(value);
    setIsDateTouched(true);
    setIsDateValid(value < new Date());
  };

  const userTypeChangeHandler = (event) => {
    setIsUserTypeValid(event.target.value !== "");
  };

  const userTypeBlurHandler = () => {
    setIsUserTypeTouched(true);
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
    const username = formData.get("username");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");
    const email = formData.get("email");
    const name = formData.get("name");
    const address = formData.get("address");
    const userType = formData.get("role");
    if (
      username == null ||
      password == null ||
      confirmPassword == null ||
      email == null ||
      name == null ||
      date == null ||
      address == null ||
      userType == null
    ) {
      return;
    }

    if (password !== confirmPassword) {
      setDoPasswordsMatch(false);
      setIsPasswordValid(false);
      setIsConfirmedPasswordValid(false);

      toast.error("Passwords don't match", {
        position: "top-center",
        autoClose: 2500,
        closeOnClick: true,
        pauseOnHover: false,
      });

      return;
    }
    if (uploadedImage !== null) {
      formData.append("image", uploadedImage);
    }

    formData.append("dateOfBirth", date.toISOString());

    dispatch(registerAction(formData));
  };

  const registrationForwardHandler = () => {
    setSecondaryInformation(true);
  };

  const registrationBackwardHandler = () => {
    setSecondaryInformation(false);
  };

  const registrationImageForwardHandler = () => {
    setAddImage(true);
  };

  const registrationImageBackwardHandler = () => {
    setAddImage(false);
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ position: "static" }}>
      <CssBaseline />
      <Zoom in={true}>
        <Box
          component="form"
          onSubmit={submitHandler}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "80vh",
          }}
        >
          <>
            <Fade in timeout={350}>
              <TextField
                margin="normal"
                required
                fullWidth
                key="username"
                id="username"
                label="Username"
                name="username"
                error={isUsernameTouched && !isUsernameValid}
                onChange={usernameChangeHandler}
                onBlur={usernameBlurHandler}
                autoComplete="off"
                sx={{
                  display: {
                    xl: `${!secondaryInformation ? "" : "none"}`,
                  },
                }}
              />
            </Fade>
            <Fade in timeout={350}>
              <TextField
                margin="normal"
                required
                fullWidth
                type="password"
                key="password"
                id="password"
                label="Password"
                name="password"
                error={isPasswordTouched && !isPasswordValid}
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
                autoComplete="off"
                sx={{
                  display: {
                    xl: `${!secondaryInformation ? "" : "none"}`,
                  },
                }}
              />
            </Fade>
            <Fade in timeout={350}>
              <TextField
                margin="normal"
                required
                fullWidth
                type="password"
                key="confirm-password"
                id="confirm-password"
                label="Confirm Password"
                name="confirm-password"
                error={isConfirmPasswordTouched && !isConfirmPasswordValid}
                onChange={confirmPasswordChangeHandler}
                onBlur={confirmPasswordBlurHandler}
                autoComplete="off"
                helperText={!doPasswordsMatch && "Passwords must match"}
                sx={{
                  display: {
                    xl: `${!secondaryInformation ? "" : "none"}`,
                  },
                }}
              />
            </Fade>
            <Fade in timeout={350}>
              <TextField
                margin="normal"
                required
                fullWidth
                key="email"
                id="email"
                label="Email"
                name="email"
                error={isEmailTouched && !isEmailValid}
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                autoComplete="off"
                sx={{
                  display: {
                    xl: `${!secondaryInformation ? "" : "none"}`,
                  },
                }}
              />
            </Fade>
            <Fade in timeout={350}>
              <Button
                color="secondary"
                onClick={registrationForwardHandler}
                variant="contained"
                disabled={
                  !isUsernameValid ||
                  !isPasswordValid ||
                  !isConfirmPasswordValid ||
                  !isEmailValid ||
                  !doPasswordsMatch
                }
                sx={{
                  mt: 1,
                  mb: 2,
                  border: 1,
                  width: "100%",
                  ":hover": {
                    bgcolor: "#e0dcdc",
                  },
                  display: {
                    xl: `${!secondaryInformation ? "" : "none"}`,
                  },
                }}
              >
                Continue registration
              </Button>
            </Fade>
          </>
          <Box>
            <Fade in timeout={350}>
              <TextField
                margin="normal"
                required
                fullWidth
                key="name"
                id="name"
                label="Full name"
                name="name"
                error={isNameTouched && !isNameValid}
                onChange={nameChangeHandler}
                onBlur={nameBlurHandler}
                autoComplete="off"
                sx={{
                  display: {
                    xl: `${secondaryInformation && !addImage ? "" : "none"}`,
                  },
                }}
              />
            </Fade>
            <Fade in timeout={350}>
              <TextField
                margin="normal"
                required
                fullWidth
                key="address"
                id="address"
                label="Address"
                name="address"
                error={isAddressTouched && !isAddressValid}
                onChange={addressChangeHandler}
                onBlur={addressBlurHandler}
                autoComplete="off"
                sx={{
                  display: {
                    xl: `${secondaryInformation && !addImage ? "" : "none"}`,
                  },
                }}
              />
            </Fade>
            <Fade in timeout={350}>
              <DesktopDatePicker
                format="dd/MM/yyyy"
                required
                fullWidth
                disableFuture
                label="Birthday"
                error={isDateTouched && !isDateValid}
                onChange={(value) => dateChangeHandler(new Date(value))}
                sx={{
                  mt: 2,
                  mb: 1,
                  width: "100%",
                  display: {
                    xl: `${secondaryInformation && !addImage ? "" : "none"}`,
                  },
                }}
              />
            </Fade>
            <Fade in timeout={350}>
              <TextField
                margin="normal"
                select
                required
                fullWidth
                id="role"
                label="User type"
                name="role"
                error={isUserTypeTouched && !isUserTypeValid}
                onChange={userTypeChangeHandler}
                onBlur={userTypeBlurHandler}
                sx={{
                  mt: 2,
                  mb: 1,
                  width: "100%",
                  display: {
                    xl: `${secondaryInformation && !addImage ? "" : "none"}`,
                  },
                }}
              >
                {roles}
              </TextField>
            </Fade>
            <Box
              width="100%"
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                onClick={registrationBackwardHandler}
                color="secondary"
                variant="contained"
                sx={{
                  mt: 1,
                  mb: 2,
                  mr: 2,
                  border: 1,
                  width: "10%",
                  ":hover": {
                    bgcolor: "#e0dcdc",
                  },
                  display: {
                    xl: `${secondaryInformation && !addImage ? "" : "none"}`,
                  },
                }}
              >
                <ArrowBackIcon />
              </Button>
              <Button
                color="secondary"
                variant="contained"
                onClick={registrationImageForwardHandler}
                disabled={
                  !isUsernameValid ||
                  !isPasswordValid ||
                  !isConfirmPasswordValid ||
                  !isEmailValid ||
                  !isNameValid ||
                  !isAddressValid ||
                  !isDateValid ||
                  !isUserTypeValid
                }
                sx={{
                  mt: 1,
                  mb: 2,
                  border: 1,
                  width: "80%",
                  ":hover": {
                    bgcolor: "#e0dcdc",
                  },
                  display: {
                    xl: `${secondaryInformation && !addImage ? "" : "none"}`,
                  },
                }}
              >
                Finalise
              </Button>
            </Box>
            <Box>
              <RegisterFormImageItem
                image={displayImage}
                imageInput={imageInput}
                uploadHandler={imageChangeHandler}
                avatarClickHandler={imageUploadHandler}
                sx={{
                  display: {
                    xl: `${secondaryInformation && addImage ? "" : "none"}`,
                  },
                }}
              />

              <Button
                onClick={registrationImageBackwardHandler}
                color="secondary"
                variant="contained"
                sx={{
                  mt: 1,
                  mb: 2,
                  mr: 2,
                  border: 1,
                  width: "10%",
                  ":hover": {
                    bgcolor: "#e0dcdc",
                  },
                  display: {
                    xl: `${secondaryInformation && addImage ? "" : "none"}`,
                  },
                }}
              >
                <ArrowBackIcon />
              </Button>
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                disabled={
                  !isUsernameValid ||
                  !isPasswordValid ||
                  !isConfirmPasswordValid ||
                  !isEmailValid ||
                  !isNameValid ||
                  !isAddressValid ||
                  !isDateValid ||
                  !isUserTypeValid
                }
                sx={{
                  mt: 1,
                  mb: 2,
                  border: 1,
                  width: "80%",
                  ":hover": {
                    bgcolor: "#e0dcdc",
                  },
                  display: {
                    xl: `${secondaryInformation && addImage ? "" : "none"}`,
                  },
                }}
              >
                Sign up
              </Button>
            </Box>
          </Box>
          <Box
            width="100%"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              mt: 0,
              mb: 2,
            }}
          >
            <Link className={styles.link} to="/login">
              {"Already have an account? Sign In"}
            </Link>
          </Box>
        </Box>
      </Zoom>
    </Container>
  );
};

export default RegisterForm;
