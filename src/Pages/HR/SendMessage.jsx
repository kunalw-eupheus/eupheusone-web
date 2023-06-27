import Sidebar from "../../Components/Sidebar7";
import { useState, useRef, React } from "react";
import SwipeableTemporaryDrawer from "../../Components/Material/MaterialSidebar7";
import { useEffect } from "react";
import instance from "../../Instance";
import Cookies from "js-cookie";
import Snackbars from "../../Components/Material/SnackBar";
import {
  TextField,
  IconButton,
  Backdrop,
  Toolbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";
import { PersonAddAlt, Send } from "@mui/icons-material";
import Navbar2 from "../../Components/Navbar2";
import HrMsgGroupCreate from "../../Components/Material/Dialog/HrMsgGroupCreate";
import HrConfirm from "../../Components/Material/Dialog/HrConfirm";

const SendMessage2 = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [snackbarErrStatus, setSnackbarErrStatus] = useState(true);
  const [errMessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchRow, setSearchRow] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [rowdata, setRowdata] = useState([]);
  const [msgSendId, setMsgSendId] = useState("");
  const [tempId, setTempId] = useState("");

  const snackbarRef = useRef();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filterTable = (searchVa) => {
    setPage(0);
    let tempArr = [];
    for (let ele of rowdata) {
      let Name = ele.name.toLowerCase();
      let empId = "";
      if (ele.emp_id) {
        empId = ele.emp_id.toLowerCase();
      }
      let phone = "";
      if (ele.phone) {
        phone = ele.phone;
      }
      if (
        Name.indexOf(searchVa.toLowerCase()) > -1 ||
        empId.indexOf(searchVa.toLowerCase()) > -1 ||
        phone.indexOf(searchVa.toLowerCase()) > -1
      ) {
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

  const handleData = (value, id, type) => {
    switch (type) {
      case "fname":
        setSnackbarErrStatus(true);
        setErrMessage(value);
        snackbarRef.current.openSnackbar();
        break;
      case "phone":
        setSnackbarErrStatus(true);
        setErrMessage(value);
        snackbarRef.current.openSnackbar();
        break;
      case "vphone":
        setSnackbarErrStatus(true);
        setErrMessage(value);
        snackbarRef.current.openSnackbar();
        break;
      case "email":
        setSnackbarErrStatus(true);
        setErrMessage(value);
        snackbarRef.current.openSnackbar();
        break;
      case "vemail":
        setSnackbarErrStatus(true);
        setErrMessage(value);
        snackbarRef.current.openSnackbar();
        break;
      case "empid":
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
        getTableData();
        break;
    }
  };

  const show = null;
  const sidebarRef = useRef();

  const handleSidebarCollapsed = () => {
    sidebarRef.current.openSidebar();
  };

  const navInfo = {
    title: "HR",
    details: ["Message", ""],
  };

  useEffect(() => {
    getTableData();
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

  const getTableData = async () => {
    setLoading(true);
    const res = await instance({
      url: `hr/get/smslist`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
        // accesskey: `auth74961a98ba76d4e4`,
      },
    });

    if (res.data.status === "success") {
      let dataArr = [];
      let slNo = 1;
      for (let obj of res.data.message) {
        obj.sl = slNo;
        dataArr.push(obj);
        console.log(obj);
        slNo++;
      }
      setRowdata(res.data.message);
    } else {
      setSnackbarErrStatus(true);
      setErrMessage(res.data.message);
      snackbarRef.current.openSnackbar();
    }
    setLoading(false);
  };

  const openDialogue = () => {
    dialogRefHrMsg.current.openDialog();
  };
  const dialogRefHrMsg = useRef();

  const openDialogue1 = (data) => {
    setMsgSendId(data.id);
    setTempId(data.fk_sms_template.id);
    setLoading(true);
    setTimeout(() => {
      dialogRef1.current.openDialog();
      setLoading(false);
    }, 1000);
  };
  const dialogRef1 = useRef();

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
            highLight={"message"}
            sidebarCollapsed={sidebarCollapsed}
            show={show}
          />
        </div>
        <div>
          <SwipeableTemporaryDrawer
            ref={sidebarRef}
            sidebarCollapsed={sidebarCollapsed}
            show={show}
            highLight={"message"}
          />
        </div>
        <HrConfirm
          ref={dialogRef1}
          handleData={handleData}
          label={"sendMessage"}
          msgSendId={msgSendId}
          tempId={tempId}
        />
        <HrMsgGroupCreate ref={dialogRefHrMsg} />
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
                <a className=" flex" onClick={() => openDialogue()}>
                  <Button className=" !font-bold !bg-[#0079FF] !text-white">
                    <PersonAddAlt className="mr-2 text-white" />
                    {"Create New Meeting"}
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
                        <TableCell className="!w-[13rem]" align="left">
                          <div className="font-black text-sm ">#</div>
                        </TableCell>
                        <TableCell className="!w-[13rem]" align="left">
                          <div className="text-md !font-extrabold">Name</div>
                        </TableCell>
                        <TableCell className="!w-[13rem] " align="left">
                          <div className="font-black text-sm">Group</div>
                        </TableCell>
                        <TableCell className="!w-[20rem] " align="left">
                          <div className="font-black text-sm">Template</div>
                        </TableCell>
                        <TableCell className="!w-[13rem] " align="left">
                          <div className="font-black text-sm">Send</div>
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
                              <TableCell align="left">{row?.sl}</TableCell>
                              <TableCell align="left">{row?.name}</TableCell>
                              <TableCell align="left">{row?.sendto}</TableCell>
                              <TableCell align="left">
                                {row?.fk_sms_template?.name}
                              </TableCell>
                              <TableCell align="left">
                                <IconButton
                                  style={{ color: "#10b981" }}
                                  onClick={() => openDialogue1(row)}
                                  className="h-6"
                                >
                                  <Send />
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
                              <TableCell align="left">{row?.sl}</TableCell>
                              <TableCell align="left">{row?.name}</TableCell>
                              <TableCell align="left">{row?.sendto}</TableCell>
                              <TableCell align="left">
                                {row?.fk_sms_template?.name}
                              </TableCell>
                              <TableCell align="left">
                                {row.status === false ? (
                                  <IconButton
                                    style={{ color: "#10b981" }}
                                    onClick={() => openDialogue1(row)}
                                    className="h-6"
                                  >
                                    <Send />
                                  </IconButton>
                                ) : (
                                  ""
                                )}
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
    </>
  );
};

export default SendMessage2;
