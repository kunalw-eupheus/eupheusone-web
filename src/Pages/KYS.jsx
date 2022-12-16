import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import GoogleMap from "../Components/GoogleMap";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import SwipeableTemporaryDrawer from "../Components/Material/MaterialSidebar";
import BasicButton from "../Components/Material/Button";
import SearchDropDown from "../Components/SearchDropDown";
import instance from "../Instance";
import Cookies from "js-cookie";
import { Backdrop, CircularProgress } from "@mui/material";
import Snackbars from "../Components/Material/SnackBar";

const KYS = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentLocation, setCurrentLocation] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [schools, setSchools] = useState([]);
  const [values, setValues] = useState({ stateId: false });
  const [schoolInfo, setSchoolInfo] = useState(null);
  const [errMessage, setErrMessage] = useState("");
  const [snackbarErrStatus, setSnackbarErrStatus] = useState(true);

  const sidebarRef = useRef();
  const snackbarRef = useRef();

  // console.log(schoolInfo);

  const show = null;
  const temp = [];

  const handleOrderProcessingForm = (value, type) => {
    // console.log(value, type);
    switch (type) {
      case "select_state":
        getCity(value.fk_state_id);
        getSchoolByState(value.fk_state_id);
        setValues({ stateId: value.fk_state_id });
        break;
      case "select_city":
        getSchoolByStateAndCity(values.stateId, value.id);
        break;
      case "school_name":
        setSchoolInfo(value);
      default:
        break;
    }
  };

  const getCity = async (id) => {
    setLoading(true);
    const cities = await instance({
      url: `location/city/${id}`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    setCities(cities.data.message);
    setLoading(false);
  };

  const getSchoolByState = async (id) => {
    setLoading(true);
    const schools = await instance({
      url: `school/${id}`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    setSchools(schools.data.message);
    setLoading(false);
  };

  const getSchoolByStateAndCity = async (stateId, cityId) => {
    setLoading(true);
    const schools = await instance({
      url: `school/${stateId}/${cityId}`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    setSchools(schools.data.message);
    setLoading(false);
  };

  useLayoutEffect(() => {
    navigator.geolocation.watchPosition(function (position) {
      setCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });

      handleCoordinates(position);
    });

    const getState = async () => {
      const states = await instance({
        url: "location/state/get/states",
        method: "GET",
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      });
      setStates(states.data.message);
    };
    getState();
  }, []);

  const handleCoordinates = (position) => {
    temp.push({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });

    localStorage.setItem("co_ordinates", JSON.stringify(temp));
  };

  const navInfo = {
    title: "KYS",
    details: ["Home", "/KYS"],
  };

  //   const handleLocation = async () => {
  //     if (status === "Start Day") {
  //       setLoading(true);
  //       const res = await axios.post(
  //         "https://nodecrmv2.herokuapp.com/api/user/start_day",
  //         {
  //           category: "start",
  //           coordinates: [[currentLocation.lng, currentLocation.lat]],
  //         },
  //         {
  //           headers: {
  //             authorization: Cookies.get("accessToken"),
  //           },
  //         }
  //       );
  //       console.log(res);
  //       setStatus("End Day");
  //       setLoading(false);
  //     } else {
  //       setLoading(true);
  //       const running = await axios.post(
  //         "https://nodecrmv2.herokuapp.com/api/user/start_day",
  //         {
  //           category: "running",
  //           coordinates: Co_ordinates,
  //         },
  //         {
  //           headers: {
  //             authorization: Cookies.get("accessToken"),
  //           },
  //         }
  //       );

  //       console.log(running);

  //       const res = await axios.post(
  //         "https://nodecrmv2.herokuapp.com/api/user/start_day",
  //         {
  //           category: "end",
  //           coordinates: [[currentLocation.lng, currentLocation.lat]],
  //         },
  //         {
  //           headers: {
  //             authorization: Cookies.get("accessToken"),
  //           },
  //         }
  //       );

  //       console.log(res);
  //       setStatus("Start Day");
  //       localStorage.clear();
  //       setLoading(false);
  //     }
  //   };

  const handleSidebarCollapsed = () => {
    // setSidebarCollapsed(!sidebarCollapsed);
    sidebarRef.current.openSidebar();
  };

  const handleSubmit = (type) => {
    switch (type) {
      case "product":
        if (schoolInfo === null) {
          setErrMessage("Please Select School");
          snackbarRef.current.openSnackbar();
        } else {
          navigate(`/kys/products/${schoolInfo.id}`);
        }
        break;
      case "strength":
        if (schoolInfo === null) {
          setErrMessage("Please Select School");
          snackbarRef.current.openSnackbar();
        } else {
          navigate(`/kys/strength/${schoolInfo.id}`);
        }
        break;
      case "fees":
        if (schoolInfo === null) {
          setErrMessage("Please Select School");
          snackbarRef.current.openSnackbar();
        } else {
          navigate(`/kys/tution_fees/${schoolInfo.id}`);
        }
        break;
      case "competition":
        if (schoolInfo === null) {
          setErrMessage("Please Select School");
          snackbarRef.current.openSnackbar();
        } else {
          navigate(`/kys/add_competition/${schoolInfo.id}`);
        }
        break;
      case "workshop":
        if (schoolInfo === null) {
          setErrMessage("Please Select School");
          snackbarRef.current.openSnackbar();
        } else {
          navigate(`/kys/workshop/${schoolInfo.id}`);
        }
        break;

      default:
        break;
    }
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
          highLight={"kys"}
          sidebarCollapsed={sidebarCollapsed}
          show={show}
        />

        <div>
          <SwipeableTemporaryDrawer
            ref={sidebarRef}
            sidebarCollapsed={sidebarCollapsed}
            show={show}
            highLight={"kys"}
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
              Know Your School
            </h1>
            <div className="w-full flex flex-col gap-4 items-center mt-[7rem]">
              <div className="flex flex-col gap-4 items-start sm:w-[75%] w-[95%] px-6 bg-slate-600 rounded-md py-6 mb-[5rem]">
                <h1 className="text-gray-100 md:text-xl text-base font-semibold">
                  Fill The Details
                </h1>
                <div className="grid sm:grid-rows-2 sm:grid-cols-2 grid-rows-3 grid-cols-1 w-full gap-6 rounded-md bg-slate-600">
                  <SearchDropDown
                    Name={"select_state"}
                    handleOrderProcessingForm={handleOrderProcessingForm}
                    data={states}
                    label={"Select State *"}
                    color={"rgb(243, 244, 246)"}
                  />
                  <SearchDropDown
                    Name={"select_city"}
                    data={cities}
                    disable={!values.stateId}
                    handleOrderProcessingForm={handleOrderProcessingForm}
                    label={"Select City"}
                    color={"rgb(243, 244, 246)"}
                  />
                  <div className="sm:col-span-2">
                    <SearchDropDown
                      Name={"school_name"}
                      data={schools}
                      disable={!values.stateId}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      label={"Select School *"}
                      color={"rgb(243, 244, 246)"}
                    />
                  </div>
                </div>

                <div className="w-full flex justify-center">
                  <hr className="text-gray-100 w-[80%] my-4" />
                </div>
                <h1 className="text-gray-100 md:text-lg sm:text-base text-sm font-medium">
                  School Name : {schoolInfo ? schoolInfo.school_name : "null"}
                </h1>
                <h1 className="text-gray-100 md:text-lg sm:text-base text-sm font-medium">
                  Address :{" "}
                  {schoolInfo ? schoolInfo.school_addresses[0].address : "null"}
                </h1>
                <div className="flex gap-4 flex-wrap justify-start items-center">
                  <div onClick={() => handleSubmit("product")}>
                    <BasicButton text={"Product"} />
                  </div>
                  <div onClick={() => handleSubmit("strength")}>
                    <BasicButton text={"Strength"} />
                  </div>
                  <div onClick={() => handleSubmit("fees")}>
                    <BasicButton text={"Tution Fees"} />
                  </div>
                  <div onClick={() => handleSubmit("competition")}>
                    <BasicButton text={"Competions"} />
                  </div>
                  <div onClick={() => handleSubmit("workshop")}>
                    <BasicButton text={"Workshops"} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KYS;
