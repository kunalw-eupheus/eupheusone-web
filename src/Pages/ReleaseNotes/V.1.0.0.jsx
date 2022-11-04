import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Navbar from "../../Components/Navbar";

import { Backdrop, CircularProgress } from "@mui/material";

const V_1_0_0 = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [loading, setLoading] = useState(false);

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
              Version 1.0.0 (Initial Release)
            </h1>
            <div className="w-full flex flex-col gap-4 pl-8 mt-[7rem]">
              <div className="w-full flex flex-col gap-3">
                <h1 className="text-gray-100 md:text-xl text-base">Features</h1>
                <ol className="list-disc text-gray-100 pl-8">
                  <li>Search option - filter from the list of data</li>
                  <li>Herirchy - Sales rep can see data</li>
                  <li>
                    School Visit - Remove school visit validation which is
                    dependent on starting day
                  </li>
                  <li>School Visit - Option to visit Book seller</li>
                  <li>
                    School Visit - Vehicle type filter to be added while
                    starting day option
                  </li>
                  <li>Order Processing - Bulk Quantity</li>
                </ol>
              </div>
              <div className="w-full flex flex-col gap-3">
                <h1 className="text-gray-100 md:text-xl text-base">Upcoming</h1>
                <ol className="list-disc text-gray-100 pl-8">
                  <li>User Schema - for Eupheus, SM, CK users</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default V_1_0_0;
