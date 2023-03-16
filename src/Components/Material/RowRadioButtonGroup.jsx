import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function RowRadioButtonsGroup({
  value,
  heading,
  handleRadioButtons,
  name,
  defaultValue,
}) {
  return (
    <FormControl>
      <FormLabel
        id="demo-row-radio-buttons-group-label"
        style={{ color: "white" }}
      >
        {heading}
      </FormLabel>
      <RadioGroup
        className="flex sm:gap-6 gap-4"
        row
        defaultValue={defaultValue}
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        {value.map((item) => {
          return (
            <FormControlLabel
              style={{ color: "white" }}
              value={item.value}
              onClick={() => handleRadioButtons(name, item.value, defaultValue)}
              control={
                <Radio
                  size="small"
                  // sx={{
                  //   color: "whitesmoke",
                  // }}
                />
              }
              label={item.label}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}
