import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";

import Cookies from "js-cookie";
import SwipeableTemporaryDrawer from "../Components/Material/MaterialSidebar";
import BasicButton from "../Components/Material/Button";
import CustomizedSteppers from "../Components/Material/Stepper";
import SearchDropDown from "../Components/SearchDropDown";
import BasicTextFields from "../Components/Material/TextField";
import { Backdrop, CircularProgress } from "@mui/material";
import instance from "../Instance";

const AddSchool = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [boards, setBoards] = useState(null);
  const [category, setCategory] = useState(null);
  const [steps, setSteps] = useState({
    step1: true,
    step2: false,
    step3: false,
  });
  const sidebarRef = useRef();

  const show = null;
  const temp = [];

  const calActiceStep = () => {
    if (steps.step1) {
      return 0;
    }
    if (steps.step2) {
      return 1;
    }
    if (steps.step3) {
      return 2;
    }
  };

  useLayoutEffect(() => {
    const getBoards = async () => {
      const boards = await instance({
        url: "school/board/get/findAll",
        method: "GET",
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      });
      setBoards(boards.data.message);
    };
    const getCategory = async () => {
      const category = await instance({
        url: "school/category/get/findAll",
        method: "GET",
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      });
      setCategory(category.data.message);
    };
    getBoards();
    getCategory();
  }, []);

  const navInfo = {
    title: "AOF",
    details: ["Home", "/New School"],
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
          highLight={"aof"}
          sidebarCollapsed={sidebarCollapsed}
          show={show}
        />

        <div>
          <SwipeableTemporaryDrawer
            ref={sidebarRef}
            sidebarCollapsed={sidebarCollapsed}
            show={show}
            highLight={"aof"}
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
            <h1 className="text-gray-100 md:text-2xl text-base font-semibold absolute top-[2rem] left-[2rem]">
              Add New School
            </h1>
            <div className="w-full flex flex-col gap-4 items-center mt-[7rem]">
              <CustomizedSteppers
                activeStep={calActiceStep()}
                steps={["Basic Details", "Contact Details", "Address Details"]}
              />
              {/* step 1 */}
              {steps.step1 ? (
                <div className="flex flex-col gap-4 items-start w-[90%] px-6 bg-slate-600 rounded-md py-6 mb-[5rem]">
                  <div className="grid sm:grid-rows-2 sm:grid-cols-2 grid-rows-4 grid-cols-1 w-full mt-6 gap-6 rounded-md bg-slate-600">
                    <BasicTextFields
                      lable={"Enter School Name *"}
                      variant={"standard"}
                      multiline={false}
                    />
                    <BasicTextFields
                      lable={"Enter Affiliate Code *"}
                      variant={"standard"}
                      multiline={false}
                    />

                    <SearchDropDown
                      Name={"board_name"}
                      label={"Select Board *"}
                      data={boards}
                      color={"rgb(243, 244, 246)"}
                    />
                    <SearchDropDown
                      Name={"category"}
                      data={category}
                      label={"Select Category *"}
                      color={"rgb(243, 244, 246)"}
                    />
                  </div>
                  <div
                    className="mt-3"
                    onClick={() => {
                      setSteps({ step1: false, step2: true, step3: false });
                      window.scroll({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    <BasicButton text={"Next"} />
                  </div>
                </div>
              ) : null}
              {/* step 2 */}
              {steps.step2 ? (
                <div className="flex flex-col gap-4 items-start w-[90%] px-6 bg-slate-600 rounded-md py-6 mb-[5rem]">
                  <div className="grid sm:grid-rows-2 sm:grid-cols-3 grid-rows-5 grid-cols-1 w-full mt-6 gap-6 rounded-md bg-slate-600">
                    <BasicTextFields
                      lable={"Enter Name *"}
                      variant={"standard"}
                      multiline={false}
                    />
                    <BasicTextFields
                      lable={"Enter Email *"}
                      variant={"standard"}
                      multiline={false}
                    />
                    <BasicTextFields
                      lable={"Enter Phone *"}
                      type={"number"}
                      variant={"standard"}
                      multiline={false}
                    />

                    <BasicTextFields
                      lable={"Enter Website *"}
                      variant={"standard"}
                      multiline={false}
                    />
                    <BasicTextFields
                      lable={"Enter Designation *"}
                      variant={"standard"}
                      multiline={false}
                    />
                  </div>

                  <div
                    onClick={() => {
                      setSteps({ step1: false, step2: false, step3: true });
                      window.scroll({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                    className="mt-3"
                  >
                    <BasicButton text={"Next"} />
                  </div>
                </div>
              ) : null}
              {/* step 3 */}
              {steps.step3 ? (
                <div className="flex flex-col gap-4 items-start w-[90%] px-6 bg-slate-600 rounded-md py-6 mb-[5rem]">
                  <div className="grid sm:grid-rows-2 sm:grid-cols-3 grid-rows-4 grid-cols-1 w-full mt-6 gap-6 rounded-md bg-slate-600">
                    <SearchDropDown
                      label={"Select Country "}
                      color={"rgb(243, 244, 246)"}
                    />
                    <SearchDropDown
                      label={"Select State "}
                      color={"rgb(243, 244, 246)"}
                    />
                    <SearchDropDown
                      label={"Select City "}
                      color={"rgb(243, 244, 246)"}
                    />
                    <BasicTextFields
                      lable={"Enter Address *"}
                      variant={"standard"}
                      multiline={false}
                    />
                    <BasicTextFields
                      lable={"Enter Pin Code *"}
                      variant={"standard"}
                      type={"number"}
                      multiline={false}
                    />
                  </div>

                  <div
                    onClick={() => {
                      setSteps({
                        step1: false,
                        step2: false,
                        step3: false,
                      });
                      window.scroll({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                    className="mt-3"
                  >
                    <BasicButton text={"Add School"} />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSchool;
