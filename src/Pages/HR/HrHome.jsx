import React from "react";
import Sidebar from "../../Components/Sidebar7";
import { useState } from "react";
import { useRef } from "react";
import SwipeableTemporaryDrawer from "../../Components/Material/MaterialSidebar7";
import { useEffect } from "react";
import Navbar2 from "../../Components/Navbar2";
import ResetPass from "../../Components/Material/Dialog/ResetPassDialog";
import { useLocation } from "react-router-dom";

const HrHome = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const resetPass = !location?.state?.reset_password;
  const show = null;
  const sidebarRef = useRef();

  const handleSidebarCollapsed = () => {
    // setSidebarCollapsed(!sidebarCollapsed);
    sidebarRef.current.openSidebar();
  };

  const navInfo = {
    title: "HR",
    details: ["Home", " "],
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
    <>
      <div className="flex w-[100%] min-h-[100vh]">
        <div>
          <Sidebar
            highLight={"dashboard"}
            sidebarCollapsed={sidebarCollapsed}
            show={show}
          />
        </div>
        {resetPass ? <ResetPass /> : null}

        <div>
          <SwipeableTemporaryDrawer
            ref={sidebarRef}
            sidebarCollapsed={sidebarCollapsed}
            show={show}
            highLight={"dashboard"}
          />
        </div>
        <div
          className={`flex flex-col w-[100vw] relative transition-all ease-linear duration-300 lg:w-[83vw] lg:ml-[18vw] ${
            window.innerWidth < 1024 ? null : "md:ml-[30vw] ml-[85vw]"
          } `}
        >
          <Navbar2
            handleSidebarCollapsed={handleSidebarCollapsed}
            info={navInfo}
          />
          <div>
            <div className="min-h-[90vh] relative flex w-full justify-center items-center gap-4 bg-[#e5e7eb]">
              <h1 className="text-gray-900 sm:text-2xl text-base font-semibold absolute top-[2rem] left-[2rem]">
                Welcome
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HrHome;
