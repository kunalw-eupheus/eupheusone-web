import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import GoogleMap from "../Components/GoogleMap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Loader from "../Components/Loader";
import orderImg from "../assets/img/order.png";
import documentImg from "../assets/img/documents.png";
import zohoImg from "../assets/img/zoho.png";
import SwipeableTemporaryDrawer from "../Components/Material/MaterialSidebar";

// import { Map } from "@mui/icons-material";
import GMap from "../assets/map.png";
import BasicButton from "../Components/Material/Button";
import ResetPass from "../Components/Material/Dialog/ResetPassDialog";
const UserHome = () => {
  const [status, setStatus] = useState("Start Day");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentLocation, setCurrentLocation] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const sidebarRef = useRef();

  const show = null;
  const temp = [];
  const Co_ordinates = JSON.parse(localStorage.getItem("co_ordinates"));

  useLayoutEffect(() => {
    navigator.geolocation.watchPosition(function (position) {
      // console.log("Latitude is :", position.coords.latitude);
      // console.log("Longitude is :", position.coords.longitude);
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

  const handleLocation = async () => {
    if (status === "Start Day") {
      setLoading(true);
      const res = await axios.post(
        "https://nodecrmv2.herokuapp.com/api/user/start_day",
        {
          category: "start",
          coordinates: [[currentLocation.lng, currentLocation.lat]],
        },
        {
          headers: {
            authorization: Cookies.get("accessToken"),
          },
        }
      );
      console.log(res);
      setStatus("End Day");
      setLoading(false);
    } else {
      setLoading(true);
      const running = await axios.post(
        "https://nodecrmv2.herokuapp.com/api/user/start_day",
        {
          category: "running",
          coordinates: Co_ordinates,
        },
        {
          headers: {
            authorization: Cookies.get("accessToken"),
          },
        }
      );

      console.log(running);

      const res = await axios.post(
        "https://nodecrmv2.herokuapp.com/api/user/start_day",
        {
          category: "end",
          coordinates: [[currentLocation.lng, currentLocation.lat]],
        },
        {
          headers: {
            authorization: Cookies.get("accessToken"),
          },
        }
      );

      console.log(res);
      setStatus("Start Day");
      localStorage.clear();
      setLoading(false);
    }
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
        {loading ? <Loader /> : null}

        <Sidebar
          highLight={"dashboard"}
          sidebarCollapsed={sidebarCollapsed}
          show={show}
        />
        <div>
          <SwipeableTemporaryDrawer
            ref={sidebarRef}
            sidebarCollapsed={sidebarCollapsed}
            show={show}
            highLight={"dashboard"}
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
                <section className="flex sm:w-[30%] sm:h-[19rem] w-full sm:flex-col flex-row gap-4 hover:shadow-2xl items-center justify-between px-4 py-4 bg-gray-200 rounded-md">
                  <img
                    src={orderImg}
                    className="md:w-[10.8rem] sm:w-[7.5rem] w-[4rem] h-auto "
                    alt=""
                  />
                  {/* <div className="flex items-center gap-4"> */}
                  <span className="md:text-2xl sm:text-base text-sm font-bold">
                    Order Processing
                  </span>
                  {/* <button className="text-lg hover:shadow-2xl rounded-md text-gray-100 font-semibold px-6 py-1.5 bg-[#659DBD]">
                    Process
                  </button> */}
                  {/* <div className="!w-fit"> */}
                  <Link to="/order_processing">
                    <BasicButton text={"Process"} />
                  </Link>
                  {/* </div> */}
                  {/* </div> */}
                </section>
                <div className="flex sm:w-[60%]  flex-row gap-4 ">
                  <section className="flex w-1/2 flex-col hover:shadow-2xl cursor-pointer gap-4 items-center justify-around sm:px-4 sm:py-4 bg-gray-200 rounded-md">
                    <a target="_blank" href="https://analytics.zoho.com/">
                      <img
                        src={zohoImg}
                        className="sm:w-[15rem] w-[15rem] h-auto"
                        alt=""
                      />
                    </a>
                  </section>

                  <section
                    onClick={() => {
                      navigate("/print_pdf");
                    }}
                    className="flex grayscale w-1/2 flex-col gap-4 hover:shadow-2xl cursor-pointer items-center justify-around px-4 py-4 bg-gray-200 rounded-md"
                  >
                    <img
                      src={documentImg}
                      className="sm:w-[14rem] w-[5rem] h-auto"
                      alt=""
                    />

                    <span className="md:text-2xl sm:text-base text-sm font-bold">
                      Documents
                    </span>
                  </section>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserHome;
