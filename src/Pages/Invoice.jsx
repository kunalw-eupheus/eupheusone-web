import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
// import { Add } from '@mui/icons-material'
import { Link } from "react-router-dom";
import DataTable from "../Components/DataTable";
// import { rows, ManageSchoolRows } from '../DummyData'
import SearchDropDown from "../Components/SearchDropDown";
import SwipeableTemporaryDrawer from "../Components/Material/MaterialSidebar";
import instance from "../Instance";
import { useLayoutEffect } from "react";
import Cookies from "js-cookie";
import BasicButton from "../Components/Material/Button";
import { Backdrop, CircularProgress } from "@mui/material";
import * as XLSX from "xlsx";
import Snackbars from "../Components/Material/SnackBar";


const Invoice = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [highLight, setHighLight] = useState("invoice");
  const [loading, setLoading] = useState(false);
  const [stateAndCity, setStateAndCity] = useState({ state: "", city: "" });
  const sidebarRef = useRef();
  const [states, setStates] = useState([]);
  const [city, setCity] = useState({ disable: true });
  const [schoolRow, setSchoolRow] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [snackbarErrStatus, setSnackbarErrStatus] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const navInfo = {
    title: "Invoice",
    details: ["Home", " / Invoice"],
  };

  const Tablecolumns = [
    { field: "CustomerName", headerName: "Customer Name", width: 300 },
    {
      field: "InvoiceDate",
      headerName: "Invoice Date",
      width: 180,
    },
    {
      field: "InvoiceNo",
      headerName: "Invoice No",
      width: 200,
    },
    {
      field: "TotalQuantity",
      headerName: "Total Quantity",
      width: 150,
    },
    {
      field: "TotalAmount",
      headerName: "Total Amount",
      width: 150,
    },
  ];

  const handleSidebarCollapsed = () => {
    sidebarRef.current.openSidebar();
  };

  const mystyle = {
    fontfamily: "sans-serif",
    textalign: "center",
  };

  const [uploaditems, setUploadItems] = useState([]);

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        console.log(data);
        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setUploadItems(d);
    });
  };


  const saveExcelData2 =async () => {
    if(uploaditems.length === 0){
      setSnackbarErrStatus(true)
      setSnackbarMsg('Select a File');
      snackbarRef.current.openSnackbar();
    }else{
      console.log(uploaditems)
      // const userType = Cookies.get("type")
      const res = await instance({
        url: "invoices/create",
        method: "POST",
        data: uploaditems,
        // {
        //   fk_bp_id: formik.values.fk_bp_id,
        //   quantity: value.quantity,
        //   items: formik.values.items.map((item) => {
        //     return { fk_item_id: item.id, quantity: item.quantity };
        //   }),
        // },
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      })
      // .then((res)=>{
      //   console.log(res)
      // }).catch((err)=>{
      //   console.log(err)
      // })
      console.log(res)

      if (res.data.status === "success") {
        console.log("userType")
      setSnackbarErrStatus(false)
      setSnackbarMsg('Data Saved Successfull');
      snackbarRef.current.openSnackbar();

      }  
    }
  }


  const saveExcelData =async () => {
    if(uploaditems.length === 0){
      setSnackbarErrStatus(true)
      setSnackbarMsg('Select a File');
      snackbarRef.current.openSnackbar();
    }else{
      let arrChunk = []
      const chunkSize = 1000;
      for (let i = 0; i < uploaditems.length; i += chunkSize) {
          const chunk = uploaditems.slice(i, i + chunkSize);
          arrChunk.push(chunk)
      }
      console.log(arrChunk)
      let j = 0
      while( j < arrChunk.length){
        console.log(arrChunk[j])
        console.log('------------------')
        // const res = await instance({
        //   url: "invoices/create",
        //   method: "POST",
        //   data: arrChunk[j],
        //   headers: {
        //     Authorization: Cookies.get("accessToken"),
        //   },
        // })
        // console.log(res)
  
        // if (res.data.status === "success") {
        //   console.log(j, " index data saved")
          j++
        // }
      }
    }
  }
  


  useEffect(() => {

    const userType = Cookies.get("type")
    if(userType === "admin") setIsAdmin(true)

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

  const getSchool = async (stateId, cityId) => {
    setLoading(true);
    const res = await instance({
      url: `school/${stateId}/${cityId}`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    console.log(res.data.message);
    const rows = res.data.message.map((item, index) => {
      return {
        id: item.id,
        SchoolName: item.school_name,
        State: item.school_addresses[0].fk_state.state,
        Address: item.school_addresses[0].address,
      };
    });
    setSchoolRow(rows);
    setLoading(false);
  };

  const getSchoolByState = async (id) => {
    setLoading(true);

    const res = await instance({
      url: `school/${id}`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    const rows = res.data.message.map((item, index) => {
      return {
        id: item.id,
        SchoolName: item.school_name,
        State: item.school_addresses[0].fk_state.state,
        Address: item.school_addresses[0].address,
      };
    });
    setSchoolRow(rows);
    setLoading(false);
  };

  const handleOrderProcessingForm = async (value, type) => {
    switch (type) {
      case "select_state":
        getCity(value.fk_state_id);
        getSchoolByState(value.fk_state_id);
        setStateAndCity({ ...stateAndCity, state: value.fk_state_id });
        break;
      case "select_city":
        setStateAndCity({ ...stateAndCity, city: value.id });
        break;
      default:
        break;
    }
  };

  const getCity = async (Id) => {
    setLoading(true);
    const res = await instance({
      url: `location/city/${Id}`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    setCity(res.data.message);
    setLoading(false);
  };

  useLayoutEffect(() => {
    const getStates = async () => {
      const res = await instance({
        url: "location/state/get/states",
        method: "GET",
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      });

      setStates(res.data.message);
    };

    const getSchoolData = async () => {
      const res = await instance({
        url: "school/b4c27059-8c42-4d35-8fe7-8dedffbfe641/294de4f3-0977-4482-b0de-2cfeaa827ba4",
        method: "GET",
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      });
      console.log(res.data.message);
      const rows = res.data.message.map((item, index) => {
        return {
          id: item.id,
          SchoolName: item.school_name,
          State: item.school_addresses[0].fk_state.state,
          Address: item.school_addresses[0].address,
        };
      });
      setSchoolRow(rows);
    };
    getStates();

    getSchoolData();
  }, []);

  const snackbarRef = useRef();

  let tempData = [
    {
      id: 12,
      CustomerName: "FirstName",
      InvoiceDate: "12/03/2022",
      InvoiceNo: "123",
      TotalQuantity: "4",
      TotalAmount: "350",
    },
    {
      id: 23,
      CustomerName: "SecondName",
      InvoiceDate: "25/03/2022",
      InvoiceNo: "234",
      TotalQuantity: "3",
      TotalAmount: "320",
    },
    {
      id: 34,
      CustomerName: "ThirdName",
      InvoiceDate: "08/07/2022",
      InvoiceNo: "345",
      TotalQuantity: "14",
      TotalAmount: "1250",
    },
    {
      id: 45,
      CustomerName: "FourthName",
      InvoiceDate: "22/09/2022",
      InvoiceNo: "456",
      TotalQuantity: "23",
      TotalAmount: "950",
    },
    {
      id: 56,
      CustomerName: "FifthName",
      InvoiceDate: "21/11/2022",
      InvoiceNo: "567",
      TotalQuantity: "41",
      TotalAmount: "800",
    },
    {
      id: 67,
      CustomerName: "SixthName",
      InvoiceDate: "16/09/2022",
      InvoiceNo: "678",
      TotalQuantity: "9",
      TotalAmount: "650",
    },
    {
      id: 78,
      CustomerName: "SeventhName",
      InvoiceDate: "28/03/2022",
      InvoiceNo: "789",
      TotalQuantity: "6",
      TotalAmount: "100",
    },
    {
      id: 89,
      CustomerName: "EighthName",
      InvoiceDate: "19/08/2022",
      InvoiceNo: "890",
      TotalQuantity: "18",
      TotalAmount: "300",
    },
  ];

  return (
    <div>
     <Snackbars
        ref={snackbarRef}
        snackbarErrStatus={snackbarErrStatus}
        errMessage={snackbarMsg}
      />
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
        <div className="min-h-[100vh] pt-[0vh] max-h-full bg-[#141728]">
          <div className=" sm:px-8 px-2 py-3 bg-[#141728]">
            {/* <div className="grid grid-cols-2 grid-rows-2 md:flex md:justify-around md:items-center px-6 mb-8 py-3 mt-6 gap-6 rounded-md bg-slate-600">
              <div className="flex flex-col gap-2 w-full md:w-[20vw]">
                <label className="text-gray-100">State</label>

                <SearchDropDown
                  label={"Select State"}
                  handleOrderProcessingForm={handleOrderProcessingForm}
                  color={"rgb(243, 244, 246)"}
                  data={states}
                  Name="select_state"
                />
              </div>
              <div className=" flex flex-col gap-2 w-full md:w-[20vw]">
                <label className="text-gray-100">City</label>

                <SearchDropDown
                  label={"Select City"}
                  handleOrderProcessingForm={handleOrderProcessingForm}
                  color={"rgb(243, 244, 246)"}
                  disable={city.disable}
                  data={city}
                  Name="select_city"
                />
              </div> */}
            {/* <button className="w-full md:w-[20vw] col-span-2 md:ml-10 focus:outline-0 mt-8 text-gray-300 hover:shadow-md h-10 bg-slate-500 transition-all duration-200 ease-linear active:bg-slate-700 active:scale-95 rounded-md">
                Search School
              </button> */}
            {/* <div
                className="sm:w-auto w-[50vw]"
                onClick={() => {
                  if (stateAndCity.state && stateAndCity.city) {
                    getSchool(stateAndCity.state, stateAndCity.city);
                  }
                }}
              >
                <BasicButton text={"Search School"} />
              </div>
            </div>
            <div className="w-full flex gap-3 justify-end">
              <Link to="/addschool">
                <BasicButton text={"Create New School"} />
              </Link>
              <Link to="/tagging">
                <BasicButton text={"Tag Existing School"} />
              </Link>
            </div> */}

            {isAdmin ? 
              <div className="grid grid-cols-2 grid-rows-0  md:flex md:justify-between sm:justify-between md:items-center sm:items-center px-6 mb-8 py-3 gap-6 rounded-md bg-slate-600">
              <h1 className="text-gray-100">UPLOAD INVOICE</h1>

              <div cstyle={mystyle}>
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    readExcel(file);
                  }}
                />
              </div>

              <Link onClick={saveExcelData}>
                <BasicButton text={"Upload"} />
              </Link>
            </div>
            :
            ""}

            <DataTable
              rows={tempData}
              checkbox={false}
              Tablecolumns={Tablecolumns}
              tableName="Invoice"
            />
          </div>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default Invoice;
