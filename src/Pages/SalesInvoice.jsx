import React, { useEffect } from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { ArrowForwardIos } from "@mui/icons-material";
import { Link } from "react-router-dom";
import DataTable from "../Components/DataTable";
import { SalesInvoiceRows } from "../DummyData";

const SalesInvoices = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [highLight, setHighLight] = useState("salesInvoices");

  const navInfo = {
    title: "Sales Invoices",
    details: ["Home", " / Sales Invoices"],
  };

  const Tablecolumns = [
    { field: "inDate", headerName: "Invoice Date", width: 130 },
    { field: "inNo", headerName: "Invoice No.", width: 130 },
    { field: "cName", headerName: "Customer Name", width: 170 },
    { field: "cCode", headerName: "Customer Code", width: 120 },
    {
      field: "totalQty",
      headerName: "TotalQty",
      width: 90,
    },
    {
      field: "total",
      headerName: "Total",
      width: 90,
    },
    {
      field: "city",
      headerName: "City",
      width: 90,
    },
    {
      field: "State",
      headerName: "State",
      width: 140,
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
            <DataTable
              rows={SalesInvoiceRows}
              checkbox={false}
              Tablecolumns={Tablecolumns}
              tableName="SalesInvoice"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesInvoices;
