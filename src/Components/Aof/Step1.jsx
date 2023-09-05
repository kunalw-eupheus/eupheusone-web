import React from "react";
import { ShowError } from "../../util/showError";
import validateEmail from "../../util/validateEmail";
import validatePan from "../../util/validatePan";
import validateGST from "../../util/validateGST";
import validateAadhar from "../../util/validateAadhar";
import SearchDropDown from "../SearchDropDown";
import BasicTextFields from "../Material/TextField";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Stack, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import BasicButton from "../Material/Button";
import { useState } from "react";
import instance from "../../Instance";
import Cookies from "js-cookie";

const Step1 = ({
  handleOrderProcessingForm,
  allSchool,
  state,
  city,
  setSteps,
  formik,
  partyType,
  setLoading,
}) => {
  const [date, setDate] = useState("");

  const handleStartDate = (newValue) => {
    if (!newValue) {
      setDate("");
    } else {
      let date = `${newValue.$y}-${newValue.$M + 1}-${newValue.$D}`;
      formik.values.schoolDate = date;
      setDate(date);
    }
  };

  const onPanFileChange = async (e) => {
    let formdata = new FormData();
    let file = e.target.files[0];
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      alert("Please Select an image file only");
      return;
    }
    formdata.append("img", file);
    formdata.append("test", "test");
    setLoading(true);
    const res = await instance({
      url: `imagetoS3/add_image_s3`,
      method: "POST",
      data: formdata,
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    setLoading(false);
    if (res.status === 200) {
      let link = res.data;
      formik.values.panUrl = link;
    } else {
      ShowError("Cannot upload image");
    }
  };

  const onGSTFileChange = async (e) => {
    let formdata = new FormData();

    let file = e.target.files[0];
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      alert("Please Select an image file only");
      return;
    }
    formdata.append("img", file);
    formdata.append("test", "test");
    setLoading(true);
    const res = await instance({
      url: `imagetoS3/add_image_s3`,
      method: "POST",
      data: formdata,
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    setLoading(false);
    if (res.status === 200) {
      let link = res.data;
      formik.values.GstUrl = link;
    } else {
      ShowError("Cannot upload image");
    }
  };

  const onAdhrFileChange = async (e) => {
    let formdata = new FormData();

    let file = e.target.files[0];
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      alert("Please Select an image file only");
      return;
    }

    formdata.append("img", file);
    formdata.append("test", "test");
    setLoading(true);
    const res = await instance({
      url: `imagetoS3/add_image_s3`,
      method: "POST",
      data: formdata,
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    setLoading(false);
    if (res.status === 200) {
      let link = res.data;
      formik.values.AadharUrl = link;
    } else {
      ShowError("Cannot upload image");
    }
  };

  return (
    <div className="flex flex-col gap-4 items-start w-[90%] px-6 bg-slate-600 rounded-md py-6 mb-[5rem]">
      <div className="grid sm:grid-rows-5 sm:grid-cols-3 grid-rows-[15] grid-cols-1 w-full mt-6 gap-6 rounded-md bg-slate-600">
        <SearchDropDown
          Name={"selec_typ"}
          data={[{ title: "Eupheus" }]}
          defaultValue={{ title: "Eupheus" }}
          handleOrderProcessingForm={handleOrderProcessingForm}
          label={"Select Type"}
          color={"rgb(243, 244, 246)"}
        />
        <SearchDropDown
          Name={"party_type"}
          data={[{ title: "School" }, { title: "Party" }]}
          handleOrderProcessingForm={handleOrderProcessingForm}
          label={"Select Party Type *"}
          color={"rgb(243, 244, 246)"}
          defaultValue={{ title: "School" }}
        />

        {partyType === "School" ? (
          <SearchDropDown
            label={"Name Of Party/School *"}
            handleOrderProcessingForm={handleOrderProcessingForm}
            color={"rgb(243, 244, 246)"}
            data={allSchool}
            multiple={false}
            Name={"select_schools"}
          />
        ) : (
          <BasicTextFields
            lable={"Enter Party Name *"}
            variant={"standard"}
            handleOrderProcessingForm={handleOrderProcessingForm}
            multiline={false}
          />
        )}

        <BasicTextFields
          lable={"Designation*"}
          variant={"standard"}
          handleOrderProcessingForm={handleOrderProcessingForm}
          multiline={false}
        />

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
          lable={"Phone *"}
          handleOrderProcessingForm={handleOrderProcessingForm}
          type={"number"}
          variant={"standard"}
          multiline={false}
        />
        <BasicTextFields
          lable={"E-Mail *"}
          handleOrderProcessingForm={handleOrderProcessingForm}
          variant={"standard"}
          multiline={false}
        />
        <BasicTextFields
          lable={"Total no of Students *"}
          type={"number"}
          handleOrderProcessingForm={handleOrderProcessingForm}
          variant={"standard"}
          multiline={false}
        />
        <BasicTextFields
          lable={"Classes Up to"}
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
        <div className="sm:col-span-2">
          <BasicTextFields
            lable={"Firm/ Company/Trust Registration Number"}
            handleOrderProcessingForm={handleOrderProcessingForm}
            variant={"standard"}
            multiline={false}
          />
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack spacing={3}>
            <DesktopDatePicker
              label="Select Date *"
              inputFormat="MM/DD/YYYY"
              value={date}
              onChange={handleStartDate}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    input: { color: "white" },
                  }}
                />
              )}
            />
          </Stack>
        </LocalizationProvider>

        <div className="sm:col-span-2">
          <BasicTextFields
            lable={"PAN NO *"}
            handleOrderProcessingForm={handleOrderProcessingForm}
            variant={"standard"}
            multiline={false}
          />
        </div>

        <input
          type="file"
          name="Upload PAN"
          onChange={(e) => onPanFileChange(e)}
          accept="image/*"
        />

        <div className="sm:col-span-2">
          <BasicTextFields
            lable={"GST NO *"}
            handleOrderProcessingForm={handleOrderProcessingForm}
            variant={"standard"}
            multiline={false}
          />
        </div>

        <input
          type="file"
          name="Upload GST"
          onChange={(e) => onGSTFileChange(e)}
          accept="image/*"
        />

        <div className="sm:col-span-2">
          <BasicTextFields
            lable={"Aadhar No *"}
            handleOrderProcessingForm={handleOrderProcessingForm}
            variant={"standard"}
            multiline={false}
          />
        </div>
        <input
          type="file"
          name="Upload Aadhar"
          onChange={(e) => onAdhrFileChange(e)}
          accept="image/*"
        />
      </div>
      <div
        className="mt-3"
        onClick={() => {
          if (
            !formik.values.nameOfSchool ||
            !formik.values.aof_status ||
            !formik.values.address ||
            !formik.values.state ||
            !formik.values.city ||
            !formik.values.pinCode ||
            !formik.values.mobile ||
            !formik.values.schoolEmail ||
            !formik.values.totalNoStudent ||
            !formik.values.schoolDate ||
            !formik.values.panNo ||
            !formik.values.designation ||
            !formik.values.phone ||
            !formik.values.GstNo ||
            !formik.values.AadharNo
          ) {
            ShowError("Please Fill All The Fields with * Marked");
          } else if (formik.values.mobile.length !== 10) {
            ShowError("Please Enter a Valid Mobile Number");
          } else if (formik.values.phone.length !== 10) {
            ShowError("Please Enter a Valid Phone Number");
          } else if (formik.values.pinCode.length !== 6) {
            ShowError("Please Enter a Valid Pin Code");
          } else if (validateEmail(formik.values.schoolEmail) === false) {
            ShowError("Please Enter a Valid Email");
          } else if (validatePan(formik.values.panNo) === false) {
            ShowError("Please Enter a Valid PAN Number");
          } else if (
            formik.values.GstNo.length > 0 &&
            validateGST(formik.values.GstNo) === false
          ) {
            ShowError("Please Enter a Valid GST Number");
          } else if (
            formik.values.AadharNo.length > 0 &&
            validateAadhar(formik.values.AadharNo) === false
          ) {
            ShowError("Please Enter a Valid Aadhar Number");
          } else if (formik.values.panNo.length > 0 && !formik.values.panUrl) {
            ShowError("Please Upload PAN image");
          } else if (formik.values.GstNo.length > 0 && !formik.values.GstUrl) {
            ShowError("Please Upload GST image");
          } else if (
            formik.values.AadharNo.length > 0 &&
            !formik.values.AadharUrl
          ) {
            ShowError("Please Upload Aadhar image");
          } else {
            setSteps({ step1: false, step2: true, step3: false });
            window.scroll({
              top: 0,
              behavior: "smooth",
            });
          }
          console.log(formik.values);
        }}
      >
        <BasicButton text={"Next"} />
      </div>
    </div>
  );
};

export default Step1;
