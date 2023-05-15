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
import { TextField } from "@mui/material";
import Snackbars from "./SnackBar";
import { useRef } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogSlide12 = React.forwardRef((props, ref) => {
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
    console.log(value, type);
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
  };

  const getSchoolName = async (code) => {
    // setLoading(true);
    const res = await instance({
      url: `school/ckschools/get/bycode/${code}`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    if (res.data.message) {
      // console.log(res.data.message);
      handleProjectionForm(res.data.message, "School Name");
    }
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
    let sendData = props.sendData;
    const res = await instance({
      url: `sales_data/aof/update/zsm/verification`,
      method: "PUT",
      data: {
        status: true,
        aof_id: id,
      },
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });

    // console.log(res.data);
    setLoading(true);
    alert(res.data.message);
    // setSnackbarErrStatus(false);
    // setErrMessage(res.data.message);
    // snackbarRef.current.openSnackbar();
    setLoading(false);
    if (res.data.status === "success") {
      sendData("success");
    }

    setTimeout(() => {
      setOpen(false);
    }, 1000);
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
        <DialogTitle className="!bg-gray-500 text-white">
          Confirm Verification?
        </DialogTitle>

        {/* 
        <DialogContent className=" !bg-gray-500 text-white">
          {confirmVerify ? (
            <div>
              <BasicTextFields
                lable={"Enter Phone Number"}
                //   value={""}
                handleOrderProcessingForm={handleOrderProcessingForm}
                variant={"standard"}
                multiline={false}
              />
            </div>
          ) : (
            ""
          )}
        </DialogContent> */}

        <DialogActions className="!bg-gray-500">
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
          <div
            onClick={() => {
              handleVerify();
              // setConfirmVerify(true);
            }}
          >
            <BasicButton text={"Yes"} />
          </div>

          <div
            onClick={() => {
              handleClose();
              //   setOpen(false);
              //   confirmVerify(false);
            }}
          >
            <BasicButton text={"No"} />
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default DialogSlide12;
