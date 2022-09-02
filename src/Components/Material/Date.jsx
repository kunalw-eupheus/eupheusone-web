import * as React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

export default function DatePicker({ handleOrderProcessingForm }) {
  const [value, setValue] = React.useState(new Date());

  const handleChange = (newValue) => {
    handleOrderProcessingForm(newValue, "date");
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DesktopDatePicker
          label="Enter Date"
          InputLabelProps={{ style: { color: "white" } }}
          inputProps={{ style: { color: "white" } }}
          inputFormat="MM/dd/yyyy"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}
