import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
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
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { finishRegistrationAction } from "../../store/userSlice";

const USER_TYPES = ["BUYER", "SELLER"];

const FinishRegistrationForm = () => {
  const dispatch = useDispatch();

  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);

  const [isConfirmPasswordValid, setIsConfirmedPasswordValid] = useState(false);
  const [isConfirmPasswordTouched, setIsConfirmPasswordTouched] =
    useState(false);
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(false);

  const [isAddressValid, setIsAddressValid] = useState(false);
  const [isAddressTouched, setIsAddressTouched] = useState(false);

  const [isUserTypeValid, setIsUserTypeValid] = useState(false);
  const [isUserTypeTouched, setIsUserTypeTouched] = useState(false);

  const [date, setDate] = useState(null);
  const [isDateValid, setIsDateValid] = useState(false);
  const [isDateTouched, setIsDateTouched] = useState(false);

  const roles = USER_TYPES.map((item) => {
    return (
      <MenuItem key={item} value={item}>
        {item}
      </MenuItem>
    );
  });

  const passwordChangeHandler = (event) => {
    setIsPasswordValid(
      event.target.value !== "" && event.target.value.trim().length >= 6
    );
    setDoPasswordsMatch(true);
  };

  const passwordBlurHandler = () => {
    setIsPasswordTouched(true);
  };

  const confirmPasswordChangeHandler = (event) => {
    setIsConfirmedPasswordValid(
      event.target.value !== "" && event.target.value.trim().length >= 6
    );
    setDoPasswordsMatch(true);
  };

  const confirmPasswordBlurHandler = () => {
    setIsConfirmPasswordTouched(true);
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

  const submitHandler = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");
    const address = formData.get("address");
    const userType = formData.get("role");
    if (
      password == null ||
      confirmPassword == null ||
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

    const requestBody = {
      password: password.toString().trim(),
      address: address.toString().trim(),
      role: userType.toString().trim(),
      dateOfBirth: date.toISOString(),
    };

    dispatch(finishRegistrationAction(requestBody));
  };

  return (
    <Container container="main" maxWidth="xs">
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
            />
          </Fade>
          <Fade in timeout={350}>
            <DesktopDatePicker
              format="dd/MM/yyyy"
              required
              fullWidth
              label="Birthday"
              error={isDateTouched && !isDateValid}
              onChange={(value) => dateChangeHandler(new Date(value))}
              sx={{
                mt: 2,
                mb: 1,
                width: "100%",
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
              }}
            >
              {roles}
            </TextField>
          </Fade>
          <Fade in timeout={350}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={
                !isPasswordValid ||
                !isConfirmPasswordValid ||
                !isAddressValid ||
                !isDateValid ||
                !isUserTypeValid
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
              Finish registration
            </Button>
          </Fade>
        </Box>
      </Zoom>
    </Container>
  );
};

export default FinishRegistrationForm;
