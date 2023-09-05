import React from "react";
import { ShowError } from "../../util/showError";
import BasicButton from "../Material/Button";
import validateIFSC from "../../util/validateIFSC";
import BasicTextFields from "../Material/TextField";
import { Fab, TextField, Tooltip } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useState } from "react";
import instance from "../../Instance";
import Cookies from "js-cookie";
import SearchDropDown from "../SearchDropDown";

const Step3 = ({ setSteps, formik, setLoading, partyType }) => {
  const [cheque, setCheque] = useState(1);

  const onFileChange = async (e, index) => {
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
      let tempArr = [...formik.values.Cheques];
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
        obj.abc_cheque_link = link;
        tempArr.push(obj);
      } else {
        for (let obj of tempArr) {
          if (obj.idx === index) {
            obj.abc_cheque_link = link;
          }
        }
      }
      console.log(tempArr);
      formik.values.Cheques = tempArr;
    } else {
      ShowError("Cannot upload image");
    }
  };
  const handleCheques = () => {
    let content = [];
    for (let i = 0; i < cheque; i++) {
      content.push(
        <li className="flex flex-wrap gap-4 items-center">
          <span className="mt-4 text-gray-100">{i + 1}.</span>
          <TextField
            label={"Cheque No"}
            onChange={(e) => handleChequesForm("ChequeNo", e.target.value, i)}
            inputProps={{ style: { color: "white" } }}
            InputLabelProps={{ style: { color: "white" } }}
            variant={"standard"}
            multiline={false}
          />
          <TextField
            label={"Bank"}
            onChange={(e) => handleChequesForm("Bank", e.target.value, i)}
            inputProps={{ style: { color: "white" } }}
            InputLabelProps={{ style: { color: "white" } }}
            variant={"standard"}
            multiline={false}
          />
          <TextField
            label={"Branch/IFSC"}
            onChange={(e) => handleChequesForm("Branch", e.target.value, i)}
            inputProps={{ style: { color: "white" } }}
            InputLabelProps={{ style: { color: "white" } }}
            variant={"standard"}
            multiline={false}
          />
          <div className="mt-6 w-[13rem]">
            <input
              type="file"
              name="file_upload"
              accept="image/*"
              onChange={(e) => onFileChange(e, i)}
            />
          </div>
        </li>
      );
    }
    return content;
  };

  const handleChequesForm = (field, value, index) => {
    let tempArr = [...formik.values.Cheques];
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
      if (field === "ChequeNo") obj.abc_cheque_no = value;
      if (field === "Bank") obj.abc_bank = value;
      if (field === "Branch") obj.abc_branch_ifsc = value;
      obj.abc_cheque_link = "";
      tempArr.push(obj);
    } else {
      for (let obj of tempArr) {
        if (obj.idx === index) {
          if (field === "ChequeNo") obj.abc_cheque_no = value;
          if (field === "Bank") obj.abc_bank = value;
          if (field === "Branch") obj.abc_branch_ifsc = value;
        }
      }
    }
    formik.values.Cheques = tempArr;
  };

  const handleAofForm = (value, type) => {
    switch (type) {
      case "Name and address of the party’s main bankers":
        formik.values.nameAndAddressOfPartyBanker = value;
        break;
      case "Name and address of the party’s main bankers *":
        formik.values.nameAndAddressOfPartyBanker = value;
        break;
      case "Account Number":
        formik.values.accountNumber = value;
        break;
      case "Account Number *":
        formik.values.accountNumber = value;
        break;
      case "aof_acc":
        formik.values.typeOfAC = value.title;
        break;
      case "IFSC":
        formik.values.ifsc = value;
        break;
      case "IFSC *":
        formik.values.ifsc = value;
        break;

      default:
        break;
    }
  };

  return (
    <div className="flex flex-col gap-4 items-start w-[90%] px-6 bg-slate-600 rounded-md py-6 mb-[5rem]">
      <div className="grid sm:grid-rows-2 sm:grid-cols-3 grid-rows-4 grid-cols-1 w-full mt-6 gap-6 rounded-md bg-slate-600">
        <div className="sm:col-span-2">
          {partyType === "School" ? (
            <BasicTextFields
              lable={"Name and address of the party’s main bankers"}
              handleOrderProcessingForm={handleAofForm}
              variant={"standard"}
              multiline={false}
            />
          ) : (
            <BasicTextFields
              lable={"Name and address of the party’s main bankers *"}
              handleOrderProcessingForm={handleAofForm}
              variant={"standard"}
              multiline={false}
            />
          )}
        </div>

        {partyType === "School" ? (
          <BasicTextFields
            lable={"Account Number"}
            handleOrderProcessingForm={handleAofForm}
            variant={"standard"}
            type={"number"}
            multiline={false}
          />
        ) : (
          <BasicTextFields
            lable={"Account Number *"}
            handleOrderProcessingForm={handleAofForm}
            variant={"standard"}
            type={"number"}
            multiline={false}
          />
        )}
        <SearchDropDown
          Name={"aof_acc"}
          data={[{ title: "SB" }, { title: "CA" }, { title: "CC" }]}
          handleOrderProcessingForm={handleAofForm}
          label={"Type of A/c "}
          color={"rgb(243, 244, 246)"}
        />
        {partyType === "School" ? (
          <BasicTextFields
            lable={"IFSC"}
            handleOrderProcessingForm={handleAofForm}
            // type={"number"}
            variant={"standard"}
            multiline={false}
          />
        ) : (
          <BasicTextFields
            lable={"IFSC *"}
            handleOrderProcessingForm={handleAofForm}
            // type={"number"}
            variant={"standard"}
            multiline={false}
          />
        )}
      </div>

      <div className="w-full flex flex-col my-2 gap-2">
        {/* {partyType === "School" ? ( */}
        <h1 className="font-semibold text-gray-100">
          Detail of Cheques {partyType === "School" ? "" : "*"} :
        </h1>
        {/* // ) : ( //{" "}
        <h1 className="font-semibold text-gray-100">Detail of Cheques * :</h1>
        // )} */}
        <div onClick={() => setCheque(cheque + 1)}>
          <Tooltip title="Add More Cheque">
            <Fab color={"red"} size="small" aria-label="add">
              <Add />
            </Fab>
          </Tooltip>
        </div>
        <ol className="list-decimal">{handleCheques()}</ol>
      </div>
      <div
        onClick={() => {
          if (partyType === "School") {
            if (
              formik.values.ifsc.length > 0 &&
              validateIFSC(formik.values.ifsc) === false
            ) {
              ShowError("Please Enter a Valid IFSC Code");
            } else {
              setSteps({
                step1: false,
                step2: false,
                step3: false,
                step4: true,
              });
              window.scroll({
                top: 0,
                behavior: "smooth",
              });
            }
          } else {
            if (
              formik.values.nameAndAddressOfPartyBanker.length === 0 ||
              formik.values.accountNumber.length === 0 ||
              formik.values.typeOfAC.length === 0 ||
              formik.values.ifsc.length === 0 ||
              formik.values.Cheques.length === 0
            ) {
              ShowError("Please Fill All The Fields");
            } else if (validateIFSC(formik.values.ifsc) === false) {
              ShowError("Please Enter a Valid IFSC Code");
            } else if (formik.values.Cheques.length > 0) {
              for (let obj of formik.values.Cheques) {
                if (!obj.abc_cheque_no || obj.abc_cheque_no.length === 0) {
                  ShowError("Please Enter Cheque for each field");
                  break;
                }
                if (!obj.abc_bank || obj.abc_bank.length === 0) {
                  ShowError("Please Enter Bank Name for each field");
                  break;
                }
                if (!obj.abc_branch_ifsc || obj.abc_branch_ifsc.length === 0) {
                  ShowError("Please Enter Bank IFSC for each field");
                  break;
                }
                if (obj.abc_cheque_link.length === 0) {
                  ShowError("Please Upload Cheque image for each field");
                  break;
                } else {
                  setSteps({
                    step1: false,
                    step2: false,
                    step3: false,
                    step4: true,
                  });
                  window.scroll({
                    top: 0,
                    behavior: "smooth",
                  });
                }
              }
            } else {
              setSteps({
                step1: false,
                step2: false,
                step3: false,
                step4: true,
              });
              window.scroll({
                top: 0,
                behavior: "smooth",
              });
            }
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

export default Step3;
