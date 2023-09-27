import { Autocomplete, TextField } from "@mui/material";
import React, { useState } from "react";

const ControlledAutoComplete = ({
  val,
  data,
  handleDropDown,
  Name,
  disable,
}) => {
  const [value, setValue] = useState(val);
  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        handleDropDown(newValue, Name);
      }}
      disabled={disable}
      disableClearable
      id="controllable-states-demo"
      color={"rgb(243, 244, 246)"}
      style={{ color: "white" }}
      options={data}
      sx={{ width: "100%" }}
      renderInput={(params) => (
        <TextField
          variant="standard"
          InputLabelProps={{ style: { color: "whitesmoke" } }}
          {...params}
          sx={{ width: "100%" }}
          size="small"
        />
      )}
    />
  );
};

export default ControlledAutoComplete;
