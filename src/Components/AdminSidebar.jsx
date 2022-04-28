import React, { useState } from "react";
import "react-pro-sidebar/dist/css/styles.css";
import {
  School,
  AccountBalance,
  KeyboardArrowDown,
  Circle,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import logoLight from "../assets/img/logo-light-icon.png";

const AdminSidebar = ({ sidebarCollapsed, highLight }) => {
  const [isEmployeeClicked, setIsEmployeeClicked] = useState(true);
  const [isLocationClicked, setIsLocationClicked] = useState(true);

  return (
    <div
      className={`fixed transition-all ease-linear duration-200 ${
        sidebarCollapsed ? "-left-[100%]" : "left-0"
      } lg:py-2 md:py-4 py-8 w-[60vw] lg:w-[18vw] md:w-[30vw] bg-[#111322] min-h-[100vh] max-h-full`}
    >
      <div
        className={`flex flex-col gap-6 transition-all ease-linear duration-100`}
      >
        <div className="flex items-center gap-3 justify-center">
          <img
            src={logoLight}
            className=" w-[10vw] md:w-[3.7vw] h-auto object-cover"
            alt=""
          />
          <h4 className="text-gray-100">Eupheus Learning</h4>
        </div>
        <section>
          <div
            className="px-8 py-2 flex items-center gap-4 w-full hover:shadow-xl bg-[#111322] border-l-2 border-white cursor-pointer"
            onClick={() => setIsEmployeeClicked(!isEmployeeClicked)}
          >
            <School className=" text-white" />
            <h1 className=" text-white">Employee</h1>
            <div
              className={`ml-8 ${
                isEmployeeClicked ? null : "rotate-90"
              } transition-all ease-linear duration-200`}
            >
              <KeyboardArrowDown className=" text-white" />
            </div>
          </div>
          <div
            className={`${
              isEmployeeClicked
                ? " opacity-100 visible h-[10vh] lg:h-[12vh] md:h-[7vh]"
                : "h-0 opacity-0 invisible"
            } transition-all  ease-linear duration-200`}
          >
            <Link to="/admin/user/create/new">
              <div
                className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group ${
                  isEmployeeClicked ? "opacity-100 block" : "opacity-0 hidden"
                }`}
              >
                <Circle
                  className={`!text-[.7rem] ${
                    highLight === "mySchool"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    highLight === "mySchool"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } transition-all ease-linear duration-200  py-2 bg-[#111322] cursor-pointer`}
                >
                  New User
                </h1>
              </div>
            </Link>

            <Link to="/admin/all/user">
              <div
                className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group ${
                  isEmployeeClicked ? "opacity-100 block" : "opacity-0 hidden"
                }`}
              >
                <Circle
                  className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                    highLight === "adminAllUser"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    highLight === "adminAllUser"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } transition-all ease-linear duration-200  py-2 bg-[#111322] cursor-pointer`}
                >
                  All User
                </h1>
              </div>
            </Link>
          </div>
        </section>
        <section>
          <div
            className="px-8 py-2 flex items-center gap-[.36rem] w-full hover:shadow-2xl bg-[#111322] border-l-2 border-white cursor-pointer"
            onClick={() => setIsLocationClicked(!isLocationClicked)}
          >
            <AccountBalance className=" text-white" />
            <h1 className="text-white">Location</h1>
            <div
              className={` ml-[3.8rem] ${
                isLocationClicked ? null : "rotate-90"
              } transition-all ease-linear duration-200`}
            >
              <KeyboardArrowDown className=" text-white" />
            </div>
          </div>

          <div
            className={`${
              isLocationClicked
                ? "h-[20vh] opacity-100 visible"
                : "h-0 opacity-0 invisible"
            } transition-all ease-linear duration-200`}
          >
            <Link to="/admin/location/state">
              <div
                className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group `}
              >
                <Circle
                  className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                    highLight === "adminState"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    highLight === "adminState"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } transition-all ease-linear duration-200  py-2 bg-[#111322] cursor-pointer`}
                >
                  State
                </h1>
              </div>
            </Link>
            <Link to="/admin/location/city">
              <div
                className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group `}
              >
                <Circle
                  className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                    highLight === "adminCity"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    highLight === "adminCity"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } transition-all ease-linear duration-200  py-2 bg-[#111322] cursor-pointer`}
                >
                  City
                </h1>
              </div>
            </Link>
            <Link to="/admin/location/country">
              <div
                className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group `}
              >
                <Circle
                  className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                    highLight === "adminCountry"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    highLight === "adminCountry"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } transition-all ease-linear duration-200  py-2 bg-[#111322] cursor-pointer`}
                >
                  Country
                </h1>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminSidebar;
