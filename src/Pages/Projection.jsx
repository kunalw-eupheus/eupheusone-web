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
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import DialogSlide from "../Components/Material/Dialog";




const ManageSchool = () => {

    const [open, setOpen] = useState(false);
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


  const handleClose = () => {
    setOpen(false);
  };

  const openDialog = () => {
    // dialogRef.current.openDialog();
  };


  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [highLight, setHighLight] = useState("projection");
  const [loading, setLoading] = useState(false);
  const [stateAndCity, setStateAndCity] = useState({ state: "", city: "" });
  const sidebarRef = useRef();
  const [states, setStates] = useState([]);
  const [city, setCity] = useState({ disable: true });
  const [schoolRow, setSchoolRow] = useState([]);
  const navInfo = {
    title: "Projection",
    details: ["Home", " / Projection"],
  };

  const dialogRef = useRef();

  const Tablecolumns = [
    { field: "Series", headerName: "Series", width: 300 },
    {
      field: "Grades",
      headerName: "Grades",
      width: 120,
    },
    {
      field: "MRP",
      headerName: "MRP",
      width: 400,
    },
    {
        field: "Quantity",
        headerName: "Quantity",
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

  const getSchool = async (stateId, cityId) => {
    setLoading(true);
    const res = await instance({
      url: `school/${stateId}/${cityId}`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    // console.log(res.data.message);
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
      // console.log(res.data.message);
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
  

  return (
    <div className="flex bg-[#111322]">

        <DialogSlide ref={dialogRef} />

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

            
            <div className="w-full flex gap-3 justify-end">
              <Link to="/addprojection"
            //   onClick={handleClickOpen}
              onClick={openDialog}>
                <BasicButton text={"ADD PROJECTION"} />
              </Link>
            </div>

            <DataTable
              rows={schoolRow}
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
