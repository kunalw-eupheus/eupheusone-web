import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
// import instance from "../../Instance";
import instance from "../../../Instance";
import { useState } from "react";
import Cookies from "js-cookie";
import { Backdrop, CircularProgress } from "@mui/material";
import { TextField } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const HrUserCreate = React.forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);
  const [first_name, setfirstname] = useState("");
  const [middle_name, setmiddlename] = useState("");
  const [last_name, setlastname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [emp_id, setemp_id] = useState("EL0");
  const [loading, setLoading] = useState(false);
  const [showSucessRes, setShowSuccessRes] = useState(false);
  const [mandateErrorName, setMandateErrorName] = useState(false);
  const [mandateErrorPhone, setMandateErrorPhone] = useState(false);
  const [mandateErrorEmail, setMandateErrorEmail] = useState(false);
  const [mandateErrorEmpId, setMandateErrorEmpId] = useState(false);
  const [empIdError, setEmpIdError] = useState(false);
  const [empIdError2, setEmpIdError2] = useState(false);
  const [bkEndErrorRes, setBkEndErrorRes] = useState(false);

  const postData = async () => {
    let hndleData = props.handleData;

    if (!first_name) {
      // hndleData("First Name is Mandatory", "fname", "fname");
      setMandateErrorName(true);
      setTimeout(() => {
        setMandateErrorName(false);
      }, 3000);
      return;
    }
    if (!phone) {
      // hndleData("Phone is Mandatory", "phone", "phone");
      setMandateErrorPhone(true);
      setTimeout(() => {
        setMandateErrorPhone(false);
      }, 3000);

      return;
    }
    if (validPhone()) {
      hndleData("Invalid Phone Number", "vphone", "vphone");

      return;
    }
    if (!email) {
      // hndleData("Email is Mandatory", "email", "email");
      setMandateErrorEmail(true);
      setTimeout(() => {
        setMandateErrorEmail(false);
      }, 3000);

      return;
    }
    if (validEmail()) {
      hndleData("Invalid Email", "vemail", "vemail");

      return;
    }
    if (!emp_id) {
      // hndleData("Employee Id is Mandatory", "empid", "empid");
      setMandateErrorEmpId(true);
      setTimeout(() => {
        setMandateErrorEmpId(false);
      }, 3000);

      return;
    }

    if (empIdError) {
      return;
    }

    if (empIdError2) {
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
      url: `/hr/create/user`,
      method: "POST",
      data: data_to_post,
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });

    if (res.data.status === "success") {
      // console.log(res);
      setShowSuccessRes(true);
      // hndleData(res.data.message, "success", "success");
      setTimeout(() => {
        // handleClose();
        hndleData("reload", "reload", "reload");
        setLoading(false);
      }, 2000);
    } else {
      // hndleData(res.data.message, "error", "error");
      setBkEndErrorRes(res.data.message);
      setTimeout(() => {
        setBkEndErrorRes(false);
      }, 3000);
      setLoading(false);
    }
    setLoading(false);
  };

  const validMobileRgx = /^(\+91)?0?[6-9]\d{9}$/;
  const validPhone = () => {
    if (phone.length == 0) return false;
    else return !validMobileRgx.test(phone);
  };

  const emailRegex =
    /^[a-z]{1}[a-z0-9._]{1,100}[@]{1}[a-z]{2,15}[.]{1}[a-z]{2,10}$/;
  const validEmail = () => {
    if (email.length == 0) return false;
    else return !emailRegex.test(email);
  };

  React.useImperativeHandle(ref, () => ({
    openDialog() {
      setOpen(true);
    },
  }));

  const handleClose = () => {
    setOpen(false);
    setfirstname("");
    setmiddlename("");
    setlastname("");
    setShowSuccessRes(false);
    setEmpIdError(false);
    setEmpIdError2(false);
    setemp_id("EL0");
    setphone("");
    setemail("");
    setemp_id("");
  };

  const empIdHandle = (value) => {
    if (value[0] !== "E" || value[1] !== "L" || value[2] !== "0") {
      setEmpIdError(true);
      // return;
    } else setEmpIdError(false);

    const numArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    if (
      !numArr.includes(value[3]) ||
      !numArr.includes(value[4] || !numArr.includes(value[5]))
    ) {
      setEmpIdError2(true);
    } else setEmpIdError2(false);

    if (!numArr.includes(value[3])) {
      setEmpIdError2(true);
    } else setEmpIdError2(false);

    if (!numArr.includes(value[4])) {
      setEmpIdError2(true);
    } else setEmpIdError2(false);

    if (!numArr.includes(value[5])) {
      setEmpIdError2(true);
    } else setEmpIdError2(false);

    // if (value.length < 2) return;
    const length = emp_id.length;
    const newLength = value.length;
    if (length <= 6) {
      if (!(newLength > 6)) {
        setemp_id(value.toUpperCase());
      }
    }
  };

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        className="!w-[100vw]"
        maxWidth={"sm"}
        fullWidth
      >
        {showSucessRes ? (
          <DialogContent className=" !bg-[#e5e7eb] text-black">
            <div>
              <div className="flex justify-around py-2">
                <div className="text-2xl text-slate-900 font-bold">{`User ${first_name}-${emp_id} Created`}</div>
              </div>
              <div className="flex justify-around pt-8">
                <div className="px-4">
                  <Button
                    className="!bg-[#FF0060] !font-bold !py-3 !text-white"
                    onClick={handleClose}
                    sx={{ width: 100 }}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        ) : (
          <DialogContent className=" !bg-[#e5e7eb] text-black">
            <div className="flex gap-4 p-5 ">
              <div>
                <TextField
                  id="standard-basic"
                  label="First Name *"
                  variant="standard"
                  value={first_name}
                  inputProps={{
                    style: { color: "black", fontWeight: "bold" },
                    sx: { color: "black" },
                  }}
                  InputLabelProps={{
                    style: { color: "black", fontWeight: "bold" },
                  }}
                  onChange={(e) => setfirstname(e.target.value)}
                  error={mandateErrorName}
                />
                {mandateErrorName ? (
                  <p className="text-red-600 text-xs pt-1">
                    First Name is mandatory
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="">
                <TextField
                  id="standard-basic"
                  label="Middle Name"
                  value={middle_name}
                  variant="standard"
                  inputProps={{
                    style: { color: "black", fontWeight: "bold" },
                    sx: { color: "black" },
                  }}
                  InputLabelProps={{
                    style: { color: "#020617", fontWeight: "bold" },
                  }}
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
                  inputProps={{
                    style: { color: "black", fontWeight: "bold" },
                    sx: { color: "black" },
                  }}
                  InputLabelProps={{
                    style: { color: "black", fontWeight: "bold" },
                  }}
                  onChange={(e) => setlastname(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-between gap-6 p-5 ">
              <div className="w-full">
                <TextField
                  id="standard-basic"
                  label="Phone *"
                  variant="standard"
                  value={phone}
                  InputLabelProps={{
                    style: { color: "black", fontWeight: "bold" },
                  }}
                  inputProps={{
                    style: { color: "black", fontWeight: "bold" },
                    sx: { color: "black" },
                  }}
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
                  error={validPhone() || mandateErrorPhone}
                  helperText={validPhone() ? "Enter valid phone" : ""}
                />
                {mandateErrorPhone ? (
                  <p className="text-red-600 text-xs pt-1">
                    Phone is mandatory
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="w-full">
                <TextField
                  id="standard-basic"
                  label="Email *"
                  variant="standard"
                  value={email}
                  inputProps={{
                    style: { color: "black", fontWeight: "bold" },
                    sx: { color: "black" },
                  }}
                  InputLabelProps={{
                    style: { color: "black", fontWeight: "bold" },
                  }}
                  onChange={(e) => setemail(e.target.value.toLowerCase())}
                  className="w-full"
                  error={validEmail() || mandateErrorEmail}
                  helperText={validEmail() ? "Enter valid email" : ""}
                />
                {mandateErrorEmail ? (
                  <p className="text-red-600 text-xs pt-1">
                    Email is mandatory
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="p-5">
              <TextField
                id="standard-basic"
                label="Employee Id *"
                variant="standard"
                // type="number"
                value={emp_id}
                inputProps={{
                  style: { color: "black", fontWeight: "bold" },
                  sx: { color: "black" },
                }}
                InputLabelProps={{
                  style: { color: "black", fontWeight: "bold" },
                }}
                onChange={(e) => empIdHandle(e.target.value)}
                className="w-full"
                error={mandateErrorEmpId}
              />
              {mandateErrorEmpId ? (
                <p className="text-red-600 text-xs pt-1">
                  Employee ID is mandatory
                </p>
              ) : (
                ""
              )}
              {empIdError ? (
                <p className="text-red-600 text-xs pt-1">
                  Id should start with: EL0
                </p>
              ) : (
                ""
              )}
              {empIdError2 ? (
                <p className="text-red-600 text-xs pt-1">
                  Last 3 characters should be number
                </p>
              ) : (
                ""
              )}
              {bkEndErrorRes ? (
                <p className="text-red-600 text-xs pt-1">{bkEndErrorRes}</p>
              ) : (
                ""
              )}
            </div>
            <div className="flex justify-center p-3">
              <div className="px-4">
                <Button
                  className="!bg-[#FF0060] !font-bold !py-3 !text-white"
                  onClick={handleClose}
                  sx={{ width: 100 }}
                >
                  Close
                </Button>
              </div>
              <div className="px-4">
                <Button
                  className="!bg-[#0079FF] !font-bold !py-3 !text-white"
                  onClick={postData}
                  sx={{ width: 100 }}
                >
                  Create
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
});

export default HrUserCreate;
