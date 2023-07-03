import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
export default function SearchDropDown2({
  label,
  data,
  idRef,
  hndleData,
  name,
}) {
  const [personName, setPersonName] = React.useState([]);
  // console.log("re-render");

  const handleChange = (event) => {
    // console.log(label);

    if (name === "Group") {
      const {
        target: { value },
      } = event;
      setPersonName(
        // On autofill we get a stringified value.
        typeof value === "string" ? value.split(",") : value
      );
      hndleData(typeof value === "string" ? value.split(",") : value);
    }

    if (name === "Add") {
      // console.log(value);
      // setPersonName([]);
      const {
        target: { value },
      } = event;
      // console.log(
      const ids = value.map((item) => {
        // return item.split("-")[1];
        return item;
      });
      idRef.current = ids;
      // );
      setPersonName(
        // On autofill we get a stringified value.
        typeof value === "string" ? value.split(",") : value
      );
      // console.log(personName);
    }

    if (name === "Employees") {
      // console.log(personName);

      const {
        target: { value },
      } = event;
      // console.log(
      const ids = value.map((item) => {
        // return item.split("-")[1];
        return item;
      });
      idRef.current = ids;
      // );
      setPersonName(
        // On autofill we get a stringified value.
        typeof value === "string" ? value.split(",") : value
      );
      // console.log(personName);
    }
  };

  return (
    <div>
      {/* <div className="w-[w-80%]"> */}
      <FormControl sx={{ width: 440 }}>
        <InputLabel id="demo-multiple-checkbox-label">
          <div className="text-black font-bold">{label}</div>
        </InputLabel>
        <Select
          className="bg-slate-50"
          labelId="demo-multiple-checkbox-label"
          //   labelId="demo-simple-select-standard-label"
          id="demo-multiple-checkbox"
          //   id="demo-simple-select-standard"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label={label ? label : ""} />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
          // inputProps={{ color: "black" }}
          // inputProps={{ color: "black" }}
        >
          {data
            .sort((a, b) => {
              // console.log(data);
              a = a.toLowerCase();
              b = b.toLowerCase();
              return a < b ? -1 : a > b ? 1 : 0;
            })
            .map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={personName.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          {/* <MenuItems data={data} personName={personName} /> */}
        </Select>
      </FormControl>
      {/* </div> */}
    </div>
  );
}

// const MenuItems = React.memo(function response({ data, personName }) {
// data.map((name) => (
//      return (
//         <MenuItem key={name} value={name}>
//       <Checkbox checked={personName.indexOf(name) > -1} />
//       <ListItemText primary={name} />
//     </MenuItem>
//      )
//   ));
// });
