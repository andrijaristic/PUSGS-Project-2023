import React from "react";
import { Input, Box, Avatar, Button } from "@mui/material";

const RegisterFormImageItem = (props) => {
  return (
    <Box sx={{ ...props.sx }}>
      <Button onClick={props.avatarClickHandler}>
        <Avatar
          alt="profile-picture"
          variant="square"
          src={props.image}
          sx={{ width: "400px", height: "300px" }}
        ></Avatar>
      </Button>
      <Box sx={{ display: "none" }}>
        <Input
          type="file"
          ref={props.imageInput}
          onChange={props.uploadHandler}
          inputProps={{ accept: ".png, .jpg, .jpeg" }}
        />
      </Box>
    </Box>
  );
};

export default RegisterFormImageItem;
