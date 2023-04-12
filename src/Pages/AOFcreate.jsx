import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import SwipeableTemporaryDrawer from "../Components/Material/MaterialSidebar";
import BasicButton from "../Components/Material/Button";
import CustomizedSteppers from "../Components/Material/Stepper";
import SearchDropDown from "../Components/SearchDropDown";
import BasicTextFields from "../Components/Material/TextField";
// import TextField from '@mui/material/TextField';
import DatePicker from "../Components/Material/Date";
import IconButton from "@mui/material/IconButton";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Stack } from "@mui/system";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Fab,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Add, ExpandMore, Delete, CloseFullscreen } from "@mui/icons-material";
import RowRadioButtonsGroup from "../Components/Material/RowRadioButtonGroup";
import instance from "../Instance";
import Cookies from "js-cookie";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Snackbars from "../Components/Material/SnackBar";

const AOFcreate = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const [publisher, setPublisher] = useState([]);
  const [series, setSeries] = useState([]);
  const [title, setTitle] = useState([]);
  const [loading, setLoading] = useState(false);
  const [suppliers, setSuppliers] = useState(1);
  const [cheque, setCheque] = useState(1);
  const [authPerson, setAuthPerson] = useState(1);
  const [snackbarErrStatus, setSnackbarErrStatus] = useState(true);
  const [errMessage, setErrMessage] = useState("");
  const [remarkss, setRemarkss] = useState("");
  const [steps, setSteps] = useState({
    step1: true,
    step2: false,
    step3: false,
    step4: false,
  });
  const [step4, setStep4] = useState({
    tod: { applicable: false, type: false },
    special: { applicable: false, type: "" },
  });
  const [publisherData, setPublisherData] = useState([]);
  // const [publisherData2, setPublisherData2] = useState([]);
  const [seriesData, setSeriesData] = useState([]);
  const [specialSpecific, setSpecialSpecific] = useState([]);
  const [itemsData, setItemsData] = useState([]);
  const [schoolData, setSchoolData] = useState([]);
  // const [seriesData2, setSeriesData2] = useState([]);
  const [allSchool, setAllSchool] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [date, setDate] = useState("");
  const [nameOfSchool, setNameOfSchool] = useState("");
  const [idOfSchool, setIdOfSchool] = useState("");

  const [pinCode, setPinCode] = useState(null);
  const [stateSelect, setStateSelect] = useState("");
  const [citySelect, setCitySelect] = useState("");
  const [ifsc, setIfsc] = useState("");

  const [aofStatus, setAofStatus] = useState("");
  const [schoolAddress, setSchoolAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [phone, setPhone] = useState("");
  const [schoolEmail, setSchoolEmail] = useState("");
  const [firmRegNo, setFirmRegNo] = useState("");
  const [panNo, setPanNo] = useState("");
  const [gstNo, setGstNo] = useState("");
  const [gstYear, setGstYear] = useState("");
  const [proprietorName, setProprietorName] = useState("");
  const [panNoP, setPanNoP] = useState("");
  const [addressP, setAddressP] = useState("");
  const [pinCodeP, setPinCodeP] = useState("");
  const [phoneP, setPhoneP] = useState("");
  const [mobileP, setMobileP] = useState("");
  const [emailP, setEmailP] = useState("");
  const [partyBankerName, setPartyBankerName] = useState(null);
  const [accNoP, setAccNoP] = useState(null);
  const [ifscP, setIfscP] = useState(null);
  const [aofAcc, setAofAcc] = useState(null);
  const [todOption, setTodOption] = useState("");
  const [todCondition, setTodCondition] = useState("");
  const [todPercent, setTodPercent] = useState("");
  const [cashOption, setCashOption] = useState("");
  const [totalNoStudent, setTotalNoStudent] = useState("");
  const [classesUpto, setClassesUpto] = useState("");
  const [publisherForm, setPublisherForm] = useState([]);
  const [chequeForm, setChequeForm] = useState([]);
  const [publisherAuthForm, setPublisherAuthForm] = useState([]);

  const [special_obj, setSpecialObj] = useState({
    type: "special",
    eligibile: "yes",
    dis_type: "",
    category: "",
    fk_category_id: "",
    percentages: "",
    percentages_type: "",
  });
  const [creditLimit, setcrditLimit] = useState("");
  const [creditLimitType, setcrditLimitType] = useState("");
  const [partyType, setPartyType] = useState("School");
  const [selectType, setSelectType] = useState("");

  const sidebarRef = useRef();
  const snackbarRef = useRef();

  function isValid_IFSC_Code(ifsc_Code) {
    // console.log(ifsc_Code);
    let regex = new RegExp(/^[A-Z]{4}0[A-Z0-9]{6}$/);
    if (ifsc_Code == null) {
      return false;
    }
    if (regex.test(ifsc_Code) == true) {
      return true;
    } else {
      return false;
    }
  }

  function isValid_PAN(panNo) {
    let regex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
    if (regex.test(panNo)) {
      return true;
    }
    return false;
  }

  function isValid_GST(gstNo) {
    let regex = new RegExp(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/);    
    if (regex.test(gstNo)) {
      return true;
    }
    return false;
  }

  const postFormData = async () => {
    let pubArr = [...publisherForm];
    for (let obj of pubArr) {
      delete obj.idx;
    }
    // console.log(pubArr)

    let chekArr = [...chequeForm];
    for (let obj of chekArr) {
      delete obj.idx;
    }

    let authArr = [...publisherAuthForm];
    for (let obj of authArr) {
      delete obj.idx;
    }
    // console.log(authArr)
    // console.log(publisherData2)
    let tempPublisherArr = [...publisherData];
    for (let items of tempPublisherArr) {
      delete items.bp_name;
    }
    // console.log(tempPublisherArr)
    let tempSeriesArr = [...seriesData];
    for (let items of tempSeriesArr) {
      delete items.series;
    }
    let tempItemsArr = [...itemsData];
    // console.log(tempItemsArr)
    for (let items of tempItemsArr) {
      delete items.series;
    }
    // console.log(tempItemsArr);
    // console.log(tempSeriesArr)
    // console.log(specialSpecific)
    let specialData = [
      ...tempPublisherArr,
      ...tempSeriesArr,
      ...tempItemsArr,
      ...specialSpecific,
    ];
    // console.log(specialData);

    let postData = {
      name: nameOfSchool,
      status_type: aofStatus,
      aof_type: selectType,
      party_type: partyType,
      fk_school_id: idOfSchool,
      fk_state_id: stateSelect,
      fk_city_id: citySelect,
      zip_code: pinCode,
      address: schoolAddress,
      phone: phone,
      mobile: mobile,
      email: schoolEmail,
      firm_reg: firmRegNo,
      date: date,
      pan: panNo,
      gst: gstNo,
      business_est: gstYear,
      t_name: proprietorName,
      t_pan: panNoP,
      t_zip_code: pinCodeP,
      t_address: addressP,
      t_phone: phoneP,
      t_mobile: mobileP,
      t_email: emailP,
      credit_limit: creditLimit,
      credit_type: creditLimitType,
      remarks: remarkss,
      students_number: totalNoStudent,
      classes: classesUpto,
      cp: pubArr,
      // cp: [
      //   { cp_name: "dsff", cp_business: "dsfds" },
      //   { cp_name: "dsff", cp_business: "dsfds" },
      //   { cp_name: "dsff", cp_business: "dsfds" },
      // ],
      ab_name: partyBankerName,
      ab_account_no: accNoP,
      ab_acc_type: aofAcc,
      ab_ifsc: ifscP,
      cheque: chekArr,
      // cheque: [
      //   {
      //     abc_cheque_no: "fdsfds",
      //     abc_bank: "dsfsdf",
      //     abc_branch_ifsc: "dsfdsfd",
      //     abc_cheque_link: "dsfdsfd",
      //   },
      //   {
      //     abc_cheque_no: "fdsfds",
      //     abc_bank: "dsfsdf",
      //     abc_branch_ifsc: "dsfdsfd",
      //     abc_cheque_link: "dsfdsfd",
      //   },
      // ],
      good_picks: authArr,
      cash: [
        {
          type: "cash",
          eligibile: cashOption,
        },
      ],
      tod: [
        {
          type: "tod",
          eligibile: todCondition,
          percentages: todPercent,
          percentages_type: todOption,
        },
      ],
      special: specialData,
      // [
      //   {
      //     type: "special",
      //     eligibile: "yes",
      //     dis_type: "specific",
      //     category: "series",
      //     fk_category_id: "40481858-d49b-4a24-bbd3-b68617ce16f1",
      //     percentages: "30",
      //     percentages_type: "net",
      //   },
      //   {
      //     type: "special",
      //     eligibile: "yes",
      //     dis_type: "specific",
      //     category: "items",
      //     fk_category_id: "c12db2ed-de50-4533-a8c4-39dd1cc506a3",
      //     percentages: "30",
      //     percentages_type: "net",
      //   },
      // ],
    };
    console.log(postData);
    const res = await instance({
      url: `sales_data/aof/create`,
      method: "POST",
      data: postData,
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    console.log(res);
    alert(res.data.message);
    // // setCity(city.data.message);
    setTimeout(() => {
      navigate("/aof");
    }, 1000);
  };

  const handleDataSubmit = async () => {
    postFormData();
  };

  let formdata = new FormData();
  const onFileChange = async (e, index) => {
    console.log(index);
    // const file = event.currentTarget["fileInput"].files[0];
    let file = e.target.files[0];
    // console.log(file.type)
    if (file.type !== "image/jpeg") {
      alert("Please Select an image file only");
      return;
    }
    formdata.append("img", file);
    formdata.append("test", "test");

    const res = await instance({
      url: `imagetoS3/add_image_s3`,
      method: "POST",
      data: formdata,
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    // console.log(res.status);
    if (res.status === 200) {
      let link = res.data;
      // console.log(index);
      // console.log(chequeForm);
      let tempArr = [...chequeForm];
      if (tempArr.length < index + 1) {
        let obj = {};
        obj.idx = index;
        obj.abc_cheque_link = link;
        tempArr.push(obj);
      } else {
        for (let obj of tempArr) {
          if (obj.idx === index) {
            obj.abc_cheque_link = link;
          }
        }
      }
      // console.log(tempArr);
      setChequeForm(tempArr);
    } else {
      alert("Cannot upload image");
    }
  };

  const getSchools = async () => {
    const state = await instance({
      url: "school/get/allschools",
      method: "GET",
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    // console.log(state.data.message);
    setAllSchool(state.data.message);
  };

  const getState = async () => {
    const state = await instance({
      url: "location/state/stateswithcode/get",
      method: "GET",
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    // console.log(state.data.message);
    setState(state.data.message);
  };

  const getCity = async (id) => {
    // console.log(id);
    const city = await instance({
      url: `location/city/${id}`,
      method: "GET",
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    // console.log(city.data.message);
    setCity(city.data.message);
  };

  const handleRadioButtons = (type, value, defaultValue) => {
    // console.log(type, value, defaultValue);
    // console.log(special_obj)
    // let special_obj = {
    //   type: "special",
    //   eligibile: "yes",
    //   dis_type: "",
    //   category: "",
    //   fk_category_id: "",
    //   percentages: "",
    //   percentages_type: "",
    // };
    switch (type) {
      case "tod applicable":
        if (value === "yes") {
          // console.log("tod applicable selected Yes");
          setTodCondition("yes");
          setStep4({ ...step4, tod: { applicable: false, type: false } });
        } else {
          // console.log("tod applicable selected No");
          setTodCondition("no");
          setStep4({ ...step4, tod: { applicable: false, type: false } });
        }
        break;
      case "tod type":
        if (value === "yes") {
          console.log("Overall business value selected");
          // special_obj.dis_type = "overall business"
          // console.log(special_obj)
          setStep4({ ...step4, tod: { applicable: true, type: true } });
        } else {
          console.log("Specific selected");
          // special_obj.dis_type = "specific"
          // console.log(special_obj)
          setStep4({ ...step4, tod: { applicable: true, type: false } });
        }
        break;
      case "special applicable":
        if (value === "yes") {
          special_obj.eligibile = "yes";
          // console.log(special_obj);
          // console.log("special applicable yes");
          setStep4({ ...step4, special: { applicable: true, type: "" } });
        } else {
          special_obj.eligibile = "no";
          // console.log(special_obj);
          // console.log("special applicable no");
          setStep4({ ...step4, special: { applicable: false, type: "" } });
        }
        break;

      case "special type":
        // console.log(value);
        if (value === "overall") {
          setPublisherData([]);
          setSeriesData([]);
          special_obj.dis_type = "overall";
        } else {
          setSpecialSpecific([]);
          special_obj.dis_type = "specific";
        }
        // console.log(special_obj);
        setSpecialObj(special_obj);
        setStep4({ ...step4, special: { applicable: true, type: value } });
        break;

      case "tod":
        // console.log(value);
        if (value === "yes") setTodOption("gross");
        else setTodOption("net");
        // setStep4({ ...step4, special: { applicable: true, type: value } });
        break;

      case "cash":
        // console.log(value);
        setCashOption(value);
        // setStep4({ ...step4, special: { applicable: true, type: value } });
        break;

      case "tod_special":
        // console.log(value);
        if (value === "yes") {
          // console.log(value);
          special_obj.percentages_type = "gross";
        }
        if (value === "no") {
          // console.log(value);
          special_obj.percentages_type = "net";
        }
        // console.log(special_obj);
        setSpecialObj(special_obj);
        // setPublisherData2([{...special_obj}])
        setSpecialSpecific([{ ...special_obj }]);
        // setCashOption(value);
        // setStep4({ ...step4, special: { applicable: true, type: value } });
        break;

      case "publisher":
        // console.log(publisherData)
        // console.log(publisherData2)

        let val = value;
        let id = defaultValue;

        console.log(val, id);

        let dataArr = [...publisherData];
        let tempArr = [];
        for (let obj of dataArr) {
          if (id === obj.fk_category_id) {
            // console.log(obj)
            obj.percentages_type = val;
          }
          tempArr.push(obj);
        }

        console.log(tempArr);
        setPublisherData([]);
        setPublisherData(tempArr);
        // console.log(publisherData)

        break;

      // case "publisher":
      //   console.log(type, value);
      //   // setStep4({ ...step4, special: { applicable: true, type: value } });
      //   break;

      case "series":
        // console.log(type, value, defaultValue);

        let val1 = value;
        let id1 = defaultValue;

        // console.log(val1, id1);

        let dataArr1 = [...seriesData];
        let tempArr1 = [];
        for (let obj of dataArr1) {
          if (id1 === obj.fk_category_id) {
            // console.log(obj)
            obj.percentages_type = val1;
          }
          tempArr1.push(obj);
        }

        // console.log(tempArr1);
        setSeriesData([]);
        setSeriesData(tempArr1);
        // setStep4({ ...step4, special: { applicable: true, type: value } });
        break;

      case "items":
        // console.log(type, value, defaultValue);

        let val2 = value;
        let id2 = defaultValue;

        // console.log(val2, id2);

        let dataArr2 = [...itemsData];
        let tempArr2 = [];
        for (let obj of dataArr2) {
          if (id2 === obj.fk_category_id) {
            // console.log(obj)
            obj.percentages_type = val2;
          }
          tempArr2.push(obj);
        }

        // console.log(tempArr2);
        setItemsData([]);
        setItemsData(tempArr2);
        // setStep4({ ...step4, special: { applicable: true, type: value } });
        break;

      default:
        break;
    }
  };

  const handleTablePercent = (val, id) => {
    let dataArr = [...publisherData];
    let tempArr = [];
    for (let obj of dataArr) {
      if (id === obj.fk_category_id) {
        // console.log(obj)
        obj.percentages = val;
      }
      tempArr.push(obj);
    }

    // console.log(tempArr);
    setPublisherData([]);
    setPublisherData(tempArr);
  };

  const handleTablePercent2 = (val, id) => {
    let dataArr = [...seriesData];
    let tempArr = [];
    for (let obj of dataArr) {
      if (id === obj.fk_category_id) {
        // console.log(obj)
        obj.percentages = val;
      }
      tempArr.push(obj);
    }

    // console.log(tempArr);
    setSeriesData([]);
    setSeriesData(tempArr);
  };

  const handleTablePercent3 = (val, id) => {
    // console.log(val, id);
    let dataArr = [...itemsData];
    let tempArr = [];
    for (let obj of dataArr) {
      if (id === obj.fk_category_id) {
        // console.log(obj)
        obj.percentages = val;
      }
      tempArr.push(obj);
    }

    // console.log(tempArr);
    setItemsData([]);
    setItemsData(tempArr);
  };

  const show = null;

  const calActiceStep = () => {
    if (steps.step1) {
      return 0;
    }
    if (steps.step2) {
      return 1;
    }
    if (steps.step3) {
      return 2;
    }
    if (steps.step4) {
      return 3;
    }
  };

  // const handleForm = () => {
  //   let content = [];
  //   for (let i = 0; i < suppliers; i++) {
  //     content.push(
  //       <Supplier/>
  //     );
  //   }
  //   return content;
  // };

  const handlePublisherForm = (field, value, index) => {
    // console.log(field, value, index);
    let tempArr = [...publisherForm];
    if (tempArr.length < index + 1) {
      let obj = {};
      obj.idx = index;
      if (field === "Name") obj.cp_name = value;
      if (field === "AnnualBusiness") obj.cp_business = value;
      tempArr.push(obj);
    } else {
      for (let obj of tempArr) {
        if (obj.idx === index) {
          if (field === "Name") obj.cp_name = value;
          if (field === "AnnualBusiness") obj.cp_business = value;
        }
      }
    }
    // console.log(tempArr);
    setPublisherForm(tempArr);
  };

  const handlePublisherAuthForm = (field, value, index) => {
    // console.log(field, value, index);
    let tempArr = [...publisherAuthForm];
    if (tempArr.length < index + 1) {
      let obj = {};
      obj.idx = index;
      if (field === "Name") obj.name = value;
      if (field === "Designation") obj.designation = value;
      if (field === "Signature") obj.signature = value;
      tempArr.push(obj);
    } else {
      for (let obj of tempArr) {
        if (obj.idx === index) {
          if (field === "Name") obj.name = value;
          if (field === "Designation") obj.designation = value;
          if (field === "Signature") obj.signature = value;
        }
      }
    }
    // console.log(tempArr);
    setPublisherAuthForm(tempArr);
  };

  // var contents = []
  const handleForm = () => {
    let content = [];
    for (let i = 0; i < suppliers; i++) {
      content.push(
        <li className="flex gap-4 items-center">
          <span className="mt-4 text-gray-100">{i + 1}.</span>
          <TextField
            label={`Name`}
            // handleOrderProcessingForm={handleOrderProcessingForm}
            onChange={(e) => handlePublisherForm("Name", e.target.value, i)}
            variant={"standard"}
            multiline={false}
            // Name={"Name"}
          />
          <TextField
            label={"Annual Business"}
            // handleOrderProcessingForm={handleOrderProcessingForm}
            onChange={(e) =>
              handlePublisherForm("AnnualBusiness", e.target.value, i)
            }
            variant={"standard"}
            multiline={false}
          />
        </li>
      );
    }
    return content;
  };

  const handleAuthForm = () => {
    let content = [];
    for (let i = 0; i < authPerson; i++) {
      content.push(
        <li className="flex gap-4 items-center">
          <span className="mt-4 text-gray-100">{i + 1}.</span>
          <TextField
            label={`Name`}
            // handleOrderProcessingForm={handleOrderProcessingForm}
            onChange={(e) => handlePublisherAuthForm("Name", e.target.value, i)}
            variant={"standard"}
            multiline={false}
            // Name={"Name"}
          />
          <TextField
            label={"Designation"}
            // handleOrderProcessingForm={handleOrderProcessingForm}
            onChange={(e) =>
              handlePublisherAuthForm("Designation", e.target.value, i)
            }
            variant={"standard"}
            multiline={false}
          />
          <TextField
            label={"Signature"}
            // handleOrderProcessingForm={handleOrderProcessingForm}
            onChange={(e) =>
              handlePublisherAuthForm("Signature", e.target.value, i)
            }
            variant={"standard"}
            multiline={false}
          />
        </li>
      );
    }
    return content;
  };

  // const getTitleBySeries = async (id) => {
  //   const titles = await instance({
  //     url: `items/getSeriesItem/${id}`,
  //     method: "GET",
  //     headers: {
  //       Authorization: `${Cookies.get("accessToken")}`,
  //     },
  //   });
  //   console.log(titles)
  //   // setTitle(titles.data.message);
  // };

  const handleChequesForm = (field, value, index) => {
    // console.log(suppliers);
    console.log(field, value, index);
    let tempArr = [...chequeForm];
    if (tempArr.length < index + 1) {
      let obj = {};
      obj.idx = index;
      if (field === "ChequeNo") obj.abc_cheque_no = value;
      if (field === "Bank") obj.abc_bank = value;
      if (field === "Branch") obj.abc_branch_ifsc = value;
      obj.abc_cheque_link = "";
      tempArr.push(obj);
    } else {
      for (let obj of tempArr) {
        if (obj.idx === index) {
          if (field === "ChequeNo") obj.abc_cheque_no = value;
          if (field === "Bank") obj.abc_bank = value;
          if (field === "Branch") obj.abc_branch_ifsc = value;
        }
      }
    }
    // console.log(tempArr);
    setChequeForm(tempArr);

    // let chekArr = []
    // for(let obj of tempArr){
    //     delete obj.idx
    //     chekArr.push(obj)
    // }
    // console.log(chekArr)
    // setChequeArr(chekArr)
  };

  const handleCheques = () => {
    let content = [];
    for (let i = 0; i < cheque; i++) {
      content.push(
        <li className="flex gap-4 items-center">
          <span className="mt-4 text-gray-100">{i + 1}.</span>
          <TextField
            label={"Cheque No"}
            // handleOrderProcessingForm={handleOrderProcessingForm}
            onChange={(e) => handleChequesForm("ChequeNo", e.target.value, i)}
            variant={"standard"}
            multiline={false}
          />
          <TextField
            label={"Bank"}
            // handleOrderProcessingForm={handleOrderProcessingForm}
            onChange={(e) => handleChequesForm("Bank", e.target.value, i)}
            variant={"standard"}
            multiline={false}
          />
          <TextField
            label={"Branch/IFSC"}
            // handleOrderProcessingForm={handleOrderProcessingForm}
            onChange={(e) => handleChequesForm("Branch", e.target.value, i)}
            variant={"standard"}
            multiline={false}
          />
          <div className="mt-6">
            {/* <form onSubmit={handlePDFformSubmit}> */}
            {/* <h1>React File Upload</h1> */}
            {/* <input type="file" name="file" onChange={e=>handlePDFformSubmit(e)} /> */}
            <input
              type="file"
              name="file_upload"
              onChange={(e) => onFileChange(e, i)}
            />
            {/* <button onClick={submitImage}>Upload File</button> */}
            {/* <BasicButton type="submit" text={"Upload"}/> */}
            {/* </form> */}
          </div>
        </li>
      );
    }
    // console.log(content)
    return content;
  };

  const handleOrderProcessingForm = (value, type) => {
    // console.log(value, type);
    switch (type) {
      case "selec_typ":
        // console.log(value)
        if (value.title === "Allied") setSelectType("100");
        if (value.title === "Eupheus") setSelectType("103");
        break;

      case "Classes Up to":
        console.log(value);
        setClassesUpto(value);
        break;
      case "party_type":
        // console.log(value);
        setPartyType(value.title);
        break;
      case "Enter Percentage (TOD)":
        // console.log(value)
        setTodPercent(value);
        break;
      case "Enter Percentage (special)":
        // console.log(value);
        // console.log(special_obj)
        special_obj.percentages = value;

        // console.log(special_obj);
        setSpecialObj(special_obj);
        // setPublisherData2([{...special_obj}])
        setSpecialSpecific([{ ...special_obj }]);
        // setTodPercent(value);
        break;
      case "select_schools":
        // console.log(value);
        setNameOfSchool(value.school_name);
        setIdOfSchool(value.id);
        break;
      case "Enter Party Name *":
        // console.log(value)
        setNameOfSchool(value);
        break;
      case "Name Of Party/School *":
        // console.log(value);
        // setNameOfSchool(value);
        break;
      case "Total no of Students *":
        // console.log(value)
        setTotalNoStudent(value);
        break;
      case "Remarks":
        console.log(value);
        setRemarkss(value);
        break;
      case "aof_status":
        // console.log(value.title);
        setAofStatus(value.title);
        break;
      case "title_aof":
        // console.log(value);
        // let tempArr2 = [...seriesData];
        // console.log(itemsData);
        // console.log(publisherData2)
        // console.log(value);
        let tempArr2 = [...itemsData];
        // let arr1 = []
        for (let ele of tempArr2) {
          // console.log(ele)
          // console.log(value)
          if (ele.fk_category_id === value.id) return;
        }

        let tempObj2 = {
          type: "special",
          eligibile: "yes",
          dis_type: "specific",
          category: "items",
          percentages: "",
          percentages_type: "",
          fk_category_id: value.id,
          series: value.item_name,
        };

        tempArr2.push(tempObj2);
        // console.log(tempArr2);
        setItemsData(tempArr2);

        break;

        // setAofStatus(value.title);
        break;
      case "Address *":
        // console.log(value);
        setSchoolAddress(value);
        break;
      case "E-Mail *":
        // console.log(value);
        setSchoolEmail(value);
        break;
      case "PAN NO":
        // console.log(value);
        setPanNo(value);
        break;
      case "GST NO":
        // console.log(value);
        setGstNo(value);
        break;
      case "GST Year of establishment of business":
        // console.log(value);
        setGstYear(value);
        break;
      case "Name of Proprietor/Partner/Director/Trustee *":
        // console.log(value);
        setProprietorName(value);
        break;
      case "PAN NO ":
        // console.log(value, "bbbbbb");
        setPanNoP(value);
        break;
      case "items_aof":
        // console.log(value);
        // setPanNoP(value);
        break;
      case "cred_lim_type":
        // console.log(value);
        // setPanNoP(value);
        setcrditLimitType(value.title);
        break;
      case "Credit Limit":
        // console.log(value);
        // setPanNoP(value);
        setcrditLimit(value);
        break;
      case "Address ":
        // console.log(value, "bbbbb");
        setAddressP(value);
        break;
      case "Pin Code ":
        // console.log(value, "bbbbbb");
        setPinCodeP(value);
        break;
      case "Phone ":
        // console.log(value, "bbbbb");
        setPhoneP(value);
        break;
      case "Mobile*":
        // console.log(value);
        setMobileP(value);
        break;
      case "E-Mail*":
        // console.log(value);
        setEmailP(value);
        break;
      case "Name and address of the party’s main bankers *":
        // console.log(value);
        setPartyBankerName(value);
        break;
      case "Account Number *":
        // console.log(value);
        setAccNoP(value);
        break;
      case "IFSC *":
        // console.log(value);
        setIfscP(value);
        break;
      case "aof_acc":
        // console.log(value);
        setAofAcc(value.title);
        break;
      case "publisher":
        // console.log(publisherData);
        // console.log(publisherData2)
        // console.log(value);
        let tempArr = [...publisherData];
        // let arr1 = []
        for (let ele of tempArr) {
          // console.log(ele)
          // console.log(value)
          if (ele.fk_category_id === value.id) return;
        }

        let tempObj = {
          type: "special",
          eligibile: "yes",
          dis_type: "specific",
          category: "publisher",
          percentages: "",
          percentages_type: "",
          fk_category_id: value.id,
          bp_name: value.bp_name,
        };

        tempArr.push(tempObj);
        // console.log(tempArr);
        setPublisherData(tempArr);

        break;

      case "Pin Code *":
        setPinCode(value);
        // console.log(value);
        break;

      case "series_aof_item":
        getTitleBySeries(value.id);
        // console.log(value)
        break;

      case "select_state_location":
        //   console.log(value , "hihihiihii");
        //   setStateId(value.id);
        // console.log(value);
        setStateSelect(value.id);
        getCity(value.id);
        // getCity(value.fk_state_id);
        // getSchoolByState(value.fk_state_id);
        // setStateAndCity({ ...stateAndCity, state: value.fk_state_id });
        break;

      case "select_city_location":
        // console.log(value);
        setCitySelect(value.id);
        break;

      case "Mobile *":
        setMobile(value);
        // console.log(value);
        break;

      case "Phone":
        // console.log(value);
        setPhone(value);
        break;

      case "Enter Percentage":
        // console.log(value);
        break;

      case "Firm/ Company/Trust Registration Number":
        // console.log(value);
        setFirmRegNo(value);
        break;

      case "series_aof":
        // let tempArr2 = [...seriesData];
        // console.log(seriesData);
        // console.log(publisherData2)
        // console.log(value);
        let tempArr1 = [...seriesData];
        // let arr1 = []
        for (let ele of tempArr1) {
          // console.log(ele)
          // console.log(value)
          if (ele.fk_category_id === value.id) return;
        }

        let tempObj1 = {
          type: "special",
          eligibile: "yes",
          dis_type: "specific",
          category: "series",
          percentages: "",
          percentages_type: "",
          fk_category_id: value.id,
          series: value.series,
        };

        tempArr1.push(tempObj1);
        // console.log(tempArr1);
        setSeriesData(tempArr1);

        break;

      case "schools_aof":
        // let tempArr2 = [...seriesData];
        // console.log(seriesData);
        // console.log(publisherData2)
        // console.log(value);
        let tempArr3 = [...allSchool];
        // let arr1 = []
        for (let ele of tempArr3) {
          console.log(ele);
          console.log(value);
          if (ele.id === value.id) return;
        }

        let tempObj3 = {
          type: "special",
          eligibile: "yes",
          dis_type: "specific",
          category: "series",
          percentages: "",
          percentages_type: "",
          fk_category_id: value.id,
          series: value.series,
        };

        tempArr3.push(tempObj3);
        console.log(tempArr3);
        setSchoolData(tempArr3);

        break;

      default:
        break;
    }
  };

  const getTitleBySeries = async (id) => {
    const titles = await instance({
      url: `items/getSeriesItem/${id}`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    // console.log(titles.data.message)
    setTitle(titles.data.message);
  };

  const handleStartDate = (newValue) => {
    // console.log(newValue.$y)
    // let yr = newValue.$y
    // let mnt = newValue.$M+1
    // let dy = newValue.$D
    // let date = `${yr}-${mnt}-${dy}`;
    if (!newValue) {
      setDate("");
    } else {
      console.log(newValue);
      let date = `${newValue.$y}-${newValue.$M + 1}-${newValue.$D}`;
      // console.log(date)
      setDate(date);
    }
  };

  useLayoutEffect(() => {
    const getPublishers = async () => {
      const allPublishers = await instance({
        url: "publishers/getallpublishers",
        method: "GET",
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      });
      setPublisher(allPublishers.data.message);
    };
    const getSries = async () => {
      const allSeries = await instance({
        url: "series/get/all",
        method: "GET",
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      });
      setSeries(allSeries.data.message);
    };

    getPublishers();
    getSries();
    // getTitleBySeries()
  }, []);

  const navInfo = {
    title: "AOF",
    details: ["Home", "/AOF"],
  };

  const handleSidebarCollapsed = () => {
    // setSidebarCollapsed(!sidebarCollapsed);
    sidebarRef.current.openSidebar();
  };

  useEffect(() => {
    getState();
    getSchools();
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

  const handleDelete = (id, type) => {
    switch (type) {
      case "publisher":
        // console.log(id)
        // console.log(publisherData)
        let tempData = [];
        let dataArr = [...publisherData];
        for (let ele of dataArr) {
          if (ele.fk_category_id !== id) {
            tempData.push(ele);
          }
        }
        // console.log(tempData)
        setPublisherData([]);
        setPublisherData(tempData);

        break;

      case "series":
        // console.log(id);
        // console.log(seriesData);
        let tempData1 = [];
        let dataArr1 = [...seriesData];
        for (let ele of dataArr1) {
          if (ele.fk_category_id !== id) {
            tempData1.push(ele);
          }
        }
        // console.log(tempData1);
        setSeriesData([]);
        setSeriesData(tempData1);
        break;

      case "items":
        // console.log(id);
        // console.log(itemsData);
        let tempData2 = [];
        let dataArr2 = [...itemsData];
        for (let ele of dataArr2) {
          if (ele.fk_category_id !== id) {
            tempData2.push(ele);
          }
        }
        // console.log(tempData2);
        setItemsData([]);
        setItemsData(tempData2);
        break;
    }
  };

  return (
    <>
      <div className="flex w-[100%] min-h-[100vh]">
        {loading ? <Loader /> : null}

        <Sidebar
          highLight={"aof"}
          sidebarCollapsed={sidebarCollapsed}
          show={show}
        />

        <div>
          <SwipeableTemporaryDrawer
            ref={sidebarRef}
            sidebarCollapsed={sidebarCollapsed}
            show={show}
            highLight={"aof"}
          />
        </div>
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

          <div className="min-h-[90vh] relative flex w-full justify-center items-start gap-4 bg-[#141728]">
            <h1 className="text-gray-100 md:text-2xl text-base font-semibold absolute top-[2rem] left-[2rem]">
              Account Opening Form
            </h1>
            <div className="w-full flex flex-col gap-4 items-center mt-[7rem]">
              <CustomizedSteppers
                activeStep={calActiceStep()}
                steps={["", "", "", ""]}
              />
              {/* step 1 */}
              {steps.step1 ? (
                <div className="flex flex-col gap-4 items-start w-[90%] px-6 bg-slate-600 rounded-md py-6 mb-[5rem]">
                  <div className="grid sm:grid-rows-5 sm:grid-cols-3 grid-rows-[15] grid-cols-1 w-full mt-6 gap-6 rounded-md bg-slate-600">
                    {/* <BasicTextFields
                      lable={"Name Of Party/School *"}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      variant={"standard"}
                      multiline={false}
                    /> */}
                    {/* <div className="grid sm:grid-rows-2 sm:grid-cols-3 grid-rows-4 grid-cols-1 w-full mt-6 gap-6 rounded-md bg-slate-600"> */}
                    <SearchDropDown
                      Name={"selec_typ"}
                      data={[{ title: "Allied" }, { title: "Eupheus" }]}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      label={"Select Type"}
                      color={"rgb(243, 244, 246)"}
                    />
                    {/* <div className="sm:col-span-2"> */}
                    <SearchDropDown
                      Name={"party_type"}
                      data={[{ title: "School" }, { title: "Party" }]}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      label={"Select Party Type *"}
                      color={"rgb(243, 244, 246)"}
                    />
                    {/* </div> */}
                    {/* </div> */}

                    {partyType === "School" ? (
                      <SearchDropDown
                        label={"Name Of Party/School *"}
                        // seriesId={""}
                        handleOrderProcessingForm={handleOrderProcessingForm}
                        color={"rgb(243, 244, 246)"}
                        data={allSchool}
                        multiple={false}
                        Name={"select_schools"}
                      />
                    ) : (
                      ""
                    )}

                    {partyType === "Party" ? (
                      <BasicTextFields
                        lable={"Enter Party Name *"}
                        variant={"standard"}
                        handleOrderProcessingForm={handleOrderProcessingForm}
                        multiline={false}
                      />
                    ) : (
                      ""
                    )}

                    <SearchDropDown
                      Name={"aof_status"}
                      data={[
                        { title: "Sole Proprietary" },
                        { title: "Partnership" },
                        { title: "LLP" },
                        { title: "Pvt.Ltd" },
                        { title: "PublicLtd" },
                        { title: "Trust" },
                      ]}
                      label={"Select Status *"}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      color={"rgb(243, 244, 246)"}
                    />
                    <BasicTextFields
                      lable={"Address *"}
                      variant={"standard"}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      multiline={false}
                    />
                    <SearchDropDown
                      label={"State *"}
                      // seriesId={""}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      color={"rgb(243, 244, 246)"}
                      data={state}
                      multiple={false}
                      Name={"select_state_location"}
                    />
                    <SearchDropDown
                      label={"City *"}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      color={"rgb(243, 244, 246)"}
                      data={city}
                      Name="select_city_location"
                    />
                    <BasicTextFields
                      lable={"Pin Code *"}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      variant={"standard"}
                      type={"number"}
                      multiline={false}
                    />

                    <BasicTextFields
                      lable={"Mobile *"}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      type={"number"}
                      variant={"standard"}
                      multiline={false}
                    />
                    <BasicTextFields
                      lable={"Phone"}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      type={"number"}
                      variant={"standard"}
                      multiline={false}
                    />
                    {/* <div className="sm:col-span-2"> */}
                    <BasicTextFields
                      lable={"E-Mail *"}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      variant={"standard"}
                      multiline={false}
                    />
                    <div className="sm:col-span-2">
                      <BasicTextFields
                        lable={"Total no of Students *"}
                        type={"number"}
                        handleOrderProcessingForm={handleOrderProcessingForm}
                        variant={"standard"}
                        multiline={false}
                      />
                    </div>
                    <BasicTextFields
                      lable={"Classes Up to"}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      variant={"standard"}
                      multiline={false}
                    />
                    {/* </div> */}
                    <div className="sm:col-span-2">
                      <BasicTextFields
                        lable={"Firm/ Company/Trust Registration Number"}
                        handleOrderProcessingForm={handleOrderProcessingForm}
                        variant={"standard"}
                        multiline={false}
                      />
                    </div>
                    {/* <DatePicker label={"Dated"} /> */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Stack spacing={3}>
                        <DesktopDatePicker
                          label="Select Date *"
                          inputFormat="MM/DD/YYYY"
                          value={date}
                          onChange={handleStartDate}
                          // handleOrderProcessingForm={handleOrderProcessingForm}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </Stack>
                    </LocalizationProvider>

                    <BasicTextFields
                      lable={"PAN NO"}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      variant={"standard"}
                      multiline={false}
                    />
                    <BasicTextFields
                      lable={"GST NO"}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      variant={"standard"}
                      multiline={false}
                    />
                    <BasicTextFields
                      lable={"GST Year of establishment of business"}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      variant={"standard"}
                      type={"number"}
                      multiline={false}
                    />
                  </div>
                  <div
                    className="mt-3"
                    onClick={() => {
                      if (
                        (!nameOfSchool,
                        !aofStatus,
                        !schoolAddress,
                        !stateSelect,
                        !citySelect,
                        !pinCode,
                        !mobile,
                        !date,
                        // phone,
                        !schoolEmail,
                        !totalNoStudent)
                        // firmRegNo,
                        // panNo,
                        // gstNo,
                        // gstYear
                      ) {
                        setSnackbarErrStatus(true);
                        setErrMessage("Please Fill All The Fields");
                        snackbarRef.current.openSnackbar();
                      } else if(panNo.length>0 || gstNo.length>0){
                        if (panNo.length > 0) {
                          // console.log(panNo);
                          if (isValid_PAN(panNo) === false) {
                            setSnackbarErrStatus(true);
                            setErrMessage("Please Enter a Valid PAN Number");
                            snackbarRef.current.openSnackbar();
                          } else {
                            setSteps({ step1: false, step2: true, step3: false });
                            window.scroll({
                              top: 0,
                              behavior: "smooth",
                            });
                          }
                        }
                        if (gstNo.length > 0) {
                          console.log(gstNo);
                          if (isValid_GST(gstNo) === false) {
                            setSnackbarErrStatus(true);
                            setErrMessage("Please Enter a Valid GST Number");
                            snackbarRef.current.openSnackbar();
                          } else {
                            setSteps({ step1: false, step2: true, step3: false });
                            window.scroll({
                              top: 0,
                              behavior: "smooth",
                            });
                          }
                        }
                      } else {
                        setSteps({ step1: false, step2: true, step3: false });
                        window.scroll({
                          top: 0,
                          behavior: "smooth",
                        });
                      }
                    }}
                  >
                    <BasicButton text={"Next"} />
                  </div>
                </div>
              ) : null}
              {/* step 2 */}
              {steps.step2 ? (
                <div className="flex flex-col gap-4 items-start w-[90%] px-6 bg-slate-600 rounded-md py-6 mb-[5rem]">
                  <div className="grid sm:grid-rows-3 sm:grid-cols-3 grid-rows-[7] grid-cols-1 w-full mt-6 gap-6 rounded-md bg-slate-600">
                    <div className="sm:col-span-2">
                      <BasicTextFields
                        lable={"Name of Proprietor/Partner/Director/Trustee *"}
                        handleOrderProcessingForm={handleOrderProcessingForm}
                        variant={"standard"}
                        multiline={false}
                      />
                    </div>

                    <BasicTextFields
                      lable={"PAN NO "}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      variant={"standard"}
                      multiline={false}
                    />
                    <BasicTextFields
                      lable={"Address "}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      variant={"standard"}
                      multiline={false}
                    />
                    <BasicTextFields
                      lable={"Pin Code "}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      type={"number"}
                      variant={"standard"}
                      multiline={false}
                    />

                    <BasicTextFields
                      lable={"Phone "}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      type={"number"}
                      variant={"standard"}
                      multiline={false}
                    />
                    <BasicTextFields
                      lable={"Mobile*"}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      type={"number"}
                      variant={"standard"}
                      multiline={false}
                    />
                    <BasicTextFields
                      lable={"E-Mail*"}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      variant={"standard"}
                      multiline={false}
                    />
                  </div>
                  <div className="w-full flex flex-col my-2 gap-2">
                    <h1 className="font-semibold text-gray-100">
                      Name of other Publishers/Suppliers from whom the party has
                      credit facilities:
                    </h1>
                    <div onClick={() => setSuppliers(suppliers + 1)}>
                      {/* <BasicButton text={"Add More"} /> */}
                      <Tooltip title="Add More Names">
                        <Fab color={"red"} size="small" aria-label="add">
                          <Add />
                        </Fab>
                      </Tooltip>
                    </div>

                    <ol className="list-decimal">{handleForm()}</ol>
                  </div>
                  <div
                    onClick={() => {
                      if (
                        // panNoP,
                        // addressP,
                        // pinCodeP,
                        // phoneP,
                        (mobileP, emailP, proprietorName)
                      ) {
                        setSteps({ step1: false, step2: false, step3: true });
                        window.scroll({
                          top: 0,
                          behavior: "smooth",
                        });
                      } else {
                        setSnackbarErrStatus(true);
                        setErrMessage("Please Fill All The Fields");
                        snackbarRef.current.openSnackbar();
                      }
                    }}
                    className="mt-3"
                  >
                    <BasicButton text={"Next"} />
                  </div>
                </div>
              ) : null}
              {/* step 3 */}
              {steps.step3 ? (
                <div className="flex flex-col gap-4 items-start w-[90%] px-6 bg-slate-600 rounded-md py-6 mb-[5rem]">
                  <div className="grid sm:grid-rows-2 sm:grid-cols-3 grid-rows-4 grid-cols-1 w-full mt-6 gap-6 rounded-md bg-slate-600">
                    <div className="sm:col-span-2">
                      <BasicTextFields
                        lable={"Name and address of the party’s main bankers *"}
                        handleOrderProcessingForm={handleOrderProcessingForm}
                        variant={"standard"}
                        multiline={false}
                      />
                    </div>

                    <BasicTextFields
                      lable={"Account Number *"}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      variant={"standard"}
                      type={"number"}
                      multiline={false}
                    />
                    <SearchDropDown
                      Name={"aof_acc"}
                      data={[{ title: "SB" }, { title: "CA" }, { title: "CC" }]}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      label={"Type of A/c "}
                      color={"rgb(243, 244, 246)"}
                    />
                    <BasicTextFields
                      lable={"IFSC *"}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      // type={"number"}
                      variant={"standard"}
                      multiline={false}
                    />
                  </div>
                  <div className="w-full flex flex-col my-2 gap-2">
                    <h1 className="font-semibold text-gray-100">
                      Detail of Cheques * :
                    </h1>
                    <div onClick={() => setCheque(cheque + 1)}>
                      {/* <BasicButton text={"Add More"} /> */}
                      <Tooltip title="Add More Cheque">
                        <Fab color={"red"} size="small" aria-label="add">
                          <Add />
                        </Fab>
                      </Tooltip>
                    </div>
                    <ol className="list-decimal">{handleCheques()}</ol>
                  </div>
                  <div
                    onClick={() => {
                      // console.log(isValid_IFSC_Code(ifscP));
                      console.log(chequeForm);

                      if (
                        !partyBankerName ||
                        !accNoP ||
                        !aofAcc ||
                        !ifscP ||
                        chequeForm.length === 0
                      ) {
                        setSnackbarErrStatus(true);
                        setErrMessage("Please Fill All The Fields");
                        snackbarRef.current.openSnackbar();
                      } else if (chequeForm.length > 0) {
                        for (let obj of chequeForm) {
                          console.log(obj.abc_bank);
                          if (
                            !obj.abc_cheque_no ||
                            obj.abc_cheque_no.length === 0
                          ) {
                            setSnackbarErrStatus(true);
                            setErrMessage("Please Enter Cheque for each field");
                            snackbarRef.current.openSnackbar();
                            break;
                          }
                          if (!obj.abc_bank || obj.abc_bank.length === 0) {
                            setSnackbarErrStatus(true);
                            setErrMessage(
                              "Please Enter Bank Name for each field"
                            );
                            snackbarRef.current.openSnackbar();
                            break;
                          }
                          if (
                            !obj.abc_branch_ifsc ||
                            obj.abc_branch_ifsc.length === 0
                          ) {
                            setSnackbarErrStatus(true);
                            setErrMessage(
                              "Please Enter Bank IFSC for each field"
                            );
                            snackbarRef.current.openSnackbar();
                            break;
                          }
                          if (obj.abc_cheque_link.length === 0) {
                            setSnackbarErrStatus(true);
                            setErrMessage(
                              "Please Upload Cheque image for each field"
                            );
                            snackbarRef.current.openSnackbar();
                            break;
                          } else {
                            console.log("nexttttt");
                            setSteps({
                              step1: false,
                              step2: false,
                              step3: false,
                              step4: true,
                            });
                            window.scroll({
                              top: 0,
                              behavior: "smooth",
                            });
                          }
                        }
                      } else if (isValid_IFSC_Code(ifscP) === false) {
                        setSnackbarErrStatus(true);
                        setErrMessage("Please Enter a Valid IFSC Code");
                        snackbarRef.current.openSnackbar();
                      } else {
                        // console.log("nexttttt");
                        setSteps({
                          step1: false,
                          step2: false,
                          step3: false,
                          step4: true,
                        });
                        window.scroll({
                          top: 0,
                          behavior: "smooth",
                        });
                      }
                      // else if(isValid_IFSC_Code(ifscP) === false){
                      //   setSnackbarErrStatus(true);
                      //   setErrMessage("Please Enter a Valid IFSC Code");
                      //   snackbarRef.current.openSnackbar();
                      // }
                    }}
                    className="mt-3"
                  >
                    <BasicButton text={"Next"} />
                  </div>
                </div>
              ) : null}
              {/* step 4 */}
              {steps.step4 ? (
                <div className="flex flex-col gap-4  md:w-[90%] sm:w-[70%] w-[95%] px-6 bg-slate-600 rounded-md py-6 mb-[5rem] justify-center items-start">
                  <div className="grid sm:grid-rows-2 sm:grid-cols-3 grid-rows-4 grid-cols-1 w-full mt-6 gap-6 rounded-md bg-slate-600">
                    <BasicTextFields
                      lable={"Credit Limit"}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      type={"number"}
                      variant={"standard"}
                      multiline={false}
                    />
                    {/* <div className="sm:col-span-2">
                      <SearchDropDown
                        Name={"cred_lim_type"}
                        data={[{ title: "Thousands" }, { title: "Lacks" }]}
                        handleOrderProcessingForm={handleOrderProcessingForm}
                        label={"Select Credit Type"}
                        color={"rgb(243, 244, 246)"}
                      />
                    </div> */}
                  </div>

                  <div className="w-full flex flex-col my-2 gap-2">
                    <h1 className="font-semibold text-gray-100">
                      Details of persons authorized on behalf of the Distributor
                      to receive the Goods or pick up of Goods from Eupheus’s
                      warehouse:
                    </h1>
                    <div onClick={() => setAuthPerson(authPerson + 1)}>
                      {/* <BasicButton text={"Add More"} /> */}
                      <Tooltip title="Add More Names">
                        <Fab color={"red"} size="small" aria-label="add">
                          <Add />
                        </Fab>
                      </Tooltip>
                    </div>

                    <ol className="list-decimal">{handleAuthForm()}</ol>
                  </div>

                  <div className="flex flex-col justify-center items-start w-full mt-6 rounded-md bg-slate-600">
                    <Accordion
                      defaultExpanded={true}
                      className="w-full !bg-slate-500"
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMore className="!text-gray-100" />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className="!text-gray-100 !font-semibold">
                          TOD
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          <RowRadioButtonsGroup
                            handleRadioButtons={handleRadioButtons}
                            heading={"Applicable"}
                            name={"tod applicable"}
                            value={[
                              { label: "Yes", value: "yes" },
                              { label: "No", value: "no" },
                            ]}
                          />
                        </Typography>
                        {step4.tod.applicable ? (
                          <Typography>
                            <RowRadioButtonsGroup
                              handleRadioButtons={handleRadioButtons}
                              name={"tod type"}
                              value={[
                                {
                                  label: "Overall Business Value",
                                  value: "yes",
                                },
                                // { label: "Specific", value: "no" },
                              ]}
                            />
                          </Typography>
                        ) : null}
                        {step4.tod.type ? (
                          <>
                            <Typography className="!flex !items-center justify-around">
                              {/* <TextField
                                InputLabelProps={{
                                  style: { color: "white" },
                                }}
                                inputProps={{
                                  style: { color: "white" },
                                }}
                                type={"number"}
                                id="outlined-basic"
                                label="Enter Percentage............"
                                handleOrderProcessingForm={
                                  handleOrderProcessingForm
                                }
                                name={"TODpercent"}
                                variant="standard"
                              /> */}
                              <BasicTextFields
                                lable={"Enter Percentage (TOD)"}
                                handleOrderProcessingForm={
                                  handleOrderProcessingForm
                                }
                                type={"number"}
                                variant={"standard"}
                                multiline={false}
                              />
                              <RowRadioButtonsGroup
                                handleRadioButtons={handleRadioButtons}
                                name={"tod"}
                                value={[
                                  {
                                    label: "Gross",
                                    value: "yes",
                                  },
                                  { label: "Net", value: "no" },
                                ]}
                              />
                            </Typography>
                          </>
                        ) : null}
                      </AccordionDetails>
                    </Accordion>
                    <Accordion className="w-full !bg-slate-500">
                      <AccordionSummary
                        expandIcon={<ExpandMore className="!text-gray-100" />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className="!text-gray-100 !font-semibold">
                          Special
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails className="flex flex-col gap-4">
                        <Typography>
                          <RowRadioButtonsGroup
                            handleRadioButtons={handleRadioButtons}
                            heading={"Applicable"}
                            name={"special applicable"}
                            value={[
                              { label: "Yes", value: "yes" },
                              { label: "No", value: "no" },
                            ]}
                          />
                        </Typography>
                        {step4.special.applicable ? (
                          <Typography>
                            <RowRadioButtonsGroup
                              handleRadioButtons={handleRadioButtons}
                              name={"special type"}
                              value={[
                                {
                                  label: "Overall Business Value",
                                  value: "overall",
                                },
                                { label: "Specific", value: "specific" },
                              ]}
                            />
                          </Typography>
                        ) : null}
                        {step4.special.type === "overall" ? (
                          <>
                            <Typography className="!flex !items-center justify-around">
                              {/* <TextField
                                InputLabelProps={{
                                  style: { color: "white" },
                                }}
                                inputProps={{
                                  style: { color: "white" },
                                }}
                                type={"number"}
                                id="outlined-basic"
                                label="Enter Percentage"
                                variant="standard"
                              /> */}
                              <BasicTextFields
                                lable={"Enter Percentage (special)"}
                                handleOrderProcessingForm={
                                  handleOrderProcessingForm
                                }
                                type={"number"}
                                variant={"standard"}
                                multiline={false}
                              />
                              {/* <RowRadioButtonsGroup
                                handleRadioButtons={handleRadioButtons}
                                name={"tod_special"}
                                value={[
                                  {
                                    label: "Gross",
                                    value: "yes",
                                  },
                                  { label: "Net", value: "no" },
                                ]}
                              /> */}
                            </Typography>
                          </>
                        ) : null}
                        {step4.special.type === "specific" ? (
                          <>
                            <Typography className="flex flex-col gap-2">
                              <h1 className="sm:text-base text-sm font-semibold text-gray-100">
                                Select Publisher:
                              </h1>
                              <div className="!flex">
                                <SearchDropDown
                                  Name={"publisher"}
                                  data={publisher}
                                  handleOrderProcessingForm={
                                    handleOrderProcessingForm
                                  }
                                  label={"Select Publisher"}
                                  color={"rgb(243, 244, 246)"}
                                />
                                {/* <div className="!flex justify-end" onClick={handlePublisher}>
                                  <BasicButton text={"Add"} />
                                </div> */}
                              </div>

                              {publisherData.length === 0 ? (
                                ""
                              ) : (
                                <Table
                                  sx={{ minWidth: 650 }}
                                  aria-label="customized table"
                                >
                                  <TableHead className="bg-slate-600">
                                    <TableRow>
                                      <TableCell
                                        className="!w-[8rem]"
                                        align="center"
                                      >
                                        Publisher
                                      </TableCell>
                                      <TableCell
                                        className="!w-[3rem]"
                                        align="center"
                                      >
                                        Percentage
                                      </TableCell>
                                      {/* <TableCell
                                        className="!w-[10rem]"
                                        align="center"
                                      ></TableCell> */}
                                      <TableCell
                                        className="!w-[2rem]"
                                        align="center"
                                      ></TableCell>
                                    </TableRow>
                                  </TableHead>
                                  {publisherData.map((row) => {
                                    return (
                                      <TableBody className="bg-slate-400">
                                        <TableRow
                                          key={"row.series"}
                                          sx={{
                                            "&:last-child td, &:last-child th":
                                              {
                                                border: 0,
                                              },
                                          }}
                                        >
                                          <TableCell align="center">
                                            {row.bp_name}
                                          </TableCell>

                                          <TableCell align="center">
                                            <TextField
                                              // InputLabelProps={{
                                              //   style: { color: "white" },
                                              // }}
                                              // inputProps={{
                                              //   style: { color: "white" },
                                              // }}
                                              onChange={(e) =>
                                                handleTablePercent(
                                                  e.target.value,
                                                  row.fk_category_id
                                                )
                                              }
                                              id="outlined-basic"
                                              label="Enter Percentage"
                                              variant="standard"
                                            />
                                          </TableCell>

                                          {/* <TableCell align="center">
                                            <RowRadioButtonsGroup
                                              handleRadioButtons={
                                                handleRadioButtons
                                              }
                                              name={"publisher"}
                                              value={[
                                                {
                                                  label: "Gross",
                                                  value: "gross",
                                                },
                                                { label: "Net", value: "net" },
                                              ]}
                                              defaultValue={row.fk_category_id}
                                            />
                                          </TableCell> */}

                                          <TableCell align="center">
                                            <div>
                                              <IconButton
                                                type="submit"
                                                aria-label="search"
                                                onClick={() => {
                                                  handleDelete(
                                                    row.fk_category_id,
                                                    "publisher"
                                                  );
                                                }}
                                              >
                                                <Delete
                                                // style={{ fill: "blue" }}
                                                />
                                              </IconButton>
                                            </div>
                                          </TableCell>
                                        </TableRow>
                                      </TableBody>
                                    );
                                  })}
                                </Table>
                              )}
                            </Typography>

                            <div className="w-full flex justify-center">
                              <hr className="text-gray-100 w-[80%] my-4" />
                            </div>
                            <Typography className="flex flex-col gap-2">
                              <h1 className="sm:text-base font-semibold text-sm text-gray-100">
                                Select Series:
                              </h1>
                              <SearchDropDown
                                Name={"series_aof"}
                                data={series}
                                handleOrderProcessingForm={
                                  handleOrderProcessingForm
                                }
                                label={"Select Series"}
                                color={"rgb(243, 244, 246)"}
                              />
                              {seriesData.length === 0 ? (
                                ""
                              ) : (
                                <Table
                                  sx={{ minWidth: 650 }}
                                  aria-label="customized table"
                                >
                                  <TableHead className="bg-slate-600">
                                    <TableRow>
                                      <TableCell
                                        className="!w-[8rem]"
                                        align="center"
                                      >
                                        Series
                                      </TableCell>
                                      <TableCell
                                        className="!w-[3rem]"
                                        align="center"
                                      >
                                        Percentage
                                      </TableCell>
                                      {/* <TableCell
                                        className="!w-[10rem]"
                                        align="center"
                                      ></TableCell> */}
                                      {/* <TableCell
                                      className="!w-[4rem]"
                                      align="center"
                                    >
                                      Select Items
                                    </TableCell> */}
                                      <TableCell
                                        className="!w-[2rem]"
                                        align="center"
                                      ></TableCell>
                                    </TableRow>
                                  </TableHead>

                                  {seriesData.map((row) => {
                                    return (
                                      <TableBody className="bg-slate-400">
                                        <TableRow
                                          key={"row.series"}
                                          sx={{
                                            "&:last-child td, &:last-child th":
                                              {
                                                border: 0,
                                              },
                                          }}
                                        >
                                          <TableCell align="center">
                                            {row.series}
                                          </TableCell>
                                          <TableCell align="center">
                                            <TextField
                                              // InputLabelProps={{
                                              //   style: { color: "white" },
                                              // }}
                                              // inputProps={{
                                              //   style: { color: "white" },
                                              // }}
                                              onChange={(e) =>
                                                handleTablePercent2(
                                                  e.target.value,
                                                  row.fk_category_id
                                                )
                                              }
                                              id="outlined-basic"
                                              label="Enter Percentage"
                                              variant="standard"
                                            />
                                          </TableCell>
                                          {/* <TableCell align="center">
                                            <RowRadioButtonsGroup
                                              handleRadioButtons={
                                                handleRadioButtons
                                              }
                                              name={"series"}
                                              value={[
                                                {
                                                  label: "Gross",
                                                  value: "gross",
                                                },
                                                { label: "Net", value: "net" },
                                              ]}
                                              defaultValue={row.fk_category_id}
                                            />
                                          </TableCell> */}
                                          {/* <TableCell align="center">
                                          <SearchDropDown
                                            Name={"items_aof"}
                                            data={series}
                                            disable={series.length < 1 ? true : false}
                                            multiple={true}
                                            handleOrderProcessingForm={
                                              handleOrderProcessingForm
                                            }
                                            label={"Select Items"}
                                            color={"rgb(243, 244, 246)"}
                                          />
                                        </TableCell> */}
                                          <TableCell align="center">
                                            <div>
                                              <IconButton
                                                type="submit"
                                                aria-label="search"
                                                onClick={() => {
                                                  handleDelete(
                                                    row.fk_category_id,
                                                    "series"
                                                  );
                                                }}
                                              >
                                                <Delete
                                                // style={{ fill: "blue" }}
                                                />
                                              </IconButton>
                                            </div>
                                          </TableCell>
                                        </TableRow>
                                      </TableBody>
                                    );
                                  })}
                                </Table>
                              )}
                            </Typography>

                            <div className="w-full flex justify-center">
                              <hr className="text-gray-100 w-[80%] my-4" />
                            </div>
                            <Typography className="flex flex-col gap-2">
                              <h1 className="sm:text-base font-semibold text-sm text-gray-100">
                                Select Item:
                              </h1>
                              <SearchDropDown
                                Name={"series_aof_item"}
                                data={series}
                                handleOrderProcessingForm={
                                  handleOrderProcessingForm
                                }
                                label={"Select Series"}
                                color={"rgb(243, 244, 246)"}
                              />
                              <SearchDropDown
                                Name={"title_aof"}
                                disable={title.length > 0 ? false : true}
                                data={title}
                                handleOrderProcessingForm={
                                  handleOrderProcessingForm
                                }
                                label={"Select Title"}
                                color={"rgb(243, 244, 246)"}
                              />
                              {/* <div className="flex justify-around items-center">
                                <TextField
                                  InputLabelProps={{
                                    style: { color: "white" },
                                  }}
                                  inputProps={{
                                    style: { color: "white" },
                                  }}
                                  id="outlined-basic"
                                  label="Enter Percentage"
                                  variant="standard"
                                />
                                <RowRadioButtonsGroup
                                  handleRadioButtons={handleRadioButtons}
                                  name={"tod"}
                                  value={[
                                    {
                                      label: "Gross",
                                      value: "yes",
                                    },
                                    { label: "Net", value: "no" },
                                  ]}
                                />
                              </div> */}
                              {itemsData.length === 0 ? (
                                ""
                              ) : (
                                <Table
                                  sx={{ minWidth: 650 }}
                                  aria-label="customized table"
                                >
                                  <TableHead className="bg-slate-600">
                                    <TableRow>
                                      <TableCell
                                        className="!w-[8rem]"
                                        align="center"
                                      >
                                        Title
                                      </TableCell>
                                      <TableCell
                                        className="!w-[3rem]"
                                        align="center"
                                      >
                                        Percentage
                                      </TableCell>
                                      {/* <TableCell
                                        className="!w-[10rem]"
                                        align="center"
                                      ></TableCell> */}
                                      <TableCell
                                        className="!w-[2rem]"
                                        align="center"
                                      ></TableCell>
                                    </TableRow>
                                  </TableHead>
                                  {itemsData.map((row) => {
                                    return (
                                      <TableBody className="bg-slate-400">
                                        <TableRow
                                          key={row.fk_category_id}
                                          sx={{
                                            "&:last-child td, &:last-child th":
                                              {
                                                border: 0,
                                              },
                                          }}
                                        >
                                          <TableCell align="center">
                                            {row.series}
                                          </TableCell>
                                          <TableCell align="center">
                                            <TextField
                                              // InputLabelProps={{
                                              //   style: { color: "white" },
                                              // }}
                                              // inputProps={{
                                              //   style: { color: "white" },
                                              // }}
                                              onChange={(e) =>
                                                handleTablePercent3(
                                                  e.target.value,
                                                  row.fk_category_id
                                                )
                                              }
                                              id="outlined-basic"
                                              label="Enter Percentage"
                                              variant="standard"
                                            />
                                          </TableCell>
                                          {/* <TableCell align="center">
                                            <RowRadioButtonsGroup
                                              handleRadioButtons={
                                                handleRadioButtons
                                              }
                                              name={"items"}
                                              value={[
                                                {
                                                  label: "Gross",
                                                  value: "gross",
                                                },
                                                { label: "Net", value: "net" },
                                              ]}
                                              defaultValue={row.fk_category_id}
                                            />
                                          </TableCell> */}
                                          <TableCell align="center">
                                            <div>
                                              <IconButton
                                                type="submit"
                                                aria-label="search"
                                                onClick={() => {
                                                  handleDelete(
                                                    row.fk_category_id,
                                                    "items"
                                                  );
                                                }}
                                              >
                                                <Delete
                                                // style={{ fill: "blue" }}
                                                />
                                              </IconButton>
                                            </div>
                                          </TableCell>
                                        </TableRow>
                                      </TableBody>
                                    );
                                  })}
                                </Table>
                              )}
                            </Typography>

                            <div className="w-full flex justify-center">
                              <hr className="text-gray-100 w-[80%] my-4" />
                            </div>
                            <Typography className="flex flex-col gap-2">
                              <h1 className="sm:text-base font-semibold text-sm text-gray-100">
                                Select Schools:
                              </h1>
                              <SearchDropDown
                                Name={"schools_aof"}
                                data={allSchool}
                                handleOrderProcessingForm={
                                  handleOrderProcessingForm
                                }
                                label={"Select School"}
                                color={"rgb(243, 244, 246)"}
                              />
                              {schoolData.length === 0 ? (
                                ""
                              ) : (
                                <Table
                                  sx={{ minWidth: 650 }}
                                  aria-label="customized table"
                                >
                                  <TableHead className="bg-slate-600">
                                    <TableRow>
                                      <TableCell
                                        className="!w-[8rem]"
                                        align="center"
                                      >
                                        Schools
                                      </TableCell>
                                      <TableCell
                                        className="!w-[3rem]"
                                        align="center"
                                      >
                                        Percentage
                                      </TableCell>
                                      {/* <TableCell
                                        className="!w-[10rem]"
                                        align="center"
                                      ></TableCell> */}
                                      {/* <TableCell
                                      className="!w-[4rem]"
                                      align="center"
                                    >
                                      Select Items
                                    </TableCell> */}
                                      <TableCell
                                        className="!w-[2rem]"
                                        align="center"
                                      ></TableCell>
                                    </TableRow>
                                  </TableHead>

                                  {schoolData.map((row) => {
                                    return (
                                      <TableBody className="bg-slate-400">
                                        <TableRow
                                          key={"row.series"}
                                          sx={{
                                            "&:last-child td, &:last-child th":
                                              {
                                                border: 0,
                                              },
                                          }}
                                        >
                                          <TableCell align="center">
                                            {row.school_name}
                                          </TableCell>
                                          <TableCell align="center">
                                            <TextField
                                              // InputLabelProps={{
                                              //   style: { color: "white" },
                                              // }}
                                              // inputProps={{
                                              //   style: { color: "white" },
                                              // }}
                                              onChange={(e) =>
                                                handleTablePercent2(
                                                  e.target.value,
                                                  row.fk_category_id
                                                )
                                              }
                                              id="outlined-basic"
                                              label="Enter Percentage"
                                              variant="standard"
                                            />
                                          </TableCell>
                                          {/* <TableCell align="center">
                                            <RowRadioButtonsGroup
                                              handleRadioButtons={
                                                handleRadioButtons
                                              }
                                              name={"series"}
                                              value={[
                                                {
                                                  label: "Gross",
                                                  value: "gross",
                                                },
                                                { label: "Net", value: "net" },
                                              ]}
                                              defaultValue={row.fk_category_id}
                                            />
                                          </TableCell> */}
                                          {/* <TableCell align="center">
                                          <SearchDropDown
                                            Name={"items_aof"}
                                            data={series}
                                            disable={series.length < 1 ? true : false}
                                            multiple={true}
                                            handleOrderProcessingForm={
                                              handleOrderProcessingForm
                                            }
                                            label={"Select Items"}
                                            color={"rgb(243, 244, 246)"}
                                          />
                                        </TableCell> */}
                                          <TableCell align="center">
                                            <div>
                                              <IconButton
                                                type="submit"
                                                aria-label="search"
                                                onClick={() => {
                                                  handleDelete(
                                                    row.fk_category_id,
                                                    "series"
                                                  );
                                                }}
                                              >
                                                <Delete
                                                // style={{ fill: "blue" }}
                                                />
                                              </IconButton>
                                            </div>
                                          </TableCell>
                                        </TableRow>
                                      </TableBody>
                                    );
                                  })}
                                </Table>
                              )}
                            </Typography>
                          </>
                        ) : null}
                      </AccordionDetails>
                    </Accordion>
                    <Accordion className="w-full !bg-slate-500">
                      <AccordionSummary
                        expandIcon={<ExpandMore className="!text-gray-100" />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className="!text-gray-100 !font-semibold">
                          Cash
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          <RowRadioButtonsGroup
                            handleRadioButtons={handleRadioButtons}
                            // heading={"Applicable"}
                            name={"cash"}
                            value={[
                              { label: "Yes", value: "yes" },
                              { label: "No", value: "no" },
                            ]}
                          />
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </div>

                  <div className="grid sm:grid-rows-2 sm:grid-cols-3 grid-rows-4 grid-cols-1 w-full mt-6 gap-6 rounded-md bg-slate-600">
                    <BasicTextFields
                      lable={"Remarks"}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      // type={"number"}
                      variant={"standard"}
                      multiline={false}
                    />
                  </div>

                  <div onClick={handleDataSubmit}>
                    <BasicButton text={"Submit"} />
                  </div>

                  {/* {showTod ? (
                      <div className="mt-3">
                        <BasicButton text={"Submit"} />
                      </div>
                    ) : null} */}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AOFcreate;
