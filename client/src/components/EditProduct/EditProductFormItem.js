import React, { useState } from "react";
import { TextField } from "@mui/material";
import EuroSymbolIcon from "@mui/icons-material/EuroSymbol";

const EditProductFormItem = (props) => {
  const [value, setValue] = useState(props.initialValue);

  const changeHandler = (event) => {
    setValue(event.currentTarget.value);
  };

  return (
    <TextField
      label={props.label}
      disabled={!props.editable}
      fullWidth
      margin="normal"
      type={props.type ? props.type : "text"}
      key={props.id}
      id={props.id}
      name={props.id}
      value={props.value ? props.value : value}
      multiline={props.multiline ? props.multiline : false}
      rows={props.rows ? props.rows : 1}
      onChange={changeHandler}
      autoComplete="off"
      sx={{ ...props.sx }}
      InputProps={
        props.inputProps && {
          startAdornment: <EuroSymbolIcon position="start"></EuroSymbolIcon>,
        }
      }
    ></TextField>
  );
};

export default EditProductFormItem;
