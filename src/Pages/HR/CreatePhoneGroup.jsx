import React from "react";
import Sidebar from "../../Components/Sidebar7";
import { useState } from "react";
import { useRef } from "react";
import SwipeableTemporaryDrawer from "../../Components/Material/MaterialSidebar7";
import Navbar from "../../Components/Navbar";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import BasicButton from "../../Components/Material/Button";
import instance from "../../Instance";
import Cookies from "js-cookie";
import Snackbars from "../../Components/Material/SnackBar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TablePagination from "@mui/material/TablePagination";
import { Backdrop, CircularProgress, Toolbar } from "@mui/material";
import DialogSlide2 from "../../Components/Material/Dialog17";

const CreatePhoneGroup = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [first_name, setfirstname] = useState("");
  const [middle_name, setmiddlename] = useState("");
  const [last_name, setlastname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [emp_id, setemp_id] = useState("");
  const [snackbarErrStatus, setSnackbarErrStatus] = useState(true);
  const [errMessage, setErrMessage] = useState("");
  const [page, setPage] = useState(0);
  const [highLight, setHighLight] = useState("aof");
  const [loading, setLoading] = useState(false);
  const [stateAndCity, setStateAndCity] = useState({ state: "", city: "" });
  const [searchRow, setSearchRow] = useState([]);

  const [states, setStates] = useState([]);
  const [city, setCity] = useState({ disable: true });
  const [rowdata, setRowdata] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [hideVerfyBtn, setHideVerifyBtn] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [aofId, setAofId] = useState("");

  const snackbarRef = useRef();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getPhoneList = async () => {
    setLoading(true);
    const res = await instance({
      url: `/hr/get/getPhoneGroupList`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    // console.log(res.data.message);
    let data = res.data.message;
    let num = 1;
    for (let obj of data) {
      obj.sl = num;
      num++;
    }
    // console.log(data);
    setRowdata(data);
    setLoading(false);
  };

  const handleSearch = (val) => {
    // console.log(val);
    setSearchVal(val.trim());
  };

  const show = null;
  const sidebarRef = useRef();

  const handleSidebarCollapsed = () => {
    // setSidebarCollapsed(!sidebarCollapsed);
    sidebarRef.current.openSidebar();
  };

  const navInfo = {
    title: "HR",
    details: ["Group", " / Create Group"],
  };

  const filterTable = () => {
    // console.log(searchVal);
    // console.log(rowdata)
    setPage(0);
    let tempArr = [];
    for (let ele of rowdata) {
      let Name = ele.name.toLowerCase();
      //   let phone = ele.phone;
      //   let schlName = ele.school.toLowerCase();
      //   let email = ele.email.toLowerCase();
      if (Name.indexOf(searchVal.toLowerCase()) > -1) {
        tempArr.push(ele);
      }
    }
    setSearchRow([]);
    if (tempArr.length === 0) {
      //   alert("No data Found");
      setSnackbarErrStatus(true);
      setErrMessage("No data Found");
      snackbarRef.current.openSnackbar();
    } else {
      setSearchRow(tempArr);
    }
  };

  useEffect(() => {
    getPhoneList();
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

  const openDialogue = () => {
    console.log("first");
    dialogRef2.current.openDialog();
  };

  const dialogRef2 = useRef();

  return (
    <>
      <div className="flex w-[100%] min-h-[100vh]">
        <div>
          <Sidebar
            highLight={"phone"}
            sidebarCollapsed={sidebarCollapsed}
            show={show}
          />
        </div>
        <div>
          <SwipeableTemporaryDrawer
            ref={sidebarRef}
            sidebarCollapsed={sidebarCollapsed}
            show={show}
            highLight={"phone"}
          />
        </div>
        <DialogSlide2
          ref={dialogRef2}
          //   aofId={aofId}
          //   handleData={"handleData"}
        />
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
          <div className="min-h-[100vh] pt-[2vh] max-h-full bg-[#141728]">
            <div className=" sm:px-8 bg-[#141728] flex justify-end py-3 mr-10">
              <a className="px-2" onClick={() => openDialogue()}>
                <BasicButton text={"Create New Group"} />
              </a>
            </div>
            <div className="flex justify-around">
              <div className="w-[85%]">
                <Paper className="mt-5">
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
                          <TableCell className="!w-[5rem]" align="center">
                            Sl No
                          </TableCell>
                          <TableCell className="!w-[13rem]" align="center">
                            Name
                          </TableCell>
                          <TableCell className="!w-[13rem]" align="center">
                            Action
                          </TableCell>
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
                                <TableCell align="center">{row.sl}</TableCell>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">{""}</TableCell>
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
                                <TableCell align="center">{row.sl}</TableCell>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">{""}</TableCell>
                              </TableRow>
                            ))}
                        <TableRow></TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div>
      </div> */}
    </>
  );
};

export default CreatePhoneGroup;
