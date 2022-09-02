import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";

import Divider from "@mui/material/Divider";

import logoLight from "../../assets/img/logo-light-icon.png";
import { useState } from "react";
import {
  AccountBalance,
  Circle,
  KeyboardArrowDown,
  School,
} from "@mui/icons-material";
import { Collapse } from "@mui/material";
import { Link } from "react-router-dom";

const SwipeableTemporaryDrawer = React.forwardRef((props, ref) => {
  const [isEmployeeClicked, setIsEmployeeClicked] = useState(true);
  const [isLocationClicked, setIsLocationClicked] = useState(true);

  const [state, setState] = React.useState({
    left: false,
  });
  const sidebarRef = React.useRef();

  React.useImperativeHandle(ref, () => ({
    openSidebar() {
      //   toggleDrawer("left", true);
      setState({ left: true });
    },
  }));

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      //   onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="flex items-center gap-3 justify-center py-4">
        <img
          src={logoLight}
          className=" w-[10vw] md:w-[3.7vw] h-auto object-cover"
          alt=""
        />
        <h4 className="text-gray-100">Eupheus Learning</h4>
      </div>
      <section className="py-3">
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
        <Collapse in={isEmployeeClicked}>
          <div
            className={`${
              isEmployeeClicked
                ? " opacity-100 visible h-[10vh] lg:h-[12vh] md:h-[7vh]"
                : null
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
                    props.highLight === "mySchool"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    props.highLight === "mySchool"
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
                    props.highLight === "adminAllUser"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    props.highLight === "adminAllUser"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } transition-all ease-linear duration-200  py-2 bg-[#111322] cursor-pointer`}
                >
                  All User
                </h1>
              </div>
            </Link>
          </div>
        </Collapse>
      </section>
      <Divider />
      <section className="py-3">
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
        <Collapse in={isLocationClicked}>
          <div
            className={`${
              isLocationClicked ? "h-[20vh] opacity-100 visible" : null
            } transition-all ease-linear duration-200`}
          >
            <Link to="/admin/location/state">
              <div
                className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group `}
              >
                <Circle
                  className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                    props.highLight === "adminState"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    props.highLight === "adminState"
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
                    props.highLight === "adminCity"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    props.highLight === "adminCity"
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
                    props.highLight === "adminCountry"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    props.highLight === "adminCountry"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } transition-all ease-linear duration-200  py-2 bg-[#111322] cursor-pointer`}
                >
                  Country
                </h1>
              </div>
            </Link>
          </div>
        </Collapse>
      </section>
    </Box>
  );

  return (
    <div ref={sidebarRef}>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
});

export default SwipeableTemporaryDrawer;
