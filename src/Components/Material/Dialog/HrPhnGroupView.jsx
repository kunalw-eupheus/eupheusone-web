import * as React from "react";
import {
  DialogTitle,
  Dialog,
  DialogContent,
  Backdrop,
  CircularProgress,
  Table,
  TableCell,
  TableBody,
  Slide,
  TableHead,
  TableRow,
  IconButton,
  Button,
} from "@mui/material";
import { useState } from "react";
import { Delete, Close } from "@mui/icons-material";
// import instance from "../../Instance";
import instance from "../../../Instance";
import Cookies from "js-cookie";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const HrPhnGroupView = React.forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  React.useImperativeHandle(ref, () => ({
    openDialog() {
      setOpen(true);
      // setTableData(props.data);
      // console.log(props.id, props.name);
      getPhoneListDetails(props.id);
    },
  }));

  const handlePopClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopClose = () => {
    setAnchorEl(null);
  };
  const openPop = Boolean(anchorEl);
  const id = openPop ? "simple-popover" : undefined;

  const getPhoneListDetails = async (id) => {
    // setLoading(true);
    console.log("id- ", id);
    const res = await instance({
      url: `/hr/get/getPhoneGroupList/detail/${id}`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    console.log(res);
    if (res.data.message.length === 0) return "emptyArr";

    let dataaaaArr = res.data.message[0].user_phone_groups;
    // console.log(dataaaaArr);
    if (res.data.status === "success") {
      let dataArr = [];
      let slNo = 1;
      for (let obj of dataaaaArr) {
        let fullName = `${
          obj.fk_user.first_name ? obj.fk_user.first_name : ""
        } ${obj.fk_user.middle_name ? obj.fk_user.middle_name : ""} ${
          obj.fk_user.last_name ? obj.fk_user.last_name : ""
        }`;
        // console.log(fullName);
        let tempObj = {
          name: fullName,
          emp_id: obj.fk_user.emp_id,
          id: obj.fk_user.id,
          phone: obj.fk_user.phone,
          email: obj.fk_user.email,
          sl: slNo,
          objId: obj.id,
        };
        dataArr.push(tempObj);
        slNo++;
      }
      // console.log(dataArr);
      setTableData(dataArr);
    }
    // console.log(res.data.message);
  };

  const handleClose = () => {
    setTableData([]);
    setOpen(false);
  };

  const handleDelete2 = async () => {
    console.log("delete");
  };

  const handleDelete = async (userid) => {
    let hndleData = props.handleData;
    let groupId = props.id;
    // alert(id);
    const res = await instance({
      url: `/hr/delete/phonegroup/user/${groupId}/${userid}`,
      method: "delete",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });

    // console.log("delete- ", res);
    if (res.data.status === "success") {
      // hndleData(res.data.message, "success", "success");
      let apiRes = await getPhoneListDetails(props.id);
      console.log(apiRes);
      if (apiRes === "emptyArr") {
        console.log("first");
        setTableData([]);
      }
      hndleData("Delete Success", "success", "success");
    } else {
      hndleData(res.data.message, "error", "error");
    }
  };

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        className="!w-[100vw] "
        maxWidth={"md"}
        fullWidth
      >
        <div className="flex justify-end !bg-[#e5e7eb]">
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </div>
        <DialogTitle className="!bg-[#e5e7eb] flex justify-between">
          <div></div>
          <div>{`Group Name: ${props.name}`}</div>
          <div></div>
        </DialogTitle>
        <DialogContent className="!bg-[#e5e7eb]  text-black">
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead className="bg-white">
              <TableRow>
                <TableCell className="!w-[5rem]" align="left">
                  <div className="font-black text-sm ">#</div>
                </TableCell>
                <TableCell className="!w-[13rem]" align="left">
                  <div className="font-black text-sm ">Id</div>
                </TableCell>
                <TableCell className="!w-[13rem]" align="left">
                  <div className="font-black text-sm ">Name</div>
                </TableCell>
                <TableCell className="!w-[13rem]" align="left">
                  <div className="font-black text-sm ">Phone</div>
                </TableCell>
                <TableCell className="!w-[13rem]" align="left">
                  <div className="font-black text-sm ">Email</div>
                </TableCell>
                <TableCell className="!w-[8rem]" align="left">
                  <div className="font-black text-sm ">Delete</div>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="bg-white">
              {tableData.map((itm) => (
                <TableRow key={itm.id}>
                  <TableCell align="left">{itm.sl}</TableCell>
                  <TableCell align="left">{itm.emp_id}</TableCell>
                  <TableCell align="left">{itm.name}</TableCell>
                  <TableCell align="left">{itm.phone}</TableCell>
                  <TableCell align="left">{itm.email}</TableCell>
                  <TableCell align="left">
                    <IconButton
                      style={{ color: "#FF0060" }}
                      // onClick={() => handleDelete2(itm.objId)}
                      onClick={handlePopClick}
                    >
                      <Delete />
                    </IconButton>
                    <Popover
                      id={id}
                      open={openPop}
                      anchorEl={anchorEl}
                      onClose={handlePopClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                    >
                      <Typography sx={{ p: 2 }}>
                        <div>
                          {`Delete this user?`}
                          <div className="flex">
                            <Button
                              variant="contained"
                              size="small"
                              className="!bg-[#0079FF]"
                            >
                              Yes
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              className="!ml-3 !bg-[#FF0060]"
                            >
                              No
                            </Button>
                          </div>
                        </div>
                      </Typography>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </div>
  );
});

export default HrPhnGroupView;
