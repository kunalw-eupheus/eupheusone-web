import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import SearchDropDown from "../Components/SearchDropDown";
import SwipeableTemporaryDrawer from "../Components/Material/MaterialSidebar";
import instance from "../Instance";
import Cookies from "js-cookie";
import BasicButton from "../Components/Material/Button";
import { Backdrop, CircularProgress, TableFooter } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";

const ViewInvoiceSingle = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [highLight, setHighLight] = useState("printpdf");
  const [loading, setLoading] = useState(false);
  const [stateId, setStateId] = useState("");
  const [type, setType] = useState("");
  const sidebarRef = useRef();
  const [customer, setCustomer] = useState([]);
  const [schoolRow, setSchoolRow] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [bpCode, setBpCode] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const [filterArr, setFilterArr] = useState([]);
  // const [isPending, startTransition] = useTransition();
  const [finYear, setFinYear] = useState({
    start: "2023-04-01",
    end: "2024-03-31",
  });
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const changeYear = (year) => {
    console.log(year);
    let newYear = {
      start: year.start,
      end: year.end,
    };
    setFinYear(newYear);
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

  const handleSearch = (val) => {
    const arr = [];
    schoolRow.map((row) => {
      if (
        row?.inv_no?.toString().toLowerCase().indexOf(val) > -1 ||
        row?.docnum?.toString().toLowerCase().indexOf(val) > -1 ||
        row?.docdate?.toString().toLowerCase().indexOf(val) > -1 ||
        row?.doctotal?.toString().toLowerCase().indexOf(val) > -1 ||
        row?.so_no?.toString().toLowerCase().indexOf(val) > -1
      ) {
        arr.push(row);
      }
    });
    // return arr;
    setFilterArr(arr);
  };

  const getCustomers = async () => {
    const res = await instance({
      url: "sales_data/get_all_bps",
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    setCustomer(res.data.message);
  };

  const handleOrderProcessingForm = async (value, type) => {
    switch (type) {
      case "select_state":
        setStateId(value.id);

        break;
      case "select_state_training":
        setStateId(value.id);

        break;
      case "invoice_pdf_data":
        setBpCode(value.bp_code);

        break;
      case "select_type":
        setType(value.types);
        break;
      default:
        break;
    }
  };

  const searchPDF = async () => {
    const res = await instance({
      url: `doc_print/invoive/list`,
      method: "POST",
      data: {
        bpCode,
        startDate: finYear.start,
        endDate: finYear.end,
      },
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    if (res.data.message.length === 0) {
      alert("No Data Available");
    }
    setSearchVal("");
    setSchoolRow(res.data.message);
    setPage(0);
  };

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
          changeYear={changeYear}
          defaultYear={"FY 2023-24"}
        />
        <div className="min-h-[100vh] pt-[2vh] max-h-full bg-[#141728]">
          <div className=" sm:px-8 px-2 py-3 bg-[#141728]">
            <div className="grid grid-cols-2 grid-rows-2 md:flex md:justify-around md:items-center px-6 mb-8 py-3 mt-6 gap-6 rounded-md bg-slate-600">
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

              <div className="sm:w-auto w-[50vw]" onClick={searchPDF}>
                <BasicButton text={"Search Customer"} />
              </div>
            </div>
            <div className="w-full flex justify-end pr-8">
              <input
                className="px-8 md:w-[15vw] w-[30vw] lg:w-40 focus:outline-0 hover:shadow-md transition-all duration-200 ease-linear py-1 lg:py-2 placeholder:text-gray-800 rounded-lg"
                placeholder="Search"
                type="text"
                value={searchVal}
                onChange={(e) => {
                  setSearchVal(e.target.value);
                  handleSearch(e.target.value.toLowerCase());
                }}
              />
            </div>

            <div className=" sm:px-8 px-2 py-3 bg-[#141728] mt-4">
              <Paper>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="customized table">
                    <TableHead className="bg-slate-500">
                      <TableRow>
                        <TableCell
                          className="!w-[13rem] !text-gray-200 !font-semibold !sm:text-lg !text-sm"
                          align="center"
                        >
                          S O Num
                        </TableCell>
                        <TableCell
                          className="!w-[13rem] !text-gray-200 !font-semibold !sm:text-lg !text-sm"
                          align="center"
                        >
                          Invoice No
                        </TableCell>
                        <TableCell
                          className="!w-[13rem] !text-gray-200 !font-semibold !sm:text-lg !text-sm"
                          align="center"
                        >
                          Doc Date
                        </TableCell>
                        <TableCell
                          className="!w-[13rem] !text-gray-200 !font-semibold !sm:text-lg !text-sm"
                          align="center"
                        >
                          Doc Total
                        </TableCell>

                        <TableCell
                          className="!w-[10rem]"
                          align="center"
                        ></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className="bg-slate-200">
                      {(rowsPerPage > 0
                        ? searchVal
                          ? filterArr
                          : schoolRow.slice(
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
                            {row?.so_no ? row?.so_no : "NA"}
                          </TableCell>

                          <TableCell align="center" component="th" scope="row">
                            {row.inv_no == "N/A" || !row.inv_no
                              ? row.docnum
                              : row.inv_no}
                          </TableCell>
                          <TableCell align="center">{row.docdate}</TableCell>
                          <TableCell align="center">{row.doctotal}</TableCell>

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
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TablePagination
                          rowsPerPageOptions={[
                            10,
                            50,
                            100,
                            { label: "All", value: -1 },
                          ]}
                          colSpan={3}
                          count={
                            searchVal ? filterArr.length : schoolRow.length
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
                      </TableRow>
                    </TableFooter>
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

export default ViewInvoiceSingle;
