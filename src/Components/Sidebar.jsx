import React, { useEffect, useState } from "react";
import "react-pro-sidebar/dist/css/styles.css";
import {
  School,
  AccountBalance,
  KeyboardArrowDown,
  Circle,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import logoLight from "../assets/img/logo-light-icon.png";

const Sidebar = ({ sidebarCollapsed, highLight, show }) => {
  const [isSchoolClicked, setIsSchoolClicked] = useState(
    show === 2 ? false : true
  );
  const [isSchoolDetailClicked, setIsSchoolDetailClicked] = useState(
    show === 2 ? true : false
  );

  useEffect(() => {
    if (show === null) {
      setIsSchoolClicked(false);
      setIsSchoolDetailClicked(false);
    }
  }, []);

  return (
    <div
      className={`fixed transition-all ease-linear duration-200 ${
        sidebarCollapsed ? "-left-[100%]" : "left-0"
      } lg:py-2 md:py-4 py-8 w-[60vw] lg:w-[18vw] md:w-[30vw] bg-[#111322] max-h-[100vh] min-h-[100vh] overflow-y-auto`}
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
            className="px-6 py-2 flex items-center gap-4 w-full hover:shadow-xl bg-[#111322] border-l-2 border-white cursor-pointer"
            onClick={() => setIsSchoolClicked(!isSchoolClicked)}
          >
            <School className=" text-white" />
            <h1 className=" text-white">Schools</h1>
            <div
              className={`ml-8 ${
                isSchoolClicked ? null : "rotate-90"
              } transition-all ease-linear duration-200`}
            >
              <KeyboardArrowDown className=" text-white" />
            </div>
          </div>
          <div
            className={`${
              isSchoolClicked
                ? " opacity-100 visible h-[19rem] lg:h-[19rem] md:h-[18.6rem]"
                : "h-0 opacity-0 invisible"
            } transition-all  ease-linear duration-200`}
          >
            <Link to="/mySchool">
              <div
                className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group ${
                  isSchoolClicked ? "opacity-100 block" : "opacity-0 hidden"
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
                  My School
                </h1>
              </div>
            </Link>

            <Link to="/tagging">
              <div
                className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group ${
                  isSchoolClicked ? "opacity-100 block" : "opacity-0 hidden"
                }`}
              >
                <Circle
                  className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                    highLight === "tagging"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    highLight === "tagging"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } transition-all ease-linear duration-200  py-2 bg-[#111322] cursor-pointer`}
                >
                  Tagging
                </h1>
              </div>
            </Link>

            <Link to="/schoolDirectory">
              <div
                className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group ${
                  isSchoolClicked ? "opacity-100 block" : "opacity-0 hidden"
                }`}
              >
                <Circle
                  className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                    highLight === "schoolDirectory"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    highLight === "schoolDirectory"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } transition-all ease-linear duration-200 py-2 bg-[#111322] cursor-pointer`}
                >
                  School Directory
                </h1>
              </div>
            </Link>

            <Link to="/salesInvoices">
              <div
                className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group ${
                  isSchoolClicked ? "opacity-100 block" : "opacity-0 hidden"
                }`}
              >
                <Circle
                  className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                    highLight === "salesInvoices"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    highLight === "salesInvoices"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } transition-all ease-linear duration-200  py-2 bg-[#111322] cursor-pointer`}
                >
                  Sales Invoices
                </h1>
              </div>
            </Link>

            <Link to="/updateStocks">
              <div
                className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group ${
                  isSchoolClicked ? "opacity-100 block" : "opacity-0 hidden"
                }`}
              >
                <Circle
                  className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                    highLight === "updateStocks"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    highLight === "updateStocks"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } transition-all ease-linear duration-200  py-2 bg-[#111322] cursor-pointer`}
                >
                  Update Stocks
                </h1>
              </div>
            </Link>

            <Link to="/opportunities">
              <div
                className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group ${
                  isSchoolClicked ? "opacity-100 block" : "opacity-0 hidden"
                }`}
              >
                <Circle
                  className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                    highLight === "opportunities"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    highLight === "opportunities"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } transition-all ease-linear duration-200  py-2 bg-[#111322] cursor-pointer`}
                >
                  Opportunities
                </h1>
              </div>
            </Link>

            <Link to="/manageSchool">
              <div
                className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group ${
                  isSchoolClicked ? "opacity-100 block" : "opacity-0 hidden"
                }`}
              >
                <Circle
                  className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                    highLight === "manageSchool"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    highLight === "manageSchool"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } transition-all ease-linear duration-200  py-2 bg-[#111322] cursor-pointer w-fit`}
                >
                  Manage School
                </h1>
              </div>
            </Link>

            <div
              className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group ${
                isSchoolClicked ? "opacity-100 block" : "opacity-0 hidden"
              }`}
            >
              <Circle
                className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                  highLight === "report"
                    ? "text-white"
                    : "text-gray-400 group-hover:text-white"
                } `}
              />
              <h1
                className={`pl-9 ${
                  highLight === "report"
                    ? "text-white"
                    : "text-gray-400 group-hover:text-white"
                } transition-all ease-linear duration-200  py-2 bg-[#111322] cursor-pointer`}
              >
                Report
              </h1>
            </div>
          </div>
        </section>
        <section>
          <div
            className="px-6 py-2 flex items-center gap-[.36rem] w-full hover:shadow-2xl bg-[#111322] border-l-2 border-white cursor-pointer"
            onClick={() => setIsSchoolDetailClicked(!isSchoolDetailClicked)}
          >
            <AccountBalance className=" text-white" />
            <h1 className="text-white">Schools Details</h1>
            <div
              className={`${
                isSchoolDetailClicked ? null : "rotate-90"
              } transition-all ease-linear duration-200`}
            >
              <KeyboardArrowDown className=" text-white" />
            </div>
          </div>

          <div
            className={`${
              isSchoolDetailClicked
                ? "h-[20vh] opacity-100 visible"
                : "h-0 opacity-0 invisible"
            } transition-all ease-linear duration-200`}
          >
            <Link to="/school/tagging">
              <div
                className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group `}
              >
                <Circle
                  className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                    highLight === "schoolTagging"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    highLight === "schoolTagging"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } transition-all ease-linear duration-200  py-2 bg-[#111322] cursor-pointer`}
                >
                  Tagging
                </h1>
              </div>
            </Link>
            <Link to="/school/schools">
              <div
                className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group `}
              >
                <Circle
                  className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                    highLight === "schools"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    highLight === "schools"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } transition-all ease-linear duration-200  py-2 bg-[#111322] cursor-pointer`}
                >
                  Schools
                </h1>
              </div>
            </Link>

            <div
              className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group `}
            >
              <Circle
                className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                  highLight === "report"
                    ? "text-white"
                    : "text-gray-400 group-hover:text-white"
                } `}
              />
              <h1
                className={`pl-9 ${
                  highLight === "report"
                    ? "text-white"
                    : "text-gray-400 group-hover:text-white"
                } transition-all ease-linear duration-200  py-2 bg-[#111322] cursor-pointer`}
              >
                Report
              </h1>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Sidebar;
