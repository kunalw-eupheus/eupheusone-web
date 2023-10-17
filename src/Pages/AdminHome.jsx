import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import GoogleMap from "../Components/GoogleMap";
import Loader from "../Components/Loader";
import SwipeableTemporaryDrawer from "../Components/Material/MaterialSidebar4";
import documentImg from "../assets/img/documents.png";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentLocation, setCurrentLocation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const sidebarRef = useRef();
  const navigate = useNavigate();
  const show = null;

  const navInfo = {
    title: "Admin Dashboard",
    details: ["Home", "Admin Dashboard"],
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

    window.scroll(0, 0);

    return () => {
      window.removeEventListener("resize", handleWidth);
    };
  }, []);
  return (
    <>
      <div className="flex w-[100%] min-h-[100vh]">
        {loading ? <Loader /> : null}

        <Sidebar
          highLight={"dashboard"}
          sidebarCollapsed={sidebarCollapsed}
          show={show}
        />

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
          <Navbar
            handleSidebarCollapsed={handleSidebarCollapsed}
            info={navInfo}
          />

          {showMap ? (
            <div className="h-[90vh] bg-gray-300">
              <GoogleMap
                sidebarCollapsed={sidebarCollapsed}
                currentLocation={currentLocation}
              />
            </div>
          ) : (
            <div className="min-h-[90vh] relative flex w-full justify-center items-center gap-4 bg-[#141728]">
              <h1 className="text-gray-100 sm:text-2xl text-base font-semibold absolute top-[2rem] left-[2rem]">
                Welcome
              </h1>

              <section
                onClick={() => {
                  navigate("/print_pdf");
                }}
                className="flex grayscale w-1/2 flex-col gap-4 hover:shadow-2xl cursor-pointer items-center justify-around px-4 py-4 bg-gray-200 rounded-md"
              >
                <img
                  src={documentImg}
                  className="sm:w-[14rem] w-[5rem] h-auto"
                  alt=""
                />

                <span className="md:text-2xl sm:text-base text-sm font-bold">
                  Documents
                </span>
              </section>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminHome;
