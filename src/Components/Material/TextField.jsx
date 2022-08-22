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

export default function BasicTextFields({ lable, multiline, mt, variant }) {
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
        InputLabelProps={{ style: { color: "white" } }}
        inputProps={{ style: { color: "white" } }}
        label={lable}
        rows={4}
        multiline={multiline}
        id="standard-basic"
        variant={variant}
      />
    </Box>
  );
}
