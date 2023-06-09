import React from "react";
import {
  Box,
  Card,
  Container,
  CssBaseline,
  Grid,
  Zoom,
  Button,
} from "@mui/material";
import ProfileFormItem from "../Profile/ProfileFormItem";
import ProfileFormDateItem from "../Profile/ProfileFormDateItem";
import ProfileFormImageItem from "../Profile/ProfileFormImageItem";
import ProfileFormIcon from "../Profile/ProfileFormIcon";
import LoadingModal from "../UI/Modal/LoadingModal";
import { useNavigate } from "react-router-dom";

const DetailedOrderUserInformation = (props) => {
  const editable = false;
  const nav = useNavigate();
  console.log(props);
  const returnHandler = () => {
    nav(-1);
  };

  if (props.user) {
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
                        image={props.avatar}
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
                          initialValue={props.user.email}
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
                            initialValue={props.user.role}
                            editable={false}
                          ></ProfileFormItem>
                          {props.user.role === "SELLER" && (
                            <ProfileFormIcon
                              verificationStatus={props.user.verificationStatus}
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
                      ></Box>
                      <Box>
                        <ProfileFormItem
                          id="name"
                          label="Full name"
                          initialValue={props.user.name}
                          editable={editable}
                        />
                        <ProfileFormItem
                          id="address"
                          label="Address"
                          initialValue={props.user.address}
                          editable={editable}
                        />
                        <ProfileFormDateItem
                          id="date"
                          label="Birthday"
                          initialValue={props.user.dateOfBirth}
                          editable={editable}
                        />
                      </Box>
                      <Button
                        color="secondary"
                        variant="contained"
                        onClick={returnHandler}
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
                        Previous page
                      </Button>
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

export default DetailedOrderUserInformation;
