import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { Link } from "react-router-dom";
import DataTable from "../Components/DataTable";
import SwipeableTemporaryDrawer from "../Components/Material/MaterialSidebar";
import instance from "../Instance";
import { useLayoutEffect } from "react";
import Cookies from "js-cookie";
import BasicButton from "../Components/Material/Button";
import { Backdrop, CircularProgress } from "@mui/material";

const Projection = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [highLight, setHighLight] = useState("projection");
  const [loading, setLoading] = useState(false);
  const sidebarRef = useRef();
  const [projectionData, setProjectionData] = useState([]);

  useLayoutEffect(() => {
    const getProjectionData = async () => {
      const res = await instance({
        url: `projections/getall`,
        method: "GET",
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      });
      const projectionData = res.data.message.map((item) => {
        return {
          id: item.id,
          Series: item.fk_sery.series,
          Grades: item.projections_grades
            .map((item) => item.fk_grade.name)
            .join(),
          Total: item.total,
          Quantity: item.quantity,
        };
      });
      console.log(projectionData);
      setProjectionData(projectionData);
    };
    getProjectionData();
  }, []);

  const navInfo = {
    title: "Projection",
    details: ["Home", " / Projection"],
  };

  const Tablecolumns = [
    { field: "Series", headerName: "Series", width: 300 },
    {
      field: "Grades",
      headerName: "Grades",
      width: 390,
    },
    {
      field: "Total",
      headerName: "Total",
      width: 100,
    },
    {
      field: "Quantity",
      headerName: "Quantity",
      width: 100,
    },
  ];

  const handleSidebarCollapsed = () => {
    sidebarRef.current.openSidebar();
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
    window.scroll(0, 0);
    return () => {
      window.removeEventListener("resize", handleWidth);
    };
  }, []);

  return (
    <div className="flex bg-[#111322]">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Sidebar sidebarCollapsed={sidebarCollapsed} highLight={highLight} />

      <div>
        <SwipeableTemporaryDrawer
          ref={sidebarRef}
          sidebarCollapsed={sidebarCollapsed}
          highLight={highLight}
          // show={show}
        />
      </div>

      <div
        className={`flex flex-col w-[100vw] lg:w-[83vw] lg:ml-[18vw] ${
          window.innerWidth < 1024 ? null : "md:ml-[30vw] ml-[60vw]"
        } `}
      >
        <Navbar
          handleSidebarCollapsed={handleSidebarCollapsed}
          info={navInfo}
        />
        <div className="min-h-[100vh] pt-[2vh] max-h-full bg-[#141728]">
          <div className=" sm:px-8 px-2 py-3 bg-[#141728]">
            <div className="w-full flex gap-3 justify-end">
              <Link to="/addprojection">
                <BasicButton text={"ADD PROJECTION"} />
              </Link>
            </div>

            <DataTable
              rows={projectionData}
              checkbox={false}
              Tablecolumns={Tablecolumns}
              tableName="Projection"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projection;
