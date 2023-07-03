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

export default function BasicTextFields2({
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
  handleBlur,
  fontWeight,
  error,
}) {
  return (
    <>
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
          sx={{ "& .MuiInputBase-root": { color: "black" } }}
          InputLabelProps={{
            style: { color: "black", fontWeight: fontWeight },
          }}
          // InputProps={{ style: { color: "black" }, readOnly: readOnly }}
          inputProps={{
            style: {
              color: "black",
              fontWeight: fontWeight,
            },
            sx: { color: "black" },
          }}
          defaultValue={defaultValue ? defaultValue : null}
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
          onBlur={(newValue) => handleBlur(newValue.target.value, lable)}
        />
      </Box>
    </>
  );
}
