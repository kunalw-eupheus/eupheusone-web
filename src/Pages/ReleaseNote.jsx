import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";

import { Backdrop, CircularProgress } from "@mui/material";
import instance from "../Instance";

const ReleaseNote = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const sidebarRef = useRef();

  const navInfo = {
    title: "Release Note",
    details: ["Home", "/Release Note"],
  };

  const handleSidebarCollapsed = () => {
    // setSidebarCollapsed(!sidebarCollapsed);
    sidebarRef.current.openSidebar();
  };

  //   useEffect(() => {
  //     const handleWidth = () => {
  //       if (window.innerWidth > 1024) {
  //         setSidebarCollapsed(false);
  //       } else {
  //         setSidebarCollapsed(true);
  //       }
  //     };
  //     window.addEventListener("resize", handleWidth);
  //     handleWidth();
  //     window.scroll(0, 0);

  //     return () => {
  //       window.removeEventListener("resize", handleWidth);
  //     };
  //   }, []);
  return (
    <>
      <div className="flex w-[100%] min-h-[100vh]">
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <div
          className={`flex flex-col w-[100vw] relative transition-all ease-linear duration-300 `}
        >
          <div className="sm:!px-[1rem]">
            <Navbar
              handleSidebarCollapsed={handleSidebarCollapsed}
              info={navInfo}
            />
          </div>

          <div className="min-h-[90vh] relative flex w-full justify-center items-start gap-4 bg-[#141728]">
            <h1 className="text-gray-100 md:text-2xl text-base font-semibold absolute top-[2rem] left-[2rem]">
              Previous Release Notes
            </h1>
            <div className="w-full flex flex-col gap-4 mt-[7rem]">
              <div className="w-full flex justify-around">
                <h1 className="text-gray-100 md:text-xl text-base">Version</h1>
                <h1 className="text-gray-100 md:text-xl text-base">Summary</h1>
              </div>
              <div className="w-full flex justify-around">
                <h1
                  onClick={() => navigate("/web-release-notes/v_1_0_0")}
                  className="text-gray-100 md:text-xl sm:text-base text-sm cursor-pointer hover:text-gray-300"
                >
                  CRM v1.0.0
                </h1>
                <h1 className="text-gray-100 md:text-xl sm:text-base text-sm">
                  Initial Release
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReleaseNote;
