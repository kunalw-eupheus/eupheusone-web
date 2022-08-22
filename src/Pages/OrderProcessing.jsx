import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { ArrowForwardIos } from "@mui/icons-material";
import { Link } from "react-router-dom";
import DataTable from "../Components/DataTable";
import SearchDropDown from "../Components/SearchDropDown";
import { TaggingRows } from "../DummyData";
import Button from "../Components/Material/Button";
import BasicTextFields from "../Components/Material/TextField";

const OrderProcessing = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [highLight, setHighLight] = useState("tagging");

  const navInfo = {
    title: "Order process",
    details: ["Home", " / Order process"],
  };

  const Tablecolumns = [
    { field: "CrmId", headerName: "CRM ID", width: 70 },
    { field: "SchoolName", headerName: "School Name", width: 230 },
    { field: "Address", headerName: "Address", width: 350 },
    { field: "Board", headerName: "Board", width: 70 },
    {
      field: "RequestedOn",
      headerName: "Requested On",
      width: 130,
    },
    {
      field: "UpdatedOn",
      headerName: "Updated On",
      width: 110,
    },
  ];

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
        className={`flex flex-col w-[100vw] transition-all duration-300 ease-linear lg:w-[83vw] lg:ml-[18vw] ${
          sidebarCollapsed ? null : "md:ml-[30vw] ml-[60vw]"
        }`}
      >
        <Navbar
          handleSidebarCollapsed={handleSidebarCollapsed}
          info={navInfo}
        />
        <div className="min-h-[100vh] pt-[2vh] max-h-full bg-[#141728]">
          <div className=" px-8 py-3 bg-[#141728]">
            <div className="flex flex-col gap-[2rem] px-6 py-6 bg-slate-600 rounded-md">
              <section className="grid grid-cols-1 grid-rows-12 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 lg:grid-rows-3 md:grid-rows-4 sm:grid-rows-6 bg-slate-600 rounded-md">
                <div className=" flex flex-col gap-2 w-full">
                  {/* <label className=" text-gray-100">Order Type</label> */}

                  <SearchDropDown
                    data={[{ order_type: "Order" }, { order_type: "Sample" }]}
                    Name={"order_type"}
                    label={"Order Type"}
                    color={"rgb(243, 244, 246)"}
                  />
                </div>
                <div className=" flex flex-col gap-2 w-full">
                  {/* <label className="text-gray-100">Customer Name</label> */}

                  <SearchDropDown
                    label={"Customer Name"}
                    color={"rgb(243, 244, 246)"}
                  />
                </div>
                <div className=" flex flex-col gap-2 w-full">
                  {/* <label className="text-gray-100">Delivery Date</label> */}

                  <BasicTextFields
                    lable={"Delivery Date"}
                    variant={"standard"}
                    multiline={false}
                  />
                </div>
                <div className=" flex flex-col gap-2 w-full">
                  {/* <label className="text-gray-100">Order Reference</label> */}

                  <BasicTextFields
                    lable={"Order Reference"}
                    variant={"standard"}
                    multiline={false}
                  />
                </div>
                <div className=" flex flex-col gap-2 w-full">
                  {/* <label className="text-gray-100">Select School</label> */}

                  <SearchDropDown
                    label={"Select School"}
                    color={"rgb(243, 244, 246)"}
                  />
                </div>
                <div className=" flex flex-col gap-2 w-full">
                  {/* <label className="text-gray-100">Select Subject</label> */}

                  <SearchDropDown
                    label={"Select Subject"}
                    color={"rgb(243, 244, 246)"}
                  />
                </div>
                <div className=" flex flex-col gap-2 w-full">
                  {/* <label className="text-gray-100">Select Series</label> */}

                  <SearchDropDown
                    label={"Select Series"}
                    color={"rgb(243, 244, 246)"}
                  />
                </div>
                <div className=" flex flex-col gap-2 w-full">
                  {/* <label className="text-gray-100">Items Quantity</label> */}

                  <BasicTextFields
                    lable={"Items Quantity"}
                    variant={"standard"}
                    multiline={false}
                  />
                </div>
                <div className=" flex flex-col gap-2 w-full">
                  {/* <label className="text-gray-100">Order Priority</label> */}
                  <SearchDropDown
                    label={"Order Priority"}
                    color={"rgb(243, 244, 246)"}
                  />
                </div>
                <div className=" flex flex-col gap-2 w-full">
                  {/* <label className="text-gray-100">Total Quantity</label> */}

                  <BasicTextFields
                    lable={"Total Quantity"}
                    variant={"standard"}
                    multiline={false}
                  />
                </div>
                <div className=" flex flex-col gap-2 w-full">
                  {/* <label className="text-gray-100">Total Before Tax</label> */}

                  <BasicTextFields
                    lable={"Total Before Tax"}
                    variant={"standard"}
                    multiline={false}
                  />
                </div>
                <div className=" flex flex-col gap-2 w-full">
                  <label className="text-gray-100">Total</label>

                  <BasicTextFields
                    // lable={"Total"}
                    variant={"standard"}
                    multiline={false}
                  />
                </div>
              </section>
              <div className="flex items-center gap-2 justify-between">
                <div className=" flex flex-col gap-2 w-full md:col-span-2">
                  <label className="text-gray-100">
                    Preffered Transpoter Name
                  </label>

                  <BasicTextFields
                    lable={"Enter Name"}
                    variant={"standard"}
                    multiline={false}
                  />
                </div>
                <div className=" flex flex-col gap-2 w-full md:col-span-2">
                  <label className="text-gray-100">Remarks</label>

                  <BasicTextFields
                    //   lable={"Total"}
                    //   variant={"standard"}
                    multiline={true}
                  />
                </div>
              </div>
              <Button text={"Submit"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderProcessing;
