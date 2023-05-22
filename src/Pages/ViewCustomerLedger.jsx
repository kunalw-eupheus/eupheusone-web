import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
// import { Add } from '@mui/icons-material'
import { Link, redirect, useParams } from "react-router-dom";
import DataTable from "../Components/DataTable";
// import { rows, ManageSchoolRows } from '../DummyData'
import SearchDropDown from "../Components/SearchDropDown";
import SwipeableTemporaryDrawer from "../Components/Material/MaterialSidebar";
import instance from "../Instance";
import { useLayoutEffect } from "react";
import Cookies from "js-cookie";
import BasicButton from "../Components/Material/Button";
import { Backdrop, CircularProgress, Toolbar } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TablePagination from "@mui/material/TablePagination";
import { useNavigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Stack } from "@mui/system";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const ViewCustomerLedger = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [highLight, setHighLight] = useState("printpdf");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({ state: "", type: "" });
  const [stateId, setStateId] = useState("");
  const [type, setType] = useState("");
  const sidebarRef = useRef();
  const [states, setStates] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [city, setCity] = useState({ disable: true });
  const [schoolRow, setSchoolRow] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [searchRow, setSearchRow] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [bpCode, setBpCode] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const navigate = useNavigate();

  const navInfo = {
    title: "Doc Print",
    details: ["Home", " / Doc Print", "/ Ledger"],
  };

  const handleSidebarCollapsed = () => {
    sidebarRef.current.openSidebar();
  };

  const handleStartDate = (newValue) => {
    // console.log(newValue)
    setStartDate(newValue);
  };

  const handleEndDate = (newValue) => {
    setEndDate(newValue);
  };

  useEffect(() => {
    getCustomers();
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

  const getCustomers = async () => {
    const res = await instance({
      url: "sales_data/get_all_bps",
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    // console.log(res.data.message);
    setCustomer(res.data.message);
  };

  const handlePDF = async () => {
    if (!startDate || !endDate || !bpCode) alert("All fields are needed");
    let strtMonth = startDate.$M + 1;
    if (strtMonth < 10) strtMonth = `0${strtMonth}`;
    let strtDay = startDate.$D;
    if (strtDay < 10) strtDay = `0${strtDay}`;
    let strtYr = startDate.$y;
    let strtDte = `${strtYr}-${strtMonth}-${strtDay}`;

    let endMonth = endDate.$M + 1;
    if (endMonth < 10) endMonth = `0${endMonth}`;
    let endDay = endDate.$D;
    // console.log(endDay)
    if (endDay < 10) endDay = `0${endDay}`;
    let endYr = endDate.$y;
    let endDte = `${endYr}-${endMonth}-${endDay}`;

    console.log("startDate= ", strtDte);
    console.log("endDate= ", endDte);
    console.log("bpCode= ", bpCode);

    let postdata = {
      bpcode: bpCode,
      // bp: "CBP510860",
      todate: endDte,
      fromdate: strtDte,
    };
    // console.log(postdata)
    setLoading(true);
    // const res = await instance({
    //   url: `doc_print/ledger/getdata`,
    //   method: "post",
    //   data: postdata,
    //   headers: {
    //     Authorization: Cookies.get("accessToken"),
    //   },
    // });
    // console.log(res.data.message);
    // if (res.data.message === "No Invoice Found") {
    //   alert(res.data.message);
    // } else {
    //   let downloadUrl = res.data.message;
    //   window.open(downloadUrl);
    // }

    const res = await instance({
      url: `doc_print/ledger/getpdf`,
      method: "post",
      data: postdata,
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    // setLoading(false);

    // console.log(res.data.message)
    let downloadUrl = res.data.message;
    // console.log(downloadUrl)

    // console.log(`/cust_ledger/${bpCode}/${strtDte}/${endDte}`)
    // navigate(`/cust_ledger/${bpCode}/${strtDte}/${endDte}`)
    // window.open(`/cust_ledger/${bpCode}/${strtDte}/${endDte}`, '_blank', 'noreferrer')
    window.open(downloadUrl) || window.location.assign(downloadUrl);

    setLoading(false);
  };

  const handleOrderProcessingForm = async (value, type) => {
    // console.log(value, type);
    switch (type) {
      case "select_state":
        // console.log(value);
        setStateId(value.id);
        // getCity(value.fk_state_id);
        // getSchoolByState(value.fk_state_id);
        // setStateAndCity({ ...stateAndCity, state: value.fk_state_id });
        break;
      case "select_state_training":
        // console.log(value);
        setStateId(value.id);
        // getCity(value.fk_state_id);
        // getSchoolByState(value.fk_state_id);
        // setStateAndCity({ ...stateAndCity, state: value.fk_state_id });
        break;
      case "invoice_pdf_data":
        console.log(value);
        setBpCode(value.bp_code);
        // setType(value.types);
        // setStateAndCity({ ...stateAndCity, city: value.id });
        break;
      case "select_type":
        // console.log(value);
        setType(value.types);
        // setStateAndCity({ ...stateAndCity, city: value.id });
        break;
      default:
        break;
    }
  };

  useLayoutEffect(() => {
    // getStates();
    // getSchoolData();
  }, []);

  return (
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
        <div className="min-h-[100vh] pt-[2vh] max-h-full bg-[#141728]">
          <div className=" sm:px-8 px-2 py-3 bg-[#141728]">
            <div className="py-10 grid grid-cols-2 grid-rows-2 md:flex md:justify-around md:items-center px-6 mb-8 mt-6 gap-6 rounded-md bg-slate-600">
              {/* <div className="flex flex-col gap-2 w-full md:w-[20vw]">
                <label className="text-gray-100">Type</label>

                <SearchDropDown
                  label={"Select Type"}
                  handleOrderProcessingForm={handleOrderProcessingForm}
                  color={"rgb(243, 244, 246)"}
                  data={types}
                  Name="select_type"
                />
              </div> */}

              <div className="flex flex-col gap-2 w-full md:w-[20vw]">
                <SearchDropDown
                  label={"Select Customer"}
                  handleOrderProcessingForm={handleOrderProcessingForm}
                  color={"rgb(243, 244, 246)"}
                  data={customer}
                  Name="invoice_pdf_data"
                />
              </div>

              <div className="flex flex-col gap-2 w-full md:w-[15vw]">
                {/* <label className="text-gray-100">Start Date</label> */}

                {/* <SearchDropDown
                  label={"Select Customer"}
                  handleOrderProcessingForm={handleOrderProcessingForm}
                  color={"rgb(243, 244, 246)"}
                  data={customer}
                  Name="invoice_pdf_data"
                /> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      label="Select Start Date"
                      inputFormat="MM/DD/YYYY"
                      value={startDate}
                      onChange={handleStartDate}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </div>

              <div className="flex flex-col gap-2 w-full md:w-[15vw]">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      label="Select End Date"
                      inputFormat="MM/DD/YYYY"
                      value={endDate}
                      onChange={handleEndDate}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </div>
              {/* <div className=" flex flex-col gap-2 w-full md:w-[20vw]">
                <label className="text-gray-100">City</label>

                <SearchDropDown
                  label={"Select City"}
                  handleOrderProcessingForm={handleOrderProcessingForm}
                  color={"rgb(243, 244, 246)"}
                  disable={city.disable}
                  data={city}
                  Name="select_city"
                />
              </div> */}
              {/* <button className="w-full md:w-[20vw] col-span-2 md:ml-10 focus:outline-0 mt-8 text-gray-300 hover:shadow-md h-10 bg-slate-500 transition-all duration-200 ease-linear active:bg-slate-700 active:scale-95 rounded-md">
                Search School
              </button> */}
              <div className="sm:w-auto w-[50vw]" onClick={handlePDF}>
                <BasicButton text={"Download PDF"} />
              </div>
            </div>

            {/* <div className="grid grid-cols-2 grid-rows-2 md:flex md:justify-around md:items-center px-6 mb-8 py-3 mt-6 gap-6 rounded-md bg-slate-600">

              <div className="flex flex-col gap-2 w-full md:w-[20vw]">
                <label className="text-gray-100">Customer</label>

                <SearchDropDown
                  label={"Select Customer"}
                  handleOrderProcessingForm={handleOrderProcessingForm}
                  color={"rgb(243, 244, 246)"}
                  data={customer}
                  Name="invoice_pdf_data"
                />
              </div>
              <div className="flex flex-col gap-2 w-full md:w-[20vw]">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      label="Date desktop"
                      inputFormat="MM/DD/YYYY"
                      value={value}
                      onChange={handleChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </div>
              <div className="flex flex-col gap-2 w-full md:w-[20vw]">
                <label className="text-gray-100">End Date</label>

                <SearchDropDown
                  label={"Select Customer"}
                  handleOrderProcessingForm={handleOrderProcessingForm}
                  color={"rgb(243, 244, 246)"}
                  data={customer}
                  Name="invoice_pdf_data"
                />
              </div>
              <div className="sm:w-auto w-[30vw]" onClick={searchSchool}>
                <BasicButton text={"Search Customer"} />
              </div>
            </div> */}
            {/* <div className="w-full flex gap-3 justify-end">
              <Link to="/addschooltraining">
                <BasicButton text={"Create New School"} />
              </Link>
            </div> */}
            {/* 
            <div className=" sm:px-8 px-2 py-3 bg-[#141728] mt-4">
              <Paper>
                <TableContainer component={Paper}>
                  <Toolbar className="bg-slate-400">

                    <TablePagination
                      rowsPerPageOptions={[
                        10,
                        50,
                        100,
                        { label: "All", value: -1 },
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
                  </Toolbar>

                  <Table sx={{ minWidth: 650 }} aria-label="customized table">
                    <TableHead className="bg-slate-500">
                      <TableRow>
                        <TableCell className="!w-[13rem]" align="center">
                          Invoice No
                        </TableCell>
                        <TableCell className="!w-[13rem]" align="center">
                          Doc Date
                        </TableCell>
                        <TableCell className="!w-[13rem]" align="center">
                          Doc Total
                        </TableCell>
                        <TableCell className="!w-[10rem]" align="center">
                          Print
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
                              <TableCell
                                align="center"
                                component="th"
                                scope="row"
                              >
                                {row.docnum}
                              </TableCell>
                              <TableCell align="center">
                                {row.docdate}
                              </TableCell>
                              <TableCell align="center">
                                {row.doctotal}
                              </TableCell>

                              <TableCell align="center">
                                <div
                                  className="sm:w-auto w-[50vw]"
                                  onClick={() => {
                                    handlePrintPDF(row.docnum, row.docdate);
                                  }}
                                >
                                  <BasicButton text={"Print PDF"} />
                                </div>
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
                              <TableCell
                                align="center"
                                component="th"
                                scope="row"
                              >
                                {row.school_name}
                              </TableCell>
                              <TableCell align="center">
                                {row.school_addresses[0].fk_state.state}
                              </TableCell>
                              <TableCell align="center">
                                {row.school_addresses[0].fk_city.city}
                              </TableCell>
                              {row.ck_code ? (
                                <TableCell align="center">
                                  {row.ck_code}
      
                                </TableCell>
                              ) : (
                                <TableCell align="center">
                                  {row.id ? (
                                    <div
                                      className="sm:w-auto w-[50vw]"
                                      onClick={() => {
                                        updateSchoolCode(row.id, stateId);
                                      }}
                                    >
                                      <BasicButton text={"Get Code"} />
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </TableCell>
                              )}
                            </TableRow>
                          ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCustomerLedger;
