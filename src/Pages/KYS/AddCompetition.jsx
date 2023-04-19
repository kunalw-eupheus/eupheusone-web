import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useState } from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import SwipeableTemporaryDrawer from "../../Components/Material/MaterialSidebar";
import BasicButton from "../../Components/Material/Button";
// import SearchDropDown from "../../Components/SearchDropDown";
import instance from "../../Instance";
import Cookies from "js-cookie";
import {
  Backdrop,
  Checkbox,
  CircularProgress,
  FormControlLabel,
} from "@mui/material";
import RowRadioButtonsGroup from "../../Components/Material/RowRadioButtonGroup";
import BasicTextFields from "../../Components/Material/TextField";
import { useFormik } from "formik";
import Snackbars from "../../Components/Material/SnackBar";
import SearchDropDown from "../../Components/SearchDropDown";
import axios from "axios";
import { fromJSON } from "postcss";

const Competition = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [snackbarErrStatus, setSnackbarErrStatus] = useState(true);
  const [publisher, setPublisher] = useState([]);
  const sidebarRef = useRef();
  const { id } = useParams();
  const show = null;

  const snackbarRef = useRef();

  const formik = useFormik({
    initialValues: {
      grade: "",
      fk_compi_publisher_id: "",
      subject: "",
      series: "",
      mrp: "",
      remarks: "",
    },
    validate: () => {
      const errors = {};
      if (!formik.values.fk_compi_publisher_id) {
        errors.fk_compi_publisher_id = "Please Select Publisher";
      }
      if (!formik.values.grade) {
        errors.grade = "Please Select Grade";
      }
      if (!formik.values.mrp) {
        errors.mrp = "Please Select MRP";
      }
      if (!formik.values.series) {
        errors.series = "Please Select Series";
      }
      if (!formik.values.subject) {
        errors.subject = "Please Select Subject";
      }

      if (Object.values(errors).length > 0) {
        setSnackbarErrStatus(true);
        setErrMessage(Object.values(errors)[0]);
        snackbarRef.current.openSnackbar();
      }

      return errors;
    },
    onSubmit: async (values) => {
      setLoading(true);
      const res = await instance({
        url: `school/kys/competitions/create/${id}`,
        method: "POST",
        data: {
          grade: formik.values.grade,
          fk_compi_publisher_id: formik.values.fk_compi_publisher_id,
          subject: formik.values.subject,
          series: formik.values.series,
          mrp: formik.values.mrp,
          remarks: formik.values.remarks,
        },
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      });
      console.log(res.data);
      if (res.data.status === "success") {
        setSnackbarErrStatus(false);
        setErrMessage(res.data.message);
        snackbarRef.current.openSnackbar();
        setTimeout(() => {
          window.scroll({
            top: 0,
            // behavior: "smooth",
          });
          setTimeout(() => {
            navigate(`/kys/competition/${id}`);
          }, 1000);
        }, 1500);
      } else {
        setSnackbarErrStatus(true);
        setErrMessage(res.data.message);
        snackbarRef.current.openSnackbar();
      }
      setLoading(false);
    },
  });

  const navInfo = {
    title: "Competiton",
    details: ["Home", "/Competiton"],
  };

  const handleSidebarCollapsed = () => {
    // setSidebarCollapsed(!sidebarCollapsed);
    sidebarRef.current.openSidebar();
  };

  useLayoutEffect(() => {
    const getPublisher = async () => {
      const res = await instance({
        url: `school/kys/competitions/getpublishers`,
        method: "GET",
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      });
      setPublisher(res.data.message);
    };
    getPublisher();
  }, []);

  const handleOrderProcessingForm = (value, type) => {
    // console.log(value, type);
    switch (type) {
      case "kys_comp_publisher":
        formik.values.fk_compi_publisher_id = value.id;
        break;
      case "Grade":
        formik.values.grade = value;
        break;
      case "Subject":
        formik.values.subject = value;
        break;
      case "Series":
        formik.values.series = value;
        break;
      case "MRP":
        formik.values.mrp = value;
        break;
      case "Remarks":
        formik.values.remarks = value;
        break;
      default:
        break;
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
          highLight={""}
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
            <div className="text-gray-100 w-full md:text-2xl flex justify-between sm:px-12 px-8 items-center text-base font-semibold absolute mt-[2rem]">
              <h1 className="text-gray-100 text-lg">Add Competiton</h1>
            </div>

            <div className="w-full flex flex-col text-gray-100 gap-4  items-center mt-[7rem]">
              <div className="flex flex-col gap-4 items-start sm:w-[75%] w-[95%] px-6 bg-slate-600 rounded-md py-6 mb-[5rem]">
                <h1 className="text-gray-100 md:text-xl text-base font-semibold">
                  Fill In The Details
                </h1>

                <div className="flex w-full flex-col gap-4 items-center justify-center">
                  <div className="grid w-full sm:gap-8 gap-6 sm:grid-rows-3 sm:grid-cols-2 grid-cols-1 grid-rows-5">
                    <div className="sm:col-span-2">
                      <SearchDropDown
                        handleOrderProcessingForm={handleOrderProcessingForm}
                        data={publisher}
                        Name={"kys_comp_publisher"}
                        label={"Select Publisher"}
                        color={"rgb(243, 244, 246)"}
                      />
                    </div>

                    <BasicTextFields
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      variant={"standard"}
                      lable={"Grade"}
                    />
                    <BasicTextFields
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      variant={"standard"}
                      lable={"Subject"}
                    />
                    <BasicTextFields
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      variant={"standard"}
                      lable={"Series"}
                    />
                    <BasicTextFields
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      variant={"standard"}
                      lable={"MRP"}
                    />
                  </div>
                </div>

                <div className="w-full">
                  <BasicTextFields
                    lable={"Remarks"}
                    multiline={true}
                    handleOrderProcessingForm={handleOrderProcessingForm}
                  />
                </div>
                <div onClick={formik.handleSubmit}>
                  <BasicButton text={"Submit"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Competition;
