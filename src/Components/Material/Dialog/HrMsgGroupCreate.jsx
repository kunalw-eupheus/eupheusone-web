import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import instance from "../../../Instance";
import { useState } from "react";
import Cookies from "js-cookie";
import { Backdrop, CircularProgress } from "@mui/material";
import { TextField } from "@mui/material";
import SearchDropDown3 from "../../SearchDropDown3";
import DatePicker from "../Date";
import TimePicker from "../Time";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const HrMsgGroupCreate = React.forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);
  const [grpname, setGrpName] = useState("");
  const [loading, setLoading] = useState(false);
  const [tmpltMsgShow, setTmpltMsgShow] = useState(null);
  const [messageGroup, setMessageGroup] = useState([]);
  const [phoneGroup, setPhoneGroup] = useState([]);
  const [disableMsg, setDisableMsg] = useState(true);
  const [newUrl, setNewUrl] = useState("");
  const [urlfldDis, setUrlfldDis] = useState(false);
  const [disDate, setDisDate] = useState(false);
  const [disTime, setDisTime] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showGrpNmeError, setShowGrpNmeError] = useState(false);
  const [grpIdEr, setGrpIdEr] = useState(false);
  const [urlEr, setUrlEr] = useState(false);
  const [msgTmplEr, setMsgTmplEr] = useState(false);
  const [groupId, setGroupId] = useState(null);

  React.useImperativeHandle(ref, () => ({
    openDialog() {
      setOpen(true);
      getGroupList();
      getMessageList();
    },
  }));

  const handleClose = () => {
    setTmpltMsgShow(null);
    setGroupId(null);
    setNewUrl("");
    setGrpName("");
    setDisableMsg(true);
    setUrlfldDis(false);
    setDisDate(false);
    setDisTime(false);
    setOpen(false);
  };

  const URLify = (string) => {
    const urls = string.match(
      /((((ftp|https?):\/\/)|(w{3}\.))[\-\w@:%_\+.~#?,&\/\/=]+)/g
    );
    if (urls) {
      urls.forEach(function (url) {
        string = string.replace(
          url,
          '<a target="_blank" href="' + url + '">' + url + "</a>"
        );
      });
    }
    return string.replace("(", "<br/>(");
  };

  const getGroupList = async () => {
    setLoading(true);
    const res = await instance({
      url: `/hr/get/getPhoneGroupList`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    let data = res.data.message;
    // console.log(data);
    let dataArr = [];
    for (let obj of data) {
      let tempObj = { name: obj.name, val: obj.id };
      dataArr.push(tempObj);
    }
    // console.log(dataArr);
    setPhoneGroup(dataArr);
    setLoading(false);
  };

  const getMessageList = async () => {
    setLoading(true);
    const res = await instance({
      url: `/hr/get/message_template`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    let data = res.data.message;
    // console.log(data);
    let dataArr = [];
    for (let obj of data) {
      let tempObj = { name: obj.name, val: [obj.template, obj.id] };
      dataArr.push(tempObj);
    }
    // console.log(dataArr);
    setMessageGroup(dataArr);
    setLoading(false);
  };

  const handleValue = (value, name) => {
    // console.log(value, name);
    if (name === "HRMessageTemplate") {
      setUrlfldDis(true);
      setDisDate(true);
      setDisTime(true);
      // console.log(time.getMinutes());
      // let reqTime = `${time.$H}:${time.$m}`;

      let reqT = `${time.$H ? time.$H : time.getHours()}:${
        time.$m ? time.$m : time.getMinutes()
      }`;
      // console.log(reqT);
      const [hourString, minute] = reqT.split(":");
      // console.log(hourString, minute);
      const hour = +hourString % 24;
      let hr = hour % 12 || 12;
      if (hr < 10) hr = "0" + hr;
      let min = minute;
      if (min < 10) min = "0" + min;
      let reqTime = hr + ":" + min + (hour < 12 ? " AM" : " PM");

      // console.log(reqTime);

      let reqDate = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;
      // console.log(reqDate);
      let dateTime = `${reqDate}, ${reqTime}`;
      let msgStr = value[0];
      let newMsg = msgStr.replace("[URL]", newUrl);
      newMsg = newMsg.replace("[date time]", dateTime);
      setTmpltMsgShow(newMsg);
    }
    if (name === "HRGroupSelect") {
      setGroupId(value);
    }
    // console.log(value, name);
  };

  const handleName = (value) => {
    // console.log(value);
    setGrpName(value);
  };

  const handleUrl = (value) => {
    let resUrl = value.match(
      // /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
      /((((ftp|https?):\/\/)|(w{3}\.))[\-\w@:%_\+.~#?,&\/\/=]+)/g
    );
    // console.log(resUrl);
    if (resUrl !== null) {
      setDisableMsg(false);
    } else {
      setDisableMsg(true);
    }
    setNewUrl(value);
  };

  const handleOrderProcessingForm = (value, name) => {
    // console.log(value, name);
    // console.log(date);
    // console.log(time);
    if (name === "hrMsgDate") {
      setDate(value);
    }
    if (name === "hrMsgTime") {
      setTime(value);
    }
  };

  const postData = () => {
    if (!grpname || grpname.length === 0) {
      setShowGrpNmeError(true);
      setTimeout(() => {
        setShowGrpNmeError(false);
      }, 3000);
      return;
    }

    if (!groupId || groupId.length === 0) {
      setGrpIdEr(true);
      setTimeout(() => {
        setGrpIdEr(false);
      }, 3000);
      return;
    }

    if (!newUrl || newUrl.length === 0) {
      setUrlEr(true);
      setTimeout(() => {
        setUrlEr(false);
      }, 3000);
      return;
    }

    if (!groupId || groupId.length === 0) {
      setGrpIdEr(true);
      setTimeout(() => {
        setGrpIdEr(false);
      }, 3000);
      return;
    }

    if (!tmpltMsgShow) {
      setMsgTmplEr(true);
      setTimeout(() => {
        setMsgTmplEr(false);
      }, 3000);
      return;
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
        className="!w-[100vw]"
        maxWidth={"sm"}
        fullWidth
      >
        <DialogContent className=" !bg-[#e5e7eb] text-black">
          <div className="">
            <div className="flex justify-between gap-6 p-5 ">
              <div className="w-full">
                <TextField
                  id="standard-basic"
                  label="Enter Name *"
                  variant="standard"
                  className="w-full"
                  value={grpname}
                  inputProps={{
                    style: { color: "black", fontWeight: "bold" },
                    sx: { color: "black" },
                  }}
                  InputLabelProps={{
                    style: { color: "black", fontWeight: "bold" },
                  }}
                  onChange={(e) => handleName(e.target.value)}
                  // error={showGrpNmeError}
                />
                {showGrpNmeError ? (
                  <div className="text-red-600 text-xs pt-1">
                    Name is Required
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="w-full">
                <SearchDropDown3
                  Name={"HRGroupSelect"}
                  color="black"
                  label="Select Group *"
                  className=" "
                  data={phoneGroup}
                  handleValue={handleValue}
                  variant={"standard"}
                  fontWeight="bold"
                  // disabled={disableMsg}
                  inValue={groupId}
                />
                {grpIdEr ? (
                  <div className="text-red-600 text-xs pt-1">
                    Group is Required
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          {/* <div className="px-5">
            <TextField
              id="standard-basic"
              label="Enter URL *"
              variant="standard"
              // type="number"
              // value={emp_id}
              inputProps={{
                style: { color: "black", fontWeight: "bold" },
                sx: { color: "black" },
              }}
              InputLabelProps={{
                style: { color: "black", fontWeight: "bold" },
              }}
              onChange={(e) => handleUrl(e.target.value)}
              className="w-full"
              // error={mandateErrorEmpId}
            />
          </div> */}

          {/* <div className="p-5">
            <SearchDropDown3
              Name={"HRMessageTemplate"}
              color="black"
              label="Select Message"
              className=" "
              data={messageGroup}
              handleValue={handleValue}
              variant={"standard"}
              fontWeight="bold"
            />
          </div> */}
          <div className="flex justify-between gap-6 px-5 pt-2">
            <div className="w-full">
              <div className="">Select Date</div>
              <DatePicker
                name={"hrMsgDate"}
                color={"black"}
                disabled={disDate}
                // label={"Select Date"}
                handleOrderProcessingForm={handleOrderProcessingForm}
              />
            </div>
            <div className="w-full">
              <div className="">Select Time</div>
              <TimePicker
                color={"black"}
                name={"hrMsgTime"}
                disabled={disTime}
                handleOrderProcessingForm={handleOrderProcessingForm}
              />
            </div>
          </div>
          <div className="flex justify-between gap-6 px-5 pt-5">
            <div className="w-full">
              <TextField
                id="standard-basic"
                label="Enter URL *"
                variant="standard"
                // type="number"
                value={newUrl}
                inputProps={{
                  style: { color: "black", fontWeight: "bold" },
                  sx: { color: "black" },
                }}
                InputLabelProps={{
                  style: { color: "black", fontWeight: "bold" },
                }}
                onChange={(e) => handleUrl(e.target.value)}
                className="w-full"
                disabled={urlfldDis}
                // error={!disableMsg}
              />
              {disableMsg && newUrl.length !== 0 ? (
                <div className="text-red-600 text-xs pt-1">
                  Enter a valid URL
                </div>
              ) : (
                ""
              )}
              {urlEr ? (
                <div className="text-red-600 text-xs pt-1">Url is required</div>
              ) : (
                ""
              )}
            </div>
            <div className="w-full">
              <SearchDropDown3
                Name={"HRMessageTemplate"}
                color="black"
                label="Select Message *"
                className=" "
                data={messageGroup}
                handleValue={handleValue}
                variant={"standard"}
                fontWeight="bold"
                disabled={disableMsg}
                inValue={tmpltMsgShow}
              />
              {msgTmplEr ? (
                <div className="text-red-600 text-xs pt-1">
                  Message is required
                </div>
              ) : (
                ""
              )}
            </div>
          </div>

          {tmpltMsgShow ? (
            <div className="px-5 pt-5">
              <div className="">Message</div>
              <TextField
                className="!w-full"
                value={tmpltMsgShow}
                // color="primary"
                id="outlined-multiline-static"
                inputProps={{
                  style: { color: "black", fontWeight: "bold" },
                  sx: { color: "black" },
                }}
                InputLabelProps={{
                  style: { color: "black", fontWeight: "bold" },
                }}
                // label="Message"
                disabled={disableMsg}
                multiline
                rows={3}
              />
            </div>
          ) : (
            ""
          )}
          <div className="flex justify-center px-3 pt-8">
            <div className="px-4">
              <Button
                className="!bg-[#FF0060] !font-bold !py-3 !text-white"
                onClick={handleClose}
                sx={{ width: 100 }}
              >
                Close
              </Button>
            </div>
            <div className="px-4">
              <Button
                className="!bg-[#0079FF] !font-bold !py-3 !text-white"
                onClick={postData}
                sx={{ width: 100 }}
              >
                Create
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
});

export default HrMsgGroupCreate;
