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
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const ManageSchool = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [highLight, setHighLight] = useState("manageSchool");
  const [loading, setLoading] = useState(false);
  const sidebarRef = useRef();
  const [states, setStates] = useState([]);
  const [city, setCity] = useState([]);
  const [cityAvl, setCityAvl] = useState(true);
  const [represen, setRepresen] = useState([]);
  const [Row, setRow] = useState([]);
  const [id, setId] = useState({
    user_id: "",
    state_id: "",
    city_id: "",
  });
  const navInfo = {
    title: "Manage School",
    details: ["Home", " / Manage School"],
  };

  const Tablecolumns = [
    { field: "SchoolName", headerName: "School Name", width: 300 },
    {
      field: "State",
      headerName: "State",
      width: 120,
    },
    {
      field: "Address",
      headerName: "Address",
      width: 400,
    },
  ];

  const handleSidebarCollapsed = () => {
    sidebarRef.current.openSidebar();
  };

  useEffect(() => {
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

  const getRowData = async () => {
    setLoading(true);
    const res = await instance({
      url: `school//get/allUserAndRepSchool`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });

    const data = res.data.message;
    // console.log(data);

    const rows = res.data.message.map((item, index) => {
      return {
        id: item?.id,
        SchoolName: item?.school_name,
        State: item?.school_addresses[0]?.fk_state?.state,
        Address: item?.school_addresses[0]?.address,
        repId: item?.fk_user_id,
        stateId: item?.school_addresses[0]?.fk_state.id,
        cityId: item?.school_addresses[0]?.fk_city_id,
      };
    });
    setRow(rows);
    // setTemprow(rows);
    console.log(rows);
    // setRow(data);
    setLoading(false);
  };

  const returnRowData = () => {
    if (!id.user_id && !id.city_id && !id.state_id) {
      // console.log("test");
      return Row;
    } else {
      // switch (id) {
      // single condition
      if (id.user_id && !id.city_id && !id.state_id) {
        return Row.filter((item) => item.repId === id.user_id);
      }

      if (!id.user_id && id.city_id && !id.state_id) {
        return Row.filter((item) => item.cityId === id.city_id);
      }
      if (!id.user_id && !id.city_id && id.state_id) {
        return Row.filter((item) => item.stateId === id.state_id);
      }
      if (id.user_id && id.city_id && !id.state_id) {
        return Row.filter(
          (item) => item.repId === id.user_id && item.cityId === id.city_id
        );
      }
      if (!id.user_id && id.city_id && id.state_id) {
        return Row.filter(
          (item) => item.cityId === id.city_id && item.stateId === id.state_id
        );
      }
      if (id.user_id && !id.city_id && id.state_id) {
        return Row.filter(
          (item) => item.repId === id.user_id && item.stateId === id.state_id
        );
      }
      if (id.user_id && id.city_id && id.state_id) {
        return Row.filter(
          (item) =>
            item.repId === id.user_id &&
            item.stateId === id.state_id &&
            item.cityId === id.city_id
        );
      }

      // }
    }
  };

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  let columnsName = ["School Name", "Address", "State"];

  const exportToCSV = async () => {
    let dataToExport = returnRowData();
    // console.log(dataToExport);
    let reqExportData = [];
    for (let obj of dataToExport) {
      let reqObj = {
        SchoolName: obj.SchoolName,
        Address: obj.Address,
        State: obj.State,
      };
      reqExportData.push(reqObj);
    }
    // console.log(reqExportData);

    let fileName = "excelData";
    // let keysName = Object.keys(apiData[0])
    //   console.log(rowsName)
    const ws = XLSX.utils.json_to_sheet(reqExportData);
    /* custom headers */
    XLSX.utils.sheet_add_aoa(ws, [columnsName], {
      // XLSX.utils.sheet_add_aoa(ws, [keysName], {
      origin: "A1",
    });
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  // const csvData = json2csv.parse(returnRowData());
  // let csvData;
  // jsonexport(returnRowData(), function (err, csv) {
  //   if (err) return console.error(err);
  //   csvData = csv;
  // });
  // const encodedUri = encodeURI(`data:text/csv;charset=utf-8,${csvData}`);

  // console.log(id);

  const handleOrderProcessingForm = async (value, type) => {
    // console.log(value, type);
    switch (type) {
      case "select_state":
        // console.log(value);
        let stateId = value.id;
        setId({ ...id, state_id: stateId });
        // console.log(stateId);
        getCity(stateId);

        break;
      case "select_city":
        let ciId = value.id;
        setId({ ...id, city_id: ciId });

        break;
      case "select_represent":
        let rpId = value.fk_user.id;
        setId({ ...id, user_id: rpId });

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
    console.log(res.data.message);
    setCity(res.data.message);
    setCityAvl(false);
    setLoading(false);
  };

  useLayoutEffect(() => {
    const getRepres = async () => {
      const res = await instance({
        url: "user/getRelatedUser",
        method: "GET",
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      });
      // console.log(res.data.message);

      setRepresen(res.data.message);
    };
    const getStates = async () => {
      const res = await instance({
        url: "location/state/get/states/byUserAndRep",
        method: "GET",
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      });
      console.log(res.data.message);

      setStates(res.data.message);
      // const data = res.data.message;
      // const datarow = data.filter((data) => data.school_name);
      // console.log("DATA", datarow);
    };

    getStates();
    getRepres();
    getRowData();
  }, []);

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
        <div className="min-h-[100vh] pt-[2vh] max-h-full bg-[#141728]">
          <div className=" sm:px-8 px-2 py-3 bg-[#141728]">
            <div className="grid grid-cols-2 grid-rows-2 md:flex md:justify-around md:items-center px-6 mb-8 py-3 mt-6 gap-6 rounded-md bg-slate-600">
              <div className="flex flex-col gap-2 w-full md:w-[20vw]">
                <label className="text-gray-100">Representative</label>

                <SearchDropDown
                  label={"Select Representative"}
                  handleOrderProcessingForm={handleOrderProcessingForm}
                  color={"rgb(243, 244, 246)"}
                  data={represen}
                  Name="select_represent"
                />
              </div>
              <div className="flex flex-col gap-2 w-full md:w-[20vw]">
                <label className="text-gray-100">State</label>

                <SearchDropDown
                  label={"Select State"}
                  handleOrderProcessingForm={handleOrderProcessingForm}
                  color={"rgb(243, 244, 246)"}
                  data={states}
                  Name="state"
                />
              </div>
              <div className=" flex flex-col gap-2 w-full md:w-[20vw]">
                <label className="text-gray-100">City</label>

                <SearchDropDown
                  label={"Select City"}
                  handleOrderProcessingForm={handleOrderProcessingForm}
                  color={"rgb(243, 244, 246)"}
                  disable={cityAvl}
                  data={city}
                  Name="select_city"
                />
              </div>
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
              </div> */}
            </div>
            <div className="w-full flex gap-3 justify-end">
              <a onClick={exportToCSV}>
                <BasicButton text={"Export to EXCEL"} />
              </a>
              <Link to="/addschool">
                <BasicButton text={"Create New School"} />
              </Link>
              <Link to="/tagging">
                <BasicButton text={"Tag Existing School"} />
              </Link>
            </div>

            <DataTable
              rows={returnRowData()}
              checkbox={false}
              Tablecolumns={Tablecolumns}
              tableName="ManageSchool"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageSchool;
