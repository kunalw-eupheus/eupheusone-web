import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar3";
// import { Add } from '@mui/icons-material'
import { Link } from "react-router-dom";
// import DataTable from "../Components/DataTable";
// import { rows, ManageSchoolRows } from '../DummyData'
import DataTable from "../Components/DataTable";
// import SearchDropDown from "../Components/SearchDropDown";
import SwipeableTemporaryDrawer from "../Components/Material/MaterialSidebar3";
import instance from "../Instance";
import { useLayoutEffect } from "react";
import Cookies from "js-cookie";
import BasicButton from "../Components/Material/Button";
import { Backdrop, CircularProgress, Toolbar } from "@mui/material";
import * as XLSX from "xlsx";
import Snackbars from "../Components/Material/SnackBar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
// import { DataGrid } from "@mui/x-data-grid";
// import Button from "@mui/material/Button";
import DialogSlide from "../Components/Material/Dialog7";
import DialogSlide2 from "../Components/Material/Dialog3";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import TablePagination from "@mui/material/TablePagination";

const GatePassDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [highLight, setHighLight] = useState("gpdashboard");
  const [loading, setLoading] = useState(false);
  const [stateAndCity, setStateAndCity] = useState({ state: "", city: "" });
  const sidebarRef = useRef();
  const [states, setStates] = useState([]);
  const [city, setCity] = useState({ disable: true });
  const [schoolRow, setSchoolRow] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [snackbarErrStatus, setSnackbarErrStatus] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [rowdata, setRowdata] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [series, setSeries] = useState([]);
  const [invoiceId, setInvoiceId] = useState("");
  const [invoiceId2, setInvoiceId2] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const [searchRow, setSearchRow] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [invNoArr, setInvNoArr] = useState([]);

  const Tablecolumns = [
    { field: "inv_no", headerName: "Invoice No", width: 150 },
    {
      field: "cardname",
      headerName: "Card Name",
      width: 250,
    },
    {
      field: "docdate",
      headerName: "Doc Date",
      width: 100,
    },
    {
      field: "boxes",
      headerName: "Boxes",
      width: 80,
    },
    {
      field: "eup_invoice_addresses",
      headerName: "Shipping Address",
      width: 200,
    },
  ];

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowdata.length) : 0;

  const handleChangePage = (event, newPage) => {
    console.log(newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const navInfo = {
    title: "Gatepass",
    details: ["Gatepass", " / Create Gatepass"],
  };

  const handleSidebarCollapsed = () => {
    sidebarRef.current.openSidebar();
  };

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      data: [],
    },
    validate: (values) => {
      let errors = {};
      if (values.data.length < 1) {
        errors.data = "Required";
        setSnackbarErrStatus(true);
        setSnackbarMsg("Fill The Details");
        snackbarRef.current.openSnackbar();
      }
      return errors;
    },
    onSubmit: async (values) => {
      console.log(values);
      setLoading(true);
      const res = await instance({
        url: `projections/create`,
        method: "post",
        data: values.data,
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      });
      setLoading(false);
      console.log(res.data);
      if (res.data.status === "success") {
        setSnackbarErrStatus(false);
        setSnackbarMsg(res.data.message);
        snackbarRef.current.openSnackbar();
        setOpen(false);
        setTimeout(() => {
          navigate("/projection");
        }, 1000);
      }
    },
  });

  const getSeriesPrice = async (seriesId, gradeId) => {
    setLoading(true);
    const res = await instance({
      url: `projections/series/mrp/${seriesId}/${gradeId}`,
      method: "GET",
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    console.log(res.data);
    setLoading(false);
    return res.data;
    // return res.data.message.price;
  };

  const mystyle = {
    fontfamily: "sans-serif",
    textalign: "center",
  };

  const getAllSeries = async (id) => {
    setLoading(true);
    const res = await instance({
      url: `projections/series/${id}`,
      method: "GET",
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    setSeries(res.data.message);
    setLoading(false);

    console.log(res.data.message);
  };

  useEffect(() => {
    getInvoiceData();
    // setRowdata(tempData);

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

  const getInvoiceData = async () => {
    // setLoading(true);
    const res = await instance({
      url: `eup_invoice/get/invoices/gatepass`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    if (res.data.message) {
      let data = res.data.message;
      for (let obj of data) {
        obj.checked = false;
      }
      // console.log(data);
      setSchoolRow(data);
    }
  };

  const getSchool = async (stateId, cityId) => {
    setLoading(true);
    const res = await instance({
      url: `school/${stateId}/${cityId}`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    console.log(res.data.message);
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
      console.log(res.data.message);
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

    // getSchoolData();
  }, []);

  const snackbarRef = useRef();

  const handleQuantityChange = (seriesId, newValue) => {
    // console.log(seriesId, newValue);
    setRowdata(
      rowdata.map((item) => {
        if (item.id === seriesId) {
          return {
            id: item.id,
            mrp: item.mrp,
            series: item.series,
            total: item.mrp * newValue,
          };
        } else {
          return item;
        }
      })
    );
    formik.values.data = formik.values.data.map((item) => {
      if (item.fk_series_id === seriesId) {
        console.log(item);
        return {
          mrp: item.mrp,
          fk_series_id: item.fk_series_id,
          fk_grade: item.fk_grade,
          quantity: newValue,
          total: newValue * item.mrp,
        };
      } else {
        return item;
      }
    });
    // console.log(formik.values.data)
  };

  const handleProjectionForm = async (value, type, id) => {
    console.log(value, type);
    // console.log(rowdata);
    switch (type) {
      case "series_name":
        if (value.length === 0) {
          formik.values.data = [];
          setRowdata([]);
        } else {
          setLoading(true);

          setLoading(false);
          value[value.length - 1].mrp = 0;
          value[value.length - 1].total = 0;
          console.log(value);
          setRowdata([...rowdata, value[value.length - 1]]);
        }
        break;
      // case "series_name":
      //   getSeriesPrice(value.id);
      //   formik.values.series = value.id;
      //   break;
      case "grades":
        console.log(value, type, id);
        console.log(formik.values.data);
        let GradeNum = 0;
        formik.values.data.map((item) => {
          if (item.fk_series_id === id) {
            GradeNum = item.fk_grade.length;
          }
        });
        let duplicate = false;
        let res = await getSeriesPrice(id, value[value.length - 1].id);
        console.log(res);
        if (!(res?.status === "success")) {
          setSnackbarErrStatus(true);
          setSnackbarMsg("This series does match with selected grade");
          snackbarRef.current.openSnackbar();
        } else if (res.status === "success") {
          console.log(value, GradeNum);
          if (value.length > GradeNum) {
            setRowdata(
              rowdata.map((item) => {
                let quantity2;
                formik.values.data.map((item) => {
                  if (item?.fk_series_id === id) {
                    quantity2 = item?.quantity;
                  }
                });
                // console.log(quantity)
                if (item.id === id) {
                  console.log(item);
                  return {
                    id: item.id,
                    mrp: Number(item.mrp) + Number(res.message.price),
                    series: item.series,
                    total:
                      (Number(item.mrp) + Number(res.message.price)) *
                      Number(quantity2 ? quantity2 : quantity),
                  };
                } else {
                  return item;
                }
              })
            );
          } else if (value.length < GradeNum) {
            console.log("decrease");
            let gradeId = null;
            formik.values.data.map((item) => {
              if (item.fk_series_id === id) {
                item.fk_grade.map((el) => {
                  value.map((i) => {
                    if (i.id != el.fk_grade_id) {
                      gradeId = el.fk_grade_id;
                    }
                  });
                });
              }
            });
            let res = await getSeriesPrice(id, gradeId);

            console.log(gradeId);
            setRowdata(
              rowdata.map((item) => {
                console.log(item);
                if (item.id === id) {
                  return {
                    id: item.id,
                    mrp: Number(item.mrp) - Number(res.message.price),
                    series: item.series,
                    total: item.total,
                  };
                } else {
                  return item;
                }
              })
            );
          }
        }

        formik.values.data.map((item, index) => {
          if (item.fk_series_id === id) {
            console.log("remove duplicate");
            duplicate = true;
            formik.values.data[index] = {
              fk_series_id: item.fk_series_id,
              mrp: Number(item.mrp) + Number(res.message.price),
              quantity: item.quantity,
              total:
                (Number(item.mrp) + Number(res.message.price)) *
                Number(item.quantity),
              fk_grade: value.map((item) => {
                return { fk_grade_id: item.id };
              }),
            };
          }
        });
        if (!duplicate) {
          rowdata.map((item) => {
            if (item.id === id) {
              console.log(item);
              if (res.status === "success") {
                formik.values.data.push({
                  fk_series_id: item.id,
                  quantity,
                  mrp: Number(item.mrp) + Number(res.message.price),
                  total: Number(res.message.price) * quantity,
                  fk_grade: value.map((item) => {
                    return { fk_grade_id: item.id };
                  }),
                });
              }
            }
          });
        }

        break;
      case "category":
        console.log("value= ", value, type);
        break;
      case "Quantity":
        setQuantity(value);
        break;
      case "publisher_name":
        setRowdata([]);
        formik.values.data = [];
        getAllSeries(value.value);
        break;
      default:
        break;
    }
  };

  const handleSchoolAdd = (invceId) => {
    setInvoiceId(invceId);
    openDialogue();
  };

  const handleInvoiceView = (invceId) => {
    setLoading(true);
    setInvoiceId2(invceId);
    setTimeout(() => {
      // console.log("Delayed for 1 second.");
      openDialogue2();
      setLoading(false);
    }, 1000);
    // openDialogue2();
  };

  const openDialogue = () => {
    // console.log(id)
    dialogRef.current.openDialog();
  };

  const openDialogue2 = () => {
    dialogRef2.current.openDialog();
  };

  const dialogRef = useRef();
  const dialogRef2 = useRef();

  const handleSearch = (val) => {
    setSearchVal(val.trim());
  };

  const filterTable = () => {
    // console.log(searchVal);
    // console.log(schoolRow)
    setPage(0);
    let tempArr = [];
    for (let ele of schoolRow) {
      // console.log(ele.cardname)
      let cardName = ele.cardname.toLowerCase();
      let invNo = ele.inv_no.toLowerCase();
      let date = ele.docdate.toLowerCase();
      if (
        cardName.indexOf(searchVal.toLowerCase()) > -1 ||
        invNo.indexOf(searchVal.toLowerCase()) > -1 ||
        date.indexOf(searchVal.toLowerCase()) > -1
      ) {
        tempArr.push(ele);
      }
    }
    console.log("searchRow");
    console.log(tempArr);
    setSearchRow([]);

    if (tempArr.length === 0) {
      // console.log("first")
      alert("No Data Found");
      // console.log(searchRow)
      // setSearchRow([
      //   {
      //     id: null,
      //     ck_code: null,
      //     school_name: null,
      //     school_addresses: [
      //       {
      //         id: null,
      //         fk_state: {
      //           id: null,
      //           state: null,
      //         },
      //         fk_city: {
      //           id: null,
      //           city: null,
      //         },
      //       },
      //     ],
      //   },
      // ]);
      // console.log("first")
      // console.log(searchRow)
    } else {
      // console.log("second")
      // console.log(tempArr)
      setSearchRow(tempArr);
      // console.log(searchRow)
    }
  };

  // const filterTable = () => {
  //   // console.log(searchVal);
  //   // console.log(schoolRow)
  //   setPage(0);
  //   let tempArr = [];
  //   for (let ele of schoolRow) {
  //     // console.log(ele)
  //     let cardName = ele.cardname.toLowerCase();
  //     let invNo = ele.inv_no.toLowerCase();
  //     let docDate = ele.docdate.toLowerCase();
  //     let boxes = ele.boxes.toLowerCase();
  //     let address = ele.eup_invoice_addresses[0].ShipToAddress1.toLowerCase();
  //     // console.log(address)
  //     if (
  //       cardName.indexOf(searchVal.toLowerCase()) > -1
  //       // ||
  //       // invNo.indexOf(searchVal.toLowerCase()) > -1 ||
  //       // docDate.indexOf(searchVal.toLowerCase()) > -1 ||
  //       // boxes.indexOf(searchVal.toLowerCase()) > -1 ||
  //       // address.indexOf(searchVal.toLowerCase()) > -1
  //     ) {
  //       console.log(ele)
  //       tempArr.push(ele);
  //     }
  //   }
  //   // if (cardName.indexOf(searchVal.toLowerCase()) > -1 || invNo.indexOf(searchVal.toLowerCase()) > -1) {
  //   //   tempArr.push(ele);
  //   // }
  //   console.log(tempArr);
  //   setSearchRow([]);
  //   if (tempArr.length === 0) {
  //     alert("No Data Found");
  //     // setSearchRow([
  //     //   {
  //     //     id: null,
  //     //     ck_code: null,
  //     //     school_name: null,
  //     //     school_addresses: [
  //     //       {
  //     //         id: null,
  //     //         fk_state: {
  //     //           id: null,
  //     //           state: null,
  //     //         },
  //     //         fk_city: {
  //     //           id: null,
  //     //           city: null,
  //     //         },
  //     //       },
  //     //     ],
  //     //   },
  //     // ]);
  //     // console.log("first")
  //     // console.log(searchRow)
  //   } else {
  //     // console.log("second")
  //     setSearchRow(tempArr);
  //     // console.log(searchRow)
  //   }
  // };

  const handleCheckbox = (event, row) => {
    // console.log(event.target.checked, row)

    let tempArr = [...schoolRow];
    for (let obj of tempArr) {
      if (obj.id === row.id)
        // console.log(obj, row.id)
        obj.checked = !obj.checked;
      // console.log(obj)
    }
    setSchoolRow(tempArr);
    // console.log(tempArr)
    // let hasVal = invNoArr.includes(invId);
    // if (hasVal) {
    // for (let ele of invNoArr) {
    //   if (ele !== invId) {
    //     tempArr.push(ele);
    //   }
    // }
    // } else {
    //   tempArr = [...invNoArr, invId];
    // }
    // console.log(tempArr);
    // setInvNoArr(tempArr);
  };

  const createData = async () => {
    console.log(invNoArr);
    let postData = {
      name: "test1",
      invoice: invNoArr,
    };
    // console.log(postData)
    // setLoading(true);
    const res = await instance({
      url: `eup_invoice/get/invoices/gatepass/create`,
      method: "post",
      data: postData,
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    //   setLoading(false);
    console.log(res.data);
  };

  const handleName = async () => {
    let checkArr = [];
    for (let obj of schoolRow) {
      if (obj.checked) {
        console.log(obj);
        checkArr.push(obj.inv_no);
      }
    }
    // console.log(checkArr)
    setInvNoArr(checkArr);
    openDialogue();
  };

  return (
    <div>
      <DialogSlide ref={dialogRef} invoiceArr={invNoArr} />
      {/* <DialogSlide2 ref={dialogRef2} invoiceId={invoiceId2} /> */}

      <Snackbars
        ref={snackbarRef}
        snackbarErrStatus={snackbarErrStatus}
        errMessage={snackbarMsg}
      />
      <div className="flex bg-[#111322]">
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Sidebar sidebarCollapsed={sidebarCollapsed} highLight={highLight} />

        <div>
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
          <div className="min-h-[100vh] pt-[0vh] max-h-full bg-[#141728]">
            <div className=" sm:px-8 px-2 py-3 bg-[#141728] mt-4">
              <Paper>
                <TableContainer component={Paper}>
                  <Toolbar className="bg-slate-400">
                    <TextField
                      id="search-bar"
                      className="text"
                      onInput={(e) => {
                        handleSearch(e.target.value);
                      }}
                      label="Enter Search Value"
                      variant="outlined"
                      placeholder="Search..."
                      size="small"
                    />
                    <div className="bg-slate-300">
                      <IconButton
                        type="submit"
                        aria-label="search"
                        onClick={filterTable}
                      >
                        <SearchIcon style={{ fill: "blue" }} />
                      </IconButton>
                    </div>

                    <TablePagination
                      rowsPerPageOptions={[
                        10, 50, 100,
                        // { label: "All", value: -1 },
                      ]}
                      colSpan={3}
                      count={
                        searchRow.length === 0
                          ? schoolRow.length
                          : searchRow.length
                      }
                      rowsPerPage={rowsPerPage}
                      page={page}
                      slotProps={{
                        select: {
                          "aria-label": "rows per page",
                        },
                        actions: {
                          showFirstButton: true,
                          showLastButton: true,
                        },
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    <div className="justify-end ml-9" onClick={handleName}>
                      <BasicButton text={"Create"} />
                    </div>
                  </Toolbar>

                  <Table sx={{ minWidth: 650 }} aria-label="customized table">
                    <TableHead className="bg-slate-500">
                      <TableRow>
                        <TableCell className="!w-[4rem]" align="center">
                          Select
                        </TableCell>
                        <TableCell className="!w-[8rem]" align="center">
                          Invoice No
                        </TableCell>
                        <TableCell className="!w-[5rem]" align="center">
                          Doc Date
                        </TableCell>
                        <TableCell className="!w-[13rem]" align="center">
                          Customer Name
                        </TableCell>
                        <TableCell className="!w-[5rem]" align="center">
                          Boxes
                        </TableCell>
                        <TableCell className="!w-[15rem]" align="center">
                          School Address
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className="bg-slate-200">
                      {searchRow.length === 0
                        ? (rowsPerPage > 0
                            ? schoolRow.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                            : schoolRow
                          ).map((row) => (
                            <TableRow
                              key={row.id}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell align="center">
                                <input
                                  type="checkbox"
                                  name={row}
                                  checked={row.checked}
                                  onChange={(e) => handleCheckbox(e, row)}
                                />
                              </TableCell>
                              <TableCell align="center">{row.inv_no}</TableCell>
                              <TableCell align="center">
                                {row.docdate}
                              </TableCell>
                              <TableCell align="center">
                                {row.cardname}
                              </TableCell>
                              <TableCell align="center">{row.boxes}</TableCell>
                              <TableCell align="center">
                                {row.eup_invoice_addresses[0].ShipToAddress1}
                              </TableCell>
                            </TableRow>
                          ))
                        : (rowsPerPage > 0
                            ? searchRow.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                            : searchRow
                          ).map((row) => (
                            <TableRow
                              key={row.school_name}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell align="center">
                                <input
                                  type="checkbox"
                                  name={row}
                                  checked={row.checked}
                                  onChange={(e) => handleCheckbox(e, row)}
                                />
                              </TableCell>
                              <TableCell align="center">{row.inv_no}</TableCell>
                              <TableCell align="center">
                                {row.docdate}
                              </TableCell>
                              <TableCell align="center">
                                {row.cardname}
                              </TableCell>
                              <TableCell align="center">{row.boxes}</TableCell>
                              <TableCell align="center">
                                {row.eup_invoice_addresses.length > 0
                                  ? row.eup_invoice_addresses[0].ShipToAddress1
                                  : ""}
                              </TableCell>
                            </TableRow>
                          ))}
                      {/* {invoices.map((row) => {
                        <TableRow
                          key={row.id}
                          sx={{
                            "&:last-child td, &:last-child th": {
                              border: 0,
                            },
                          }}
                        >
                          <TableCell align="center">{"row.cardname"}</TableCell>
                          <TableCell align="center">{"row.docdate"}</TableCell>
                          <TableCell align="center">{"row.cardname"}</TableCell>
                          <TableCell align="center">{"row.doctotal"}</TableCell>

                          <TableCell align="center">{"sdsdsd"}</TableCell>
                        </TableRow>;
                      })} */}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GatePassDashboard;
