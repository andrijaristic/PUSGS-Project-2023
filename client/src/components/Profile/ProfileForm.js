import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAvatarAction,
  getUserInformationAction,
  updateUserAction,
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
import LoadingModal from "../UI/Modal/LoadingModal";
import ProfileFormItem from "../Profile/ProfileFormItem";
import ProfileFormDateItem from "./ProfileFormDateItem";
import ProfileFormImageItem from "./ProfileFormImageItem";
import ProfileFormIcon from "./ProfileFormIcon";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const imageInput = useRef(null);
  const user = useSelector((state) => state.user.user);
  const [displayImage, setDisplayImage] = useState(null); // (user.imageSrc)
  const [date, setDate] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [editable, setEditable] = useState(false);
  const [isInitial, setIsInitial] = useState(true);

  useEffect(() => {
    if (!isInitial) {
      return;
    }

    const execute = async () => {
      const postAction = await dispatch(getUserInformationAction());
      const { id, imageSrc } = postAction.payload;

      if (!imageSrc) {
        dispatch(getUserAvatarAction(id));
      }
    };

    execute();
    setIsInitial(false);
  }, [isInitial, dispatch]);

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
    data.append("name", name);
    data.append("address", address);

    if (date !== null) {
      data.append("dateOfBirth", date.toISOString());
    }

    if (uploadedImage !== null) {
      data.append("image", uploadedImage);
    }

    dispatch(updateUserAction(data));
  };

  if (user) {
    return (
      <Container
        margin="normal"
        component="main"
        maxWidth
        justifyContent="center"
        sx={{
          position: "static",
          display: "flex",
          alignItems: "center",
          minHeight: "80vh",
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
          >
            <Grid item minWidth="20rem">
              <Card
                sx={{
                  height: "34rem",
                  display: "flex",
                  justifyContent: "flex-end",
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
                raised
                sx={{
                  height: "34rem",
                }}
              >
                <Grid container minHeight="34rem" maxHeight="40rem">
                  <Grid item>
                    <Box
                      noValidate
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <ProfileFormImageItem
                        disabled={editable}
                        image={displayImage ? displayImage : user.imageSrc}
                        imageInput={imageInput}
                        uploadHandler={imageChangeHandler}
                        avatarClickHandler={imageUploadHandler}
                      ></ProfileFormImageItem>
                      <Box
                        sx={{
                          ml: 2,
                          mt: 2,
                        }}
                      >
                        <ProfileFormItem
                          id="email"
                          label="E-mail"
                          initialValue={user.email}
                          editable={false}
                        ></ProfileFormItem>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <ProfileFormItem
                            id="role"
                            label="User type"
                            initialValue={user.role}
                            editable={false}
                          ></ProfileFormItem>
                          {user.role === "SELLER" && (
                            <ProfileFormIcon
                              verificationStatus={user.verificationStatus}
                            ></ProfileFormIcon>
                          )}
                        </Box>
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
    return <LoadingModal show={true} />;
  }
};

export default ProfileForm;
