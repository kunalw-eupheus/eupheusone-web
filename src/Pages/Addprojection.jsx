import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { TextField } from "@mui/material";

// import { Add } from '@mui/icons-material'
import { Link } from "react-router-dom";
import DataTable from "../Components/DataTable";
// import { rows, ManageSchoolRows } from '../DummyData'
import SearchDropDown from "../Components/SearchDropDown";
import SwipeableTemporaryDrawer from "../Components/Material/MaterialSidebar";
import instance from "../Instance";
import { useLayoutEffect } from "react";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import BasicButton from "../Components/Material/Button";
import { Backdrop, CircularProgress } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import DialogSlide from "../Components/Material/Dialog";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import NativeSelect from "@mui/material/NativeSelect";
import Snackbars from "../Components/Material/SnackBar";

const Addprojection = () => {
  const [open, setOpen] = useState(false);

  const [snackbarErrStatus, setSnackbarErrStatus] = useState(false);

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleClose = () => {
    setOpen(false);
  };

  const openDialog = () => {
    dialogRef.current.openDialog();
  };

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [highLight, setHighLight] = useState("projection");
  const [loading, setLoading] = useState(false);
  const [stateAndCity, setStateAndCity] = useState({ state: "", city: "" });
  const sidebarRef = useRef();
  const [states, setStates] = useState([]);
  const [mrp, setMrp] = useState("");
  const [total, setTotal] = useState("");
  const [snackbarMsg, setSnackbarMsg] = useState("Submitted SuccessFully");
  const [city, setCity] = useState({ disable: true });
  const [schoolRow, setSchoolRow] = useState([]);
  const [series, setSeries] = useState([]);
  const [rowdata, setRowdata] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [grade, setGrade] = useState([]);
  const [gradedata, setGradedata] = useState([]);
  const [cat, setCat] = useState("Eupheus Learning");
  const [gradearray, setGradearray] = useState([]);

  const navInfo = {
    title: "Projection",
    details: ["Home", " / Projection"],
  };

  const dialogRef = useRef();

  const Tablecolumns = [
    { field: "Series", headerName: "Series", width: 300 },
    {
      field: "Grades",
      headerName: "Grades",
      width: 120,
    },
    {
      field: "MRP",
      headerName: "MRP",
      width: 400,
    },
    {
      field: "Quantity",
      headerName: "Quantity",
      width: 400,
    },
  ];

  //   const getAllSeries = async () => {
  //     const res = await instance({
  //       url: `projections/series/`,
  //       method: "GET",
  //       headers: {
  //         Authorization: Cookies.get("accessToken"),
  //       },
  //     });
  //   setSeries(res.data.message);
  //   console.log(res.data.message);
  // };

  useLayoutEffect(() => {
    const getAllSeries = async () => {
      const res = await instance({
        url: `projections/series/eupheus`,
        method: "GET",
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      });
      setSeries(res.data.message);
      console.log(res.data.message);
    };
    const getAllGrade = async () => {
      const res = await instance({
        url: `school/kys/classes/individuals`,
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
    getAllSeries();
  }, []);

  const formik = useFormik({
    initialValues: {
      series: [],
      grade: [],
      total: "",
      mrp: "",
      quantity: "",
    },
    validate: () => {},
    onSubmit: async (values) => {
      // if (formik.values.grade.length > 0) {
      snackbarRef.current.openSnackbar();
      window.location.reload();
      // }
      //   const res = await instance({
      //     url: `projections/create`,
      //     method: "post",
      //     data: {
      //       fk_series_id: values.series,
      //       quantity: values.quantity,
      //       mrp: mrp,
      //       total: total,
      //       fk_grade: values.grade,
      //     },
      //     headers: {
      //       Authorization: Cookies.get("accessToken"),
      //     },
      //   });
      //   console.log(res.data);
      //   if (res.data.status === "success") {
      //     setSnackbarMsg(res.data.message);
      //     snackbarRef.current.openSnackbar();
      //     setOpen(false);
      //     window.location.reload();
      //   }
    },
  });

  const snackbarRef = useRef();

  const handleSidebarCollapsed = () => {
    sidebarRef.current.openSidebar();
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

  const getSchool = async (stateId, cityId) => {
    setLoading(true);
    const res = await instance({
      url: `school/${stateId}/${cityId}`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    // console.log(res.data.message);
    const rows = res.data.message.map((item, index) => {
      return {
        id: item.id,
        SchoolName: item.school_name,
        State: item.school_addresses[0].fk_state.state,
        Address: item.school_addresses[0].address,
      };
    });
    setSchoolRow(rows);
    setLoading(false);
  };

  const getSchoolByState = async (id) => {
    setLoading(true);

    const res = await instance({
      url: `school/${id}`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    const rows = res.data.message.map((item, index) => {
      return {
        id: item.id,
        SchoolName: item.school_name,
        State: item.school_addresses[0].fk_state.state,
        Address: item.school_addresses[0].address,
      };
    });
    setSchoolRow(rows);
    setLoading(false);
  };

  const handleOrderProcessingForm = async (value, type) => {
    switch (type) {
      case "select_state":
        getCity(value.fk_state_id);
        getSchoolByState(value.fk_state_id);
        setStateAndCity({ ...stateAndCity, state: value.fk_state_id });
        break;
      case "select_city":
        setStateAndCity({ ...stateAndCity, city: value.id });
        break;
      default:
        break;
    }
  };

  const getCity = async (Id) => {
    setLoading(true);
    const res = await instance({
      url: `location/city/${Id}`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    setCity(res.data.message);
    setLoading(false);
  };

  useLayoutEffect(() => {
    const getStates = async () => {
      const res = await instance({
        url: "location/state/get/states",
        method: "GET",
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      });

      setStates(res.data.message);
    };

    const getSchoolData = async () => {
      const res = await instance({
        url: "school/b4c27059-8c42-4d35-8fe7-8dedffbfe641/294de4f3-0977-4482-b0de-2cfeaa827ba4",
        method: "GET",
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      });
      // console.log(res.data.message);
      const rows = res.data.message.map((item, index) => {
        return {
          id: item.id,
          SchoolName: item.school_name,
          State: item.school_addresses[0].fk_state.state,
          Address: item.school_addresses[0].address,
        };
      });
      setSchoolRow(rows);
    };
    getStates();

    getSchoolData();
  }, []);

  const getSeriesPrice = async (id) => {
    // console.log(id)
    const res = await instance({
      url: `projections/series/mrp/${id}`,
      method: "GET",
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });

    return res.data.message.price;
  };

  const handleProjectionForm = async (value, type, id) => {
    console.log(value, type);
    // console.log(rowdata);
    switch (type) {
      case "series_name":
        if (value.length === 0) {
          setRowdata([]);
        } else {
          let mrp = await getSeriesPrice(value[value.length - 1].id);
          value[value.length - 1].mrp = mrp;
          console.log(value);
          setRowdata(value);
        }
        break;
      case "series_name":
        getSeriesPrice(value.id);
        formik.values.series = value.id;
        break;
      case "grades":
        console.log(value, type, id);
        rowdata.map((item) => {
          if (item.id === id) {
            console.log(item);
            formik.values.grade.push({
              fk_series_id: item.id,
              quantity,
              mrp: item.mrp,
              total: item.mrp * quantity,
              fk_grade: value.map((item) => {
                return { fk_grade_id: item.id };
              }),
            });
          }
        });
        // formik.values.grade = value.map((item) => {
        //   return { fk_grade_id: item.id };
        // });
        break;
      case "category":
        console.log("value= ", value, type);
        // formik.values.grade = value.map((item) => {
        //   return { fk_grade_id: item.id };
        // });
        break;
      case "Quantity":
        formik.values.quantity = value;
        // if(!value) setQuantity(1)
        setQuantity(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    for (let ele of rowdata) {
      ele["quantity"] = quantity;
      ele["total"] = ele.mrp * quantity;

      //   console.log(ele);
    }

    // console.log(gradedata);

    // console.log(quantity)
    console.log(rowdata);
  };

  //   const snackbarRef = useRef()

  //   const cat = [name: "Eupheus Learning", name:"Eupheus"]

  return (
    <div className="flex bg-[#111322]">
      <DialogSlide ref={dialogRef} />

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Sidebar sidebarCollapsed={sidebarCollapsed} highLight={highLight} />

      <div>
        <Snackbars
          ref={snackbarRef}
          snackbarErrStatus={snackbarErrStatus}
          errMessage={snackbarMsg}
        />
        <SwipeableTemporaryDrawer
          ref={sidebarRef}
          sidebarCollapsed={sidebarCollapsed}
          highLight={highLight}
          // show={show}
        />
      </div>

      <div
        className={`flex flex-col w-[100vw] lg:w-[83vw] lg:ml-[18vw] ${
          window.innerWidth < 1024 ? null : "md:ml-[30vw] ml-[60vw]"
        } `}
      >
        <Navbar
          handleSidebarCollapsed={handleSidebarCollapsed}
          info={navInfo}
        />
        <div className="min-h-[100vh] pt-[2vh] max-h-full bg-[#141728]">
          <div className=" sm:px-8 px-2 py-3 bg-[#141728]">
            <div className="w-full flex flex-col gap-4 items-center mt-[1rem]">
              <div className="flex flex-col gap-4 items-start sm:w-[100%] w-[95%] px-6 bg-slate-600 rounded-md py-6 mb-[5rem]">
                <h1 className="text-gray-100 md:text-xl text-base font-semibold">
                  Fill The Details
                </h1>
                <div className="grid sm:grid-rows-2 sm:grid-cols-2 grid-rows-3 grid-cols-1 w-full gap-6 rounded-md bg-slate-600">
                  {/* <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">
                      Select Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select"
                      value={cat}
                      label="Category"
                      onChange={handleCategory}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Eupheus</MenuItem>
                      <MenuItem value={20}>Learning</MenuItem>
                    </Select>
                  </FormControl> */}

                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-label">
                      Select
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Eupheus Learning"
                    >
                      <MenuItem value="classklap">Eupheus Learning</MenuItem>
                      {/* <MenuItem value="eupheus">Classklap</MenuItem> */}
                    </Select>
                  </FormControl>

                  <TextField
                    label="Quantity"
                    variant="standard"
                    type={"number"}
                    // disabled={formik?.values?.series ? false : true}
                    InputLabelProps={{ style: { color: "white" } }}
                    onBlur={(newValue) =>
                      handleProjectionForm(newValue.target.value, "Quantity")
                    }
                  />

                  <SearchDropDown
                    label={"Select Series"}
                    color={"rgb(243, 244, 246)"}
                    data={series}
                    multiple={true}
                    Name={"series_name"}
                    handleOrderProcessingForm={handleProjectionForm}
                  />
                </div>

                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>SERIES</TableCell>
                        <TableCell align="right">GRADE</TableCell>
                        <TableCell align="right">MRP&nbsp;(Rs)</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Total</TableCell>
                        {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rowdata.map((row) => (
                        <TableRow
                          key={row.series}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.series}
                          </TableCell>
                          <TableCell align="right">
                            <SearchDropDown
                              label={"Select Grade"}
                              color={"rgb(243, 244, 246)"}
                              // color={"rgb(243, 244, 246)"}
                              seriesId={row.id}
                              handleOrderProcessingForm={handleProjectionForm}
                              data={grade}
                              multiple={true}
                              Name={"grades"}
                            />
                          </TableCell>
                          <TableCell align="right">{row.mrp}</TableCell>
                          <TableCell align="right">{quantity}</TableCell>
                          <TableCell align="right">
                            {row.mrp * quantity}
                          </TableCell>
                          {/* <TableCell align="right">{row.quantity}</TableCell> */}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <div onClick={formik.handleSubmit}>
                  {/* <div onClick={formik.handleSubmit}> */}
                  <BasicButton text={"Submit"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addprojection;
