import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import SearchDropDown from "../SearchDropDown";
import BasicTextFields from "./TextField";
import BasicButton from "./Button";
import { useLayoutEffect } from "react";
import instance from "../../Instance";
import { useState } from "react";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import { TextField } from "@mui/material";
import Snackbars from "./SnackBar";
import { useRef } from "react";
import { useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogSlide6 = React.forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);
  const [series, setSeries] = useState([]);
  const [grade, setGrade] = useState([]);
  const [mrp, setMrp] = useState("");
  const [total, setTotal] = useState("");
  const [snackbarErrStatus, setSnackbarErrStatus] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [schlName, setSchlName] = useState("default");
  const [invoiceDetails, setInvoiceDetails] = useState([]);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [cardNum, setCardNum] = useState("");
  const [DocDate, setDocDate] = useState("");
  const [DocTotal, setDocTotal] = useState("");
  const [BillFrom, setBillFrom] = useState("");
  const [BillTo, setBillTo] = useState("");
  const [schoolCode, setschoolCode] = useState("");
  const [DispatchFrom, setDispatchFrom] = useState("");
  const [ShipsTo, setShipsTo] = useState("");
  const [city, setCity] = useState("");
  const [code, setCode] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [landmark, setLandmark] = useState("");
  const [name, setName] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [streetAddress, setStreetAddress] = useState("");

  const formik = useFormik({
    initialValues: {
      CardNum: "",
      DocDate: "",
      DocTotal: "",
      BillFrom: "",
      BillTo: "",
      schoolCode: "",
      DispatchFrom: "",
      ShipsTo: "",
    },
    validate: () => {},
    onSubmit: async (values) => {
      console.log(values);

      if (!values.schoolCode.length) {
        // console.log("first")
        setSnackbarErrStatus(true);
        setSnackbarMsg("Enter a value");
        snackbarRef.current.openSnackbar();
      } else {
        // console.log("second")
        setSnackbarErrStatus(false);
        setSnackbarMsg("No of school added");
        snackbarRef.current.openSnackbar();
        setOpen(false);
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1000);
      }
    },
  });

  const getDetails = async () => {
    console.log(props.invoiceId);
    const res = await instance({
      url: `ck/getschool/code/${props.invoiceId}`,
      method: "GET",
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    // setSeries(res.data.message);
    // console.log("first")
    // console.log(res.data)
    if (res.data.status === "success") {
      console.log("first");
      setCity(res.data.message.city);
      // formik.values.DocNum = res.data.message[0].docnum;
      setCode(res.data.message.code);
      // formik.values.DocDate = res.data.message[0].docdate;
      // formik.values.DocTotal = res.data.message[0].doctotal;
      setCountry(res.data.message.country);
      // formik.values.BillFrom =
      // res.data.message[0].ck_invoice_addresses[0].BillFromName;

      // formik.values.BillTo =
      // res.data.message[0].ck_invoice_addresses[0].BillToName;
      setEmail(res.data.message.email);
      // console.log(res.data.message[0].ck_invoice_addresses[0].BillToName)
      // formik.values.DispatchFrom =
      // res.data.message[0].ck_invoice_addresses[0].DispatchFromAddress1;
      setLandmark(res.data.message.landmark);
      // formik.values.ShipsTo =
      //   res.data.message[0].ck_invoice_addresses[0].ShipToAddress1;

      setName(res.data.message.name);
      setPincode(res.data.message.pincode);
      setState(res.data.message.state);
      setStreetAddress(res.data.message.streetaddress);

      // setInvoiceDetails(res.data.message);
      //   setInvoiceItems(res.data.message[0].ck_invoice_items);
      // console.log(res.data.message[0].docnum)
    }
  };

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

  const snackbarRef = useRef();

  React.useImperativeHandle(ref, () => ({
    openDialog() {
        getDetails();
      setOpen(true);
    },
  }));

  const handleButtonClick = () => {
    props.handleDialogButton();
    setOpen(false);
  };

  const getSeriesPrice = async (id) => {
    const res = await instance({
      url: `series/get/seriessum/${id}`,
      method: "GET",
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    setMrp(res.data.message.sum);
  };

  const handleProjectionForm = (value, type) => {
    console.log(value, type);
    switch (type) {
      case "series_name":
        getSeriesPrice(value.id);
        formik.values.series = value.id;
        break;
      case "grades":
        formik.values.grade = value.map((item) => {
          return { fk_grade_id: item.id };
        });
        break;
      case "Quantity":
        formik.values.quantity = value;
        setTotal(mrp * value);
        break;
      case "School Code":
        console.log(value);
        formik.values.schoolCode = value;
        break;
      case "School Name":
        console.log(value);
        setSchlName(value);
        formik.values.schoolName = value;
        break;
      default:
        break;
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getName = (code) => {
    handleProjectionForm(code, "School Code");
    handleProjectionForm("newValue", "School Name");
  };

  return (
    <div>
      <Snackbars
        ref={snackbarRef}
        snackbarErrStatus={snackbarErrStatus}
        errMessage={snackbarMsg}
      />
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
        {/* <DialogTitle className="!bg-gray-500 text-white"> */}
          {/* <div
            onClick={() => {
              getInvoiceDetails();
            }}
          >
            <BasicButton text={"Show Data"} />
          </div> */}
        {/* </DialogTitle> */}
        <DialogContent className="!bg-gray-500">
          {/* <DialogContentText
            id="alert-dialog-slide-description"
            className="!text-gray-600 !sm:text-base !text-sm grid sm:grid-cols-1 grid-cols-1 sm:gap-8 gap-6"
          > */}
          {/* <TextField
              required
              label="Card Name"
              variant="standard"
              type={"text"}
              disabled={false}
              // defaultValue={invoiceDetails[0].cardname}
              // value={invoiceDetails[0].cardname}
              InputLabelProps={{ style: { color: "white" } }}
              inputProps={{ readOnly: true }}
            /> */}

          {/* <div className="flex justify-end">
          <IconButton onClick={handleClose}>
            <CloseIcon />
        </IconButton>
          </div> */}

          {/* <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                <Grid xs={2} sm={4} md={4}>
                  <TextField
                    label="Doc Num"
                    variant="standard"
                    type={"text"}
                    disabled={false}
                    // defaultValue={formik.values.DocNum}
                    defaultValue={cardNum}
                    value={cardNum}
                    // value={formik.values.DocNum}
                    InputLabelProps={{ style: { color: "white" } }}
                    inputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid xs={2} sm={4} md={4}>
                  <TextField
                    label="Doc Date"
                    variant="standard"
                    type={"text"}
                    disabled={false}
                    defaultValue={DocDate}
                    value={DocDate}
                    InputLabelProps={{ style: { color: "white" } }}
                    inputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid xs={2} sm={4} md={4}>
                  <TextField
                    label="Doc Total"
                    variant="standard"
                    type={"text"}
                    disabled={false}
                    defaultValue={DocTotal}
                    value={DocTotal}
                    InputLabelProps={{ style: { color: "white" } }}
                    inputProps={{ readOnly: true }}
                  />
                </Grid>
              </Grid>
            </Box> */}
          {/* </DialogContentText> */}
          {/* </DialogContent> */}

          <div className="mt-0">
            {/* <DialogTitle className="!bg-gray-500 text-white">
              Address
            </DialogTitle> */}
            {/* <DialogContent className="!bg-gray-500"> */}
            <DialogContentText
              id="alert-dialog-slide-description"
              className="!text-gray-600 !sm:text-base !text-sm grid sm:grid-cols-1 grid-cols-1 sm:gap-8 gap-6"
            >
              <div className="flex justify-end">
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </div>
              <Box sx={{ flexGrow: 1 }}>
                <div className="mt-4">
                  <Grid container spacing={2}>
                    <Grid xs={12}>
                      <TextField
                        className="!w-full "
                        // id="outlined-multiline-static"
                        // multiline
                        label="Name"
                        variant="standard"
                        type={"text"}
                        disabled={false}
                        defaultValue={name}
                        value={name}
                        InputLabelProps={{ style: { color: "white" } }}
                        inputProps={{ readOnly: true }}
                      />
                    </Grid>
                    <Grid xs={12}>
                      <TextField
                        className="!w-full"
                        // multiline
                        label="Code"
                        variant="standard"
                        type={"text"}
                        disabled={false}
                        defaultValue={code}
                        value={code}
                        InputLabelProps={{ style: { color: "white" } }}
                        inputProps={{ readOnly: true }}
                      />
                    </Grid>
                    <Grid xs={12}>
                      <TextField
                        className="!w-full"
                        // multiline
                        label="Street Address"
                        variant="standard"
                        type={"text"}
                        disabled={false}
                        defaultValue={streetAddress}
                        value={streetAddress}
                        InputLabelProps={{ style: { color: "white" } }}
                        inputProps={{ readOnly: true }}
                      />
                    </Grid>
                    <Grid xs={12}>
                      <TextField
                        className="!w-full"
                        // multiline
                        label="Landmark"
                        variant="standard"
                        type={"text"}
                        disabled={false}
                        defaultValue={landmark}
                        value={landmark}
                        InputLabelProps={{ style: { color: "white" } }}
                        inputProps={{ readOnly: true }}
                      />
                    </Grid>
                    <Grid xs={12}>
                      <TextField
                        className="!w-full"
                        // multiline
                        label="State"
                        variant="standard"
                        type={"text"}
                        disabled={false}
                        defaultValue={state}
                        value={state}
                        InputLabelProps={{ style: { color: "white" } }}
                        inputProps={{ readOnly: true }}
                      />
                    </Grid>
                    <Grid xs={12}>
                      <TextField
                        className="!w-full"
                        // multiline
                        label="Email"
                        variant="standard"
                        type={"text"}
                        disabled={false}
                        defaultValue={email}
                        value={email}
                        InputLabelProps={{ style: { color: "white" } }}
                        inputProps={{ readOnly: true }}
                      />
                    </Grid>
                    <Grid xs={12}>
                      <TextField
                        className="!w-full"
                        // multiline
                        label="City"
                        variant="standard"
                        type={"text"}
                        disabled={false}
                        defaultValue={city}
                        value={city}
                        InputLabelProps={{ style: { color: "white" } }}
                        inputProps={{ readOnly: true }}
                      />
                    </Grid>
                    <Grid xs={12}>
                      <TextField
                        className="!w-full"
                        // multiline
                        label="Pincode"
                        variant="standard"
                        type={"text"}
                        disabled={false}
                        defaultValue={pincode}
                        value={pincode}
                        InputLabelProps={{ style: { color: "white" } }}
                        inputProps={{ readOnly: true }}
                      />
                    </Grid>
                    <Grid xs={12}>
                      <TextField
                        className="!w-full"
                        // multiline
                        label="Country"
                        variant="standard"
                        type={"text"}
                        disabled={false}
                        defaultValue={country}
                        value={country}
                        InputLabelProps={{ style: { color: "white" } }}
                        inputProps={{ readOnly: true }}
                      />
                    </Grid>
                  </Grid>
                </div>
              </Box>
            </DialogContentText>
          </div>

          {/* </DialogContent> */}

          {/* <div className="mt-9">
            <DialogTitle className="!bg-gray-500 text-white">Items</DialogTitle>
            <DialogContentText
              id="alert-dialog-slide-description"
              className="!text-gray-600 !sm:text-base !text-sm grid sm:grid-cols-1 grid-cols-1 sm:gap-8 gap-6"
            >
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="customized table">
                  <TableHead className="bg-slate-500">
                    <TableRow>
                      <TableCell className="!w-[18rem]" align="center">
                        Item
                      </TableCell>
                      <TableCell className="!w-[8rem]" align="center">
                        Price
                      </TableCell>
                      <TableCell className="!w-[8rem]" align="center">
                        Quantity
                      </TableCell>
                      <TableCell className="!w-[8rem]" align="center">
                        Discount %
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className="bg-slate-200">
                    {invoiceItems.map((row) => (
                      <TableRow
                      >
                        <TableCell align="center">
                          {row.itemdescription}
                        </TableCell>
                        <TableCell align="center">{row.price}</TableCell>
                        <TableCell align="center">{row.quantity}</TableCell>
                        <TableCell align="center">
                          {row.discountpercent}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </DialogContentText>
          </div> */}
        </DialogContent>
      </Dialog>
    </div>
  );
});

export default DialogSlide6;
