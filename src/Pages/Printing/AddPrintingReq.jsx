import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useState } from "react";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { Backdrop, CircularProgress, TextField } from "@mui/material";
import instance from "../../Instance";
import Sidebar from "../../Components/Sidebar";
import Snackbars from "../../Components/Material/SnackBar";
import Navbar from "../../Components/Navbar";
import SwipeableTemporaryDrawer from "../../Components/Material/MaterialSidebar";
import SearchDropDown from "../../Components/SearchDropDown";
import BasicTextFields from "../../Components/Material/TextField";
import BasicButton from "../../Components/Material/Button";
import UploadButton from "../../Components/Material/UploadButton";
import { AddCircle } from "@mui/icons-material";
import DatePicker from "../../Components/Material/Date";
import { ShowError } from "../../util/showError";

const AddPrintingReq = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [printRun, setPrintRun] = useState(1);

  const [errMessage, setErrMessage] = useState("");
  const [snackbarErrStatus, setSnackbarErrStatus] = useState(true);
  const [titles, setTitles] = useState([]);

  const sidebarRef = useRef();
  const snackbarRef = useRef();

  const show = null;
  const formik = useFormik({
    initialValues: {
      titleId: "",
      royalty: "",
      lastYearSales: "",
      currentYearSales: "",
      numberOfPages: "",
      CoverPageUrl: "",
      ContentUrl: "",
      authorId: "",
      series: "",
      printRunPhase: [
        {
          month: new Date()
            .toLocaleString("default", { month: "long" })
            .slice(0, 3),
          date: `${new Date().getFullYear()}-${
            new Date().getMonth() + 1
          }-${new Date().getDate()}`,

          quantity: "",
        },
      ],
    },

    validate: (values) => {
      const errors = {};
      if (!values.titleId) {
        errors.titleId = "Select Title";
      }
      if (!values.royalty) {
        errors.royalty = "Enter Royalty Percentage";
      }
      if (!values.lastYearSales) {
        errors.lastYearSales = "Enter Last Year Sales";
      }
      if (!values.currentYearSales) {
        errors.currentYearSales = "Enter Current Year Sales";
      }
      if (!values.numberOfPages) {
        errors.numberOfPages = "Enter Number Of Pages";
      }
      if (!values.ContentUrl) {
        errors.ContentUrl = "Please upload Content";
      }
      for (let i = 0; i < values.printRunPhase.length; i++) {
        const element = values.printRunPhase[i];
        if (!element.quantity) {
          ShowError("Enter Quantity");
          break;
        }
      }

      if (Object.values(errors).length > 0) {
        ShowError(Object.values(errors)[0]);
      }

      return errors;
    },
    onSubmit: async (values) => {
      console.log(values);
      let postData = {
        fk_title_id: values.titleId,
        royalty: values.royalty,
        lastYearSales: values.lastYearSales,
        currentYearSales: values.currentYearSales,
        printRuns: values.printRunPhase,
        numberOfPages: values.numberOfPages,
        contentUrl: values.ContentUrl,
      };
      if (values.CoverPageUrl) {
        postData.coverPageUrl = values.CoverPageUrl;
      }
      setLoading(true);
      const res = await instance({
        url: `printing/create-print-request`,
        method: "POST",
        data: postData,
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      }).catch(() => {
        setLoading(false);
      });
      console.log(res.data);
      if (res.status === 200 && res.data.status === "success") {
        setSnackbarErrStatus(false);
        setErrMessage(res.data.message);
        snackbarRef.current.openSnackbar();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
      setLoading(false);
    },
  });

  const handlePrintReqForm = async (value, type) => {
    console.log(value, type);
    switch (type) {
      case "Enter Royalty Percentage*":
        formik.values.royalty = value;
        break;
      case "Enter Last Year Sales *":
        formik.values.lastYearSales = value;
        break;
      case "Enter Current Year Sales *":
        formik.values.currentYearSales = value;
        break;
      case "Enter Number Of Pages*":
        formik.values.numberOfPages = value;
        break;
      case "printing_titles":
        formik.values.titleId = value.id;
        formik.values.authorId = value.fk_author_id;
        formik.values.series = value.series;
        break;

      default:
        break;
    }
  };

  const navInfo = {
    title: "Add New Printing Request",
    details: ["Home", "/New Printing Request"],
  };

  const months = [
    "Jan",
    "Febr",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const handleSidebarCollapsed = () => {
    sidebarRef.current.openSidebar();
  };

  const addPrintRun = () => {
    if (!formik.values.printRunPhase.slice(-1)[0].quantity) {
      ShowError("Please enter quantity");
    } else {
      let newPhase = {
        month: new Date()
          .toLocaleString("default", { month: "long" })
          .slice(0, 3),
        date: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()}`,

        quantity: "",
      };
      formik.values.printRunPhase.push(newPhase);
      setPrintRun(printRun + 1);
    }
  };

  const editPrintRun = (value, field, index) => {
    console.log(value, field, index);
    if (field === "Quantity") {
      formik.values.printRunPhase[index].quantity = Number(value);
    } else if (field === "printRunDate") {
      let month = value.toString().split(" ")[1];
      formik.values.printRunPhase[index].month = month;
      let date = `${value.toString().split(" ")[3]}-${
        months.indexOf(value.toString().split(" ")[1]) + 1
      }-${value.toString().split(" ")[2]}`;
      formik.values.printRunPhase[index].date = date;
    }
  };

  const uploadContent = async (file) => {
    console.log(file);
    if (!(file.type === "application/pdf")) {
      ShowError("Please select pdf file");
    } else {
      let formdata = new FormData();
      formdata.append("file", file);
      setLoading(true);
      const res = await instance({
        url: `imagetoS3/add_pdf_s3`,
        method: "POST",
        data: formdata,
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      });
      setLoading(false);
      if (res.status === 200) {
        formik.values.ContentUrl = res.data;
      }
      console.log(res.data);
    }
  };

  const uploadCover = async (file) => {
    console.log(file);
    if (!(file.type === "image/jpeg" || file.type === "image/png")) {
      ShowError("Please select image file");
    } else {
      let formdata = new FormData();
      formdata.append("img", file);
      setLoading(true);
      const res = await instance({
        url: `imagetoS3/add_image_s3`,
        method: "POST",
        data: formdata,
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      });
      setLoading(false);
      if (res.status === 200) {
        formik.values.CoverPageUrl = res.data;
      }
      console.log(res.data);
    }
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

  useLayoutEffect(() => {
    const getTitles = async () => {
      const res = await instance({
        url: `printing/get-titles`,
        method: "GET",
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      });
      setTitles(res.data.data);
    };
    getTitles();
  }, []);

  return (
    <>
      <div className="flex w-[100%] min-h-[100vh]">
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <Sidebar
          highLight={"addPrintRequest"}
          sidebarCollapsed={sidebarCollapsed}
          show={show}
        />

        <div>
          <SwipeableTemporaryDrawer
            ref={sidebarRef}
            sidebarCollapsed={sidebarCollapsed}
            show={show}
            highLight={""}
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

          <div className="min-h-[90vh] relative flex w-full justify-center items-start gap-4 bg-[#141728]">
            <h1 className="text-gray-100 md:text-2xl text-base font-semibold absolute top-[2rem] left-[2rem]">
              Add New Printing Request
            </h1>
            <div className="flex flex-col gap-4 items-start w-[90%] px-6 bg-slate-600 rounded-md py-6 mb-[5rem] mt-[9rem]">
              <div className="grid sm:grid-rows-2 sm:grid-cols-2 grid-rows-4 grid-cols-1 w-full mt-6 gap-6 rounded-md bg-slate-600">
                <SearchDropDown
                  handleOrderProcessingForm={handlePrintReqForm}
                  Name={"printing_titles"}
                  data={titles}
                  label={"Select Title *"}
                  color={"rgb(243, 244, 246)"}
                />
                <BasicTextFields
                  lable={"Enter Royalty Percentage*"}
                  handleOrderProcessingForm={handlePrintReqForm}
                  variant={"standard"}
                  type={"number"}
                  multiline={false}
                />
                <BasicTextFields
                  lable={"Enter Last Year Sales *"}
                  handleOrderProcessingForm={handlePrintReqForm}
                  variant={"standard"}
                  type={"number"}
                  multiline={false}
                />
                <BasicTextFields
                  lable={"Enter Current Year Sales *"}
                  handleOrderProcessingForm={handlePrintReqForm}
                  variant={"standard"}
                  type={"number"}
                  multiline={false}
                />
                <BasicTextFields
                  lable={"Enter Number Of Pages*"}
                  handleOrderProcessingForm={handlePrintReqForm}
                  variant={"standard"}
                  type={"number"}
                  multiline={false}
                />
              </div>
              <div className="w-full flex gap-3">
                <UploadButton
                  name={"Upload Content *"}
                  uploadContent={uploadContent}
                  accept={"application/pdf"}
                />
                <UploadButton
                  name={"Upload Cover Design"}
                  accept={"image/*"}
                  uploadContent={uploadCover}
                />
              </div>
              <div className="flex w-full flex-col gap-2">
                <div className="flex w-full gap-2 items-center">
                  <AddCircle
                    className="!text-white !text-4xl cursor-pointer"
                    onClick={addPrintRun}
                  />
                  <p className="text-base text-gray-100">Add Print Run</p>
                </div>
                {Array.from({ length: printRun }, (_, i) => i + 1).map(
                  (index, printRunIndex) => {
                    return (
                      <PrintRunPhase
                        key={index}
                        printRunIndex={printRunIndex}
                        editPrintRun={editPrintRun}
                      />
                    );
                  }
                )}
              </div>
              <div
                className="mt-3"
                onClick={() => {
                  // console.log(formik.values);
                  formik.handleSubmit();
                }}
              >
                <BasicButton text={"Submit"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const PrintRunPhase = ({ printRunIndex, editPrintRun }) => {
  const changeDate = (value) => {
    editPrintRun(value, "printRunDate", printRunIndex);
  };
  return (
    <div className="flex gap-4">
      <DatePicker handleOrderProcessingForm={changeDate} />
      <TextField
        onChange={(newValue) =>
          editPrintRun(newValue.target.value, "Quantity", printRunIndex)
        }
        InputLabelProps={{ style: { color: "white" } }}
        inputProps={{ style: { color: "white" } }}
        variant="standard"
        label="Quantity *"
      />
    </div>
  );
};

export default AddPrintingReq;
