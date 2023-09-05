import React, { useState } from "react";
import { ShowError } from "../../util/showError";
import BasicButton from "../Material/Button";
import { Fab, TextField, Tooltip } from "@mui/material";
import { Add } from "@mui/icons-material";
import BasicTextFields from "../Material/TextField";
import instance from "../../Instance";
import Cookies from "js-cookie";
import validateEmail from "../../util/validateEmail";
import validatePan from "../../util/validatePan";

const Step2 = ({ setSteps, formik, partyType, setLoading }) => {
  const [suppliers, setSuppliers] = useState(1);
  let timeoutId;
  const handlePublisherForm = (field, value, index) => {
    // clearTimeout(timeoutId);
    // timeoutId = setTimeout(() => {
    let tempArr = [...formik.values.truesteeCreditPub];
    let exist = false;
    for (let i = 0; i < tempArr.length; i++) {
      const element = tempArr[i];
      if (element.idx === index) {
        exist = true;
        break;
      }
    }
    if (!exist) {
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

    formik.values.truesteeCreditPub = tempArr;
    // }, 1500);
  };
  const handleForm = () => {
    let content = [];
    for (let i = 0; i < suppliers; i++) {
      content.push(
        <li className="flex gap-4 items-center">
          <span className="mt-4 text-gray-100">{i + 1}.</span>
          <TextField
            label={`Name`}
            inputProps={{ style: { color: "white" } }}
            InputLabelProps={{ style: { color: "white" } }}
            onChange={(e) => handlePublisherForm("Name", e.target.value, i)}
            variant={"standard"}
            multiline={false}
          />
          <TextField
            label={"Annual Business"}
            inputProps={{ style: { color: "white" } }}
            InputLabelProps={{ style: { color: "white" } }}
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

  const onPanPChange = async (e) => {
    let formdata = new FormData();
    let file = e.target.files[0];
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      ShowError("Please Select an image file only");
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
      formik.values.truesteePanUrl = link;
    } else {
      ShowError("Cannot upload image");
    }
  };

  const handleAofForm = (value, type) => {
    switch (type) {
      case "Name of Proprietor/Partner/Director/Trustee *":
        formik.values.truesteeName = value;
        break;
      case "PAN NO *":
        formik.values.truesteePan = value;
        break;
      case "Address":
        formik.values.truesteeAddress = value;
        break;
      case "Pin Code *":
        formik.values.truesteePin = value;
        break;
      case "Phone":
        formik.values.truesteePhone = value;
        break;
      case "Mobile*":
        formik.values.truesteeMobile = value;
        break;
      case "E-Mail*":
        formik.values.truesteeEmail = value;
        break;

      default:
        break;
    }
  };

  return (
    <div className="flex flex-col gap-4 items-start w-[90%] px-6 bg-slate-600 rounded-md py-6 mb-[5rem]">
      <div className="grid sm:grid-rows-3 sm:grid-cols-3 grid-rows-[7] grid-cols-1 w-full mt-6 gap-6 rounded-md bg-slate-600">
        <div className="sm:col-span-2">
          <BasicTextFields
            lable={"Name of Proprietor/Partner/Director/Trustee *"}
            handleOrderProcessingForm={handleAofForm}
            variant={"standard"}
            multiline={false}
          />
        </div>

        <div className="sm:col-span-2">
          <BasicTextFields
            lable={"PAN NO *"}
            handleOrderProcessingForm={handleAofForm}
            variant={"standard"}
            multiline={false}
          />
        </div>

        <input
          type="file"
          name="Upload PAN"
          accept="image/*"
          onChange={(e) => onPanPChange(e)}
        />

        <div className="sm:col-span-2">
          <BasicTextFields
            lable={"Address"}
            handleOrderProcessingForm={handleAofForm}
            variant={"standard"}
            multiline={false}
          />
        </div>
        <BasicTextFields
          lable={"Pin Code *"}
          handleOrderProcessingForm={handleAofForm}
          type={"number"}
          variant={"standard"}
          multiline={false}
        />

        <BasicTextFields
          lable={"Phone"}
          handleOrderProcessingForm={handleAofForm}
          type={"number"}
          variant={"standard"}
          multiline={false}
        />

        <BasicTextFields
          lable={"Mobile*"}
          handleOrderProcessingForm={handleAofForm}
          type={"number"}
          variant={"standard"}
          multiline={false}
        />

        <BasicTextFields
          lable={"E-Mail*"}
          handleOrderProcessingForm={handleAofForm}
          variant={"standard"}
          multiline={false}
        />
      </div>
      <div className="w-full flex flex-col my-2 gap-2">
        <h1 className="font-semibold text-gray-100">
          Name of other Publishers/Suppliers from whom the party has credit
          facilities:
        </h1>
        <div onClick={() => setSuppliers(suppliers + 1)}>
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
            formik.values.truesteeMobile.length == 0 ||
            formik.values.truesteeEmail.length == 0 ||
            formik.values.truesteeName.length == 0 ||
            !formik.values.truesteePin ||
            !formik.values.truesteePan
          ) {
            ShowError("Please Fill All The Fields With * Mark");
          } else if (
            formik.values.truesteePan.length > 0 &&
            validatePan(formik.values.truesteePan) === false
          ) {
            ShowError("Please Enter a Valid PAN Number");
          } else if (
            formik.values.truesteePan.length > 0 &&
            !formik.values.truesteePanUrl
          ) {
            ShowError("Please Upload PAN image");
          } else if (validateEmail(formik.values.truesteeEmail) === false) {
            ShowError("Please Enter a Valid Email");
          } else if (
            formik.values.truesteePin.length > 0 &&
            formik.values.truesteePin.length !== 6
          ) {
            ShowError("Please Enter a Valid Pin Code");
          } else if (
            formik.values.truesteePhone.length > 0 &&
            formik.values.truesteePhone.length !== 10
          ) {
            ShowError("Please Enter a Valid Phone Number");
          } else if (formik.values.truesteeMobile.length !== 10) {
            ShowError("Please Enter a Valid Mobile Number");
          } else {
            setSteps({ step1: false, step2: false, step3: true });
            window.scroll({
              top: 0,
              behavior: "smooth",
            });
          }
          console.log(formik.values);
        }}
        className="mt-3"
      >
        <BasicButton text={"Next"} />
      </div>
    </div>
  );
};

export default Step2;
