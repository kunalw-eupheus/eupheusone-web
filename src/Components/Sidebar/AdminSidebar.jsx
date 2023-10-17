import { Dashboard, PrintOutlined } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = ({ highLight }) => {
  return (
    <>
      <Link to="/admin/home">
        <aside
          className={`px-6 py-2 hover:bg-gray-500 flex ${
            highLight === "dashboard" ? "bg-gray-500" : ""
          } rounded-md gap-4 cursor-pointer group`}
        >
          <div className="flex gap-4">
            <Dashboard
              className={`${
                highLight === "dashboard" ? "!text-[#659DBD]" : "!text-gray-400"
              } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
            />
            <span
              className={`${
                highLight === "dashboard" ? "text-gray-200" : "text-gray-400"
              } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
            >
              DashBoard
            </span>
          </div>
          {/* <hr className="text-gray-300" /> */}
        </aside>
      </Link>
      <Link to="/print_pdf">
        <aside
          className={`px-6 py-2 flex gap-4 ${
            highLight === "printpdf" ? "bg-gray-500" : ""
          } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
        >
          <PrintOutlined
            className={`${
              highLight === "printpdf" ? "!text-[#659DBD]" : "!text-gray-400"
            } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
          />
          <span
            className={`${
              highLight === "printpdf" ? "text-gray-200" : "text-gray-400"
            } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
          >
            Doc Print
          </span>
        </aside>
      </Link>
      {/* <Link to="/admin/manageschool">
        <aside
          className={`px-6 py-2 flex gap-4 cursor-pointer ${
            highLight === "manageSchool" ? "bg-gray-500" : ""
          } group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
        >
          <School
            className={`${
              highLight === "manageSchool"
                ? "!text-[#659DBD]"
                : "!text-gray-400"
            } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
          />
          <span
            className={`${
              highLight === "manageSchool" ? "text-gray-200" : "text-gray-400"
            } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
          >
            Manage School
          </span>
        </aside>
      </Link>

      <Link to="/admin/uploadinvoice">
        <aside
          className={`px-6 py-2 flex gap-4 ${
            highLight === "uploadinvoice" ? "bg-gray-500" : ""
          } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
        >
          <DocumentScanner
            className={`${
              highLight === "uploadinvoice"
                ? "!text-[#659DBD]"
                : "!text-gray-400"
            } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
          />
          <span
            className={`${
              highLight === "uploadinvoice" ? "text-gray-200" : "text-gray-400"
            } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
          >
            Upload Invoice
          </span>
        </aside>
      </Link>

      <Link to="/admin/invoice">
        <aside
          className={`px-6 py-2 flex gap-4 ${
            highLight === "invoice" ? "bg-gray-500" : ""
          } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
        >
          <ReceiptOutlined
            className={`${
              highLight === "invoice" ? "!text-[#659DBD]" : "!text-gray-400"
            } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
          />
          <span
            className={`${
              highLight === "invoice" ? "text-gray-200" : "text-gray-400"
            } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
          >
            Invoice Tagging
          </span>
        </aside>
      </Link>

      <Link to="/admin/ckreport">
        <aside
          className={`px-6 py-2 flex gap-4 ${
            highLight === "ckreport" ? "bg-gray-500" : ""
          } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
        >
          <Article
            className={`${
              highLight === "ckreport" ? "!text-[#659DBD]" : "!text-gray-400"
            } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
          />
          <span
            className={`${
              highLight === "ckreport" ? "text-gray-200" : "text-gray-400"
            } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
          >
            CK Report
          </span>
        </aside>
      </Link> */}
    </>
  );
};

export default AdminSidebar;
