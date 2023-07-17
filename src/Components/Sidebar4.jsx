import React, { useEffect, useState } from "react";
import "react-pro-sidebar/dist/css/styles.css";
import {
  Place,
  School,
  AccountBalance,
  KeyboardArrowDown,
  Circle,
  Dashboard,
  LocationOn,
  LocalShipping,
  LocationCityOutlined,
  ShoppingBag,
  ListAlt,
  LocationCity,
  AssignmentReturnOutlined,
  ReceiptOutlined,
  PrintOutlined,
  DocumentScanner,
  Article,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import logoLight from "../assets/img/logo-light-icon.png";
import { Collapse } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useLayoutEffect } from "react";
import instance from "../Instance";
import Cookies from "js-cookie";
import { getToken } from "../util/msAuth";
import { protectedResources } from "../util/msConfig";
import TransitionsModal from "./Material/Model";
import DialogSlide from "./Material/Dialog";
import { useRef } from "react";

const Sidebar4 = ({ sidebarCollapsed, highLight, show }) => {
  const [modelOpen, setModelOpen] = useState(false);
  const [openReset, setOpenReset] = useState(false);

  const [isSchoolClicked, setIsSchoolClicked] = useState(
    show === 2 ? false : true
  );
  const [isSchoolDetailClicked, setIsSchoolDetailClicked] = useState(
    show === 2 ? true : false
  );
  const [user, setUser] = useState({});
  const [userType, setUserType] = useState();

  const dialogRef = useRef();

  useEffect(() => {
    const userlogintype = Cookies.get("type");
    setUserType(userlogintype);
    if (show === null) {
      setIsSchoolClicked(false);
      setIsSchoolDetailClicked(false);
    }
  }, []);

  useLayoutEffect(() => {
    const getUser = async () => {
      if (Cookies.get("ms-auth")) {
        const accessToken = await getToken(
          protectedResources.apiTodoList.scopes.read
        );
        const res = await instance({
          url: "user/profile",
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUser(res.data.message);
      } else {
        const res = await instance({
          url: "user/profile",
          method: "GET",
          headers: {
            Authorization: `${Cookies.get("accessToken")}`,
          },
        }).catch((err) => {
          if (err.response.status === 401 || err.response.status === 403) {
            if (err.response.data.message === "you need to change password") {
              setOpenReset(true);
            } else {
              setModelOpen(true);
            }
          }
        });
        setUser(res.data.message);
      }
    };
    getUser();
  }, []);

  const openDialog = () => {
    dialogRef.current.openDialog();
  };

  return (
    <div
      className={`fixed transition-all h-[100vh] ease-linear duration-300 ${
        window.innerWidth < 1024 ? "-left-[100%]" : "left-[0%]"
      } lg:py-2 md:py-4 py-8 z-[100] w-[85vw] lg:w-[18vw] md:w-[30vw] bg-[#111322] h-[100vh] overflow-auto`}
    >
      <TransitionsModal open={modelOpen} />;
      <DialogSlide ref={dialogRef} />
      {openReset ? <ResetPass /> : null}
      <div
        className={`flex flex-col gap-4 transition-all ease-linear duration-100`}
      >
        <div className="flex items-center gap-3 justify-center">
          <img
            src={logoLight}
            className=" w-[10vw] md:w-[3.7vw] h-auto object-cover"
            alt=""
          />
          <h4 className="text-gray-100">Eupheus Learning</h4>
        </div>

        <aside className="flex flex-col px-6 text-gray-200">
          <span className="text-lg">
            Hi, Admin
            {/* {user.first_name} */}
          </span>
          <span className="text-sm text-gray-300">{user.emp_id}</span>
          <hr className="text-gray-100 mt-4" />
        </aside>
        <Link to="/admin/home">
          <aside
            className={`px-6 py-2 hover:bg-gray-500 flex ${
              highLight === "dashboard" ? "bg-gray-500" : ""
            } rounded-md gap-4 cursor-pointer group`}
          >
            <div className="flex gap-4">
              <Dashboard
                className={`${
                  highLight === "dashboard"
                    ? "!text-[#659DBD]"
                    : "!text-gray-400"
                } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
              />
              <span
                className={`${
                  highLight === "dashboard" ? "text-gray-200" : "text-gray-400"
                } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
              >
                DashBoard
              </span>
            </div>
            {/* <hr className="text-gray-300" /> */}
          </aside>
        </Link>

        <Link to="/admin/manageschool">
          <aside
            className={`px-6 py-2 flex gap-4 cursor-pointer ${
              highLight === "manageSchool" ? "bg-gray-500" : ""
            } group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
          >
            <School
              className={`${
                highLight === "manageSchool"
                  ? "!text-[#659DBD]"
                  : "!text-gray-400"
              } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
            />
            <span
              className={`${
                highLight === "manageSchool" ? "text-gray-200" : "text-gray-400"
              } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
            >
              Manage School
            </span>
          </aside>
        </Link>

        <Link to="/admin/uploadinvoice">
          <aside
            className={`px-6 py-2 flex gap-4 ${
              highLight === "uploadinvoice" ? "bg-gray-500" : ""
            } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
          >
            <DocumentScanner
              className={`${
                highLight === "uploadinvoice"
                  ? "!text-[#659DBD]"
                  : "!text-gray-400"
              } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
            />
            <span
              className={`${
                highLight === "uploadinvoice"
                  ? "text-gray-200"
                  : "text-gray-400"
              } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
            >
              Upload Invoice
            </span>
          </aside>
        </Link>

        <Link to="/admin/invoice">
          <aside
            className={`px-6 py-2 flex gap-4 ${
              highLight === "invoice" ? "bg-gray-500" : ""
            } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
          >
            <ReceiptOutlined
              className={`${
                highLight === "invoice" ? "!text-[#659DBD]" : "!text-gray-400"
              } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
            />
            <span
              className={`${
                highLight === "invoice" ? "text-gray-200" : "text-gray-400"
              } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
            >
              Invoice Tagging
            </span>
          </aside>
        </Link>

        <Link to="/admin/ckreport">
          <aside
            className={`px-6 py-2 flex gap-4 ${
              highLight === "ckreport" ? "bg-gray-500" : ""
            } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
          >
            <Article
              className={`${
                highLight === "ckreport" ? "!text-[#659DBD]" : "!text-gray-400"
              } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
            />
            <span
              className={`${
                highLight === "ckreport" ? "text-gray-200" : "text-gray-400"
              } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
            >
              CK Report
            </span>
          </aside>
        </Link>

        {/* <Link to="/kys">
          <aside
            className={`px-6 py-2 flex gap-4 ${
              highLight === "kys" ? "bg-gray-500" : ""
            } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
          >
            <LocationCityOutlined
              className={`${
                highLight === "kys" ? "!text-[#659DBD]" : "!text-gray-400"
              } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
            />
            <span
              className={`${
                highLight === "kys" ? "text-gray-200" : "text-gray-400"
              } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
            >
              KYS
            </span>
          </aside>
        </Link> */}

        {/* <Link to="/projection">
          <aside
            className={`px-6 py-2 flex gap-4 ${
              highLight === "projection" ? "bg-gray-500" : ""
            } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
          >
            <LocationCityOutlined
              className={`${
                highLight === "projection"
                  ? "!text-[#659DBD]"
                  : "!text-gray-400"
              } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
            />
            <span
              className={`${
                highLight === "projection" ? "text-gray-200" : "text-gray-400"
              } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
            >
              Projection
            </span>
          </aside>
        </Link> */}

        {/* <Link to="/print_pdf">
          <aside
            className={`px-6 py-2 flex gap-4 ${
              highLight === "printpdf" ? "bg-gray-500" : ""
            } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
          >
            <PrintOutlined
              className={`${
                highLight === "printpdf" ? "!text-[#659DBD]" : "!text-gray-400"
              } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
            />
            <span
              className={`${
                highLight === "printpdf" ? "text-gray-200" : "text-gray-400"
              } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
            >
              Doc Print
            </span>
          </aside>
        </Link> */}
      </div>
    </div>
  );
};

export default Sidebar4;
