import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useState } from "react";
import Cookies from "js-cookie";
import { Backdrop, CircularProgress } from "@mui/material";
import instance from "../../Instance";
import Sidebar from "../../Components/Sidebar";
import Snackbars from "../../Components/Material/SnackBar";
import Navbar from "../../Components/Navbar";
import SwipeableTemporaryDrawer from "../../Components/Material/MaterialSidebar";
import { ShowError } from "../../util/showError";

const CheckStatus = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errMessage, setErrMessage] = useState("");
  const [snackbarErrStatus, setSnackbarErrStatus] = useState(true);
  const [requests, setRequests] = useState([]);

  const sidebarRef = useRef();
  const snackbarRef = useRef();

  const show = null;

  const navInfo = {
    title: "Check Status",
    details: ["Home", "/Check Status"],
  };

  const handleSidebarCollapsed = () => {
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

  useLayoutEffect(() => {
    const getRequests = async () => {
      const res = await instance({
        url: `printing/get-print-request`,
        method: "POST",
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
        data: {
          bifurcateByStatus: true,
        },
      });
      setRequests(res.data.data);
    };
    getRequests();
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
          highLight={"checkPrintStatus"}
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
          <Snackbars
            ref={snackbarRef}
            snackbarErrStatus={snackbarErrStatus}
            errMessage={errMessage}
          />
          <Navbar
            handleSidebarCollapsed={handleSidebarCollapsed}
            info={navInfo}
          />

          <div className="min-h-[90vh] relative flex w-full justify-center items-start gap-4 bg-[#141728]">
            <h1 className="text-gray-100 md:text-2xl text-base font-semibold absolute top-[2rem] left-[2rem]">
              Check Status
            </h1>
            <div className="mt-[9rem] grid grid-cols-3 gap-3 p-6">
              {requests.map((request) => {
                return <RequestDetails data={request} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const RequestDetails = ({ data }) => {
  return (
    <div className="bg-slate-600 flex flex-col gap-2 rounded-md p-4">
      <h1 className="text-gray-100">Title: {data.fk_title.title}</h1>
      <h1 className="text-gray-100">Royalty: {data.royalty}</h1>
      <h1 className="text-gray-100">Last Year Sales: {data.lastYearSales}</h1>
      <h1 className="text-gray-100">
        Current Year Sales: {data.currentYearSales}
      </h1>
      <h1 className="text-gray-100">Number of Pages: {data.numberOfPages}</h1>
      <h1 className="text-gray-100">Created By: {data.createdBy}</h1>
      <h1 className="text-gray-100">Status: {data.status}</h1>
    </div>
  );
};

export default CheckStatus;
