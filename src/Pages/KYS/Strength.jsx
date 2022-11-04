import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useState } from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import SwipeableTemporaryDrawer from "../../Components/Material/MaterialSidebar";
import BasicButton from "../../Components/Material/Button";
import { Backdrop, CircularProgress } from "@mui/material";

const Strength = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const sidebarRef = useRef();

  const show = null;

  useLayoutEffect(() => {
    // const getState = async () => {
    //   const states = await instance({
    //     url: "location/state/get/states",
    //     method: "GET",
    //     headers: {
    //       Authorization: `${Cookies.get("accessToken")}`,
    //     },
    //   });
    //   setStates(states.data.message);
    // };
    // getState();
  }, []);

  const navInfo = {
    title: "Strength",
    details: ["Home", "/Strength"],
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

          <div className="min-h-[90vh] relative flex w-full justify-center items-start gap-4 bg-[#141728]">
            <div className="text-gray-100 w-full md:text-2xl flex justify-between sm:px-12 px-8 items-center text-base font-semibold absolute mt-[2rem]">
              <h1>Strength</h1>
              <div onClick={() => navigate(`/kys/strength/add_strength/${id}`)}>
                <BasicButton text={"Add Strength"} />
              </div>
            </div>

            <div className="w-full flex flex-col text-gray-100 gap-4 items-center mt-[7rem]">
              {/* <div className="flex flex-col gap-4 items-start sm:w-[75%] w-[95%] px-6 bg-slate-600 rounded-md py-6 mb-[5rem]">
                <h1 className="text-gray-100 md:text-xl text-base font-semibold">
                  Fill The Details
                </h1>
                <div className="grid sm:grid-rows-2 sm:grid-cols-2 grid-rows-3 grid-cols-1 w-full gap-6 rounded-md bg-slate-600">
                  <SearchDropDown
                    Name={"select_state"}
                    handleOrderProcessingForm={handleOrderProcessingForm}
                    data={states}
                    label={"Select State *"}
                    color={"rgb(243, 244, 246)"}
                  />
                  <SearchDropDown
                    Name={"select_city"}
                    data={cities}
                    disable={!values.stateId}
                    handleOrderProcessingForm={handleOrderProcessingForm}
                    label={"Select City"}
                    color={"rgb(243, 244, 246)"}
                  />
                  <div className="sm:col-span-2">
                    <SearchDropDown
                      Name={"school_name"}
                      data={schools}
                      disable={!values.stateId}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      label={"Select School *"}
                      color={"rgb(243, 244, 246)"}
                    />
                  </div>
                </div>

                <div className="w-full flex justify-center">
                  <hr className="text-gray-100 w-[80%] my-4" />
                </div>
                <h1 className="text-gray-100 md:text-lg sm:text-base text-sm font-medium">
                  School Name : {schoolInfo ? schoolInfo.school_name : "null"}
                </h1>
                <h1 className="text-gray-100 md:text-lg sm:text-base text-sm font-medium">
                  Address :{" "}
                  {schoolInfo ? schoolInfo.school_addresses[0].address : "null"}
                </h1>
                <div className="flex gap-4 justify-start items-center">
                  <div>
                    <BasicButton text={"Product"} />
                  </div>
                  <div>
                    <BasicButton text={"Workshops"} />
                  </div>
                </div>
              </div> */}
              no strength here
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Strength;
