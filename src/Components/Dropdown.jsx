import React from "react";
import { createPopper } from "@popperjs/core";
import { KeyboardArrowDown } from "@mui/icons-material";

const Dropdown = ({ dropdownPopoverShow, handleDropDown }) => {
  // dropdown props

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
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full sm:w-6/12 md:w-4/12 px-4">
          <div className="relative flex flex-col gap-3 align-middle lg:w-[10rem] w-[8rem]">
            <button
              className="text-white font-bold w-full uppercase text-sm pl-[0.5rem] pr-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 bg-[#67748e] active:bg-[#67748e] ease-linear transition-all duration-150"
              type="button"
              ref={btnDropdownRef}
              onClick={() => {
                dropdownPopoverShow
                  ? closeDropdownPopover()
                  : openDropdownPopover();
              }}
            >
              FY 2022-23
              <div
                className={`transition-all duration-200 absolute top-[0.65rem] right-3 ease-linear ${
                  dropdownPopoverShow ? " rotate-180" : null
                }`}
              >
                <KeyboardArrowDown className={`text-black `} />
              </div>
            </button>

            <div
              ref={popoverDropdownRef}
              className={
                (dropdownPopoverShow ? "h-[7rem] py-2 " : "h-0 ") +
                " bg-[#67748e] text-base z-50 transition-all overflow-auto !mt-2 duration-200 ease-linear absolute -top-10 float-left  list-none text-left rounded shadow-lg min-w-full"
              }
            >
              <a
                href="#pablo"
                className={`text-sm ${
                  dropdownPopoverShow ? "block" : "hidden"
                } py-2 px-4 justify-center transition-all hover:bg-slate-600 ease-linear duration-100 hover:border-l-2 font-normal flex w-full whitespace-no-wrap bg-transparent text-white`}
                onClick={(e) => e.preventDefault()}
              >
                <h1>FY 2022-23</h1>
              </a>
              <a
                href="#pablo"
                className={`text-sm ${
                  dropdownPopoverShow ? "block" : "hidden"
                } py-2 px-4 transition-all ease-linear hover:bg-slate-600 duration-100 hover:border-l-2 justify-center font-normal flex w-full whitespace-no-wrap bg-transparent text-white`}
                onClick={(e) => e.preventDefault()}
              >
                <h1>FY 2022-23</h1>
              </a>
              <a
                href="#pablo"
                className={`text-sm ${
                  dropdownPopoverShow ? "block" : "hidden"
                } py-2 px-4 transition-all ease-linear hover:bg-slate-600 duration-100 hover:border-l-2 font-normal flex justify-center w-full whitespace-no-wrap bg-transparent text-white`}
                onClick={(e) => e.preventDefault()}
              >
                <h1>FY 2022-23</h1>
              </a>
              <a
                href="#pablo"
                className={`text-sm ${
                  dropdownPopoverShow ? "block" : "hidden"
                } py-2 transition-all ease-linear duration-100 hover:bg-slate-600 hover:border-l-2 px-4 font-normal flex justify-center w-full whitespace-no-wrap bg-transparent text-white`}
                onClick={(e) => e.preventDefault()}
              >
                <h1>FY 2022-23</h1>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dropdown;
