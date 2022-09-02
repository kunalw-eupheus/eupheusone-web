import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
// import DataTable from "../Components/DataTable";
import SearchDropDown from "../Components/SearchDropDown";
import TextFields from "../Components/Material/TextField";
import RowRadioButtonsGroup from "../Components/Material/RowRadioButtonGroup";
import Button from "../Components/Material/Button";
import CustomizedSteppers from "../Components/Material/Stepper";
import { useLayoutEffect } from "react";
import instance from "../Instance";
import Cookies from "js-cookie";
import SwipeableTemporaryDrawer from "../Components/Material/MaterialSidebar";
// import { TaggingRows } from "../DummyData";

const SchoolPunchIn = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [highLight, setHighLight] = useState("tagging");
  const [states, setStates] = useState(null);
  const [city, setCity] = useState(null);
  const [schools, setSchools] = useState(null);
  const sidebarRef = useRef();

  const navInfo = {
    title: "Tagging",
    details: ["Home", " / School PunchIN"],
  };

  const handleSidebarCollapsed = () => {
    // setSidebarCollapsed(!sidebarCollapsed);
    sidebarRef.current.openSidebar();
  };

  useLayoutEffect(() => {
    const getStates = async () => {
      const res = await instance({
        url: "location/state",
        method: "get",
        headers: {
          authorization: Cookies.get("accessToken"),
        },
      });
      setStates(res.data.message);
    };
    const getCities = async () => {
      const res = await instance({
        url: "location/city",
        method: "get",
        headers: {
          authorization: Cookies.get("accessToken"),
        },
      });
      setCity(res.data.message);
    };
    const getSchools = async () => {
      const res = await instance({
        url: "school/81be687e-aa7d-4862-9def-e6a371167a41/89e66a68-597c-4bec-a57a-ac40f89f7297",
        method: "get",
        headers: {
          authorization: Cookies.get("accessToken"),
        },
      });
      setSchools(res.data.message);
    };
    getStates();
    getCities();
    getSchools();
  }, []);

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
    <div className="flex">
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
        className={`flex flex-col w-[100vw] transition-all duration-200 ease-linear lg:w-[83vw] lg:ml-[18vw] ${
          sidebarCollapsed ? null : "md:ml-[30vw] ml-[60vw]"
        }`}
      >
        <Navbar
          handleSidebarCollapsed={handleSidebarCollapsed}
          info={navInfo}
        />
        <div className="min-h-[100vh] pt-[2vh] max-h-full bg-[#141728]">
          <CustomizedSteppers steps={["Punch In", "Punch Out"]} />
          <div className=" px-8 py-3 bg-[#141728]">
            <section className="px-6 py-6 bg-slate-600 rounded-md mt-6 flex flex-col gap-4">
              <div className="grid md:grid-cols-2 md:grid-rows-3 grid-cols-1 grid-rows-4 gap-8">
                <div className=" flex flex-col gap-2 w-full">
                  <label className="text-gray-100">State</label>

                  <SearchDropDown
                    data={states}
                    Name={"state"}
                    label={"Select State"}
                    color={"rgb(243, 244, 246)"}
                  />
                </div>
                <div className=" flex flex-col gap-2 w-full">
                  <label className="text-gray-100">City</label>

                  <SearchDropDown
                    data={city}
                    Name={"city"}
                    label={"Select City"}
                    color={"rgb(243, 244, 246)"}
                  />
                </div>
                <div className=" flex flex-col gap-2 w-full">
                  <label className="text-gray-100">School Name</label>

                  <SearchDropDown
                    data={schools}
                    Name={"school_name"}
                    label={"Select School"}
                    color={"rgb(243, 244, 246)"}
                  />
                </div>
                <div className="w-full md:col-span-2">
                  <TextFields lable="Address" multiline={false} mt={true} />
                </div>
              </div>
              <div className="w-full md:col-span-2">
                <RowRadioButtonsGroup className="!text-sm" />
              </div>
              <div className="w-full md:col-span-2">
                <TextFields lable="Remarks" multiline={true} mt={false} />
              </div>
              <Button text={"Punch In"} />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolPunchIn;
