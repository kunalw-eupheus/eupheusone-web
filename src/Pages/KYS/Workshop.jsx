import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useState } from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import SwipeableTemporaryDrawer from "../../Components/Material/MaterialSidebar";
import BasicButton from "../../Components/Material/Button";
// import SearchDropDown from "../../Components/SearchDropDown";
import instance from "../../Instance";
import Cookies from "js-cookie";
import { Backdrop, CircularProgress } from "@mui/material";

const Workshop = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [workshop, setWorkshops] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const sidebarRef = useRef();

  const show = null;

  useLayoutEffect(() => {
    const getWorkshops = async () => {
      const states = await instance({
        url: `school/workshop/get/all/${id}`,
        method: "GET",
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      });
      setWorkshops(states.data.message);
    };
    getWorkshops();
  }, []);

  const navInfo = {
    title: "Workshop",
    details: ["Home", "/Workshop"],
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
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <Sidebar
          highLight={""}
          sidebarCollapsed={sidebarCollapsed}
          show={show}
        />

        <div>
          <SwipeableTemporaryDrawer
            ref={sidebarRef}
            sidebarCollapsed={sidebarCollapsed}
            show={show}
            highLight={""}
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

          <div className="min-h-[90vh] relative flex flex-col w-full justify-start items-start gap-4 bg-[#141728]">
            <div className="text-gray-100 w-full md:text-2xl flex justify-between sm:px-12 px-8 items-center text-base font-semibold absolute mt-[2rem]">
              <h1 className="text-gray-100 text-lg">Workshop</h1>
              <div onClick={() => navigate(`/kys/add_workshop/${id}`)}>
                <BasicButton text={"Request Workshop"} />
              </div>
            </div>
            {workshop.length > 0 ? (
              <div
                className={`sm:px-8 px-4 py-3 w-full grid mt-[7rem] sm:grid-cols-2 grid-cols-1 gap-4 bg-[#141728]`}
              >
                {workshop.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex font-medium flex-col gap-4 text-gray-100 justify-center rounded-md items-start px-4 py-1 bg-slate-600"
                    >
                      <span>Workshop Name: {item.workshop_name}</span>
                      <span>School Name: {item.fk_school.school_name}</span>
                      <span>Workshop Name: {item.workshop_date}</span>
                      <span>Grade: {item.fk_grade.name}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="w-full flex flex-col text-gray-100 gap-4 items-center mt-[7rem]">
                No Workshop added
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Workshop;
