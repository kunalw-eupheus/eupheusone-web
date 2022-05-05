import React, { useEffect } from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { ArrowForwardIos } from "@mui/icons-material";
import { Link } from "react-router-dom";
import InputTable from "../Components/Table";

const TagSchool = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [highLight, setHighLight] = useState("");

  const navInfo = {
    title: "Titles",
    details: ["Home", " / Master Data"],
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
    <div className="flex bg-[#111322]">
      <Sidebar
        sidebarCollapsed={sidebarCollapsed}
        highLight={highLight}
        show={null}
      />

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
            <div className=" flex flex-col gap-2 mb-6 text-white">
              <h1 className=" text-2xl font-semibold">Tag School</h1>
              <h3>
                RI/55006/21-22 / Anjum Enterprises (CBP510075) /
                ALLSIMICCH10YP21
              </h3>
            </div>
            <section className="flex flex-col gap-8 my-6">
              <div className="flex gap-6">
                <div className="flex gap-2 px-4 py-1 bg-[#67758e] rounded-md font-semibold text-white">
                  <span>State : </span>
                  <span>HIMACHAL PRADESH</span>
                </div>
                <div className="flex gap-2 px-4 py-1 bg-[#67758e] rounded-md font-semibold text-white">
                  <span>City : </span>
                  <span>Mandi</span>
                </div>
              </div>
              <InputTable />
            </section>
            <div className="flex gap-4">
              <button className="text-white font-semibold px-6 py-2 bg-[#67758e] rounded-md">
                Submit
              </button>
              <button className="text-white font-semibold px-6 py-2 rounded-md bg-gray-700 hover:bg-gray-800 transition-all duration-150 ease-linear">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagSchool;
