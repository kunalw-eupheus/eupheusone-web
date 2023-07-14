import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useRef } from "react";
import BasicTextFields from "../TextField";
import BasicButton from "../Button";
import { Formik, useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import instance from "../../../Instance";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ResetPass() {
  const [open, setOpen] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  //   const handleClose = () => {
  //     setOpen(false);
  //   };

  //   const handleOrderProcessingForm = (val, name) => {
  //     console.log(val, name);
  //     if (name === "Password") {
  //       formik.values.pass = val;
  //     } else {
  //       formik.values.resetPass = val;
  //     }
  //   };

  const formik = useFormik({
    initialValues: {
      pass: "",
      resetPass: "",
    },
    validate: (values) => {
      const errors = {};
      if (values.pass.length < 7) {
        errors.pass = "password length should be greater than 6";
      }
      if (values.pass !== values.resetPass) {
        errors.pass = "password should be same";
      }

      console.log(errors);
      return errors;
    },
    onSubmit: async (values) => {
      setLoading(true);
      const res = await instance({
        url: `auth/reset_password`,
        method: "POST",
        data: {
          password: values.pass,
          confirm_password: values.resetPass,
        },
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      });
      setLoading(false);

      if (res.data.status === "success") {
        Cookies.remove("accessToken");
        Cookies.remove("company");
        Cookies.remove("type");
        Cookies.remove("id");
        Cookies.remove("user");
        window.location.reload();
      }
    },
  });

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        // onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        {/* <form
          className="bg-slate-500 py-10 px-5 flex flex-col gap-4"
          onSubmit={formik.handleSubmit}
        >
          <BasicTextFields
            handleOrderProcessingForm={handleOrderProcessingForm}
            lable={"Password"}
          />
          <BasicTextFields
            handleOrderProcessingForm={handleOrderProcessingForm}
            lable={"Reset Password"}
          />
          <div className="w-full" onClick={formik.handleSubmit}>
            <BasicButton text={"Submit"} />
          </div>
        </form> */}
        <form
          onSubmit={formik.handleSubmit}
          className="bg-slate-500 py-[2rem] px-[1rem] sm:w-[25rem] w-[15rem] flex flex-col gap-2"
        >
          <h1 className="text-gray-200 font-semibold">Reset Your Password</h1>
          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-gray-200 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Password
            </label>
            <input
              type="text"
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="Enter password"
              //   value={formik.values.pass}
              onChange={(e) => {
                formik.values.pass = e.target.value;
              }}
            />
          </div>

          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-gray-200 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Comfirm Password
            </label>
            <input
              type="password"
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="Confirm password"
              //   value={formik.values.resetPass}
              onChange={(e) => {
                formik.values.resetPass = e.target.value;
              }}
            />
            <p className="text-red-600 mt-2 italic font-bold">
              {formik.errors.pass}
            </p>
          </div>

          <Stack direction="row" spacing={2}>
            <LoadingButton
              loading={loading}
              onClick={formik.handleSubmit}
              type="submit"
              style={{
                backgroundColor: "rgb(31 41 55)",
                width: "100%",
                height: "2.5rem",
                color: "white",
                fontWeight: "600",
                marginTop: "1rem",
              }}
              variant="outlined"
            >
              {loading ? "" : "Submit"}
            </LoadingButton>
          </Stack>
        </form>
      </Dialog>
    </div>
  );
}
