import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import SearchDropDown from "../SearchDropDown";
import BasicTextFields from "./TextField";
import BasicButton from "./Button";
import { useLayoutEffect, useEffect } from "react";
import instance from "../../Instance";
import { useState } from "react";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import Snackbars from "./SnackBar";
import { useRef } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { Add, ExpandMore, Delete, CloseFullscreen } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Fab,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogSlide17 = React.forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);
  const [series, setSeries] = useState([]);
  const [grade, setGrade] = useState([]);
  const [mrp, setMrp] = useState("");
  const [total, setTotal] = useState("");
  const [snackbarErrStatus, setSnackbarErrStatus] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [schlName, setSchlName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [confirmVerify, setConfirmVerify] = useState(false);
  const [showButton, setShowButtons] = useState(true);
  const [showUploadExcel, setShowUploadExcel] = useState(false);
  const [showManualUpload, setShowManualUpload] = useState(false);
  const [employee, setEmployee] = useState(1);
  const [empForm, setEmpForm] = useState([]);
  const [errorMsgNm, setErrorMsgNm] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [namee, setNamee] = useState("");

  const validMobileRgx = /^(\+91)?0?[6-9]\d{9}$/;

  const formik = useFormik({
    initialValues: {
      series: "",
      grade: [],
      total: "",
      mrp: "",
      schoolName: "",
      schoolID: "",
      schoolCode: "",
    },
    validate: () => {},
    onSubmit: async (values) => {
      console.log(values);

      if (!values.schoolCode.length) {
        // console.log("first")
        setSnackbarErrStatus(true);
        setSnackbarMsg("Enter a value");
        snackbarRef.current.openSnackbar();
      } else {
        // console.log("second")
        setSnackbarErrStatus(false);
        setSnackbarMsg("No of school added");
        snackbarRef.current.openSnackbar();
        setOpen(false);
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1000);
      }
      // const res = await instance({
      //   url: `projections/create`,
      //   method: "post",
      //   data: {
      //     fk_series_id: values.series,
      //     quantity: values.quantity,
      //     mrp: mrp,
      //     total: total,
      //     fk_grade: values.grade,
      //   },
      //   headers: {
      //     Authorization: Cookies.get("accessToken"),
      //   },
      // });
      // console.log(res.data);
      // if (res.data.status === "success") {
      // }
    },
  });

  // useEffect(()=>{
  //   setSchlName("")
  // })

  const handleOrderProcessingForm = async (value, type) => {
    setNamee(value);
  };

  useLayoutEffect(() => {
    const getAllSeries = async () => {
      const res = await instance({
        url: `series/get/all`,
        method: "GET",
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      });
      setSeries(res.data.message);
      //   console.log(res.data.message);
    };
    const getAllGrade = async () => {
      const res = await instance({
        url: `grades/getAll`,
        method: "GET",
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      });
      setGrade(res.data.message);
      //   console.log(res.data.message);
    };
    // getAllSeries();
    // getAllGrade();
  }, []);

  const snackbarRef = useRef();

  React.useImperativeHandle(ref, () => ({
    openDialog() {
      setOpen(true);
    },
  }));

  const handleButtonClick = () => {
    props.handleDialogButton();
    setOpen(false);
  };

  const getSeriesPrice = async (id) => {
    const res = await instance({
      url: `series/get/seriessum/${id}`,
      method: "GET",
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    setMrp(res.data.message.sum);
  };

  const handleProjectionForm = (value, type) => {
    // console.log(value, type);
    switch (type) {
      case "series_name":
        getSeriesPrice(value.id);
        formik.values.series = value.id;
        break;
      case "grades":
        formik.values.grade = value.map((item) => {
          return { fk_grade_id: item.id };
        });
        break;
      case "Quantity":
        formik.values.quantity = value;
        setTotal(mrp * value);
        break;
      case "School Code":
        console.log(value);
        formik.values.schoolCode = value;
        break;
      case "School Name":
        // console.log(value);
        setSchlName(value.school_name);
        formik.values.schoolName = value.school_name;
        formik.values.schoolID = value.id;
        break;
      default:
        break;
    }
  };

  const handleClose = () => {
    setOpen(false);
    setConfirmVerify(false);
    setShowUploadExcel(false);
    setShowManualUpload(false);
    setEmployee(1);
    setShowButtons(true);
    setEmpForm([]);
    setNamee("");
  };

  const handleSave = async () => {
    if (!namee) {
      setErrorMsgNm(`Name cannot be empty`);
      return;
    } else if (namee.length === 0) {
      setErrorMsgNm(`Name cannot be empty`);
      return;
    } else {
      setErrorMsgNm("");
    }
    if (empForm.length === 0) {
      setErrorMsg(`The below fields cannot be left empty`);
      return;
    } else {
      setErrMessage("");
    }
    // console.log(empForm);
    for (let obj of empForm) {
      //   console.log(obj);
      if (!obj.emp_id) {
        setErrorMsg(`Entry ${obj.idx + 1} emp id cannot be empty`);
        return;
      } else if (obj.emp_id.length === 0) {
        setErrorMsg(`Entry ${obj.idx + 1} emp id cannot be empty`);
        return;
      } else {
        setErrorMsg("");
      }

      if (!obj.phone) {
        setErrorMsg(`Entry ${obj.idx + 1} phone cannot be empty`);
        return;
      } else if (obj.phone.length === 0) {
        setErrorMsg(`Entry ${obj.idx + 1} phone cannot be empty`);
        return;
      } else {
        setErrorMsg("");
      }
      if (!validMobileRgx.test(obj.phone)) {
        setErrorMsg(`Entry ${obj.idx + 1} has invalid phone number`);
        return;
      } else {
        setErrorMsg("");
      }
    }
    let postArr = [];
    for (let obj of empForm) {
      let eObj = {};
      eObj.emp_id = obj.emp_id;
      eObj.phone = obj.phone;
      postArr.push(eObj);
    }
    // console.log(postArr);
    let dataToPost = {
      name: namee,
      emp: postArr,
    };
    console.log(dataToPost);
    const res = await instance({
      url: `hr/create/contact_group/`,
      method: "POST",
      //   data: dataToPost,
      data: {
        name: "tsdd",
        emp: [
          { emp_id: "EL0073", phone: "9716340135" },
          { emp_id: "EL0057", phone: "9716340136" },
          { emp_id: "EL0014", phone: "9716340139" },
        ],
      },
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    console.log(res);
  };

  const handleUpadateInvoice = async () => {
    console.log("invoiceid= ", props.invoiceId);
    console.log("Schoolid= ", formik.values.schoolID);

    const res = await instance({
      url: `ckInvoice/upadateckinvoices/${props.invoiceId}/${formik.values.schoolID}`,
      method: "PUT",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });

    if (res.data.status === "success") {
      console.log(res.data);
      setSnackbarErrStatus(false);
      setErrMessage("res.data.message");
      snackbarRef.current.openSnackbar();
      setOpen(false);
      setSchlName("");
    }
  };

  const handleVerify = async () => {
    let id = props.aofId;
    let hndleData = props.handleData;
    const res = await instance({
      url: `sales_data/aof/verfication/customer/${id}`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    console.log(res);
    if (res.data.status === "error") {
      hndleData(res.data.message, id, "error");
    } else {
      hndleData(res.data.message, id, "success");
    }
    // setLoading(true);
    // // alert(res.data.message)
    // // setSnackbarErrStatus(false);
    // // setErrMessage(res.data.message);
    // // snackbarRef.current.openSnackbar();
    // setLoading(false);

    setTimeout(() => {
      setOpen(false);
    }, 1000);
  };

  const handleManualEntry = () => {
    setShowButtons(false);
    setShowManualUpload(true);
    // console.log("manualEntry");
  };

  const handleImport = () => {
    setShowButtons(false);
    setShowUploadExcel(true);
    // console.log("handleImport");
  };

  const validatePhone = (value) => {
    console.log(value);
    return false;
  };

  const handleFormInput = (field, value, index) => {
    // console.log(field, value, index);
    let tempArr = [...empForm];
    if (tempArr.length < index + 1) {
      let obj = {};
      obj.idx = index;
      if (field === "EmpId") obj.emp_id = value;
      if (field === "Phone") {
        // console.log(validMobileRgx.test(value));
        // if (validMobileRgx.test(value)) setinValidMobile(false);
        obj.phone = value;
      }
      tempArr.push(obj);
    } else {
      for (let obj of tempArr) {
        if (obj.idx === index) {
          if (field === "EmpId") obj.emp_id = value;
          if (field === "Phone") obj.phone = value;
        }
      }
    }
    console.log(tempArr);
    setEmpForm(tempArr);
  };

  const handleForm = () => {
    let content = [];
    for (let i = 0; i < employee; i++) {
      content.push(
        <li className="flex gap-4 items-center">
          <span className="mt-4 text-gray-100">{i + 1}.</span>
          <TextField
            // error={validMobile.test()}
            label={`Emp id`}
            // handleOrderProcessingForm={handleOrderProcessingForm}
            onChange={(e) => handleFormInput("EmpId", e.target.value, i)}
            variant={"standard"}
            multiline={false}
            // helperText="Incorrect Employee Id"
            // Name={"Name"}
          />
          <TextField
            label={"Phone"}
            // error={invalidMobile}
            // handleOrderProcessingForm={handleOrderProcessingForm}
            onChange={(e) => handleFormInput("Phone", e.target.value, i)}
            variant={"standard"}
            multiline={false}
            // helperText="Incorrect Phone No"
          />
        </li>
      );
    }
    return content;
  };

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbars
        ref={snackbarRef}
        snackbarErrStatus={snackbarErrStatus}
        errMessage={snackbarMsg}
      />

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
        {/* <DialogTitle className="!bg-gray-500 text-white">
          Confirm Verification?
        </DialogTitle> */}

        <DialogContent className=" !bg-gray-500 text-white">
          <p className="text-red-400 text-xs flex justify-end">{errorMsgNm}</p>

          <div>
            <BasicTextFields
              lable={"Enter Name"}
              //   value={""}
              handleOrderProcessingForm={handleOrderProcessingForm}
              //   onChange={(e) => console.log(e.target.value)}
              variant={"standard"}
              multiline={false}
            />
          </div>
          {showButton ? (
            <div className="flex justify-around mt-7">
              <div
                onClick={() => {
                  handleImport();
                }}
              >
                <BasicButton text={"Import Excel"} />
              </div>
              <div
                onClick={() => {
                  handleManualEntry();
                }}
              >
                <BasicButton text={"Enter Manually"} />
              </div>
            </div>
          ) : (
            ""
          )}

          {showUploadExcel ? (
            <div>
              <div className="flex justify-around pt-8">
                <div className="flex flex-col gap-2 w-full md:w-[15vw] text-white">
                  Upload Excel File :
                </div>
                <div className="flex flex-col gap-2 w-full md:w-[20vw]">
                  <input
                    className="text-white"
                    type="file"
                    //   onChange={(e) => handleExcelFile(e)}
                  />
                </div>
                <div
                  className="flex flex-col gap-2 w-full md:w-[10vw]"
                  // onClick={uploadExcelData}
                >
                  <BasicButton type="submit" text={"Upload"} />
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          {showManualUpload ? (
            <div className="pt-8">
              <div className="w-full flex flex-col my-2 gap-2">
                <h1 className="font-semibold text-gray-100">
                  Enter the id and phone number of the employees:
                </h1>
                <p className="text-red-400 text-xs flex justify-end">
                  {errorMsg}
                </p>
                <div onClick={() => setEmployee(employee + 1)}>
                  {/* <BasicButton text={"Add More"} /> */}
                  <Tooltip title="Add More Names">
                    <Fab color={"red"} size="small" aria-label="add">
                      <Add />
                    </Fab>
                  </Tooltip>
                </div>

                <ol className="list-decimal">{handleForm()}</ol>
              </div>
              <div
                className="pt-5 flex justify-end"
                onClick={() => {
                  handleSave();
                }}
              >
                <BasicButton text={"Save"} />
              </div>
            </div>
          ) : (
            ""
          )}
        </DialogContent>

        <DialogActions className="!bg-gray-500">
          {/* <div
            onClick={() => {
              handleVerify();
            }}
          >
            <BasicButton text={"Import Excel"} />
          </div>
          <div
            onClick={() => {
              handleClose();
            }}
          >
            <BasicButton text={"Enter Manually"} />
          </div> */}
          {/* {confirmVerify ? (
            <div
              onClick={() => {
                console.log(props);
              }}
            >
              <BasicButton text={"VERIFY"} />
            </div>
          ) : (
            ""
          )} */}
          {/* <div
            onClick={() => {
              handleVerify();
              // setConfirmVerify(true);
            }}
          >
            <BasicButton text={"Yes"} />
          </div> */}

          {/* <div
            onClick={() => {
              handleClose();
              
            }}
          >
            <BasicButton text={"No"} />
          </div> */}
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default DialogSlide17;
