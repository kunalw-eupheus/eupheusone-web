import * as React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { useState } from "react";

export default function TimePicker({
  handleOrderProcessingForm,
  label,
  color,
  name,
  disabled,
}) {
  const [value, setValue] = useState(new Date());

  const handleChange = (newValue) => {
    // console.log(newValue);
    setValue(newValue);

    if (!label) {
      // console.log(name);
      handleOrderProcessingForm(newValue, name);
    } else {
      // console.log(label);
      handleOrderProcessingForm(newValue, label);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DesktopTimePicker
          label={label}
          className=""
          disabled={disabled}
          //   InputLabelProps={{ style: { color: "white" } }}
          //   inputProps={{ style: { color: "white" } }}
          //   inputFormat="MM/dd/yyyy"
          value={value}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{
                svg: { color: color ? color : "white" },
                input: { color: color ? color : "white" },
              }}
            />
          )}
        />
      </Stack>
    </LocalizationProvider>
  );
}
