import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SearchDropDown3({
  label,
  data,
  Name,
  handleValue,
  className,
  variant,
  fontWeight,
  disabled,
  inValue,
}) {
  const [value, setValue] = React.useState("");
  // console.log(inValue);
  const handleChange = (event) => {
    setValue(event.target.value);
    handleValue(event.target.value, Name);
  };

  let data1 = [
    { val: "test1", name: "template1" },
    { val: "test2", name: "template2" },
    { val: "test3", name: "template3" },
  ];

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel
          id="demo-simple-select-label"
          sx={{ color: "black", fontWeight: fontWeight }}
          variant={variant}
          disabled={disabled}
        >
          {label ? label : ""}
        </InputLabel>
        <Select
          className={className ? className : "bg-slate-50 "}
          sx={{ color: "black", fontWeight: fontWeight }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={inValue === null ? inValue : value}
          label={label ? label : ""}
          onChange={handleChange}
          variant={variant}
        >
          {data.map((itm) => {
            return (
              <MenuItem key={itm.name} disabled={disabled} value={itm.val}>
                {itm.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
