import React from "react";
import { InputLabel, Box } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";

const ProfileFormDateItem = (props) => {
  return (
    <Box>
      <InputLabel sx={{ mb: -2 }} htmlFor={props.id}>
        {props.label}
      </InputLabel>
      <DesktopDatePicker
        disabled={!props.editable}
        format="dd/MM/yyyy"
        variant="standard"
        required
        fullWidth
        disableFuture
        defaultValue={
          props.initialValue ? new Date(props.initialValue) : new Date()
        }
        onChange={(value) => props.setValue(new Date(value))}
        sx={{
          mt: 2,
          mb: 1,
          width: "20rem",
        }}
        slotProps={{ textField: { variant: "standard" } }}
      />
    </Box>
  );
};

export default ProfileFormDateItem;
