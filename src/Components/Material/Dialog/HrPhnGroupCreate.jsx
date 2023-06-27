import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import SearchDropDown2 from "../../SearchDropdown2";
import BasicTextFields2 from "../../Material/TextField2";
import instance from "../../../Instance";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { read, utils } from "xlsx";
import SearchDropdown4 from "../../SearchDropDown4";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const HrPhnGroupCreate = React.forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const [showButton, setShowButtons] = useState(true);
  const [showUploadExcel, setShowUploadExcel] = useState(false);
  const [showManualUpload, setShowManualUpload] = useState(false);
  const [dropDownData, setDropDownData] = useState([]);
  const [grpName, setGrpName] = useState("");
  const [showNameError, setShowNameError] = useState(false);
  const [showEmpSelectError, setShowEmpSelectError] = useState(false);
  const [showSucessRes, setShowSuccessRes] = useState(false);
  const [phoneList, setPhoneList] = useState([]);
  const [cmnNameError, setCmnNameError] = useState(false);
  const [excelData, setExcelData] = useState([]);
  const [userIdArr, setUserIdArr] = useState([]);
  const [noExcelError, setNoExcelError] = useState(false);
  const [noEmpError, setNoEmpError] = useState(false);
  const [slectedUser, setSelectedUser] = useState([]);

  const idRef = useRef();

  const handleOrderProcessingForm = async (value, type) => {
    // console.log(value, type);
    switch (type) {
      case "employee_info":
        console.log(value);
        break;
      case "Enter Group Name *":
        // console.log(value);
        for (let obj of phoneList) {
          if (value.trim().toLowerCase() === obj.name.toLowerCase()) {
            setCmnNameError(true);
            break;
          } else {
            setCmnNameError(false);
          }
        }
        setGrpName(value);
        break;
    }
  };

  const handleDropdownData = (value, name) => {
    // console.log(value, name);
    if ((name = "HREmpCreateGrp")) {
      setSelectedUser(value);
    }
  };

  React.useImperativeHandle(ref, () => ({
    openDialog() {
      getPhoneList();
      getUserdetails();
      setOpen(true);
    },
  }));

  const handleClose = () => {
    setExcelData([]);
    setGrpName("");
    setSelectedUser([]);
    setShowSuccessRes(false);
    idRef.current = undefined;
    setCmnNameError(false);
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

  const upload = async () => {
    let hndleData = props.handleData;
    if (cmnNameError) {
      // hndleData("Name Already Exist", "error", "error");
      return;
    }
    if (!grpName) {
      setShowNameError(true);
      setTimeout(() => {
        setShowNameError(false);
      }, 3000);
      return;
    }
    // let idGroup = idRef.current;
    // console.log(idGroup);
    if (slectedUser.length === 0) {
      setShowEmpSelectError(true);
      setTimeout(() => {
        setShowEmpSelectError(false);
      }, 3000);
      return;
    }
    // let idGroup2 = [];
    // for (let itm of slectedUser) {
    //   let emp_id = itm.split("/")[1];
    //   idGroup2.push(emp_id);
    // }
    // console.log(idGroup2);
    let tempArr = [];
    for (let itm of slectedUser) {
      let tempObj = { emp_id: itm.value };
      tempArr.push(tempObj);
    }
    // console.log(tempArr);
    const res = await instance({
      url: `hr/create/contact_group/`,
      method: "POST",
      data: {
        name: grpName,
        emp: tempArr,
      },
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    // console.log(res);
    if (res.data.status === "error") {
      hndleData(res.data.message, "error", "error");
    } else {
      // hndleData(res.data.message, "success", "success");
      setShowSuccessRes(true);
      hndleData("reload", "reload", "reload");
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
        userIdArr.push(obj.emp_id);
        let name = `${obj.first_name ? obj.first_name : ""} ${
          obj.middle_name ? obj.middle_name : ""
        } ${obj.last_name ? obj.last_name : ""}-${
          obj.emp_id ? obj.emp_id : ""
        }-${obj.phone ? obj.phone : ""}`;
        dataToSend.push({ title: name, value: obj.id });
      }
      console.log(dataToSend);
      setDropDownData(dataToSend);
      // setDropDownData(resData);
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
          // console.log(rowsArr);
          setExcelData(rowsArr);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleExcel = async () => {
    let hndleData = props.handleData;
    if (!grpName) {
      setShowNameError(true);
      setTimeout(() => {
        setShowNameError(false);
      }, 3000);
      return;
    }
    if (cmnNameError) {
      // hndleData("Name Already Exist", "error", "error");
      return;
    }
    if (excelData.length === 0) {
      // hndleData(`Please choose a excel file`, "error", "error");
      setNoExcelError(true);
      setTimeout(() => {
        setNoExcelError(false);
      }, 3000);
      return;
    }
    for (let obj of excelData) {
      if (!userIdArr.includes(obj.emp_id)) {
        // hndleData(`${obj.emp_id} is not a employee`, "error", "error");
        setNoEmpError(obj.emp_id);
        setTimeout(() => {
          setNoEmpError(false);
        }, 3000);
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
        <div className="flex justify-end !bg-[#e5e7eb]">
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>

        <DialogContent className=" !bg-[#e5e7eb]  text-black">
          {showButton ? (
            <div className="flex justify-around mt-7">
              <div className="px-4">
                <Button
                  // size="large"
                  className="!bg-[#0079FF] !font-bold !py-3 !text-white"
                  onClick={handleImport}
                  sx={{ width: 200 }}
                >
                  Import Excel
                </Button>
              </div>
              <div className="px-4">
                <Button
                  // size="large"
                  className="!bg-[#0079FF] !font-bold !py-3 !text-white"
                  onClick={handleManualEntry}
                  sx={{ width: 200 }}
                >
                  Enter Manually
                </Button>
              </div>
            </div>
          ) : (
            ""
          )}

          {showUploadExcel ? (
            <div>
              {showSucessRes ? (
                <div>
                  <div className="flex justify-around py-2">
                    <div className="text-2xl text-slate-900 font-bold">
                      {`Group ${grpName} Created`}
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
                    <div className="w-[90%]">
                      <BasicTextFields2
                        lable={"Enter Group Name *"}
                        handleOrderProcessingForm={handleOrderProcessingForm}
                        variant={"standard"}
                        multiline={false}
                        // handleBlur={handleBlur}
                        fontWeight="bold"
                        inputLabelProps={{ style: { color: "black" } }}
                      />
                      {cmnNameError ? (
                        <p className="text-red-600 text-xs pt-1">
                          This name already exist
                        </p>
                      ) : (
                        ""
                      )}
                      {showNameError ? (
                        <p className="text-red-600 text-xs pt-1">
                          Group Name is mandatory
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="flex justify-around pt-8">
                    <div className="flex flex-col gap-2 w-full md:w-[15vw] text-black">
                      Upload Excel File :
                    </div>
                    <div className="flex flex-col gap-2 w-full md:w-[20vw]">
                      <input
                        className="text-black"
                        type="file"
                        onChange={(e) => handleExcelFile(e)}
                      />
                    </div>
                  </div>
                  {noExcelError ? (
                    <p className="text-red-600 text-xs pt-1 pl-7">
                      Please Choose a Excel File
                    </p>
                  ) : (
                    ""
                  )}
                  {noEmpError ? (
                    <p className="text-red-600 text-xs pt-1 pl-7">
                      {/* Please Choose a Excel File */}
                      {`${noEmpError} is not a employee`}
                    </p>
                  ) : (
                    ""
                  )}
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
                        onClick={handleExcel}
                        sx={{ width: 100 }}
                      >
                        Upload
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            ""
          )}

          {showManualUpload ? (
            <div>
              {showSucessRes ? (
                <div>
                  <div className="flex justify-around py-2">
                    <div className="text-2xl text-slate-900 font-bold">
                      {`Group ${grpName} Created`}
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
                      <BasicTextFields2
                        lable={"Enter Group Name *"}
                        handleOrderProcessingForm={handleOrderProcessingForm}
                        variant={"standard"}
                        multiline={false}
                        fontWeight="bold"
                        error={cmnNameError}
                        // handleBlur={handleBlur}
                        // onChange={(e) => {
                        //   console.log("e.target.value");
                        // }}
                      />
                      {cmnNameError ? (
                        <p className="text-red-600 text-xs pt-1">
                          This name already exist
                        </p>
                      ) : (
                        ""
                      )}
                      {showNameError ? (
                        <p className="text-red-600 text-xs pt-1">
                          Group Name is mandatory
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="flex justify-around pt-10">
                    <div className="w-[80%]">
                      {/* <SearchDropDown2
                        label={"Employees"}
                        name={"Employees"}
                        color={"rgb(243, 244, 246)"}
                        data={dropDownData}
                        idRef={idRef}
                        Name={"employee_info"}
                        handleOrderProcessingForm={handleOrderProcessingForm}
                      /> */}
                      <SearchDropdown4
                        name={"HREmpCreateGrp"}
                        label={"Employees"}
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
                        onClick={upload}
                        sx={{ width: 100 }}
                      >
                        Create
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            ""
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
});

export default HrPhnGroupCreate;
