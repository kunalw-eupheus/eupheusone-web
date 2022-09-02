import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { ArrowForwardIos } from "@mui/icons-material";
import { Link } from "react-router-dom";
import DataTable from "../Components/DataTable";
import { rows } from "../DummyData";
import SwipeableTemporaryDrawer from "../Components/Material/MaterialSidebar";

const Schools = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [highLight, setHighLight] = useState("schools");
  const show = 2;
  const sidebarRef = useRef();

  const navInfo = {
    title: "My Team School",
    details: ["Home", " / Schools"],
  };

  const handleSidebarCollapsed = () => {
    // setSidebarCollapsed(!sidebarCollapsed);
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
    return () => {
      window.removeEventListener("resize", handleWidth);
    };
  }, []);
  return (
    <div className="flex bg-[#111322]">
      <Sidebar
        sidebarCollapsed={sidebarCollapsed}
        highLight={highLight}
        show={show}
      />
      <div>
        <SwipeableTemporaryDrawer
          ref={sidebarRef}
          sidebarCollapsed={sidebarCollapsed}
          highLight={highLight}
          show={show}
        />
      </div>

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
            {/* <DataTable rows={rows} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schools;
