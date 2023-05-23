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
import Snackbars from "../../Components/Material/SnackBar";
import { Backdrop, CircularProgress } from "@mui/material";

const CreateUser = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [first_name, setfirstname] = useState("");
  const [middle_name, setmiddlename] = useState("");
  const [last_name, setlastname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [emp_id, setemp_id] = useState("");
  const [snackbarErrStatus, setSnackbarErrStatus] = useState(true);
  const [errMessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const snackbarRef = useRef();

  const postData = async () => {
    if (!first_name) {
      setSnackbarErrStatus(true);
      setErrMessage("First Name is Mandatory");
      snackbarRef.current.openSnackbar();
      return;
    }
    if (!phone) {
      setSnackbarErrStatus(true);
      setErrMessage("Phone is Mandatory");
      snackbarRef.current.openSnackbar();
      return;
    }
    if (validPhone()) {
      setSnackbarErrStatus(true);
      setErrMessage("Invalid Phone Number");
      snackbarRef.current.openSnackbar();
      return;
    }
    if (!email) {
      setSnackbarErrStatus(true);
      setErrMessage("Email is Mandatory");
      snackbarRef.current.openSnackbar();
      return;
    }
    if (validEmail()) {
      setSnackbarErrStatus(true);
      setErrMessage("Invalid Email");
      snackbarRef.current.openSnackbar();
      return;
    }
    if (!emp_id) {
      setSnackbarErrStatus(true);
      setErrMessage("Employee Id is Mandatory");
      snackbarRef.current.openSnackbar();
      return;
    }

    let data_to_post = {
      first_name: first_name,
      middle_name: middle_name,
      last_name: last_name,
      phone: phone,
      email: email,
      emp_id: emp_id,
    };
    // console.log(data_to_post);
    setLoading(true);
    const res = await instance({
      url: `hr/create/user`,
      method: "POST",
      data: data_to_post,
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
        // accesskey: `auth74961a98ba76d4e4`,
      },
    });
    // console.log(res);
    if (res.data.status === "error") {
      setSnackbarErrStatus(true);
      setErrMessage(res.data.message);
      snackbarRef.current.openSnackbar();
      setLoading(false);
    } else {
      setSnackbarErrStatus(false);
      setErrMessage(res.data.message);
      snackbarRef.current.openSnackbar();
      setTimeout(() => {
        // console.log("Delayed for 1 second.");
        setfirstname("");
        setmiddlename("");
        setlastname("");
        setphone("");
        setemail("");
        setemp_id("");
        setLoading(false);
      }, 2000);
    }
  };

  const show = null;
  const sidebarRef = useRef();

  const handleSidebarCollapsed = () => {
    // setSidebarCollapsed(!sidebarCollapsed);
    sidebarRef.current.openSidebar();
  };

  const navInfo = {
    title: "HR",
    details: ["User", " / Create User"],
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

  const validMobileRgx = /^(\+91)?0?[6-9]\d{9}$/;
  const validPhone = () => {
    // console.log(phone);
    return !validMobileRgx.test(phone);
  };

  const emailRegex =
    /^[a-z]{1}[a-z0-9._]{1,100}[@]{1}[a-z]{2,15}[.]{1}[a-z]{2,10}$/;
  const validEmail = () => {
    return !emailRegex.test(email);
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
          <Snackbars
            ref={snackbarRef}
            snackbarErrStatus={snackbarErrStatus}
            errMessage={errMessage}
          />
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
                      label="First Name *"
                      variant="standard"
                      value={first_name}
                      inputProps={{ style: { color: "white" } }}
                      InputLabelProps={{ style: { color: "white" } }}
                      onChange={(e) => setfirstname(e.target.value)}
                      error={first_name.length === 0}
                    />
                  </div>
                  <div className="">
                    <TextField
                      id="standard-basic"
                      label="Middle Name"
                      value={middle_name}
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
                      autoComplete="none"
                      variant="standard"
                      value={last_name}
                      inputProps={{ style: { color: "white" } }}
                      InputLabelProps={{ style: { color: "white" } }}
                      onChange={(e) => setlastname(e.target.value)}
                    />
                  </div>
                </div>
                <div className="p-5">
                  <TextField
                    id="standard-basic"
                    label="Phone *"
                    variant="standard"
                    value={phone}
                    // inputProps={{ style: { color: "white" }, maxLength: 10 }}
                    InputLabelProps={{ style: { color: "white" } }}
                    onChange={(e) => {
                      const length = phone.length;
                      const newLength = e.target.value.length;
                      if (length <= 10) {
                        if (!(newLength > 10)) {
                          setphone(e.target.value);
                        }
                      }
                    }}
                    className="w-full"
                    type="number"
                    // inputProps={{ maxLength: 10 }}
                    error={validPhone()}
                  />
                </div>
                <div className="p-5">
                  <TextField
                    id="standard-basic"
                    label="Email *"
                    variant="standard"
                    value={email}
                    inputProps={{ style: { color: "white" } }}
                    InputLabelProps={{ style: { color: "white" } }}
                    onChange={(e) => setemail(e.target.value)}
                    className="w-full"
                    error={validEmail()}
                  />
                </div>
                <div className="p-5">
                  <TextField
                    id="standard-basic"
                    label="Employee Id *"
                    variant="standard"
                    value={emp_id}
                    inputProps={{ style: { color: "white" } }}
                    InputLabelProps={{ style: { color: "white" } }}
                    onChange={(e) => setemp_id(e.target.value)}
                    className="w-full"
                    error={emp_id.length === 0}
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

export default CreateUser;
