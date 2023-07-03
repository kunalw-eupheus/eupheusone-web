import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
// import instance from "../../Instance";
import instance from "../../../Instance";
import { useState } from "react";
import Cookies from "js-cookie";
import { Backdrop, CircularProgress } from "@mui/material";
import { TextField } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const HrConfirm = React.forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const delGroup = async () => {
    if (props.label === "sendMessage") {
      // console.log("send message");
      let hndleData = props.handleData;
      let msgId = props.msgSendId;
      let templId = props.tempId;

      // console.log(msgId, templId);
      const res = await instance({
        url: `/hr/send/townhall_sms`,
        method: "POST",
        data: {
          id: msgId,
          template_id: templId,
        },
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      });
      // console.log(res);
      if (res.data.status === "success") {
        setSuccessMsg(true);
        // hndleData(res.data.message, "success", "success");
        hndleData("reload", "reload", "reload");
        // setTimeout(() => {
        //   setSuccessMsg(false);
        // }, 2000);
      } else {
        hndleData(res.data.message, "error", "error");
      }
    }
    if (props.label === "DeleteGroup") {
      let hndleData = props.handleData;
      let gropId = props.id;

      const res = await instance({
        url: `/hr/delete/phonegroup/${gropId}`,
        method: "DELETE",
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      });
      // console.log(res);
      if (res.data.status === "success") {
        setSuccessMsg(true);
        // hndleData(res.data.message, "success", "success");
        hndleData("reload", "reload", "reload");
        // setTimeout(() => {
        //   setSuccessMsg(false);
        // }, 2000);
      } else {
        hndleData(res.data.message, "error", "error");
      }
    }
  };

  React.useImperativeHandle(ref, () => ({
    openDialog() {
      // console.log(props);
      setOpen(true);
    },
  }));

  const handleClose = () => {
    setSuccessMsg(false);
    setOpen(false);
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
        {successMsg ? (
          <DialogContent className=" !bg-[#e5e7eb] text-black">
            {props.label === "DeleteGroup" ? (
              <div className="flex justify-center text-2xl font-bold">
                {`Group ${props.name} deleted`}
              </div>
            ) : (
              ""
            )}
            {props.label === "sendMessage" ? (
              <div className="flex justify-center text-2xl font-bold">
                {`Message Sent Success`}
              </div>
            ) : (
              ""
            )}
            <div className="flex justify-center p-3 pt-10">
              <div className="px-4">
                <Button
                  className="!bg-[#FF0060] !font-bold !py-3 !text-white"
                  onClick={handleClose}
                  sx={{ width: 100 }}
                >
                  Close
                </Button>
              </div>
              {/* <div className="px-4">
                <Button
                  className="!bg-[#0079FF] !font-bold !py-3 !text-white"
                  onClick={delGroup}
                  sx={{ width: 100 }}
                >
                  Confirm
                </Button>
              </div> */}
            </div>
          </DialogContent>
        ) : (
          <DialogContent className=" !bg-[#e5e7eb] text-black">
            {props.label === "DeleteGroup" ? (
              <div className="flex justify-center text-2xl font-medium">
                {`Do you want to delete ${props.name} group`}
              </div>
            ) : (
              ""
            )}
            {props.label === "sendMessage" ? (
              <div className="flex justify-center text-2xl font-medium">
                {`Send Message`}
              </div>
            ) : (
              ""
            )}
            <div className="flex justify-center p-3 pt-10">
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
                {props.label === "DeleteGroup" ? (
                  <Button
                    className="!bg-[#0079FF] !font-bold !py-3 !text-white"
                    onClick={delGroup}
                    sx={{ width: 100 }}
                  >
                    Confirm
                  </Button>
                ) : (
                  ""
                )}
                {props.label === "sendMessage" ? (
                  <Button
                    className="!bg-[#0079FF] !font-bold !py-3 !text-white"
                    onClick={delGroup}
                    sx={{ width: 100 }}
                  >
                    Send
                  </Button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
});

export default HrConfirm;
