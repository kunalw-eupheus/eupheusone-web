import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Search } from "@mui/icons-material";

const columns = [
  { field: "id", headerName: "CRM ID", width: 100 },
  { field: "firstName", headerName: "School Name", width: 130 },
  { field: "lastName", headerName: "Board", width: 130 },
  {
    field: "age",
    headerName: "Address",
    type: "number",
    width: 90,
  },
];

export default function DataTable({ rows }) {
  const [q, setQ] = React.useState("");
  const [entries, setEntries] = React.useState(10);

  const search = (rowss) => {
    return rowss.filter(
      (row) =>
        row.firstName.toLowerCase().indexOf(q) > -1 ||
        row.lastName.toLowerCase().indexOf(q) > -1 ||
        row.age.toLowerCase().indexOf(q) > -1
    );
  };
  return (
    <div className="relative mt-14">
      <div
        style={{ height: 450, width: "100%" }}
        className="bg-slate-200 rounded-md px-10 pt-16"
      >
        <DataGrid
          rows={search(rows)}
          columns={columns}
          pageSize={entries}
          rowsPerPageOptions={[entries]}
          checkboxSelection
          onSelectionModelChange={(event) => console.log(event)}
        />
      </div>
      <Search className=" text-gray-500 absolute top-[3.5vh] lg:top-[4.6vh] md:top-[2.25vh] !text-[1.2rem] right-[29.5vw] lg:right-[12.5vw] md:right-[16.5vw] z-20" />
      <input
        className="px-8 md:w-[15vw] w-[30vw] lg:w-40 focus:outline-0 hover:shadow-md transition-all duration-200 ease-linear py-1 lg:py-2 placeholder:text-gray-300 rounded-lg absolute top-6 md:top-5 right-6 md:right-10"
        placeholder="Search"
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value.toLowerCase())}
      />

      <div className="flex items-center justify-center absolute top-4 lg:left-10 left-3 gap-3">
        <div className="flex flex-col md:flex-row gap-0 md:gap-2">
          <span>Showing</span>
          <span>Entries</span>
        </div>
        <select
          className="px-4 w-20 lg:w-40 focus:outline-0 transition-all duration-500 ease-linear py-1 rounded-lg "
          onClick={(e) => setEntries(e.target.value)}
        >
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>
    </div>
  );
}
