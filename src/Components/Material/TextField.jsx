import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "black",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "black",
    },

    "&.Mui-focused fieldset": {
      borderColor: "black",
    },
  },
});

export default function BasicTextFields({
  lable,
  multiline,
  mt,
  type,
  variant,
  handleOrderProcessingForm,
  readOnly,
  defaultValue,
  disable,
  value,
}) {
  return (
    <Box
      component="form"
      borderColor="brown"
      sx={{
        "& > :not(style)": { marginTop: mt ? 2 : null, width: "100%" },
      }}
      noValidate
      autoComplete="off"
    >
      <CssTextField
        disabled={disable}
        InputLabelProps={{ style: { color: "white" } }}
        inputProps={{ style: { color: "white" }, readOnly: readOnly }}
        defaultValue={defaultValue ? `${defaultValue}` : null}
        value={value && `${value}`}
        label={lable}
        rows={4}
        type={type ? "number" : "text"}
        onChange={(newValue) =>
          handleOrderProcessingForm(newValue.target.value, lable)
        }
        multiline={multiline}
        id="standard-basic"
        variant={variant}
      />
    </Box>
  );
}
