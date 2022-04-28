import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { ArrowForwardIos } from "@mui/icons-material";
import { Link } from "react-router-dom";
import DataTable from "../Components/DataTable";
import SearchDropDown from "../Components/SearchDropDown";

const Tagging = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [highLight, setHighLight] = useState("tagging");

  const navInfo = {
    title: "Tagging",
    details: ["Home", " / Tagging"],
  };

  const handleSidebarCollapsed = () => {
    setSidebarCollapsed(!sidebarCollapsed);
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
    <div className="flex">
      <Sidebar sidebarCollapsed={sidebarCollapsed} highLight={highLight} />
      <div
        className={`flex flex-col w-[100vw] lg:w-[83vw] lg:ml-[18vw] ${
          sidebarCollapsed ? null : "md:ml-[30vw] ml-[60vw]"
        }`}
      >
        <Navbar
          handleSidebarCollapsed={handleSidebarCollapsed}
          info={navInfo}
        />
        <div className="min-h-[100vh] pt-[2vh] max-h-full bg-[#141728]">
          <div className=" px-8 py-3 bg-[#141728]">
            <section className="grid grid-cols-2 grid-rows-4 md:grid-cols-4 gap-4 md:grid-rows-2 px-6 py-6 bg-slate-600 rounded-md mt-6">
              <div className=" flex flex-col gap-2 w-full">
                <label className=" text-gray-100">Country</label>
                {/* <select className="rounded-md px-4 py-2 focus:outline-0">
                  <option value="">option 1</option>
                  <option value="">option 1</option>
                  <option value="">option 1</option>
                </select> */}
                <SearchDropDown
                  label={"Select Country"}
                  color={"rgb(243, 244, 246)"}
                />
              </div>
              <div className=" flex flex-col gap-2 w-full">
                <label className="text-gray-100">State</label>
                {/* <select className=" rounded-md px-4 py-2 focus:outline-0">
                  <option value="">option 1</option>
                  <option value="">option 1</option>
                  <option value="">option 1</option>
                </select> */}
                <SearchDropDown
                  label={"Select State"}
                  color={"rgb(243, 244, 246)"}
                />
              </div>
              <div className=" flex flex-col gap-2 w-full">
                <label className="text-gray-100">City</label>
                {/* <select className=" rounded-md px-4 py-2 focus:outline-0">
                  <option value="">option 1</option>
                  <option value="">option 1</option>
                  <option value="">option 1</option>
                </select> */}
                <SearchDropDown
                  label={"Select City"}
                  color={"rgb(243, 244, 246)"}
                />
              </div>
              <div className=" flex flex-col gap-2 w-full">
                <label className="text-gray-100">Board</label>
                {/* <select className=" rounded-md px-4 py-2 focus:outline-0">
                  <option value="">option 1</option>
                  <option value="">option 1</option>
                  <option value="">option 1</option>
                </select> */}
                <SearchDropDown
                  label={"Select Board"}
                  color={"rgb(243, 244, 246)"}
                />
              </div>
              <div className=" flex flex-col gap-2 w-full col-span-2 md:col-span-3">
                <label className="text-gray-100">School</label>
                {/* <select className=" rounded-md px-4 py-2 focus:outline-0">
                  <option value="">option 1</option>
                  <option value="">option 1</option>
                  <option value="">option 1</option>
                </select> */}
                <SearchDropDown
                  label={"Select School"}
                  color={"rgb(243, 244, 246)"}
                />
              </div>
              <button className="w-full focus:outline-0 mt-8 text-gray-300 hover:shadow-md h-10 bg-slate-500 transition-all duration-200 ease-linear active:bg-slate-700 rounded-md">
                Search
              </button>
            </section>
            <section className="flex px-6 py-6 bg-slate-600 items-end gap-4 md:gap-4 rounded-md mt-6">
              <div className=" flex flex-col gap-2 w-full md:w-[40vw] lg:w-[20vw]">
                <label className="text-gray-100">Requested Status</label>
                {/* <select className=" w-[40vw] md:w-full rounded-md px-4 py-2 focus:outline-0">
                  <option value="">option 1</option>
                  <option value="">option 1</option>
                  <option value="">option 1</option>
                </select> */}
                <SearchDropDown
                  label={"Select Status"}
                  color={"rgb(243, 244, 246)"}
                />
              </div>
              <button className="px-4 py-2 lg:h-[6vh] rounded-md hover:shadow-lg text-gray-300 bg-slate-500 transition-all duration-200 ease-linear active:bg-slate-700">
                Search
              </button>
            </section>
            <DataTable rows={[]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tagging;
