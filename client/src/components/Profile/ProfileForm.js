import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAvatarAction,
  getUserInformationAction,
} from "../../store/userSlice";
import {
  Box,
  Button,
  Card,
  Container,
  CssBaseline,
  Grid,
  InputLabel,
  Switch,
  Zoom,
} from "@mui/material";
import ProfileFormItem from "../Profile/ProfileFormItem";
import ProfileFormDateItem from "./ProfileFormDateItem";
import ProfileFormImageItem from "./ProfileFormImageItem";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const imageInput = useRef(null);
  const user = useSelector((state) => state.user.user);
  const [displayImage, setDisplayImage] = useState(null); // (user.imageSrc)
  const [date, setDate] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    const execute = async () => {
      const postAction = await dispatch(getUserInformationAction());
      const { id, imageSrc } = postAction.payload;

      if (!imageSrc) {
        dispatch(getUserAvatarAction(id));
      }
    };

    execute();
  }, [dispatch]);

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

  const dateChangeHandler = (value) => {
    setDate(value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const address = formData.get("address");

    if (!name || !address) {
      return;
    }

    const data = new FormData();
    if (date !== null) {
      data.append("dateOfBirth", date.toISOString());
    }

    if (uploadedImage !== null) {
      data.append("image", uploadedImage);
    }
  };

  if (user) {
    return (
      <Container
        component="main"
        maxWidth="sx"
        justifyContent="center"
        sx={{
          border: 1,
          display: "flex",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CssBaseline />
        <Zoom in={true}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            spacing={2}
            maxHeight="70vh"
            sx={{
              ml: 10,
            }}
          >
            <Grid item minWidth="20rem">
              <Card
                sx={{
                  height: "34rem",
                  display: "flex",
                  justifyContent: "flex-end",
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                }}
              >
                <Box>
                  {/*!TODO: Actually add navigation between the two*/}
                  <InputLabel>Account</InputLabel>
                  <InputLabel>Change Password</InputLabel>
                </Box>
              </Card>
            </Grid>
            <Grid item minWidth="50rem">
              <Card
                minWidth="xs"
                sx={{
                  height: "34rem",
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                }}
              >
                <Grid container minHeight="34rem" maxHeight="40rem">
                  <Grid item maxWidth="20rem">
                    <Box
                      noValidate
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <ProfileFormImageItem
                        disabled={editable}
                        image={displayImage}
                        imageInput={imageInput}
                        uploadHandler={imageChangeHandler}
                        avatarClickHandler={imageUploadHandler}
                      ></ProfileFormImageItem>
                      <Box
                        sx={{
                          ml: 1,
                          mt: 2,
                        }}
                      >
                        <ProfileFormItem
                          id="email"
                          label="E-mail"
                          initialValue={user.email}
                          editable={false}
                        ></ProfileFormItem>
                        <ProfileFormItem
                          id="role"
                          label="User type"
                          initialValue={user.role}
                          editable={false}
                        ></ProfileFormItem>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box
                      sx={{
                        ml: 1,
                        mt: 2,
                      }}
                    >
                      <Box
                        sx={{
                          ml: -1,
                          mt: -1,
                          mb: 1,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Switch onChange={editEnableHandler} color="warning" />
                        <InputLabel
                          InputLabelProps={{
                            style: { color: "cadetblue" },
                          }}
                        >
                          {"Enable profile editing"}
                        </InputLabel>
                      </Box>
                      <Box component="form" onSubmit={submitHandler}>
                        <ProfileFormItem
                          id="name"
                          label="Full name"
                          initialValue={user.name}
                          editable={editable}
                        />
                        <ProfileFormItem
                          id="address"
                          label="Address"
                          initialValue={user.address}
                          editable={editable}
                        />
                        <ProfileFormDateItem
                          id="date"
                          label="Birthday"
                          initialValue={new Date(
                            user.dateOfBirth
                          ).toLocaleDateString()}
                          editable={editable}
                          setValue={dateChangeHandler}
                        />
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
                          Update profile information
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Zoom>
      </Container>
    );
  } else {
    return null;
  }
};

export default ProfileForm;
