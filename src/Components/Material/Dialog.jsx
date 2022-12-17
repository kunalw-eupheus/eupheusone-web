import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import SearchDropDown from "../SearchDropDown";
import BasicTextFields from "./TextField";
import BasicButton from "./Button";
import { useLayoutEffect } from "react";
import instance from "../../Instance";
import { useState } from "react";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import { TextField } from "@mui/material";
import Snackbars from "./SnackBar";
import { useRef } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogSlide = React.forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);
  const [series, setSeries] = useState([]);
  const [grade, setGrade] = useState([]);
  const [mrp, setMrp] = useState("");
  const [total, setTotal] = useState("");
  const [snackbarErrStatus, setSnackbarErrStatus] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");

  const formik = useFormik({
    initialValues: {
      series: "",
      grade: [],
      total: "",
      mrp: "",
      quantity: "",
    },
    validate: () => {},
    onSubmit: async (values) => {
      console.log(values);
      const res = await instance({
        url: `projections/create`,
        method: "post",
        data: {
          fk_series_id: values.series,
          quantity: values.quantity,
          mrp: mrp,
          total: total,
          fk_grade: values.grade,
        },
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      });
      console.log(res.data);
      if (res.data.status === "success") {
        setSnackbarMsg(res.data.message);
        snackbarRef.current.openSnackbar();
        setOpen(false);
        window.location.reload();
      }
    },
  });

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
    getAllSeries();
    getAllGrade();
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
    console.log(value, type);
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
      default:
        break;
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
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
        maxWidth={"md"}
        fullWidth
      >
        <DialogContent className="!bg-gray-500">
          <DialogContentText
            id="alert-dialog-slide-description"
            className="!text-gray-600 !sm:text-base !text-sm grid sm:grid-rows-2 sm:grid-cols-3 grid-cols-1 sm:gap-8 gap-6"
          >
            <SearchDropDown
              label={"Select Series"}
              color={"rgb(243, 244, 246)"}
              data={series}
              Name={"series_name"}
              handleOrderProcessingForm={handleProjectionForm}
            />
            <SearchDropDown
              label={"Select Grade"}
              color={"rgb(243, 244, 246)"}
              handleOrderProcessingForm={handleProjectionForm}
              data={grade}
              multiple={true}
              Name={"grades"}
            />
            {/* <BasicTextFields
              lable={"Quantity"}
              variant={"standard"}
              type={"number"}
              handleOrderProcessingForm={handleProjectionForm}
            /> */}
            <TextField
              label="Quantity"
              variant="standard"
              type={"number"}
              disabled={formik?.values?.series ? false : true}
              InputLabelProps={{ style: { color: "white" } }}
              onBlur={(newValue) =>
                handleProjectionForm(newValue.target.value, "Quantity")
              }
            />
            <h1 className="text-gray-100 text-lg">MRP: {mrp}</h1>
            <h1 className="text-gray-100 text-lg">Total(Net): {total}</h1>
          </DialogContentText>
        </DialogContent>
        <DialogActions className="!bg-gray-500">
          {/* <Button onClick={() => handleButtonClick()}>Ok</Button> */}
          {/* <Button onClick={handleClose}>Cancle</Button> */}
          <div onClick={formik.handleSubmit}>
            <BasicButton text={"Submit"} />
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default DialogSlide;
