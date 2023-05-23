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
import SwipeableTemporaryDrawer from "../Components/Material/MaterialSidebar";
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
import DialogSlide from "../Components/Material/Dialog2";
import DialogSlide2 from "../Components/Material/Dialog3";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import TablePagination from "@mui/material/TablePagination";

const GatePassInvoice = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [highLight, setHighLight] = useState("gpinvoice");
  const [loading, setLoading] = useState(false);
  const sidebarRef = useRef();
  const [schoolRow, setSchoolRow] = useState([]);
  const [snackbarErrStatus, setSnackbarErrStatus] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [rowdata, setRowdata] = useState([]);
  const [invoices, setInvoices] = useState([]);

  const [invoiceId, setInvoiceId] = useState("");
  const [invoiceId2, setInvoiceId2] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const [searchRow, setSearchRow] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [invNoArr, setInvNoArr] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const navInfo = {
    title: "Gatepass",
    details: ["Gatepass", " / View Gatepass"],
  };

  const handleSidebarCollapsed = () => {
    sidebarRef.current.openSidebar();
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
      url: `eup_invoice/get/invoices/gatepass/getall`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    if (res.data.message) {
      console.log(res.data);
      setInvoices(res.data.message);
    }
  };

  const snackbarRef = useRef();

  const dialogRef = useRef();
  const dialogRef2 = useRef();

  const handleSearch = (val) => {
    setSearchVal(val.trim());
  };

  const filterTable = () => {
    // console.log(searchVal);
    // console.log(rowdata)
    setPage(0);
    let tempArr = [];
    for (let ele of invoices) {
      console.log(ele);
      let name = ele.name.toLowerCase();
      if (name.indexOf(searchVal.toLowerCase()) > -1) {
        tempArr.push(ele);
      }
    }
    setSearchRow([]);
    if (tempArr.length === 0) {
      alert("No Data Found");
    } else {
      setSearchRow(tempArr);
    }
  };

  const handleDownloadPDF = (url) => {
    console.log(url);
    window.open(url) || window.location.assign(url);
  };

  return (
    <div>
      <DialogSlide ref={dialogRef} invoiceId={invoiceId} />
      <DialogSlide2 ref={dialogRef2} invoiceId={invoiceId2} />

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
                      label="Enter Invoice No"
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
                        10,
                        50,
                        100,
                        { label: "All", value: -1 },
                      ]}
                      colSpan={3}
                      count={
                        searchRow.length === 0
                          ? rowdata.length
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
                        <TableCell className="!w-[8rem]" align="center">
                          Name
                        </TableCell>
                        <TableCell className="!w-[10rem]" align="center">
                          Gate Code
                        </TableCell>
                        <TableCell className="!w-[8rem]" align="center">
                          Date
                        </TableCell>
                        <TableCell className="!w-[15rem]" align="center">
                          Invoice No
                        </TableCell>
                        <TableCell className="!w-[5rem]" align="center">
                          Download
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className="bg-slate-200">
                      {searchRow.length === 0
                        ? (rowsPerPage > 0
                            ? invoices.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                            : invoices
                          ).map((row) => (
                            <TableRow
                              key={row.school_name}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell align="center">{row.name}</TableCell>
                              <TableCell align="center">
                                {row.gatecode}
                              </TableCell>
                              <TableCell align="center">{row.date}</TableCell>
                              <TableCell align="center">
                                {row.invoice}
                              </TableCell>
                              <TableCell align="center">
                                <div
                                  className="w-full flex gap-3 justify-end"
                                  onClick={() =>
                                    handleDownloadPDF(row.pass_url)
                                  }
                                >
                                  <BasicButton text={"Download"} />
                                </div>
                                {/* {row.pass_url} */}
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
                              <TableCell align="center">{row.name}</TableCell>
                              <TableCell align="center">
                                {row.gatecode}
                              </TableCell>
                              <TableCell align="center">{row.date}</TableCell>
                              <TableCell align="center">
                                {row.invoice}
                              </TableCell>
                              <TableCell align="center">
                                <div
                                  className="w-full flex gap-3 justify-end"
                                  onClick={() =>
                                    handleDownloadPDF(row.pass_url)
                                  }
                                >
                                  <BasicButton text={"Download"} />
                                </div>
                                {/* {row.pass_url} */}
                              </TableCell>
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

export default GatePassInvoice;
