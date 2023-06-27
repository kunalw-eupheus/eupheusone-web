import React from "react";
import Sidebar from "../../Components/Sidebar7";
import { useState } from "react";
import { useRef } from "react";
import SwipeableTemporaryDrawer from "../../Components/Material/MaterialSidebar7";
import { useEffect } from "react";
import instance from "../../Instance";
import Cookies from "js-cookie";
import Snackbars from "../../Components/Material/SnackBar";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  TextField,
  IconButton,
  Backdrop,
  Button,
  CircularProgress,
  Toolbar,
} from "@mui/material";
import { PersonAddAlt, Delete, Preview, AddBox } from "@mui/icons-material";
// import HrViewPhnGroup from "../../Components/Material/Dialog/HrViewPhnGroup";
import HrPhnGroupView from "../../Components/Material/Dialog/HrPhnGroupView";
import Navbar2 from "../../Components/Navbar2";
import HrPhnGroupCreate from "../../Components/Material/Dialog/HrPhnGroupCreate";
import HrPhnGroupUpdate from "../../Components/Material/Dialog/HrPhnGroupUpdate";
import HrConfirm from "../../Components/Material/Dialog/HrConfirm";

const PhoneGroup = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [snackbarErrStatus, setSnackbarErrStatus] = useState(true);
  const [errMessage, setErrMessage] = useState("");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchRow, setSearchRow] = useState([]);
  const [rowdata, setRowdata] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [nameToSend, setNameToSend] = useState("");
  const [idToSend, setIdToSend] = useState("");
  const [nameToSend1, setNameToSend1] = useState("");
  const [idToSend1, setIdToSend1] = useState("");
  const [nameToSend2, setNameToSend2] = useState("");
  const [toDelGrpId, setToDelGrpId] = useState("");

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

  const show = null;
  const sidebarRef = useRef();

  const handleSidebarCollapsed = () => {
    sidebarRef.current.openSidebar();
  };

  const navInfo = {
    title: "HR",
    details: ["Group", " "],
  };

  const filterTable = (searchVa) => {
    setPage(0);
    let tempArr = [];
    for (let ele of rowdata) {
      let Name = ele.name.toLowerCase();
      if (Name.indexOf(searchVa.toLowerCase()) > -1) {
        tempArr.push(ele);
      }
    }
    setSearchRow([]);
    if (tempArr.length === 0) {
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

  const openDialogue4 = (data) => {
    setNameToSend2(data.name);
    setToDelGrpId(data.id);
    setLoading(true);
    setTimeout(() => {
      dialogRef4.current.openDialog();
      setLoading(false);
    }, 1000);
  };
  const dialogRef4 = useRef();

  const openDialogue3 = (data) => {
    setNameToSend1(data.name);
    setIdToSend1(data.id);
    setLoading(true);
    setTimeout(() => {
      dialogRef3.current.openDialog();
      setLoading(false);
    }, 1000);
  };
  const dialogRef3 = useRef();

  const openDialogue2 = () => {
    dialogRef2.current.openDialog();
  };
  const dialogRef2 = useRef();

  const openDialogue = (data) => {
    setNameToSend(data.name);
    setIdToSend(data.id);
    setLoading(true);
    setTimeout(() => {
      dialogRef.current.openDialog();
      setLoading(false);
    }, 1000);
  };
  const dialogRef = useRef();

  const handleData = (value, id, type) => {
    switch (type) {
      case "missinGrpName":
        setSnackbarErrStatus(true);
        setErrMessage(value);
        snackbarRef.current.openSnackbar();
        break;
      case "missinEmployee":
        setSnackbarErrStatus(true);
        setErrMessage(value);
        snackbarRef.current.openSnackbar();
        break;
      case "success":
        setSnackbarErrStatus(false);
        setErrMessage(value);
        snackbarRef.current.openSnackbar();
        break;
      case "error":
        setSnackbarErrStatus(true);
        setErrMessage(value);
        snackbarRef.current.openSnackbar();
        break;
      case "reload":
        getPhoneList();
        break;
    }
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
        <HrPhnGroupCreate
          ref={dialogRef2}
          //   aofId={aofId}
          handleData={handleData}
        />

        <HrPhnGroupView
          ref={dialogRef}
          name={nameToSend}
          id={idToSend}
          handleData={handleData}
        />
        <HrPhnGroupUpdate
          ref={dialogRef3}
          name={nameToSend1}
          id={idToSend1}
          handleData={handleData}
        />

        <HrConfirm
          ref={dialogRef4}
          handleData={handleData}
          id={toDelGrpId}
          name={nameToSend2}
          label={"DeleteGroup"}
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
          <Navbar2
            handleSidebarCollapsed={handleSidebarCollapsed}
            info={navInfo}
          />
          <div className="min-h-[100vh] pt-[2vh] max-h-full bg-[#e5e7eb]">
            <div className=" sm:px-8 bg-[#e5e7eb] flex justify-end py-3">
              <div className="text-gray-400 flex">
                <a className=" flex" onClick={() => openDialogue2()}>
                  <Button className=" !font-bold !bg-[#0079FF] !text-white">
                    <PersonAddAlt className="mr-2 text-white" />
                    {"Create New Group"}
                  </Button>
                </a>
              </div>
            </div>
            <div className="flex justify-around">
              <div className="w-[94%]">
                {/* <Paper className="mt-5"> */}
                <TableContainer component={Paper}>
                  <Toolbar className="bg-slate-100 flex justify-between">
                    <div className="flex bg-white ">
                      <TextField
                        // sx={{ border: "orange 2px" }}
                        id="validation-outlined-input"
                        className="text "
                        // onInput={(e) => {
                        //   handleSearch(e.target.value);
                        // }}
                        onChange={(e) => {
                          filterTable(e.target.value);
                        }}
                        // label="Search....."
                        variant="outlined"
                        placeholder="Search..."
                        size="small"
                      />
                      {/* <div className="bg-slate-300">
                        <IconButton
                          type="submit"
                          aria-label="search"
                          onClick={filterTable}
                        >
                          <Search style={{ fill: "blue" }} />
                        </IconButton>
                      </div> */}
                    </div>

                    <div>
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
                    </div>
                  </Toolbar>

                  <Table
                    sx={{ minWidth: 650 }}
                    size="small"
                    aria-label="a dense table"
                  >
                    <TableHead className="">
                      <TableRow className="">
                        <TableCell className="!w-[20rem]" align="left">
                          <div className="font-black text-sm ">#</div>
                        </TableCell>
                        <TableCell className="!w-[25rem]" align="left">
                          <div className="text-md !font-extrabold">
                            Group Name
                          </div>
                        </TableCell>
                        <TableCell className="!w-[13rem] " align="left">
                          <div className="font-black text-sm">View</div>
                        </TableCell>
                        <TableCell className="!w-[13rem] " align="left">
                          <div className="font-black text-sm">Update</div>
                        </TableCell>
                        <TableCell className="!w-[13rem] " align="left">
                          <div className="font-black text-sm">Delete</div>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className="">
                      {searchRow.length === 0
                        ? (rowsPerPage > 0
                            ? rowdata.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                            : rowdata
                          ).map((row) => (
                            <TableRow
                              key={row.id}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell align="left">{row.sl}</TableCell>
                              <TableCell align="left">{row.name}</TableCell>
                              <TableCell align="left">
                                {/* <div className="">
                                  <Button
                                    size="small"
                                    variant="contained"
                                    className=" !font-bold h-6"
                                    onClick={() => openDialogue(row.name)}
                                  >
                                    View
                                  </Button>
                                </div> */}
                                <IconButton
                                  style={{ color: "#0079FF" }}
                                  onClick={() => openDialogue(row)}
                                  className="h-6"
                                >
                                  <Preview />
                                </IconButton>
                              </TableCell>
                              <TableCell align="left">
                                {/* <div className="">
                                  <Button
                                    size="small"
                                    variant="contained"
                                    className="!font-bold h-6"
                                    onClick={() => openDialogue3(row.name)}
                                  >
                                    Add
                                  </Button>
                                </div> */}
                                <IconButton
                                  style={{ color: "#10b981" }}
                                  onClick={() => openDialogue3(row)}
                                  className="h-6"
                                >
                                  <AddBox />
                                </IconButton>
                              </TableCell>
                              <TableCell align="left">
                                <IconButton
                                  style={{ color: "#FF0060" }}
                                  onClick={() => openDialogue4(row)}
                                  className="h-6"
                                >
                                  <Delete
                                  // style={{ color: "red" }}
                                  // className="cursor-pointer hover:bg-slate-200"
                                  />
                                </IconButton>
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
                              key={row.id}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell align="left">{row.sl}</TableCell>
                              <TableCell align="left">{row.name}</TableCell>
                              <TableCell align="left">
                                {/* <div className="">
                                  <Button
                                    size="small"
                                    variant="contained"
                                    className="!font-bold h-6"
                                    onClick={() => openDialogue(row.name)}
                                  >
                                    View
                                  </Button>
                                </div> */}
                                <IconButton
                                  style={{ color: "#0079FF" }}
                                  onClick={() => openDialogue(row)}
                                  className="h-6"
                                >
                                  <Preview />
                                </IconButton>
                              </TableCell>
                              <TableCell align="left">
                                {/* <div className="">
                                  <Button
                                    size="small"
                                    variant="contained"
                                    className="!font-bold h-6"
                                    onClick={() => openDialogue3(row.name)}
                                  >
                                    Add
                                  </Button>
                                </div> */}
                                <IconButton
                                  style={{ color: "#10b981" }}
                                  onClick={() => openDialogue3(row)}
                                  className="h-6"
                                >
                                  <AddBox />
                                </IconButton>
                              </TableCell>
                              <TableCell align="left">
                                <IconButton
                                  style={{ color: "#FF0060" }}
                                  onClick={() => openDialogue4(row)}
                                  className="h-6"
                                >
                                  <Delete />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                {/* </Paper> */}
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

export default PhoneGroup;
