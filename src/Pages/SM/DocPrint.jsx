import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useState } from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import GoogleMap from "../../Components/GoogleMap";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader";
import invoiceLogo from "../../assets/img/invoice_logo.jpg";
import creditLogo from "../../assets/img/creditNote.jpg";
import CustLedger from "../../assets/img/custLedger.jpg";
import SwipeableTemporaryDrawer from "../../Components/Material/MaterialSidebar";

import BasicButton from "../../Components/Material/Button";
const DocPrint = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentLocation, setCurrentLocation] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const sidebarRef = useRef();

  const show = null;
  const temp = [];

  useLayoutEffect(() => {
    navigator.geolocation.watchPosition(function (position) {
      setCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });

      handleCoordinates(position);
    });
  }, []);

  const handleCoordinates = (position) => {
    temp.push({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });

    localStorage.setItem("co_ordinates", JSON.stringify(temp));
  };

  const navInfo = {
    title: "",
    details: ["", ""],
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
  return (
    <>
      <div className="flex w-[100%] min-h-[100vh]">
        {loading ? <Loader /> : null}

        <Sidebar
          highLight={"printpdf"}
          sidebarCollapsed={sidebarCollapsed}
          show={show}
        />

        <div>
          <SwipeableTemporaryDrawer
            ref={sidebarRef}
            sidebarCollapsed={sidebarCollapsed}
            show={show}
            highLight={"printpdf"}
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

          {showMap ? (
            <div className="h-[90vh] bg-gray-300">
              <GoogleMap
                sidebarCollapsed={sidebarCollapsed}
                currentLocation={currentLocation}
              />
            </div>
          ) : (
            <div className="min-h-[90vh] relative flex w-full justify-center items-center gap-4 bg-[#141728]">
              <h1 className="text-gray-100 sm:text-2xl text-base font-semibold absolute top-[2rem] left-[2rem]">
                Welcome
              </h1>

              <div className="w-full flex flex-col px-4 pb-6 sm:flex-row gap-6 items-center justify-center">
                <section className="flex sm:w-[30%] sm:h-[23rem] w-full sm:flex-col flex-row gap-4 hover:shadow-2xl items-center justify-between px-4 py-4 bg-gray-200 rounded-md">
                  <span className="md:text-2xl sm:text-base text-sm font-bold">
                    Invoice PDF
                  </span>
                  <img
                    src={invoiceLogo}
                    className="md:w-[10.8rem] sm:w-[7.5rem] w-[4rem] h-auto "
                    alt=""
                  />
                  <div className="flex gap-2">
                    <div>
                      <Link to="/invoice_pdf_single">
                        <BasicButton text={"Single Invoice"} />
                      </Link>
                    </div>

                    <div>
                      <Link to="/invoice_pdf_double">
                        <BasicButton text={"Bulk Invoice"} />
                      </Link>
                    </div>
                  </div>
                </section>

                <section className="flex sm:w-[30%] sm:h-[23rem] w-full sm:flex-col flex-row gap-4 hover:shadow-2xl items-center justify-between px-4 py-4 bg-gray-200 rounded-md">
                  <span className="md:text-2xl sm:text-base text-sm font-bold">
                    Credit Note
                  </span>
                  <img
                    src={creditLogo}
                    className="md:w-[10.8rem] sm:w-[7.5rem] w-[4rem] h-auto "
                    alt=""
                  />
                  <div className="flex gap-2">
                    <div>
                      <Link to="/credit/invoice_pdf_single">
                        <BasicButton text={"Single Credit Note"} />
                      </Link>
                    </div>
                  </div>
                </section>

                <section className="flex sm:w-[30%] sm:h-[23rem] w-full sm:flex-col flex-row gap-4 hover:shadow-2xl items-center justify-between px-4 py-4 bg-gray-200 rounded-md">
                  <span className="md:text-2xl sm:text-base text-sm font-bold">
                    Customer Ledger
                  </span>
                  <img
                    src={CustLedger}
                    className="md:w-[10.8rem] sm:w-[7.5rem] w-[4rem] h-auto "
                    alt=""
                  />
                  <Link to="/customer_pdf">
                    <BasicButton text={"Next"} />
                  </Link>
                </section>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DocPrint;
