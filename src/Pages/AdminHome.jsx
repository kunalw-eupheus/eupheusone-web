import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";

import { ArrowForwardIos } from "@mui/icons-material";
import { Link } from "react-router-dom";
import DataTable from "../Components/DataTable";
import { rows } from "../DummyData";
import AdminSidebar from "../Components/AdminSidebar";
import SwipeableTemporaryDrawer from "../Components/Material/AdminMaterialSidebar";

const AdminHome = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navInfo = {
    title: "",
    details: ["", ""],
  };

  const sidebarRef = useRef();

  const [highLight, setHighLight] = useState("");

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
      <AdminSidebar sidebarCollapsed={sidebarCollapsed} highLight={highLight} />

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
          sidebarCollapsed ? null : "md:ml-[30vw] ml-[60vw]"
        } `}
      >
        <Navbar
          handleSidebarCollapsed={handleSidebarCollapsed}
          info={navInfo}
        />
        <div className="min-h-[100vh] pt-[10vh] max-h-full bg-gray-300">
          dashboard
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
