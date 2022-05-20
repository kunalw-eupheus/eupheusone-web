import { StyledEngineProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import React, { useState, useEffect } from "react";

const SearchDropDown = ({
  label,
  color,
  data,
  Name,
  getStateAndCity,
  changeCountryId,
  defaultValueCountry,
  changeStateId,

  setIsStateTouched,
}) => {
  const [refresh, setRefresh] = useState("refresh");

  const defaultProps = {
    options: data,
    getOptionLabel: (option) => {
      switch (Name) {
        case "board_name":
          return option.board_name;
          break;
        case "category":
          return option.schoolCategory;
          break;
        case "country":
          return option.country;
          break;
        case "state":
          return option.state;
          break;
        case "city":
          return option.city;
          break;
        default:
          break;
      }
    },
  };

  // const changeCountryAndStateId = (newValue) => {
  //   if (data[1].NAME === "India") {
  //     changeCountryId(newValue.PK_ID);
  //   } else {
  //     setTimeout(() => {
  //       setIsStateTouched(false);
  //     }, 200);
  //     changeStateId(newValue.PK_ID);
  //   }
  // };

  const handleDropDown = (value, type) => {
    if (type === "country") {
      getStateAndCity(value.id, "state");
    }
    if (type === "state") {
      getStateAndCity(value.id, "city");
    }
    if (type === "city") {
      getStateAndCity(value.id, "setCityId");
    }
    if (type === "board_name") {
      getStateAndCity(value.id, "setBoardId");
    }
    if (type === "category") {
      getStateAndCity(value.id, "setCategoryId");
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
        // onClick={() => setIsStateTouched(true)}
        className="w-full"
      >
        <Autocomplete
          {...defaultProps}
          onChange={(event, newValue) => handleDropDown(newValue, Name)}
          id="disable-close-on-select"
          disableCloseOnSelect
          // defaultValue={defaultValueCountry}
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
