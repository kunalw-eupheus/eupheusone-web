import React, { useEffect, useState } from "react";
import loginBg from "../assets/img/register_bg_2.png";
import Logo from "../assets/img/logo.png";
import Switch from "@mui/material/Switch";
import { CancelOutlined, CheckOutlined } from "@mui/icons-material";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";
import { useFormik } from "formik";
import SearchDropDown from "../Components/SearchDropDown";

const AdminSignUp = () => {
  const [empStatus, setEmpStatus] = useState(false);
  const [response, setResponse] = useState("");
  const [show, setShow] = useState(false);
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [isStateTouched, setIsStateTouched] = useState(false);

  const defaultValueCountry = {
    PK_ID: 2,
    NAME: "India",
  };

  // formik
  const formik = useFormik({
    initialValues: {
      email: "",
      status: "disable",
      password: "",
      firstName: "",
      lastName: "",
      middleName: "",
      phone: "",
      state: null,
      country: 2,
      empCode: "",
      repCode: "",
      maintenancePassword: "",
      confirmPassword: "",
    },

    validate: () => {
      const errors = {};
      // email
      if (!formik.values.email) {
        errors.email = "Required";
      } else if (
        !/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i.test(formik.values.email)
      ) {
        errors.email = "Invalid email address";
      }
      // password
      if (!formik.values.password) {
        errors.password = "Required";
      } else if (formik.values.password.length < 8) {
        errors.password = "Password must be 8 characters or more";
      }

      // firstName and lastName
      if (!formik.values.firstName) {
        errors.firstName = "Required";
      }
      if (!formik.values.lastName) {
        errors.lastName = "Required";
      }

      // phone
      if (!formik.values.phone) {
        errors.phone = "Required";
      } else if (!(formik.values.phone.toString().length === 10)) {
        errors.phone = "Phone No should be 10 characters";
      }
      // state
      if (!formik.values.state) {
        errors.state = "Required";
      }
      // country
      if (!formik.values.country) {
        errors.country = "Required";
      }
      // employee code
      if (!formik.values.empCode) {
        errors.empCode = "Required";
      }
      // report code
      if (!formik.values.repCode) {
        errors.repCode = "Required";
      }
      // m-pass
      if (!formik.values.maintenancePassword) {
        errors.maintenancePassword = "Required";
      } else if (formik.values.maintenancePassword.length < 8) {
        errors.maintenancePassword = "Password must be 8 characters or more";
      }
      // con-pass
      if (!formik.values.confirmPassword) {
        errors.confirmPassword = "Required";
      } else if (!(formik.values.password === formik.values.confirmPassword)) {
        errors.confirmPassword = "Password must be same";
      }

      return errors;
    },

    onSubmit: async (values) => {
      formik.values.phone = formik.values.phone.toString();
      console.log(values);
      const res = await axios.post(
        "http://192.168.7.98:5070/api/auth/signup",
        values
      );
      if (res.data.errors) {
        showResponse(res.data.errors[0].msg);
      } else {
        showResponse(res.data.message);
      }
      setShow(true);
      if (res.data.message === "User created successfully") {
        formik.values.email = "";
        formik.values.status = "disable";
        formik.values.password = "";
        formik.values.firstName = "";
        formik.values.lastName = "";
        formik.values.middleName = "";
        formik.values.phone = "";
        // formik.values.state = null;
        // formik.values.country = 2;
        formik.values.empCode = "";
        formik.values.repCode = "";
        formik.values.maintenancePassword = "";
        formik.values.confirmPassword = "";
      }
    },
  });

  // useEffects

  useEffect(async () => {
    const country = await axios.get("http://192.168.7.98:5070/api/country");
    setCountryData(country.data);
    const state = await axios.get(
      `http://192.168.7.98:5070/api/${formik.values.country}/state`
    );
    setStateData(state.data);
  }, []);

  // useEffect(async () => {

  //   console.log("changed");
  // }, [formik.values.country]);

  const handleChangeStatus = (e) => {
    setEmpStatus((prevState) => {
      return !prevState;
    });

    formik.values.status = empStatus ? "disable" : "enable";
  };

  const showResponse = (res) => {
    setResponse(res);
    setTimeout(() => {
      setShow(false);
    }, 1500);
  };

  const changeCountryId = async (id) => {
    formik.values.country = id;
    const state = await axios.get(`http://192.168.7.98:5070/api/${id}/state`);
    setStateData(state.data);
  };

  const changeStateId = (id) => {
    formik.values.state = id;
  };

  // const handleSignUp = (e) => {
  //   setDetails({ ...details, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const res = await axios.post("http://192.168.7.98:5070/api/auth/signup", {
  //     ...details,
  //   });
  //   console.log(res);
  // };

  return (
    <>
      <div
        className="w-[100%] h-[100%] pt-[1rem] overflow-hidden relative  bg-[rgba(30,41,59)] bg-cover"
        style={{ backgroundImage: `url(${loginBg})` }}
      >
        <span
          className={`transition-all z-50 ${
            response === "User created successfully"
              ? "bg-green-500"
              : "bg-red-600"
          } absolute right-1 md:right-[2rem]  ${
            show
              ? "visible opacity-100 text-white  px-8 rounded-md py-4"
              : "invisible opacity-0"
          } duration-300 ease-linear `}
        >
          {response === "User created successfully" ? (
            <CheckOutlined className="mr-2 mb-1 !text-3xl" />
          ) : (
            <CancelOutlined className="mr-2 mb-1 !text-3xl" />
          )}
          {response}
        </span>

        <div className="container mx-auto px-4">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
                <div className="rounded-t mb-0 flex justify-center items-center px-12 py-8 w-full">
                  <img src={Logo} className=" object-cover w-[50%] h-[50%]" />
                </div>
                <div className="flex-auto px-4 lg:px-10 py-4 pt-0 relative">
                  <form onSubmit={formik.handleSubmit}>
                    {/* status */}
                    <div className="flex justify-center items-center absolute md:-top-[3rem] -top-[2.3rem] right-[1rem] md:right-[2.5rem]">
                      <span className="uppercase text-gray-600 text-xs font-bold">
                        {empStatus ? "Active" : "Inactive"}
                      </span>
                      <FormControlLabel
                        onChange={handleChangeStatus}
                        className="!ml-0"
                        control={<Switch />}
                        name="status"
                        value={formik.values.status}
                        labelPlacement="start"
                      />
                    </div>

                    {/* first, middle, last name */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="First Name"
                          name="firstName"
                          value={formik.values.firstName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.firstName && formik.errors.firstName ? (
                          <div className=" text-xs text-red-500">
                            {formik.errors.firstName}
                          </div>
                        ) : null}
                      </div>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Midddle Name
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Middle Name"
                          name="middleName"
                          value={formik.values.middleName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Last Name"
                          name="lastName"
                          value={formik.values.lastName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.lastName && formik.errors.lastName ? (
                          <div className=" text-xs text-red-500">
                            {formik.errors.lastName}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    {/* phone and email */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Phone
                        </label>
                        <input
                          type="number"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Phone"
                          name="phone"
                          value={formik.values.phone}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.phone && formik.errors.phone ? (
                          <div className=" text-xs text-red-500">
                            {formik.errors.phone}
                          </div>
                        ) : null}
                      </div>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Email"
                          name="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email ? (
                          <div className=" text-xs text-red-500">
                            {formik.errors.email}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    {/* state and country */}

                    <div className="flex items-center justify-between gap-3">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          State
                        </label>
                        {/* <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="State"
                          name="state"
                          onChange={formik.handleChange}
                          value={formik.values.state}
                          onBlur={formik.handleBlur}
                        /> */}
                        <SearchDropDown
                          data={stateData}
                          changeStateId={changeStateId}
                          setIsStateTouched={setIsStateTouched}
                        />
                        {!formik.values.state && isStateTouched ? (
                          <div className=" text-xs text-red-500">Required</div>
                        ) : null}
                      </div>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Country
                        </label>
                        {/* <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Country"
                          name="country"
                          value={formik.values.country}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.country && formik.errors.country ? (
                          <div className=" text-xs text-red-500">
                            {formik.errors.country}
                          </div>
                        ) : null} */}
                        <SearchDropDown
                          data={countryData}
                          changeCountryId={changeCountryId}
                          defaultValueCountry={defaultValueCountry}
                        />
                      </div>
                    </div>

                    {/* emp-code and report code */}

                    <div className="flex items-center justify-between gap-3">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Employee Code
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Employee code"
                          name="empCode"
                          value={formik.values.empCode}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                        />
                        {formik.touched.empCode && formik.errors.empCode ? (
                          <div className=" text-xs text-red-500">
                            {formik.errors.empCode}
                          </div>
                        ) : null}
                      </div>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Report Code
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Report Code"
                          name="repCode"
                          value={formik.values.repCode}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.repCode && formik.errors.repCode ? (
                          <div className=" text-xs text-red-500">
                            {formik.errors.repCode}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    {/* password, confirm-password and m-password */}

                    <div className="flex items-center justify-between gap-3">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Password"
                          name="password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.password && formik.errors.password ? (
                          <div className=" text-xs text-red-500">
                            {formik.errors.password}
                          </div>
                        ) : null}
                      </div>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Confirm Password"
                          name="confirmPassword"
                          value={formik.values.confirmPassword}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.confirmPassword &&
                        formik.errors.confirmPassword ? (
                          <div className=" text-xs text-red-500">
                            {formik.errors.confirmPassword}
                          </div>
                        ) : null}
                      </div>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          M-Password
                        </label>
                        <input
                          type="password"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="M-Password"
                          name="maintenancePassword"
                          value={formik.values.maintenancePassword}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.maintenancePassword &&
                        formik.errors.maintenancePassword ? (
                          <div className=" text-xs text-red-500">
                            {formik.errors.maintenancePassword}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="text-center mt-6">
                      <button
                        className="bg-gray-800 text-white active:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="button"
                        onClick={formik.handleSubmit}
                      >
                        Confirm
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSignUp;
