import React, { useState } from "react";
import { InputLabel, TextField, Box } from "@mui/material";

const ProfileFormItem = (props) => {
  const [value, setValue] = useState(props.initialValue);

  const changeHandler = (event) => {
    setValue(event.currentTarget.value);
  };

  return (
    <Box>
      <InputLabel sx={{ mb: -2 }} htmlFor={props.id}>
        {props.label}
      </InputLabel>
      <TextField
        disabled={!props.editable}
        margin="normal"
        variant="standard"
        key={props.id}
        id={props.id}
        name={props.id}
        value={value}
        onChange={changeHandler}
        InputProps={{
          disableUnderline: true,
          style: { fontSize: 18 },
        }}
      ></TextField>
    </Box>
  );
};

export default ProfileFormItem;
