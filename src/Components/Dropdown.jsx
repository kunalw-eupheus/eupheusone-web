import React, { useEffect, useState } from "react";
import { createPopper } from "@popperjs/core";
import { KeyboardArrowDown } from "@mui/icons-material";
import instance from "../Instance";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";

const Dropdown = ({
  dropdownPopoverShow,
  handleDropDown,
  changeYear,
  defaultYear,
}) => {
  // dropdown props

  const [finYear, setFinYear] = useState([]);
  const [currYear, setCurrYear] = useState(defaultYear ? defaultYear : null);

  const location = useLocation();

  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    handleDropDown();
  };
  const closeDropdownPopover = () => {
    handleDropDown();
  };

  const getFinancialYear = async () => {
    const res = await instance({
      url: "common/financialyear-all",
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    console.log(res.data);
    setFinYear(res.data);
  };

  useEffect(() => {
    getFinancialYear();
  }, []);

  const handleDropdownValue = (name) => {
    // console.log(name);
    if (currYear !== name.name) {
      setCurrYear(name.name);
      changeYear(name);
    }
  };

  const returnData = () => {
    if (location.pathname === "/salesToCash") {
      const arr = [];
      finYear.map((item) => {
        if (item.name === "FY 2022-23" || item.name === "FY 2023-24") {
          arr.push(item);
        }
      });
      arr.sort((a, b) => a.name.split("-")[1] - b.name.split("-")[1]);
      // console.log(arr);
      return arr;
    } else {
      finYear.sort((a, b) => b.name.split("-")[1] - a.name.split("-")[1]);
      return finYear;
    }
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-fit sm:w-6/12 md:w-4/12 sm:px-4 pr-2">
          <div className="relative flex flex-col gap-3 align-middle sm:w-[10rem] w-[6.4rem]">
            <button
              className="text-white font-bold w-full uppercase text-sm pl-[0.5rem] pr-6 sm:py-3 py-[0.4rem] rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 bg-[#67748e] active:bg-[#67748e] ease-linear transition-all duration-150"
              type="button"
              ref={btnDropdownRef}
              onClick={() => {
                dropdownPopoverShow
                  ? closeDropdownPopover()
                  : openDropdownPopover();
              }}
            >
              <span className="w-fit sm:text-base text-xs">
                {currYear ? currYear : returnData()?.[0]?.name}
              </span>
              <div
                className={`transition-all duration-200 absolute sm:top-[0.65rem] top-[0.3rem] sm:right-3 right-0 ease-linear ${
                  dropdownPopoverShow ? " rotate-180" : null
                }`}
              >
                <KeyboardArrowDown className={`text-black `} />
              </div>
            </button>

            <div
              ref={popoverDropdownRef}
              className={
                (dropdownPopoverShow ? "h-[6rem] py-2 " : "h-0") +
                " bg-[#67748e] text-base z-50 transition-all cursor-pointer overflow-auto !mt-2 duration-200 ease-linear absolute -top-10 float-left  list-none text-left rounded shadow-lg min-w-full"
              }
            >
              {returnData()?.map((item) => {
                return (
                  <div
                    className={`text-sm ${
                      dropdownPopoverShow ? "block" : "hidden"
                    } py-2 px-4 justify-center transition-all hover:bg-slate-600 ease-linear duration-100 hover:border-l-2 font-normal flex w-full whitespace-no-wrap bg-transparent text-white`}
                    onClick={() =>
                      handleDropdownValue({
                        start: item.start,
                        end: item.end,
                        name: item.name,
                      })
                    }
                  >
                    <h1 className="w-fit sm:text-base text-xs text-white">
                      {item.name}
                    </h1>
                  </div>
                );
              })}

              {/* <a
                href="#pablo"
                className={`text-sm ${
                  dropdownPopoverShow ? "block" : "hidden"
                } py-2 px-4 transition-all ease-linear hover:bg-slate-600 duration-100 hover:border-l-2 justify-center font-normal flex w-full whitespace-no-wrap bg-transparent text-white`}
                onClick={(e) => e.preventDefault()}
              >
                <h1 className="w-fit sm:text-base text-xs">FY 2022-23</h1>
              </a> */}

              {/* <a
                href="#pablo"
                className={`text-sm ${
                  dropdownPopoverShow ? "block" : "hidden"
                } py-2 px-4 transition-all ease-linear hover:bg-slate-600 duration-100 hover:border-l-2 font-normal flex justify-center w-full whitespace-no-wrap bg-transparent text-white`}
                onClick={(e) => e.preventDefault()}
              >
                <h1 className="w-fit sm:text-base text-xs">FY 2022-23</h1>
              </a> */}

              {/* <a
                href="#pablo"
                className={`text-sm ${
                  dropdownPopoverShow ? "block" : "hidden"
                } py-2 transition-all ease-linear duration-100 hover:bg-slate-600 hover:border-l-2 px-4 font-normal flex justify-center w-full whitespace-no-wrap bg-transparent text-white`}
                onClick={(e) => e.preventDefault()}
              >
                <h1 className="w-fit sm:text-base text-xs">FY 2022-23</h1>
              </a>
               */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dropdown;
