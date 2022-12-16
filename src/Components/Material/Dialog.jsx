import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import SearchDropDown from "../SearchDropDown";
import BasicTextFields from "./TextField";
import BasicButton from "./Button";
import { useLayoutEffect } from "react";
import instance from "../../Instance";
import { useState } from "react";
import Cookies from "js-cookie";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogSlide = React.forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);
  const [series, setSeries] = useState([]);
  const [grade, setGrade] = useState([]);

  useLayoutEffect(() => {
    const getAllSeries = async () => {
      const res = await instance({
        url: `series/get/all`,
        method: "GET",
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      });
      setSeries(res.data.message);
      //   console.log(res.data.message);
    };
    const getAllGrade = async () => {
      const res = await instance({
        url: `grades/getAll`,
        method: "GET",
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      });
      setGrade(res.data.message);
      //   console.log(res.data.message);
    };
    getAllSeries();
    getAllGrade();
  }, []);

  React.useImperativeHandle(ref, () => ({
    openDialog() {
      setOpen(true);
    },
  }));

  const handleButtonClick = () => {
    props.handleDialogButton();
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
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
        maxWidth={"md"}
        fullWidth
      >
        <DialogContent className="!bg-gray-500">
          <DialogContentText
            id="alert-dialog-slide-description"
            className="!text-gray-600 !sm:text-base !text-sm grid sm:grid-rows-2 sm:grid-cols-3 grid-cols-1 sm:gap-8 gap-6"
          >
            <SearchDropDown
              label={"Select Series"}
              color={"rgb(243, 244, 246)"}
              data={series}
              Name={"series_name"}
            />
            <SearchDropDown
              label={"Select Grade"}
              color={"rgb(243, 244, 246)"}
              data={grade}
              Name={"grades"}
            />
            <BasicTextFields lable={"Quantity"} variant={"standard"} />
            <h1 className="text-gray-100 text-lg">MRP:</h1>
            <h1 className="text-gray-100 text-lg">Total(Net):</h1>
          </DialogContentText>
        </DialogContent>
        <DialogActions className="!bg-gray-500">
          {/* <Button onClick={() => handleButtonClick()}>Ok</Button> */}
          {/* <Button onClick={handleClose}>Cancle</Button> */}
          <BasicButton text={"Submit"} />
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default DialogSlide;
