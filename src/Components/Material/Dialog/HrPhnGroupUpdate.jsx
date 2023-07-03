import * as React from "react";
import Button from "@mui/material/Button";
import { Dialog, DialogTitle } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
// import SearchDropDown2 from "../SearchDropdown2";
import SearchDropDown2 from "../../SearchDropdown2";
import BasicTextFields from "../../Material/TextField";
import BasicButton from "../../Material/Button";
// import instance from "../../Instance";
import instance from "../../../Instance";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { read, utils, writeFile } from "xlsx";
import { TextField } from "@mui/material";
import SearchDropdown4 from "../../SearchDropDown4";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const HrPhnGroupUpdate = React.forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const [showButton, setShowButtons] = useState(true);
  const [showUploadExcel, setShowUploadExcel] = useState(false);
  const [showManualUpload, setShowManualUpload] = useState(false);
  const [dropDownData, setDropDownData] = useState([]);
  const [grpName, setGrpName] = useState("");
  const [grpNameOrig, setGrpNameOrig] = useState("");
  const [showNameError, setShowNameError] = useState(false);
  const [showEmpSelectError, setShowEmpSelectError] = useState(false);
  const [showSucessRes, setShowSuccessRes] = useState(false);
  const [phoneList, setPhoneList] = useState([]);
  const [cmnNameError, setCmnNameError] = useState(false);
  const [excelData, setExcelData] = useState([]);
  const [userIdArr, setUserIdArr] = useState([]);
  const [selecUser, setSeletUser] = useState([]);

  const idRef = useRef();
  const handleOrderProcessingForm = async (value, type) => {
    console.log(value, type);

    switch (type) {
      case "employee_info":
        // console.log(value);
        break;
      case "GroupNameCheck":
        // console.log(value);
        break;
      case "GroupName":
        // console.log(value);
        setGrpName(value);
        for (let obj of phoneList) {
          if (value !== grpNameOrig) {
            if (value.trim().toLowerCase() === obj.name.toLowerCase()) {
              setCmnNameError(true);
              break;
            } else {
              setCmnNameError(false);
            }
          }
        }
        // if (value.length === 0) {
        //   // console.log(props.name);
        //   setGrpName(props.name);
        // } else {
        // console.log(value);
        setGrpName(value);
        // }
        break;
    }
  };

  React.useImperativeHandle(ref, () => ({
    openDialog() {
      // console.log(props.name);
      setGrpName(props.name);
      setGrpNameOrig(props.name);
      getPhoneList();
      getUserdetails();
      setOpen(true);
    },
  }));

  const getPhoneListDetails = async (id) => {
    // setLoading(true);
    // console.log(id);
    const res = await instance({
      url: `/hr/get/getPhoneGroupList/detail/${id}`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    // console.log(res);
    if (res.data.message.length === 0) return [];
    if (res.data.status === "success") {
      let data = res.data.message[0].user_phone_groups;
      // console.log(data);
      let idArr = [];
      for (let obj of data) {
        // console.log(obj);
        idArr.push(obj.fk_user.id);
      }
      // console.log(idArr);
      return idArr;
    }
  };

  const handleClose = () => {
    setExcelData([]);
    setGrpName("");
    setGrpNameOrig("");
    setSeletUser([]);
    setShowSuccessRes(false);
    setCmnNameError(false);
    idRef.current = undefined;
    setShowUploadExcel(false);
    setShowManualUpload(false);
    setShowButtons(true);
    setOpen(false);
  };

  const handleManualEntry = () => {
    setShowButtons(false);
    setShowManualUpload(true);
  };

  const handleImport = () => {
    setShowButtons(false);
    setShowUploadExcel(true);
  };

  const update = async () => {
    let hndleData = props.handleData;
    // if (cmnNameError) {
    //   hndleData("Name Already Exist", "error", "error");
    //   return;
    // }
    // if (!grpName) {
    //   setShowNameError(true);
    //   setTimeout(() => {
    //     setShowNameError(false);
    //   }, 3000);
    //   return;
    // }
    // let idGroup = idRef.current;
    // console.log(idGroup);

    if (selecUser.length === 0) {
      setShowEmpSelectError(true);
      setTimeout(() => {
        setShowEmpSelectError(false);
      }, 3000);
      return;
    }
    // let idGroup2 = [];
    // for (let itm of idGroup) {
    //   let emp_id = itm.split("/")[1];
    //   idGroup2.push(emp_id);
    // }
    // console.log(idGroup2);
    let tempArr = [];
    for (let itm of selecUser) {
      let tempObj = { emp_id: itm.value };
      tempArr.push(tempObj);
    }
    console.log(props.id, grpName, tempArr);
    const res = await instance({
      url: `hr/update/contact_group`,
      method: "POST",
      data: {
        id: props.id,
        name: grpName.trim(),
        emp: tempArr,
      },
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    console.log(res);
    if (res.data.status === "success") {
      console.log(res);
      // hndleData(res.data.message, "error", "error");
      setShowSuccessRes(true);
      hndleData("reload", "reload", "reload");
    } else {
      // console.log(res);
      // hndleData(res.data.message, "success", "success");
      hndleData("API not ready to update through unique key", "error", "error");

      // setShowSuccessRes(true);
    }
  };

  const getPhoneList = async () => {
    // setLoading(true);
    const res = await instance({
      url: `/hr/get/getPhoneGroupList`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });

    // console.log(res.data.message);
    setPhoneList(res.data.message);
  };

  const getUserdetails = async () => {
    let existingData = await getPhoneListDetails(props.id);
    // console.log(existingData);
    const res = await instance({
      url: `hr/get/allUsers`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
        // accesskey: `auth74961a98ba76d4e4`,
      },
    });

    if (res.data.status === "success") {
      let resData = res.data.message;
      // console.log(resData);
      let userIdArr = [];
      let dataToSend = [];
      for (let obj of resData) {
        if (!existingData.includes(obj.id)) {
          userIdArr.push(obj.emp_id);
          let name = `${obj.first_name ? obj.first_name : ""} ${
            obj.middle_name ? obj.middle_name : ""
          } ${obj.last_name ? obj.last_name : ""} - ${
            obj.emp_id ? obj.emp_id : ""
          } - ${obj.phone ? obj.phone : ""}`;
          dataToSend.push({ title: name, value: obj.id });
        }
      }
      console.log(dataToSend.length);
      // console.log(userIdArr.length);
      setDropDownData(dataToSend);
      setUserIdArr(userIdArr);
    }
    // else {
    //   setSnackbarErrStatus(true);
    //   setErrMessage(res.data.message);
    //   snackbarRef.current.openSnackbar();
    // }
  };

  const handleExcelFile = (event) => {
    const files = event.target.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;

        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          console.log(rows);
          let rowsArr = [];
          for (let obj of rows) {
            console.log(obj["emp_id"]);
            let temp = {};
            temp.emp_id = obj["emp_id"];
            rowsArr.push(temp);
          }
          // console.log(rowsArr)
          // setExcelData(rowsArr);
          // let tempExcelData = [];
          // for (let i = 0; i < rowsArr.length; i += 100) {
          //   const chunk = rowsArr.slice(i, i + 100);
          //   // console.log(chunk)
          //   tempExcelData.push(chunk);
          // }
          console.log(rowsArr);
          setExcelData(rowsArr);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleExcel = async () => {
    console.log(excelData);
    let hndleData = props.handleData;
    if (!grpName) {
      setShowNameError(true);
      setTimeout(() => {
        setShowNameError(false);
      }, 3000);
      return;
    }
    if (cmnNameError) {
      hndleData("Name Already Exist", "error", "error");
      return;
    }
    if (excelData.length === 0) {
      hndleData(`Please choose a excel file`, "error", "error");
      return;
    }
    for (let obj of excelData) {
      if (!userIdArr.includes(obj.emp_id)) {
        hndleData(`${obj.emp_id} is not a employee`, "error", "error");
        return;
      }
    }

    const res = await instance({
      url: `hr/create/contact_group/`,
      method: "POST",
      data: {
        name: grpName,
        emp: excelData,
      },
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    if (res.data.status === "error") {
      hndleData(res.data.message, "error", "error");
    } else {
      // hndleData(res.data.message, "success", "success");
      setShowSuccessRes(true);
      hndleData("reload", "reload", "reload");
    }
  };

  const handleDropdownData = (value, name) => {
    console.log(value, name);
    if (name === "HRAddEmp") {
      setSeletUser(value);
    }
  };

  return (
    <div>
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
        <div className="flex justify-end !bg-[#e5e7eb] ">
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>

        <DialogContent className=" !bg-[#e5e7eb]  text-black">
          {showSucessRes ? (
            <div>
              <div className="flex justify-around py-2">
                <div className="text-2xl text-slate-900 font-bold">
                  {`Group ${grpName} Updated`}
                </div>
              </div>
              <div className="flex justify-around pt-8">
                <div className="px-4">
                  <Button
                    className="!bg-[#FF0060] !font-bold !py-3 !text-white"
                    onClick={handleClose}
                    sx={{ width: 100 }}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-around">
                <div className="w-[80%]">
                  {/* <div className="pb-4">{`Group Name: ${props.name}`}</div> */}

                  <TextField
                    className="w-full"
                    id="standard-basic"
                    label="Group Name"
                    variant="standard"
                    onChange={(e) => {
                      handleOrderProcessingForm(e.target.value, "GroupName");
                    }}
                    // onBlur={(e) => {
                    //   handleOrderProcessingForm(e.target.value, "GroupNameCheck");
                    // }}
                    error={cmnNameError}
                    // inputProps={{
                    //   style: { color: "#020617" },
                    // }}
                    InputLabelProps={{ style: { color: "#020617" } }}
                    inputProps={{
                      style: { color: "black" },
                      sx: { color: "black" },
                    }}
                    // sx={{
                    //   "& input": {
                    //     color: "green",
                    //   },
                    // }}
                    // defaultValue={grpName}
                    value={grpName}
                  />

                  {cmnNameError ? (
                    <p className="text-red-600 text-xs pt-1">
                      This name already exist
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="flex justify-around pt-10">
                <div className="w-[80%]">
                  {/* <SearchDropDown2
                    label={"Add"}
                    name={"Add"}
                    color={"rgb(243, 244, 246)"}
                    data={dropDownData}
                    idRef={idRef}
                    Name={"employee_info"}
                    handleOrderProcessingForm={handleOrderProcessingForm}
                    // InputLabelProps={{ style: { color: "black" } }}
                  /> */}
                  <SearchDropdown4
                    name={"HRAddEmp"}
                    label={"Add"}
                    data={dropDownData}
                    handleDropdownData={handleDropdownData}
                  />
                  {showEmpSelectError ? (
                    <p className="text-red-600 text-xs pt-1">
                      Select atleast 1 employee
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="flex justify-center pt-10">
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
                    onClick={update}
                    sx={{ width: 100 }}
                  >
                    Update
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
});

export default HrPhnGroupUpdate;
