import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAction, googleLoginAction } from "../../store/userSlice";
import {
  Container,
  CssBaseline,
  Zoom,
  Box,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "../Login/LoginForm.module.css";

const LoginForm = () => {
  const dispatch = useDispatch();

  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isUsernameTouched, setIsUsernameTouched] = useState(false);

  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);

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
  };

  const passwordBlurHandler = () => {
    setIsPasswordTouched(true);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    if (username == null || password == null) {
      return;
    }

    const requestBody = {
      username: username.toString().trim(),
      password: password.toString().trim(),
    };

    dispatch(loginAction(requestBody));
  };

  const googleLoginHandler = (response) => {
    dispatch(googleLoginAction({ token: response.credential }));
  };

  const googleLoginErrorHandler = () => {
    toast.error("Google login error", {
      position: "top-center",
      autoClose: 2500,
      closeOnClick: true,
      pauseOnHover: false,
    });
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
            helperText="5 or more characters"
          ></TextField>
          <TextField
            margin="normal"
            required
            fullWidth
            key="password"
            id="password"
            label="Password"
            name="password"
            type="password"
            error={isPasswordTouched && !isPasswordValid}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            autoComplete="off"
          ></TextField>
          <Button
            color="secondary"
            variant="contained"
            type="submit"
            disabled={!isUsernameValid || !isPasswordValid}
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
            Sign in
          </Button>
          <Grid container direction="column">
            <Grid
              item
              xs
              sx={{
                mt: -1,
                mb: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Link className={styles.link} replace to="/register">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
            <Grid
              item
              xs
              sx={{
                mt: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0.6,
              }}
            >
              {"or connect with social media"}
            </Grid>
            <Grid
              item
              xs
              sx={{
                mt: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <GoogleLogin
                onSuccess={googleLoginHandler}
                onError={googleLoginErrorHandler}
              />
            </Grid>
          </Grid>
        </Box>
      </Zoom>
    </Container>
  );
};

export default LoginForm;
