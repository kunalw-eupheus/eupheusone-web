import React, { useEffect, useState } from "react";
import "react-pro-sidebar/dist/css/styles.css";
import { Dashboard } from "@mui/icons-material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { PhoneAndroid, Person, ForwardToInbox } from "@mui/icons-material";
import { Link } from "react-router-dom";
import logoLight from "../assets/img/logo-light-icon.png";
import logoLight2 from "../assets/img/logo-light-2.png";
import { useLayoutEffect } from "react";
import instance from "../Instance";
import Cookies from "js-cookie";
import { getToken } from "../util/msAuth";
import { protectedResources } from "../util/msConfig";
import TransitionsModal from "./Material/Model";
import DialogSlide from "./Material/Dialog";
import { useRef } from "react";

const Sidebar = ({ sidebarCollapsed, highLight, show }) => {
  const [modelOpen, setModelOpen] = useState(false);
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
      } lg:py-2 md:py-4 py-8 z-[100] w-[85vw] lg:w-[18vw] md:w-[30vw] bg-[#1f2937] h-[100vh] overflow-auto`}
    >
      <TransitionsModal open={modelOpen} />;
      <DialogSlide ref={dialogRef} />
      <div
        className={`flex flex-col gap-4 transition-all ease-linear duration-100`}
      >
        <div className="flex items-center gap-3 justify-center">
          <img
            src={logoLight}
            className=" w-[10vw] md:w-[3.7vw] h-auto object-cover"
            alt=""
          />
          <h4 className="text-gray-50">Eupheus Learning</h4>
        </div>

        <aside className="flex flex-col px-6 text-gray-50">
          <span className="text-lg">
            {/* Hi, HR */}
            {`Hi, ${user.first_name ? user.first_name : ""}`}
          </span>
          <span className="text-sm text-gray-950">
            {user.emp_id ? user.emp_id : ""}
          </span>
          <hr className="text-gray-900 mt-4" />
        </aside>
        <Link to="/hr/home">
          <aside
            className={`px-6 py-2 ${
              highLight === "dashboard"
                ? "hover:bg-[#3b82f6]"
                : "hover:bg-[#71717a]"
            } flex ${
              highLight === "dashboard" ? "bg-[#3b82f6]" : ""
            } rounded-md gap-4 cursor-pointer group`}
          >
            <div className="flex gap-4">
              <Dashboard
                className={`${
                  highLight === "dashboard" ? "!text-gray-50" : "!text-gray-50"
                } group-hover:!text-gray-50 !transition-all !duration-150 !ease-linear`}
              />
              <span
                className={`${
                  highLight === "dashboard" ? "text-gray-50" : "text-gray-50"
                } group-hover:!text-gray-950 transition-all duration-150 ease-linear`}
              >
                DashBoard
              </span>
            </div>
            {/* <hr className="text-gray-300" /> */}
          </aside>
        </Link>

        <Link to="/hr/user">
          <aside
            className={`px-6 py-2 flex gap-4 cursor-pointer ${
              highLight === "user" ? "bg-[#3b82f6]" : ""
            } group ${
              highLight === "user" ? "hover:bg-[#3b82f6]" : "hover:bg-[#71717a]"
            }  rounded-md transition-all duration-150 ease-linear`}
          >
            <Person
              className={`${
                highLight === "user" ? "!text-gray-50" : "!text-gray-50"
              } group-hover:!text-gray-50 !transition-all !duration-150 !ease-linear`}
            />
            <span
              className={`${
                highLight === "user" ? "text-gray-50" : "text-gray-50"
              } group-hover:!text-gray-50 transition-all duration-150 ease-linear`}
            >
              User
            </span>
          </aside>
        </Link>

        <Link to="/hr/phonegroup">
          <aside
            className={`px-6 py-2 flex gap-4 cursor-pointer ${
              highLight === "phone" ? "bg-[#3b82f6]" : ""
            } group ${
              highLight === "phone"
                ? "hover:bg-[#3b82f6]"
                : "hover:bg-[#71717a]"
            } rounded-md transition-all duration-150 ease-linear`}
          >
            <PhoneAndroid
              className={`${
                highLight === "phone" ? "!text-gray-50" : "!text-gray-50"
              } group-hover:!text-gray-50 !transition-all !duration-150 !ease-linear`}
            />
            <span
              className={`${
                highLight === "phone" ? "text-gray-50" : "text-gray-50"
              } group-hover:!text-gray-50 transition-all duration-150 ease-linear`}
            >
              Phone Group
            </span>
          </aside>
        </Link>

        <Link to="/hr/sendmessage">
          <aside
            className={`px-6 py-2 flex gap-4 cursor-pointer ${
              highLight === "message" ? "bg-[#3b82f6]" : ""
            } group ${
              highLight === "message"
                ? "hover:bg-[#3b82f6]"
                : "hover:bg-[#71717a]"
            }  rounded-md transition-all duration-150 ease-linear`}
          >
            <ForwardToInbox
              className={`${
                highLight === "message" ? "!text-gray-50" : "!text-gray-50"
              } group-hover:!text-gray-50 !transition-all !duration-150 !ease-linear`}
            />
            <span
              className={`${
                highLight === "message" ? "text-gray-50" : "text-gray-50"
              } group-hover:!text-gray-50 transition-all duration-150 ease-linear`}
            >
              Send Message
            </span>
          </aside>
        </Link>

        {/* <Link to="/admin/uploadinvoice">
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
        </Link> */}
      </div>
    </div>
  );
};

export default Sidebar;
