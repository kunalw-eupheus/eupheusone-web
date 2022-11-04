import { StyledEngineProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import React, { useState, useEffect } from "react";

const ControlledSearchDropDown = ({
  label,
  color,
  data,
  Name,
  getStateAndCity,
  getSeriesData,
  handleOrderProcessingForm,
  disable,
  Initialvalue,
  // defaultValueCountry,
  // changeStateId,
  // changeCountryId,
  // setIsStateTouched,
}) => {
  // const [refresh, setRefresh] = useState("refresh");

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
        case "board_name_addschool":
          return option.board_name;
          break;
        case "category_addschool":
          return option.schoolCategory;
          break;
        case "pref_transpoter":
          return option.name;
          break;
        case "school_name":
          return option.school_name;
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
        case "order_type":
          return option.order_type;
          break;
        case "customer_name":
          return option.bp_name;
          break;
        case "school_name":
          return option.school_name;
          break;
        case "contact_id":
          return option.name;
          break;
        case "subject_name":
          return option.subject;
          break;
        case "series_name":
          return option.series;
          break;
        case "order_priority":
          return option.order_priority;
          break;
        case "billing_address":
          return (
            option.address +
            " " +
            option.block +
            " " +
            option.street +
            " " +
            option.fk_state.state +
            " " +
            option.zip_code
          );
          break;
        case "shipping_address":
          return (
            option.address +
            " " +
            option.block +
            " " +
            option.street +
            " " +
            option.fk_state.state +
            " " +
            option.zip_code
          );
          break;
        // manage School
        case "select_state":
          return option.fk_state.state;
          break;
        case "select_city":
          return option.city;
          break;
        // kys

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
    if (
      type === "order_type" ||
      type === "customer_name" ||
      type === "school_name" ||
      type === "subject_name" ||
      type === "series_name" ||
      type === "date" ||
      type === "order_priority" ||
      type === "shipping_address" ||
      type === "billing_address" ||
      type === "pref_transpoter" ||
      type === "contact_id"
    ) {
      if (type === "subject_name") {
        getSeriesData(value.id);
      }
      handleOrderProcessingForm(value, type);
      // console.log("working");
    }
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
    if (type === "board_name_addschool") {
      handleOrderProcessingForm(value, type);
    }
    if (type === "category_addschool") {
      handleOrderProcessingForm(value, type);
    }
    if (type === "select_state") {
      handleOrderProcessingForm(value, type);
    }
    if (type === "select_city") {
      handleOrderProcessingForm(value, type);
    } else {
      return;
    }
  };

  const [value, setValue] = React.useState(null);

  return (
    <StyledEngineProvider injectFirst>
      <Stack spacing={1} sx={{ width: 200 }} className="w-full">
        <Autocomplete
          //   {...defaultProps}
          disabled={disable}
          disableClearable
          value={Initialvalue}
          onChange={(event, newValue) => handleDropDown(newValue, Name)}
          id="disable-close-on-select"
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

export default ControlledSearchDropDown;
