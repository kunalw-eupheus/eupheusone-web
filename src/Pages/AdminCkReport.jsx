import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
// import { Add } from '@mui/icons-material'
import { Link } from "react-router-dom";
import DataTable from "../Components/DataTable";
import SearchDropDown from "../Components/SearchDropDown";
import SwipeableTemporaryDrawer from "../Components/Material/MaterialSidebar4";
import instance from "../Instance";
import { useLayoutEffect } from "react";
import Cookies from "js-cookie";
import BasicButton from "../Components/Material/Button";
import { Backdrop, CircularProgress } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Stack } from "@mui/system";
import { TextField } from "@mui/material";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { Toolbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const AdminCkReport = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [highLight, setHighLight] = useState("ckreport");
  const [loading, setLoading] = useState(false);
  const sidebarRef = useRef();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [rawStartDate, setRawStartDate] = useState("");
  const [rawEndDate, setRawEndDate] = useState("");
  const [searchRow, setSearchRow] = useState([]);
  const [rowdata, setRowdata] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [searchVal, setSearchVal] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const navInfo = {
    title: "CK Report",
    details: ["Admin", " / CK Report"],
  };

  const handleSidebarCollapsed = () => {
    sidebarRef.current.openSidebar();
  };

  const handleStartDate = (newValue) => {
    setRawStartDate(newValue);
    // if (rawEndDate.length !== 0) {
    //   if (newValue.$y > rawEndDate.$y) {
    //     alert("Start Year cannot be more than End Year");
    //     return;
    //   } else {
    //     if (newValue.$M > rawEndDate.$M) {
    //       alert("Start Date cannot be more than End Date");
    //       return;
    //     } else {
    //       if (newValue.$D >= rawEndDate.$D) {
    //         alert("Start Date cannot be more than End Date");
    //         return;
    //       }
    //     }
    //   }
    // }
    // console.log(newValue);
    if (!newValue) {
      setStartDate("");
    } else {
      let date = `${newValue.$y}-${newValue.$M + 1}-${newValue.$D}`;
      setStartDate(date);
    }
  };

  const handleEndDate = (newValue) => {
    setRawEndDate(newValue);
    // if (rawStartDate.length !== 0) {
    //   if (newValue.$y < rawStartDate.$y) {
    //     alert("End Year cannot be less than Start Year");
    //     return;
    //   } else {
    //     if (newValue.$M < rawStartDate.$M) {
    //       alert("End Date cannot be less than Start Date");
    //       return;
    //     } else {
    //       if (newValue.$D <= rawStartDate.$D) {
    //         alert("End Date should be more than Start Date");
    //         return;
    //       }
    //     }
    //   }
    // }
    // console.log(newValue)
    if (!newValue) {
      setEndDate("");
    } else {
      let date = `${newValue.$y}-${newValue.$M + 1}-${newValue.$D}`;
      setEndDate(date);
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

  //   useLayoutEffect(() => {}, []);

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  let columnsName = [
    "DocNum",
    "CANCELED",
    "DocDate",
    "CardCode",
    "CardName",
    "ItemCode",
    "Dscription",
    "Quantity",
    "Price",
    "LineTotal",
    "U_OrderType",
    "U_PpExamException",
    "U_PrDelvTerm",
    "U_PpDelvTerm",
    "U_PrExamExecpt",
    "U_PpServExcp",
    "U_PrServExcpt",
    "U_SCode",
    "schoolName",
    "schoolCity",
    "schoolState",
    "schoolContactPerson",
    "schoolContactPersonEmail",
    "schoolContactPersonPhone",
    "schoolContactPersonDegisnation",
    "salesPerson",
  ];

  const exportToCSV = async () => {
    let fileName = "testName";
    // let keysName = Object.keys(apiData[0])
    //   console.log(rowsName)
    const ws = XLSX.utils.json_to_sheet(apiData);
    /* custom headers */
    XLSX.utils.sheet_add_aoa(ws, [columnsName], {
      // XLSX.utils.sheet_add_aoa(ws, [keysName], {
      origin: "A1",
    });
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  const fetchApiData = async () => {
    let dataToPost = {
      fromDate: startDate,
      toDate: endDate,
    };

    setLoading(true);
    const res = await instance({
      url: `/ck//report/order/shool`,
      method: "POST",
      data: dataToPost,
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    console.log(res.data);
    setApiData(res.data.message);
    setRowdata(res.data.message);
    setLoading(false);
  };

  const filterTable = () => {
    // console.log(searchVal);
    // console.log(rowdata)
    setPage(0);
    let tempArr = [];
    for (let ele of rowdata) {
      let cardCode = ele.CardCode.toLowerCase();
      let cardName = ele.CardName.toLowerCase();
      let schlName = ele.schoolName.toLowerCase();
      let salesPerson = ele.salesPerson.toLowerCase();
      if (
        cardCode.indexOf(searchVal.toLowerCase()) > -1 ||
        cardName.indexOf(searchVal.toLowerCase()) > -1 ||
        schlName.indexOf(searchVal.toLowerCase()) > -1 ||
        salesPerson.indexOf(searchVal.toLowerCase()) > -1
      ) {
        tempArr.push(ele);
      }
    }
    setSearchRow([]);
    if (tempArr.length === 0) {
      alert("No data Found");
    } else {
      setSearchRow(tempArr);
    }
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
              <div className="flex flex-col gap-2 w-full md:w-[20vw]">
                <label className="text-gray-100">Select Start Date *</label>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      //   label="Select Date *"
                      inputFormat="DD/MM/YYYY"
                      value={startDate}
                      onChange={handleStartDate}
                      // handleOrderProcessingForm={handleOrderProcessingForm}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </div>
              <div className=" flex flex-col gap-2 w-full md:w-[20vw]">
                <label className="text-gray-100">Select End Date *</label>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      //   label="Select Date *"
                      inputFormat="DD/MM/YYYY"
                      value={endDate}
                      onChange={handleEndDate}
                      // handleOrderProcessingForm={handleOrderProcessingForm}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </div>
              {/* <button className="w-full md:w-[20vw] col-span-2 md:ml-10 focus:outline-0 mt-8 text-gray-300 hover:shadow-md h-10 bg-slate-500 transition-all duration-200 ease-linear active:bg-slate-700 active:scale-95 rounded-md">
                Search School
              </button> */}
              <div
                className="sm:w-auto w-[50vw]"
                onClick={() => {
                  fetchApiData();
                }}
              >
                <BasicButton text={"Search"} />
              </div>
            </div>
            <div className="w-full flex gap-3 justify-end">
              <div onClick={exportToCSV}>
                <BasicButton text={"Export to Excel"} />
              </div>
            </div>

            {rowdata.length !== 0 ? (
              <Paper className="mt-5">
                <TableContainer component={Paper}>
                  <Toolbar className="bg-slate-400 w-[207.6rem]">
                    <TextField
                      id="search-bar"
                      className="text"
                      onInput={(e) => {
                        setSearchVal(e.target.value.trim());
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
                        {columnsName.map((i) => (
                          <TableCell className="!w-[13rem]" align="center">
                            {i}
                          </TableCell>
                        ))}
                        {/* <TableCell className="!w-[13rem]" align="center">
                        Card Code
                      </TableCell>
                      <TableCell className="!w-[13rem]" align="center">
                        Card Name
                      </TableCell>
                      <TableCell className="!w-[13rem]" align="center">
                        Quantity
                      </TableCell>
                      <TableCell className="!w-[10rem]" align="center">
                        Price
                      </TableCell>
                      <TableCell className="!w-[8rem]" align="center">
                        School Name
                      </TableCell>
                      <TableCell className="!w-[8rem]" align="center">
                        School City
                      </TableCell>
                      <TableCell className="!w-[8rem]" align="center">
                        Sales Person
                      </TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody className="bg-slate-200">
                      {searchRow.length === 0
                        ? (rowsPerPage > 0
                            ? rowdata.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                            : rowdata
                          ).map((row) => (
                            <TableRow
                              key={row.series}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell align="center">{row.DocNum}</TableCell>
                              <TableCell align="center">
                                {row.CANCELED}
                              </TableCell>
                              <TableCell align="center">
                                {row.DocDate}
                              </TableCell>
                              <TableCell align="center">
                                {row.CardCode}
                              </TableCell>

                              <TableCell align="center">
                                {row.CardName}
                              </TableCell>

                              <TableCell align="center">
                                {row.ItemCode}
                              </TableCell>

                              <TableCell align="center">
                                {row.Dscription}
                              </TableCell>

                              <TableCell align="center">
                                {row.Quantity}
                              </TableCell>
                              <TableCell align="center">{row.Price}</TableCell>
                              <TableCell align="center">
                                {row.LineTotal}
                              </TableCell>
                              <TableCell align="center">
                                {row.U_OrderType}
                              </TableCell>

                              <TableCell align="center">
                                {row.U_PpExamException}
                              </TableCell>

                              <TableCell align="center">
                                {row.U_PrDelvTerm}
                              </TableCell>

                              <TableCell align="center">
                                {row.U_PpDelvTerm}
                              </TableCell>

                              <TableCell align="center">
                                {row.U_PrExamExecpt}
                              </TableCell>
                              <TableCell align="center">
                                {row.U_PpServExcp}
                              </TableCell>
                              <TableCell align="center">
                                {row.U_PrServExcpt}
                              </TableCell>
                              <TableCell align="center">
                                {row.U_SCode}
                              </TableCell>

                              <TableCell align="center">
                                {row.schoolName}
                              </TableCell>

                              <TableCell align="center">
                                {row.schoolCity}
                              </TableCell>

                              <TableCell align="center">
                                {row.schoolState}
                              </TableCell>

                              <TableCell align="center">
                                {row.schoolContactPerson}
                              </TableCell>
                              <TableCell align="center">
                                {row.schoolContactPersonEmail}
                              </TableCell>
                              <TableCell align="center">
                                {row.schoolContactPersonPhone}
                              </TableCell>
                              <TableCell align="center">
                                {row.schoolContactPersonDegisnation}
                              </TableCell>

                              <TableCell align="center">
                                {row.salesPerson}
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
                              key={row.series}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell align="center">{row.DocNum}</TableCell>
                              <TableCell align="center">
                                {row.CANCELED}
                              </TableCell>
                              <TableCell align="center">
                                {row.DocDate}
                              </TableCell>
                              <TableCell align="center">
                                {row.CardCode}
                              </TableCell>

                              <TableCell align="center">
                                {row.CardName}
                              </TableCell>

                              <TableCell align="center">
                                {row.ItemCode}
                              </TableCell>

                              <TableCell align="center">
                                {row.Dscription}
                              </TableCell>

                              <TableCell align="center">
                                {row.Quantity}
                              </TableCell>
                              <TableCell align="center">{row.Price}</TableCell>
                              <TableCell align="center">
                                {row.LineTotal}
                              </TableCell>
                              <TableCell align="center">
                                {row.U_OrderType}
                              </TableCell>

                              <TableCell align="center">
                                {row.U_PpExamException}
                              </TableCell>

                              <TableCell align="center">
                                {row.U_PrDelvTerm}
                              </TableCell>

                              <TableCell align="center">
                                {row.U_PpDelvTerm}
                              </TableCell>

                              <TableCell align="center">
                                {row.U_PrExamExecpt}
                              </TableCell>
                              <TableCell align="center">
                                {row.U_PpServExcp}
                              </TableCell>
                              <TableCell align="center">
                                {row.U_PrServExcpt}
                              </TableCell>
                              <TableCell align="center">
                                {row.U_SCode}
                              </TableCell>

                              <TableCell align="center">
                                {row.schoolName}
                              </TableCell>

                              <TableCell align="center">
                                {row.schoolCity}
                              </TableCell>

                              <TableCell align="center">
                                {row.schoolState}
                              </TableCell>

                              <TableCell align="center">
                                {row.schoolContactPerson}
                              </TableCell>
                              <TableCell align="center">
                                {row.schoolContactPersonEmail}
                              </TableCell>
                              <TableCell align="center">
                                {row.schoolContactPersonPhone}
                              </TableCell>
                              <TableCell align="center">
                                {row.schoolContactPersonDegisnation}
                              </TableCell>

                              <TableCell align="center">
                                {row.salesPerson}
                              </TableCell>
                            </TableRow>
                          ))}
                      <TableRow></TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            ) : (
              ""
            )}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCkReport;
