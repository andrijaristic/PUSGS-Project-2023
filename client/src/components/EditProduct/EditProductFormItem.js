import React, { useState } from "react";
import { InputLabel, TextField, Box } from "@mui/material";

const EditProductFormItem = (props) => {
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
        type={props.type ? props.type : "text"}
        key={props.id}
        id={props.id}
        name={props.id}
        value={props.value ? props.value : value}
        multiline={props.multiline ? props.multiline : false}
        onChange={changeHandler}
        InputProps={{
          disableUnderline: true,
          style: { fontSize: 18 },
        }}
      ></TextField>
    </Box>
  );
};

export default EditProductFormItem;
