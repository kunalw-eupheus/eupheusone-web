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

const AddProduct = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [digital, setDigital] = useState([]);
  const [curriculum, setCurriculum] = useState([]);
  const [showP, setShowP] = useState({ digital: true, curriculum: false });
  const [errMessage, setErrMessage] = useState("");
  const [snackbarErrStatus, setSnackbarErrStatus] = useState(true);
  const [grades, SetGrades] = useState([]);
  const [subject, SetSubject] = useState([]);
  const [series, setSeries] = useState([]);
  const sidebarRef = useRef();
  const { id } = useParams();
  const show = null;

  const snackbarRef = useRef();

  const Digitalformik = useFormik({
    initialValues: {
      remarks: "",
      category: "digital",
      products: [],
    },
    validate: () => {
      const errors = {};

      return errors;
    },
    onSubmit: async (values) => {
      if (Digitalformik.values.products.length === 0) {
        setSnackbarErrStatus(true);
        setErrMessage("Please Add Products");
        snackbarRef.current.openSnackbar();
      } else {
        setLoading(true);
        const res = await instance({
          url: `school/kys/products/create/${id}`,
          method: "POST",
          data: {
            remarks: values.remarks,
            category: values.category,
            products: values.products,
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
              window.location.reload();
            }, 100);
          }, 1500);
        } else {
          setSnackbarErrStatus(true);
          setErrMessage(res.data.message);
          snackbarRef.current.openSnackbar();
        }
        setLoading(false);
      }
    },
  });
  const Curriculumformik = useFormik({
    initialValues: {
      gradeId: "",
      subjectId: "",
      seriesId: "",
      remarks: "",
      category: "curriculum",
      products: [],
    },
    validate: () => {
      const errors = {};

      return errors;
    },
    onSubmit: async (values) => {
      if (false) {
        setSnackbarErrStatus(true);
        setErrMessage("Please Add Products");
        snackbarRef.current.openSnackbar();
      } else {
        setLoading(true);
        const res = await instance({
          url: `school/kys/products/create/${id}`,
          method: "POST",
          data: {
            fk_grade_id: values.gradeId,
            fk_subject_id: values.subjectId,
            fk_series_id: values.seriesId,
            remarks: values.remarks,
            category: values.category,
            // products: values.products,
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
              behavior: "smooth",
            });
            setTimeout(() => {
              navigate(`/kys/products/${id}`);
            }, 100);
          }, 1500);
        } else {
          setSnackbarErrStatus(true);
          setErrMessage(res.data.message);
          snackbarRef.current.openSnackbar();
        }
        setLoading(false);
      }
    },
  });

  const handleRadioButtons = (type, value) => {
    if (value === "Digital") {
      setShowP({ digital: true, curriculum: false });
    } else {
      setShowP({ digital: false, curriculum: true });
    }
  };

  const navInfo = {
    title: "Add Product",
    details: ["Home", "/Add Product"],
  };

  const handleSidebarCollapsed = () => {
    sidebarRef.current.openSidebar();
  };

  const handleSubmit = () => {
    if (showP.digital) {
      Digitalformik.handleSubmit();
    } else {
      Curriculumformik.handleSubmit();
    }
  };

  useLayoutEffect(() => {
    const getDigitalProducts = async () => {
      const digitalProducts = await instance({
        url: "items/get/digital",
        method: "GET",
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      });
      setDigital(digitalProducts.data.message);
    };
    const getGrades = async () => {
      const grades = await instance({
        url: "grades/getAll",
        method: "GET",
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      });
      SetGrades(grades.data.message);
    };
    // const getSubjects = async () => {
    //   const subject = await instance({
    //     url: "subject/get/curriculum",
    //     method: "GET",
    //     headers: {
    //       Authorization: `${Cookies.get("accessToken")}`,
    //     },
    //   });
    //   SetSubject(subject.data.message);
    // };

    getDigitalProducts();
    getGrades();
    // getSubjects();
  }, []);

  const getSubjects = async (gradeId) => {
    setLoading(true);
    const subject = await instance({
      url: `grades/get/subjects/${gradeId}`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    let newArr = subject.data.message.map((item) => {
      if (item.fk_subject != null) {
        return item.fk_subject;
      } else {
        return null;
      }
    });

    newArr = newArr.filter((item) => item !== null);
    newArr = newArr.sort((a, b) => {
      let fa = a?.subject.toLowerCase(),
        fb = b?.subject.toLowerCase();

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
    console.log(newArr);
    SetSubject(newArr);
    setLoading(false);
  };

  const getItems = async (seriesId) => {
    const items = await instance({
      url: `items/getitem/${seriesId}/${Curriculumformik.values.subjectId}`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    setCurriculum(items.data.message);
  };

  const handleDigitalProducts = (isChecked, value) => {
    if (showP.digital) {
      if (isChecked) {
        Digitalformik.values.products.push({ product_id: value.id });
      } else {
        const newArray = Digitalformik.values.products.filter(
          (item) => item.product_id != value.id
        );
        Digitalformik.values.products = newArray;
      }
    } else {
      if (isChecked) {
        Curriculumformik.values.products.push({ product_id: value.id });
      } else {
        const newArray = Curriculumformik.values.products.filter(
          (item) => item.product_id != value.id
        );
        Curriculumformik.values.products = newArray;
      }
    }
  };

  const getSeriesData = async (id) => {
    setLoading(true);
    const SeriesRes = await instance({
      url: `series/getseries/${id}`,
      method: "GET",
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    // console.log(SeriesRes.data);
    setSeries(SeriesRes.data.message);

    setLoading(false);
  };

  const handleOrderProcessingForm = (value, type) => {
    console.log(value, type);
    switch (type) {
      case "Remarks":
        if (showP.digital) {
          Digitalformik.values.remarks = value;
        } else {
          Curriculumformik.values.remarks = value;
        }
        break;
      case "grades":
        getSubjects(value.id);
        Curriculumformik.values.gradeId = value.id;
        break;
      case "subject_name":
        Curriculumformik.values.subjectId = value.id;
        break;
      case "series_name":
        Curriculumformik.values.seriesId = value.id;
        // getItems(value.id);
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
              <h1 className="text-gray-100 text-lg">Add Product</h1>
            </div>

            <div className="w-full flex flex-col text-gray-100 gap-4  items-center mt-[7rem]">
              <div className="flex flex-col gap-4 items-start sm:w-[75%] w-[95%] px-6 bg-slate-600 rounded-md py-6 mb-[5rem]">
                <h1 className="text-gray-100 md:text-xl text-base font-semibold">
                  Select The Product Type
                </h1>
                <div className="w-full flex justify-center gap-4">
                  <RowRadioButtonsGroup
                    name={"addProduct"}
                    value={[
                      { label: "Digital", value: "Digital" },
                      { label: "Curriculum", value: "Curriculum" },
                    ]}
                    handleRadioButtons={handleRadioButtons}
                    defaultValue={"Digital"}
                  />
                </div>

                {showP.digital ? (
                  <div className="w-full flex justify-center">
                    <div className="w-fit grid sm:grid-cols-3 sm:grid-rows-3 grid-cols-1 grid-rows-[8] gap-6">
                      {digital.map((item) => {
                        return (
                          <FormControlLabel
                            className="flex gap-4"
                            control={
                              <Checkbox
                                onChange={(e) =>
                                  handleDigitalProducts(e.target.checked, item)
                                }
                              />
                            }
                            label={item.item_name}
                          />
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="flex w-full flex-col gap-4 items-center justify-center">
                    <div className="grid w-full sm:gap-8 gap-6 sm:grid-rows-1 sm:grid-cols-3 grid-cols-1 grid-rows-3">
                      <SearchDropDown
                        handleOrderProcessingForm={handleOrderProcessingForm}
                        data={grades}
                        Name={"grades"}
                        label={"Select Grade"}
                        color={"rgb(243, 244, 246)"}
                      />
                      <SearchDropDown
                        handleOrderProcessingForm={handleOrderProcessingForm}
                        getSeriesData={getSeriesData}
                        data={subject}
                        disable={subject.length > 0 ? false : true}
                        Name={"subject_name"}
                        label={"Select Subject"}
                        color={"rgb(243, 244, 246)"}
                      />
                      <SearchDropDown
                        handleOrderProcessingForm={handleOrderProcessingForm}
                        Name={"series_name"}
                        disable={series.length > 0 ? false : true}
                        data={series}
                        label={"Select Series"}
                        color={"rgb(243, 244, 246)"}
                      />
                    </div>
                    <div className="w-full flex justify-center">
                      <div className="w-fit grid sm:grid-cols-3 grid-cols-1  gap-6">
                        {curriculum.map((item) => {
                          return (
                            <FormControlLabel
                              className="flex gap-4"
                              control={
                                <Checkbox
                                  size="medium"
                                  onChange={(e) =>
                                    handleDigitalProducts(
                                      e.target.checked,
                                      item
                                    )
                                  }
                                />
                              }
                              label={item.item_name}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
                <div className="w-full">
                  <BasicTextFields
                    lable={"Remarks"}
                    multiline={true}
                    handleOrderProcessingForm={handleOrderProcessingForm}
                  />
                </div>
                <div onClick={handleSubmit}>
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

export default AddProduct;
