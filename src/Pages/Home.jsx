import React, { useEffect, useLayoutEffect } from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import GoogleMap from "../Components/GoogleMap";
import axios from "axios";

const Home = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentLocation, setCurrentLocation] = useState([]);
  const show = null;

  useLayoutEffect(() => {
    var successHandler = function (position) {
      setCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      console.log(currentLocation);
    };

    var errorHandler = function (errorObj) {
      alert(errorObj.code + ": " + errorObj.message);

      alert("something wrong take this lat " + 26.0546106);
      alert("something wrong take this lng " + -98.3939791);
    };

    navigator.geolocation.watchPosition(successHandler, errorHandler, {
      enableHighAccuracy: true,
      maximumAge: 10000,
    });
  }, []);

  const navInfo = {
    title: "",
    details: ["", ""],
  };

  const handleLocation = async () => {
    const res = await axios.post(
      "http://192.168.7.120:5070/api/user/start_day",
      {
        category: "start",
        time: new Date(),
        longitude: currentLocation.lng,
        latitude: currentLocation.lat,
      }
    );
    console.log(res.data);
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
    <div className="flex max-w-[100vw] overflow-hidden">
      <Sidebar sidebarCollapsed={sidebarCollapsed} show={show} />
      <div
        className={`flex flex-col w-[100vw] relative lg:w-[83vw] lg:ml-[18vw] ${
          sidebarCollapsed ? null : "md:ml-[30vw] ml-[60vw]"
        } `}
      >
        <Navbar
          handleSidebarCollapsed={handleSidebarCollapsed}
          info={navInfo}
        />
        <div className="h-[90vh] bg-gray-300">
          <GoogleMap sidebarCollapsed={sidebarCollapsed} />
          {/* <button className="px-4 py-1 bg-blue-400" onClick={handleLocation}>
            Start Day
          </button> */}
          {/* <div className="flex px-6 py-2 gap-[4rem] bg-gray-600 w-fit rounded-md mt-[2rem] ml-[2rem]">
            <span className="text-gray-300">School Check In</span>
            <span className="text-gray-300 cursor-pointer">Check In</span>
          </div>
          <button className="w-[7rem] absolute top-[80vh] right-[2rem] col-span-2 focus:outline-0 mt-8 text-gray-300 hover:shadow-md h-10 bg-slate-500 transition-all duration-200 ease-linear active:bg-slate-700 active:scale-95 rounded-md">
            Start Day
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
