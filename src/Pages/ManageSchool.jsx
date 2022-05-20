import React, { useEffect } from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { Add } from "@mui/icons-material";
import { Link } from "react-router-dom";
import DataTable from "../Components/DataTable";
import { rows, ManageSchoolRows } from "../DummyData";
import SearchDropDown from "../Components/SearchDropDown";

const ManageSchool = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [highLight, setHighLight] = useState("manageSchool");

  const navInfo = {
    title: "Manage School",
    details: ["Home", " / Manage School"],
  };

  const Tablecolumns = [
    { field: "SchoolName", headerName: "School Name", width: 300 },
    {
      field: "City",
      headerName: "City",
      width: 180,
    },
    {
      field: "State",
      headerName: "State",
      width: 120,
    },
    {
      field: "Address",
      headerName: "Address",
      width: 350,
    },
  ];

  const handleSidebarCollapsed = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  useEffect(() => {
    const handleWidth = () => {
      if (window.innerWidth > 1024) {
        setSidebarCollapsed(false);
      } else {
        setSidebarCollapsed(true);
      }
    };
    window.addEventListener("resize", handleWidth);
    handleWidth();
    return () => {
      window.removeEventListener("resize", handleWidth);
    };
  }, []);
  return (
    <div className="flex bg-[#111322]">
      <Sidebar sidebarCollapsed={sidebarCollapsed} highLight={highLight} />

      <div
        className={`flex flex-col w-[100vw] lg:w-[83vw] lg:ml-[18vw] ${
          sidebarCollapsed ? null : "md:ml-[30vw] ml-[60vw]"
        } `}
      >
        <Navbar
          handleSidebarCollapsed={handleSidebarCollapsed}
          info={navInfo}
        />
        <div className="min-h-[100vh] pt-[2vh] max-h-full bg-[#141728]">
          <div className=" px-8 py-3 bg-[#141728]">
            <div className="grid grid-cols-2 grid-rows-2 md:flex md:justify-start md:items-center px-6 mb-20 py-3 mt-6 gap-6 rounded-md bg-slate-600">
              <div className="flex flex-col gap-2 w-full md:w-[20vw]">
                <label className="text-gray-100">State</label>
                {/* <select className="rounded-md px-4 py-2 focus:outline-0">
                  <option value="">option 1</option>
                  <option value="">option 1</option>
                  <option value="">option 1</option>
                </select> */}
                <SearchDropDown
                  label={"Select State"}
                  color={"rgb(243, 244, 246)"}
                />
              </div>
              <div className=" flex flex-col gap-2 w-full md:w-[20vw]">
                <label className="text-gray-100">City</label>
                {/* <select className="rounded-md px-4 py-2 focus:outline-0">
                  <option value="">option 1</option>
                  <option value="">option 1</option>
                  <option value="">option 1</option>
                </select> */}
                <SearchDropDown
                  label={"Select City"}
                  color={"rgb(243, 244, 246)"}
                />
              </div>
              <button className="w-full md:w-[20vw] col-span-2 md:ml-10 focus:outline-0 mt-8 text-gray-300 hover:shadow-md h-10 bg-slate-500 transition-all duration-200 ease-linear active:bg-slate-700 rounded-md">
                Search School
              </button>
            </div>
            <Link to="/addschool">
              <div className=" absolute right-8 md:top-[13.3rem] top-[19.5rem]">
                <button className="w-[10rem] relative col-span-2 focus:outline-0 mt-8 text-gray-300 hover:shadow-md h-10 bg-slate-500 transition-all duration-200 ease-linear active:bg-slate-700 rounded-md">
                  <Add className="absolute left-3 bottom-[0.6rem]" /> Add School
                </button>
              </div>
            </Link>

            <DataTable
              rows={ManageSchoolRows}
              checkbox={false}
              Tablecolumns={Tablecolumns}
              tableName="ManageSchool"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageSchool;
