import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { ArrowForwardIos } from "@mui/icons-material";
import { Link } from "react-router-dom";
import DataTable from "../Components/DataTable";
import SearchDropDown from "../Components/SearchDropDown";
import { TaggingRows } from "../DummyData";
import Button from "../Components/Material/Button";
import SwipeableTemporaryDrawer from "../Components/Material/MaterialSidebar";
import { useLayoutEffect } from "react";
import Cookies from "js-cookie";
import instance from "../Instance";
import { Backdrop, Box, CircularProgress, Fade, Modal } from "@mui/material";
import BasicButton from "../Components/Material/Button";
import Snackbars from "../Components/Material/SnackBar";

const Tagging = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [highLight, setHighLight] = useState("tagging");
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [schoolRow, setSchoolRow] = useState([]);
  const [open, setOpen] = useState(false);
  const [tagger, setTagger] = useState({});
  const [schoolId, setSchoolId] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [snackbarErrStatus, setSnackbarErrStatus] = useState(true);
  const [stateId, setStateId] = useState("");
  const [unTagModel, setUntagModel] = useState(false);

  const sidebarRef = useRef();
  const snackbarRef = useRef();

  const navInfo = {
    title: "Tagging",
    details: ["Home", " / Tagging"],
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: window.screen.width > 500 ? 400 : 300,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
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
    getStates();
  }, []);

  const Tablecolumns = [
    // { field: 'CrmId', headerName: 'CRM ID', width: 70 },
    { field: "SchoolName", headerName: "School Name", width: 280 },
    { field: "Address", headerName: "Address", width: 500 },
    { field: "Tagged", headerName: "Tagged", width: 70 },
  ];

  const handleSidebarCollapsed = () => {
    // setSidebarCollapsed(!sidebarCollapsed);
    sidebarRef.current.openSidebar();
  };

  const getSchoolByState = async (id) => {
    // console.log(id)
    setStateId(id);
    setLoading(true);
    const res = await instance({
      url: `school/get/schools/state/${id}`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    // console.log(res.data.message)
    const rows = res.data.message.map((item, index) => {
      return {
        id: item?.id,
        SchoolName: item?.school_name,
        Tagged: item?.tag.charAt(0).toUpperCase() + item?.tag.slice(1),
        Address: item?.school_addresses[0]?.address,
      };
    });
    setSchoolRow(rows);
    setLoading(false);
  };
  const getTaggerName = async (id) => {
    setLoading(true);
    const res = await instance({
      url: `school/get/school/userdetail/${id}`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    setTagger(res.data.message[0]);
    setLoading(false);
  };

  const handleTaggingClick = (id) => {
    setLoading(true);
    const school = schoolRow.find((item) => item.id === id);
    // console.log(school)
    setSchoolId(school?.id);
    if (school?.Tagged === "No") {
      getTaggerName(id[0]);

      setOpen(true);
    } else if (school?.Tagged === "Yes") {
      getTaggerName(id[0]);

      setUntagModel(true);
    }
    setLoading(false);
  };

  const handleOrderProcessingForm = async (value, type) => {
    switch (type) {
      case "select_state":
        getSchoolByState(value.fk_state_id);
        break;
    }
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
    return () => {
      window.removeEventListener("resize", handleWidth);
    };
  }, []);

  const handleClose = () => setOpen(false);

  const handleTagging = async (type) => {
    setLoading(true);
    if (type === "tag") {
      const res = await instance({
        url: `school/post/school/updatetagging`,
        method: "POST",
        data: {
          fk_school_id: schoolId,
          current_user: tagger.fk_user_id,
        },
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      });
      setOpen(false);
      if (res.data.status === "success") {
        getSchoolByState(stateId);
        setSnackbarErrStatus(false);
        setErrMessage(res.data.message);
        snackbarRef.current.openSnackbar();
      }
    } else if (type === "untag") {
      const res = await instance({
        url: `school/post/school/untag`,
        method: "POST",
        data: {
          id: schoolId,
        },
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      });
      setUntagModel(false);
      if (res.data.status === "success") {
        getSchoolByState(stateId);
        setSnackbarErrStatus(false);
        setErrMessage(res.data.message);
        snackbarRef.current.openSnackbar();
      }
    }
    setLoading(false);
  };
  console.log(tagger);
  return (
    <div className="flex">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style} className="!flex !flex-col !gap-4">
            <div className="sm:text-xl text-sm">
              This School Is tagged With{" "}
              {tagger.fk_user
                ? tagger?.fk_user?.first_name +
                  tagger?.fk_user?.middle_name +
                  tagger?.fk_user?.last_name
                : "No One"}{" "}
              Do you want to change it ?
            </div>
            <div className="w-full flex gap-2">
              <div onClick={() => handleTagging("tag")}>
                <BasicButton text={"Yes"} />
              </div>
              <div onClick={handleClose}>
                <BasicButton text={"No"} />
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={unTagModel}
        onClose={() => setUntagModel(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={unTagModel}>
          <Box sx={style} className="!flex !flex-col !gap-4">
            <div className="sm:text-xl text-sm">Do you want Untag School</div>
            <div className="w-full flex gap-2">
              <div onClick={() => handleTagging("untag")}>
                <BasicButton text={"Yes"} />
              </div>
              <div onClick={() => setUntagModel(false)}>
                <BasicButton text={"No"} />
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
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
        className={`flex flex-col w-[100vw] transition-all duration-300 ease-linear lg:w-[83vw] lg:ml-[18vw] ${
          sidebarCollapsed ? null : "md:ml-[30vw] ml-[60vw]"
        }`}
      >
        <Navbar
          handleSidebarCollapsed={handleSidebarCollapsed}
          info={navInfo}
        />
        <Snackbars
          ref={snackbarRef}
          snackbarErrStatus={snackbarErrStatus}
          errMessage={errMessage}
        />
        <div className="min-h-[100vh] pt-[2vh] max-h-full bg-[#141728]">
          <div className=" sm:px-8 px-2 py-3 bg-[#141728]">
            {/* <section className='grid grid-cols-2 grid-rows-4 md:grid-cols-4 gap-4 md:grid-rows-2 px-6 py-6 bg-slate-600 rounded-md mt-6'>
              <div className=' flex flex-col gap-2 w-full'>
                <label className=' text-gray-100'>Country</label>

                <SearchDropDown
                  label={'Select Country'}
                  color={'rgb(243, 244, 246)'}
                />
              </div>
              <div className=' flex flex-col gap-2 w-full'>
                <label className='text-gray-100'>State</label>

                <SearchDropDown
                  label={'Select State'}
                  color={'rgb(243, 244, 246)'}
                />
              </div>
              <div className=' flex flex-col gap-2 w-full'>
                <label className='text-gray-100'>City</label>

                <SearchDropDown
                  label={'Select City'}
                  color={'rgb(243, 244, 246)'}
                />
              </div>
              <div className=' flex flex-col gap-2 w-full'>
                <label className='text-gray-100'>Board</label>

                <SearchDropDown
                  label={'Select Board'}
                  color={'rgb(243, 244, 246)'}
                />
              </div>
              <div className=' flex flex-col gap-2 w-full col-span-2 md:col-span-3'>
                <label className='text-gray-100'>School</label>

                <SearchDropDown
                  label={'Select School'}
                  color={'rgb(243, 244, 246)'}
                />
              </div>
             
              <div className='md:mt-8 md:ml-8 mt-4'>
                <Button text={'Search'} />
              </div>
            </section> */}
            <section className="flex px-6 py-6 bg-slate-600 items-end gap-4 md:gap-4 rounded-md mt-6">
              <div className=" flex flex-col gap-2 w-full">
                <label className="text-gray-100">Select State</label>

                <SearchDropDown
                  label={"Select State"}
                  handleOrderProcessingForm={handleOrderProcessingForm}
                  color={"rgb(243, 244, 246)"}
                  data={states}
                  Name="select_state"
                />
              </div>

              {/* <div className='mt-8'>
                <Button text={'Search'} />
              </div> */}
            </section>
            <DataTable
              handleTaggingClick={handleTaggingClick}
              rows={schoolRow}
              checkbox={false}
              Tablecolumns={Tablecolumns}
              tableName="Tagging"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tagging;
