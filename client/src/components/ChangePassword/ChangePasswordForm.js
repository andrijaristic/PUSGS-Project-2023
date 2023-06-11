import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { changePasswordAction } from "../../store/userSlice";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Zoom,
} from "@mui/material";

const ChangePasswordForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const id = useSelector((state) => state.user.user.id);
  const apiState = useSelector((state) => state.user.apiState);

  const [isOldPasswordValid, setIsOldPasswordValid] = useState(false);
  const [isOldPasswordTouched, setIsOldPasswordTouched] = useState(false);

  const [isNewPasswordValid, setIsNewPasswordValid] = useState(false);
  const [isNewPasswordTouched, setIsNewPasswordTouched] = useState(false);

  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
  const [isConfirmPasswordTouched, setIsConfirmPasswordTouched] =
    useState(false);

  const [doPasswordsMatch, setDoPasswordsMatch] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  const oldPasswordChangeHandler = (event) => {
    setIsOldPasswordValid(event.target.value.trim().length >= 5);
  };

  const oldPasswordBlurHandler = () => {
    setIsOldPasswordTouched(true);
  };

  const newPasswordChangeHandler = (event) => {
    setIsNewPasswordValid(event.target.value.trim().length >= 5);
    setDoPasswordsMatch(true);
  };

  const newPasswordBlurHandler = () => {
    setIsNewPasswordTouched(true);
  };

  const confirmPasswordChangeHandler = (event) => {
    setIsConfirmPasswordValid(event.target.value.trim().length >= 5);
    setDoPasswordsMatch(true);
  };

  const confirmPasswordBlurHandler = () => {
    setIsConfirmPasswordTouched(true);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const password = formData.get("password");
    const newPassword = formData.get("newPassword");
    const confirmPassword = formData.get("confirmPassword");

    if (password == null || newPassword == null || confirmPassword == null) {
      toast.error("Please fill in all fields", {
        position: "top-center",
        autoClose: 2500,
        closeOnClick: true,
        pauseOnHover: false,
      });
      return;
    }

    if (id === undefined) {
      return;
    }

    if (newPassword !== confirmPassword) {
      setIsNewPasswordValid(false);
      setIsConfirmPasswordValid(false);
      setDoPasswordsMatch(false);
      return;
    }

    const data = {
      oldPassword: password.toString().trim(),
      newPassword: newPassword.toString().trim(),
    };

    dispatch(changePasswordAction({ id: id, body: data }));
    setRequestSent(true);
  };

  useEffect(() => {
    if (!requestSent) {
      return;
    }

    if (!(apiState === "COMPLETED")) {
      return;
    }

    navigate("/profile");
  }, [requestSent, apiState, navigate]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Zoom in={true}>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Password Change
          </Typography>
          <Box
            component="form"
            onSubmit={submitHandler}
            noValidate
            sx={{ width: "40rem" }}
          >
            <TextField
              fullWidth
              margin="normal"
              name="password"
              label="Current password"
              id="password"
              type="password"
              autoComplete="current-password"
              onChange={oldPasswordChangeHandler}
              onBlur={oldPasswordBlurHandler}
              error={isOldPasswordTouched && !isOldPasswordValid}
            />
            <TextField
              fullWidth
              margin="normal"
              name="newPassword"
              label="New password"
              id="newPassword"
              type="password"
              onChange={newPasswordChangeHandler}
              onBlur={newPasswordBlurHandler}
              error={isNewPasswordTouched && !isNewPasswordValid}
              helperText={!doPasswordsMatch && "Passwords must match"}
            />
            <TextField
              fullWidth
              margin="normal"
              name="confirmPassword"
              label="Confirm new password"
              id="confirmPassword"
              type="password"
              onChange={confirmPasswordChangeHandler}
              onBlur={confirmPasswordBlurHandler}
              error={isConfirmPasswordTouched && !isConfirmPasswordValid}
              helperText={!doPasswordsMatch && "Passwords must match"}
            />
            <Button
              fullWidth
              type="submit"
              color="secondary"
              variant="contained"
              disabled={
                !isOldPasswordValid ||
                !isNewPasswordValid ||
                !isConfirmPasswordValid
              }
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
              Change password
            </Button>
          </Box>
        </Box>
      </Zoom>
    </Container>
  );
};

export default ChangePasswordForm;
