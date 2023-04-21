import React from "react";
import Sidebar from "../../Components/Sidebar7";
import { useState } from "react";
import { useRef } from "react";
import SwipeableTemporaryDrawer from "../../Components/Material/MaterialSidebar7";
import Navbar from "../../Components/Navbar";
import { useEffect } from "react";
import { Button, TextField } from "@mui/material";
import instance from "../../Instance";
import Cookies from "js-cookie";

const User = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [first_name, setfirstname] = useState("");
  const [middle_name, setmiddlename] = useState("");
  const [last_name, setlastname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [emp_id, setemp_id] = useState("");

  const postData = async () => {
    let data_to_post = {
      first_name: first_name,
      middle_name: middle_name,
      last_name: last_name,
      phone: phone,
      email: email,
      emp_id: emp_id,
    };
    // console.log(data_to_post);

    const res = await instance({
      url: `hr/create/user`,
      method: "POST",
      data: data_to_post,
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
        // accesskey: `auth74961a98ba76d4e4`,
      },
    });
    alert(res.data.message);
  };

  const show = null;
  const sidebarRef = useRef();

  const handleSidebarCollapsed = () => {
    // setSidebarCollapsed(!sidebarCollapsed);
    sidebarRef.current.openSidebar();
  };

  const navInfo = {
    title: "",
    details: ["", ""],
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
        <div>
          <Sidebar
            highLight={"user"}
            sidebarCollapsed={sidebarCollapsed}
            show={show}
          />
        </div>
        <div>
          <SwipeableTemporaryDrawer
            ref={sidebarRef}
            sidebarCollapsed={sidebarCollapsed}
            show={show}
            highLight={"user"}
          />
        </div>
        <div
          className={`flex flex-col w-[100vw] relative transition-all ease-linear duration-300 lg:w-[83vw] lg:ml-[18vw] ${
            window.innerWidth < 1024 ? null : "md:ml-[30vw] ml-[85vw]"
          } `}
        >
          <Navbar
            handleSidebarCollapsed={handleSidebarCollapsed}
            info={navInfo}
          />
          <div>
            <div className="min-h-[90vh] relative flex w-[80%] ml-[10%] sm:ml-0 sm:w-full justify-center items-center gap-4 bg-[#141728] ">
              <div className=" border-2 border-gray-400 rounded-md shadow-md shadow-gray-600 bg-slate-600 ">
                <div className="bg-gray-800 p-3 font-black text-2xl text-white">
                  Create User
                </div>
                <div className="flex gap-4 p-5 ">
                  <div>
                    <TextField
                      id="standard-basic"
                      label="First Name"
                      variant="standard"
                      inputProps={{ style: { color: "white" } }}
                      InputLabelProps={{ style: { color: "white" } }}
                      onChange={(e) => setfirstname(e.target.value)}
                    />
                  </div>
                  <div className="">
                    <TextField
                      id="standard-basic"
                      label="Middle Name"
                      variant="standard"
                      inputProps={{ style: { color: "white" } }}
                      InputLabelProps={{ style: { color: "white" } }}
                      onChange={(e) => setmiddlename(e.target.value)}
                    />
                  </div>
                  <div>
                    <TextField
                      id="standard-basic"
                      label="Last Name"
                      variant="standard"
                      inputProps={{ style: { color: "white" } }}
                      InputLabelProps={{ style: { color: "white" } }}
                      onChange={(e) => setlastname(e.target.value)}
                    />
                  </div>
                </div>
                <div className="p-5">
                  <TextField
                    id="standard-basic"
                    label="Phone"
                    variant="standard"
                    inputProps={{ style: { color: "white" } }}
                    InputLabelProps={{ style: { color: "white" } }}
                    onChange={(e) => setphone(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="p-5">
                  <TextField
                    id="standard-basic"
                    label="Email"
                    variant="standard"
                    inputProps={{ style: { color: "white" } }}
                    InputLabelProps={{ style: { color: "white" } }}
                    onChange={(e) => setemail(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="p-5">
                  <TextField
                    id="standard-basic"
                    label="Employee Id"
                    variant="standard"
                    inputProps={{ style: { color: "white" } }}
                    InputLabelProps={{ style: { color: "white" } }}
                    onChange={(e) => setemp_id(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-center p-3">
                  <Button
                    variant="contained"
                    className="!bg-gray-500 !w-1/5 !font-bold"
                    onClick={postData}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
