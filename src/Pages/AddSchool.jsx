import React, { useEffect } from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { Circle } from "@mui/icons-material";
// import { Link } from "react-router-dom";
// import DataTable from "../Components/DataTable";
import Loader from "../Components/Loader";
// import { rows, ManageSchoolRows } from "../DummyData";
import SearchDropDown from "../Components/SearchDropDown";

const AddSchool = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [highLight, setHighLight] = useState("");
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);

  const navInfo = {
    title: "Form",
    details: ["Manage School", " / Create"],
  };

  const handleForm = (e) => {
    e.preventDefault();
    if (e.target.name === "step1") {
      setStep1(false);
      setStep2(true);
      setStep3(false);
    } else if (e.target.name === "step2") {
      setStep1(false);
      setStep2(false);
      setStep3(true);
    }
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
      <Sidebar sidebarCollapsed={sidebarCollapsed} highLight={highLight} />

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
            <div className="flex justify-center relative">
              <hr className=" border-t-2 border-t-slate-600 w-[30vw]" />

              <Circle
                className={`!text-slate-600 absolute -top-[0.7rem] ${
                  step1 ? "left-[19.5rem]" : null
                } ${step2 ? "left-[31.5rem]" : null} ${
                  step3 ? "right-[19.5rem]" : null
                } `}
              />
            </div>
            {/* Step 1 */}
            {step1 ? (
              <>
                <div className="flex flex-col px-6 py-6 mt-6 gap-6 rounded-md bg-slate-600">
                  <h1 className=" text-white text-3xl">Add New School</h1>
                  <input
                    type="text"
                    placeholder="School Name"
                    className=" w-2/3 text-white py-2 outline-0 bg-slate-600 border-b-2 border-b-black"
                  />
                  <input
                    type="text"
                    placeholder="Affiliate Code"
                    className=" w-2/3 text-white py-2 outline-0 bg-slate-600 border-b-2 border-b-black"
                  />
                  <input
                    type="text"
                    placeholder="Board"
                    className=" w-2/3 text-white py-2 outline-0 bg-slate-600 border-b-2 border-b-black"
                  />
                  <div className="w-2/3">
                    <SearchDropDown label={"Select Category"} />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    name="step1"
                    onClick={handleForm}
                    className=" bg-slate-600 rounded-md text-white px-10 py-2 hover:shadow-2xl"
                  >
                    Next
                  </button>
                  <button
                    name="step1Cancel"
                    onClick={handleForm}
                    className=" bg-slate-600 rounded-md text-white px-8 py-2 hover:shadow-2xl"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : null}
            {/* Step 2 */}
            {step2 ? (
              <>
                <div className="flex flex-col px-6 py-6 mt-6 gap-6 rounded-md bg-slate-600">
                  <h1 className=" text-white text-3xl">Add Contact Details</h1>
                  <input
                    type="text"
                    placeholder="Name"
                    className=" w-2/3 text-white py-2 outline-0 bg-slate-600 border-b-2 border-b-black"
                  />
                  <input
                    type="text"
                    placeholder="Email"
                    className=" w-2/3 text-white py-2 outline-0 bg-slate-600 border-b-2 border-b-black"
                  />
                  <input
                    type="text"
                    placeholder="Phone"
                    className=" w-2/3 text-white py-2 outline-0 bg-slate-600 border-b-2 border-b-black"
                  />
                  <input
                    type="text"
                    placeholder="Website (optional)"
                    className=" w-2/3 text-white py-2 outline-0 bg-slate-600 border-b-2 border-b-black"
                  />
                  <input
                    type="text"
                    placeholder="Designation"
                    className=" w-2/3 text-white py-2 outline-0 bg-slate-600 border-b-2 border-b-black"
                  />
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    name="step2"
                    onClick={handleForm}
                    className=" bg-slate-600 rounded-md text-white px-10 py-2 hover:shadow-2xl"
                  >
                    Next
                  </button>
                  <button
                    name="step2Cancel"
                    onClick={handleForm}
                    className=" bg-slate-600 rounded-md text-white px-8 py-2 hover:shadow-2xl"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : null}
            {/* Step 3 */}
            {step3 ? (
              <>
                <div className="flex flex-col px-6 py-6 mt-6 gap-6 rounded-md bg-slate-600">
                  <h1 className=" text-white text-3xl">Add Address</h1>
                  <div className="flex gap-16">
                    <div className="w-1/3">
                      <SearchDropDown label={"Select Country"} />
                    </div>
                    <div className="w-1/3">
                      <SearchDropDown label={"Select State"} />
                    </div>
                  </div>
                  <div className="flex gap-16">
                    <div className="w-1/3">
                      <SearchDropDown label={"Select City"} />
                    </div>
                    <div className="w-1/3">
                      <SearchDropDown label={"Select Region"} />
                    </div>
                  </div>
                  <input
                    type="text"
                    placeholder="Address"
                    className=" w-2/3 text-white py-2 outline-0 bg-slate-600 border-b-2 border-b-black"
                  />
                  <input
                    type="text"
                    placeholder="Pincode"
                    className=" w-2/3 text-white py-2 outline-0 bg-slate-600 border-b-2 border-b-black"
                  />
                </div>
                <div className="flex gap-3 mt-6">
                  <button className=" bg-slate-600 rounded-md text-white px-10 py-2 hover:shadow-2xl">
                    Add
                  </button>
                  <button
                    onClick={handleForm}
                    name="step3Cancel"
                    className=" bg-slate-600 rounded-md text-white px-8 py-2 hover:shadow-2xl"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSchool;
