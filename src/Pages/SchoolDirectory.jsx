import React, { useEffect } from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { ArrowForwardIos } from "@mui/icons-material";
import { Link } from "react-router-dom";
import DataTable from "../Components/DataTable";
import { rows, DirectoryRows } from "../DummyData";

const SchoolDirectory = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [highLight, setHighLight] = useState("schoolDirectory");

  const navInfo = {
    title: "School Directory",
    details: ["Home", " / School Directory"],
  };

  const Tablecolumns = [
    { field: "AffCode", headerName: "Affiliation Code", width: 130 },
    { field: "SchoolName", headerName: "School Name", width: 170 },
    { field: "Address", headerName: "Address", width: 250 },
    { field: "Board", headerName: "Board", width: 70 },
    {
      field: "City",
      headerName: "City",
      width: 120,
    },
    {
      field: "State",
      headerName: "State",
      width: 120,
    },
    {
      field: "Country",
      headerName: "Country",
      width: 90,
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
            <DataTable
              rows={DirectoryRows}
              Tablecolumns={Tablecolumns}
              tableName="SchoolDirectory"
              checkbox={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolDirectory;
