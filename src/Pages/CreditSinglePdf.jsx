import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import SearchDropDown from "../Components/SearchDropDown";
import SwipeableTemporaryDrawer from "../Components/Material/MaterialSidebar";
import instance from "../Instance";
import Cookies from "js-cookie";
import BasicButton from "../Components/Material/Button";
import { Backdrop, CircularProgress, Toolbar } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import TablePagination from "@mui/material/TablePagination";

const CreditSinglePdf = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [highLight, setHighLight] = useState("printpdf");
  const [loading, setLoading] = useState(false);
  const [stateId, setStateId] = useState("");
  const [type, setType] = useState("");
  const sidebarRef = useRef();
  const [customer, setCustomer] = useState([]);
  const [schoolRow, setSchoolRow] = useState([]);
  const [searchRow, setSearchRow] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [bpCode, setBpCode] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const navInfo = {
    title: "Doc Print",
    details: ["Home", " / Doc Print", "/ Invoice"],
  };

  const handleSidebarCollapsed = () => {
    sidebarRef.current.openSidebar();
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
    // console.log(process.env.CRM_V2KEY)
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
        // console.log(value);
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

  const searchSchool = async () => {
    console.log(bpCode);
    setSchoolRow([]);

    const res = await instance({
      url: `doc_print/credits/${bpCode}`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    console.log(res.data.message);
    if (res.data.message.length === 0) {
      alert("No Data Available");
    }
    setSchoolRow(res.data.message);
  };

  const updateSchoolCode = async (schoolId, statId) => {
    console.log(schoolId, statId);
    const res = await instance({
      url: `school/update/ckschool/${schoolId}/${statId}`,
      method: "PUT",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    console.log(res.data.status);
    if (res.data.status) {
    }
    searchSchool();
  };

  // const history = useHistory();
  const handlePrintPDF = async (docNum, docDate) => {
    let postdata = {
      category: "inv",
      doc_num: docNum,
      doc_date: docDate,
    };
    setLoading(true);
    const res = await instance({
      url: `doc_print/invoice/getdata`,
      method: "post",
      data: postdata,
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    let downloadUrl = res.data.message;
    // console.log(downloadUrl)
    // redirect("https://www.google.com/")
    window.open(downloadUrl) || window.location.assign(downloadUrl);
    setLoading(false);
  };

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
            <div className="grid grid-cols-2 grid-rows-2 md:flex md:justify-around md:items-center px-6 mb-8 py-3 mt-6 gap-6 rounded-md bg-slate-600">
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

              <div className="flex flex-col gap-2 w-full md:w-[30vw]">
                <label className="text-gray-100">Customer</label>

                <SearchDropDown
                  label={"Select Customer"}
                  handleOrderProcessingForm={handleOrderProcessingForm}
                  color={"rgb(243, 244, 246)"}
                  data={customer}
                  Name="invoice_pdf_data"
                />
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
              <div className="sm:w-auto w-[50vw]" onClick={searchSchool}>
                <BasicButton text={"Search Customer"} />
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

            <div className=" sm:px-8 px-2 py-3 bg-[#141728] mt-4">
              <Paper>
                <TableContainer component={Paper}>
                  <Toolbar className="bg-slate-400">
                    {/* <form> */}
                    {/* <TextField
                      id="search-bar"
                      className="text"
                      onInput={(e) => {
                        handleSearch(e.target.value);
                      }}
                      label="Enter Invoice Number"
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
                    </div> */}

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
                    {/* </form> */}
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
                        <TableCell
                          className="!w-[10rem]"
                          align="center"
                        ></TableCell>
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
                                {row.inv_no == "N/A" || !row.inv_no
                                  ? row.docnum
                                  : row.inv_no}
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
                                  {/* <div
                            className="sm:w-auto w-[50vw]"
                            onClick={""}
                          >
                            <BasicButton text={"Get Code"} />
                          </div> */}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditSinglePdf;
