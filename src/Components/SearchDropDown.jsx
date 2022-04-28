import { StyledEngineProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import React, { useState } from "react";

const SearchDropDown = ({
  label,
  color,
  data,
  changeCountryId,
  defaultValueCountry,
  changeStateId,

  setIsStateTouched,
}) => {
  const [refresh, setRefresh] = useState("refresh");

  const defaultProps = {
    options: data,
    getOptionLabel: (option) => option.NAME,
  };

  const changeCountryAndStateId = (newValue) => {
    if (data[1].NAME === "India") {
      changeCountryId(newValue.PK_ID);
    } else {
      setTimeout(() => {
        setIsStateTouched(false);
      }, 200);
      changeStateId(newValue.PK_ID);
    }
  };

  const flatProps = {
    options: top100Films.map((option) => option.title),
  };

  const [value, setValue] = React.useState(null);

  return (
    <StyledEngineProvider injectFirst>
      <Stack
        spacing={1}
        sx={{ width: 200 }}
        onClick={() => setIsStateTouched(true)}
        className="w-full"
      >
        <Autocomplete
          {...defaultProps}
          onChange={(event, newValue) => changeCountryAndStateId(newValue)}
          id="disable-close-on-select"
          disableCloseOnSelect
          defaultValue={defaultValueCountry}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              variant="standard"
              InputLabelProps={{ style: { color: color } }}
            />
          )}
        />
      </Stack>
    </StyledEngineProvider>
  );
};

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
];

export default SearchDropDown;
