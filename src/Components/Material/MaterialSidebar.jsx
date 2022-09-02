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
  const [isSchoolClicked, setIsSchoolClicked] = useState(
    props.show === 2 ? false : true
  );
  const [isSchoolDetailClicked, setIsSchoolDetailClicked] = useState(
    props.show === 2 ? true : false
  );

  React.useEffect(() => {
    if (props.show === null) {
      setIsSchoolClicked(false);
      setIsSchoolDetailClicked(false);
    }
  }, []);
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
          className="px-6 py-2 flex justify-between items-center gap-4 w-full hover:shadow-xl bg-[#111322] border-l-2 border-white cursor-pointer"
          onClick={() => setIsSchoolClicked(!isSchoolClicked)}
        >
          <div className="flex gap-3">
            <School className=" text-white" />
            <h1 className=" text-white">Schools</h1>
          </div>
          <div
            className={`ml-8 ${
              isSchoolClicked ? null : "rotate-90"
            } transition-all ease-linear duration-200`}
          >
            <KeyboardArrowDown className=" text-white" />
          </div>
        </div>
        <Collapse in={isSchoolClicked}>
          <div
            className={`${
              isSchoolClicked
                ? " opacity-100 visible h-[19rem] lg:h-[19rem] md:h-[18.6rem]"
                : null
            } transition-all  ease-linear duration-200`}
          >
            <Link to="/mySchool">
              <div
                className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group `}
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
                  My School
                </h1>
              </div>
            </Link>

            <Link to="/tagging">
              <div
                className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group`}
              >
                <Circle
                  className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                    props.highLight === "tagging"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    props.highLight === "tagging"
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
                className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group `}
              >
                <Circle
                  className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                    props.highLight === "schoolDirectory"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    props.highLight === "schoolDirectory"
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
                className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group `}
              >
                <Circle
                  className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                    props.highLight === "salesInvoices"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    props.highLight === "salesInvoices"
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
                className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group `}
              >
                <Circle
                  className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                    props.highLight === "updateStocks"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    props.highLight === "updateStocks"
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
                className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group `}
              >
                <Circle
                  className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                    props.highLight === "opportunities"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    props.highLight === "opportunities"
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
                className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group `}
              >
                <Circle
                  className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                    props.highLight === "manageSchool"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    props.highLight === "manageSchool"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } transition-all ease-linear duration-200  py-2 bg-[#111322] cursor-pointer w-fit`}
                >
                  Manage School
                </h1>
              </div>
            </Link>

            <div
              className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group `}
            >
              <Circle
                className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                  props.highLight === "report"
                    ? "text-white"
                    : "text-gray-400 group-hover:text-white"
                } `}
              />
              <h1
                className={`pl-9 ${
                  props.highLight === "report"
                    ? "text-white"
                    : "text-gray-400 group-hover:text-white"
                } transition-all ease-linear duration-200  py-2 bg-[#111322] cursor-pointer`}
              >
                Report
              </h1>
            </div>
          </div>
        </Collapse>
      </section>
      <Divider />
      <section className="py-3">
        <div
          className="px-6 py-2 flex justify-between items-center gap-[.36rem] w-full hover:shadow-2xl bg-[#111322] border-l-2 border-white cursor-pointer"
          onClick={() => setIsSchoolDetailClicked(!isSchoolDetailClicked)}
        >
          <div className="flex gap-3">
            <AccountBalance className=" text-white" />
            <h1 className="text-white">Schools Details</h1>
          </div>
          <div
            className={`${
              isSchoolDetailClicked ? null : "rotate-90"
            } transition-all ease-linear duration-200`}
          >
            <KeyboardArrowDown className=" text-white" />
          </div>
        </div>

        <Collapse in={isSchoolDetailClicked}>
          {" "}
          <div
            className={`${
              isSchoolDetailClicked ? "h-[20vh] opacity-100 visible" : null
            } transition-all ease-linear duration-200`}
          >
            <Link to="/school/tagging">
              <div
                className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group `}
              >
                <Circle
                  className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                    props.highLight === "schoolTagging"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    props.highLight === "schoolTagging"
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
                    props.highLight === "schools"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    props.highLight === "schools"
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
                  props.highLight === "report"
                    ? "text-white"
                    : "text-gray-400 group-hover:text-white"
                } `}
              />
              <h1
                className={`pl-9 ${
                  props.highLight === "report"
                    ? "text-white"
                    : "text-gray-400 group-hover:text-white"
                } transition-all ease-linear duration-200  py-2 bg-[#111322] cursor-pointer`}
              >
                Report
              </h1>
            </div>
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
