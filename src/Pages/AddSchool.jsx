import React, { useEffect } from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { Circle } from "@mui/icons-material";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import SearchDropDown from "../Components/SearchDropDown";
import axios from "axios";

const AddSchool = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [countryData, setCountryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState({});
  const [boardData, setBoardData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [schoolInfo, setSchoolInfo] = useState({ user_id: Cookies.get("id") });
  const [highLight, setHighLight] = useState("");
  const navigate = useNavigate();
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);

  const navInfo = {
    title: "Form",
    details: ["Manage School", " / Create"],
  };

  const createSchool = async () => {
    const res = await axios.post(
      "http://192.168.7.49:5070/user/school/create",
      schoolInfo,
      {
        headers: {
          authorization: `${Cookies.get("accessToken")}`,
        },
      }
    );
    console.log(res.data);
  };

  const getState = async (id) => {
    const state = await axios.get(
      `http://192.168.7.49:5070/user/location/state/${id}`,
      {
        headers: {
          authorization: `${Cookies.get("accessToken")}`,
        },
      }
    );
    setStateData(state.data);
  };
  const getCity = async (id) => {
    const city = await axios.get(
      `http://192.168.7.49:5070/user/location/city/${id}`,
      {
        headers: {
          authorization: `${Cookies.get("accessToken")}`,
        },
      }
    );
    setCityData(city.data);
  };

  // fetching data
  useEffect(() => {
    const getCountry = async () => {
      const Country = await axios.get(
        "http://192.168.7.49:5070/user/location/country",
        {
          headers: {
            authorization: `${Cookies.get("accessToken")}`,
          },
        }
      );
      setCountryData(Country.data);
    };
    const getBoard = async () => {
      const board = await axios.get(
        "http://192.168.7.49:5070/user/school/api/board",
        {
          headers: {
            authorization: `${Cookies.get("accessToken")}`,
          },
        }
      );
      setBoardData(board.data);
    };
    const getCategoryData = async (req, res) => {
      const category = await axios.get(
        "http://192.168.7.49:5070/user/school/api/category",
        {
          headers: {
            authorization: `${Cookies.get("accessToken")}`,
          },
        }
      );
      setCategoryData(category.data);
    };

    getCountry();
    getBoard();
    getCategoryData();
  }, []);

  const getStateAndCity = (id, type) => {
    if (type === "state") {
      getState(id);
      setSchoolInfo((prev) => {
        return { ...prev, country: id };
      });
    } else if (type === "city") {
      getCity(id);
      setSchoolInfo((prev) => {
        return { ...prev, state: id };
      });
    } else if (type === "setCityId") {
      setSchoolInfo((prev) => {
        return { ...prev, city: id };
      });
    } else if (type === "setBoardId") {
      setSchoolInfo((prev) => {
        return { ...prev, board: id };
      });
    } else if (type === "setCategoryId") {
      setSchoolInfo((prev) => {
        return { ...prev, category: id };
      });
    }
  };

  const handleSchoolInfo = (e) => {
    e.preventDefault();
    setSchoolInfo((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleForm = (e) => {
    e.preventDefault();
    if (e.target.name === "step1") {
      setStep1(false);
      setStep2(true);
      setStep3(false);
    } else if (e.target.name === "step2") {
      setStep1(false);
      setStep2(false);
      setStep3(true);
    } else if (e.target.name === "Cancel") {
      navigate("/manageSchool");
    }
  };

  const handleSidebarCollapsed = () => {
    setSidebarCollapsed(!sidebarCollapsed);
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
  return (
    <div className="flex bg-[#111322]">
      <Sidebar
        sidebarCollapsed={sidebarCollapsed}
        show={null}
        highLight={highLight}
      />

      <div
        className={`flex flex-col w-[100vw] lg:w-[83vw] lg:ml-[18vw] ${
          sidebarCollapsed ? null : "md:ml-[30vw] ml-[60vw]"
        } `}
      >
        <Navbar
          handleSidebarCollapsed={handleSidebarCollapsed}
          info={navInfo}
        />
        <div className="min-h-[100vh] pt-[2vh] max-h-full bg-[#141728]">
          <div className=" px-8 py-3 bg-[#141728]">
            <div className="flex justify-center">
              <div className="w-fit relative">
                <hr className=" border-t-2 border-t-slate-600 w-[15rem] md:w-[23rem]" />
                <Circle
                  className={`!text-slate-600 absolute -top-[0.7rem] ${
                    step1 ? "-left-1" : null
                  } ${step2 ? "md:left-[11rem] left-[7rem]" : null} ${
                    step3 ? "-right-1" : null
                  } `}
                />
              </div>
            </div>
            {/* Step 1 */}
            {step1 ? (
              <>
                <div className="flex flex-col px-6 py-6 mt-6 gap-6 rounded-md bg-slate-600">
                  <h1 className=" text-white text-3xl">Add New School</h1>
                  <input
                    onChange={handleSchoolInfo}
                    type="text"
                    name="school_name"
                    placeholder="School Name"
                    className=" w-2/3 placeholder:text-[#f3f4f6] text-white py-2 outline-0 bg-slate-600 border-b-2 border-b-black"
                  />

                  <input
                    onChange={handleSchoolInfo}
                    type="text"
                    name="aff_code"
                    placeholder="Affiliate Code"
                    className=" w-2/3 placeholder:text-[#f3f4f6] py-2 outline-0 bg-slate-600 border-b-2 border-b-black"
                  />
                  <div className="w-2/3">
                    <SearchDropDown
                      data={boardData}
                      label={"Select Board"}
                      getStateAndCity={getStateAndCity}
                      color={"rgb(243, 244, 246)"}
                      Name={"board_name"}
                    />
                  </div>
                  <div className="w-2/3">
                    <SearchDropDown
                      data={categoryData}
                      Name={"category"}
                      getStateAndCity={getStateAndCity}
                      color={"rgb(243, 244, 246)"}
                      label={"Select Category"}
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    name="step1"
                    onClick={handleForm}
                    className=" bg-slate-600 active:bg-slate-700 rounded-md text-white px-10 py-2 hover:shadow-2xl"
                  >
                    Next
                  </button>
                  <button
                    name="Cancel"
                    onClick={handleForm}
                    className=" bg-slate-600 active:bg-slate-700 rounded-md text-white px-8 py-2 hover:shadow-2xl"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : null}
            {/* Step 2 */}
            {step2 ? (
              <>
                <div className="flex flex-col px-6 py-6 mt-6 gap-6 rounded-md bg-slate-600">
                  <h1 className=" text-white text-3xl">Add Contact Details</h1>
                  <input
                    type="text"
                    name="pName"
                    onChange={handleSchoolInfo}
                    placeholder="Name"
                    className=" w-2/3 placeholder:text-[#f3f4f6] text-white py-2 outline-0 bg-slate-600 border-b-2 border-b-black"
                  />
                  <input
                    type="text"
                    onChange={handleSchoolInfo}
                    name="pEmail"
                    placeholder="Email"
                    className=" w-2/3 placeholder:text-[#f3f4f6] text-white py-2 outline-0 bg-slate-600 border-b-2 border-b-black"
                  />
                  <input
                    type="text"
                    name="pPhone"
                    onChange={handleSchoolInfo}
                    placeholder="Phone"
                    className=" w-2/3 placeholder:text-[#f3f4f6] text-white py-2 outline-0 bg-slate-600 border-b-2 border-b-black"
                  />
                  <input
                    type="text"
                    name="web"
                    onChange={handleSchoolInfo}
                    placeholder="Website (optional)"
                    className=" w-2/3 placeholder:text-[#f3f4f6] text-white py-2 outline-0 bg-slate-600 border-b-2 border-b-black"
                  />
                  <input
                    type="text"
                    name="designation"
                    onChange={handleSchoolInfo}
                    placeholder="Designation"
                    className=" w-2/3 placeholder:text-[#f3f4f6] text-white py-2 outline-0 bg-slate-600 border-b-2 border-b-black"
                  />
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    name="step2"
                    onClick={handleForm}
                    className=" bg-slate-600 active:bg-slate-700 rounded-md text-white px-10 py-2 hover:shadow-2xl"
                  >
                    Next
                  </button>
                  <button
                    name="Cancel"
                    onClick={handleForm}
                    className=" bg-slate-600 active:bg-slate-700 rounded-md text-white px-8 py-2 hover:shadow-2xl"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : null}
            {/* Step 3 */}
            {step3 ? (
              <>
                <div className="flex flex-col px-6 py-6 mt-6 gap-6 rounded-md bg-slate-600">
                  <h1 className=" text-white text-3xl">Add Address</h1>
                  <div className="flex gap-16">
                    <div className="w-1/3">
                      <SearchDropDown
                        data={countryData}
                        Name={"country"}
                        getStateAndCity={getStateAndCity}
                        color={"rgb(243, 244, 246)"}
                        label={"Select Country"}
                      />
                    </div>
                    <div className="w-1/3">
                      <SearchDropDown
                        data={stateData}
                        color={"rgb(243, 244, 246)"}
                        Name={"state"}
                        getStateAndCity={getStateAndCity}
                        label={"Select State"}
                      />
                    </div>
                  </div>
                  {/* <div className="flex gap-16"> */}
                  <div className="w-1/3">
                    <SearchDropDown
                      data={cityData}
                      getStateAndCity={getStateAndCity}
                      color={"rgb(243, 244, 246)"}
                      Name={"city"}
                      label={"Select City"}
                    />
                  </div>
                  {/* </div> */}
                  <input
                    type="text"
                    name="address"
                    onChange={handleSchoolInfo}
                    placeholder="Address"
                    className=" w-2/3 placeholder:text-[#f3f4f6] text-white py-2 outline-0 bg-slate-600 border-b-2 border-b-black"
                  />
                  <input
                    type="text"
                    name="pin"
                    onChange={handleSchoolInfo}
                    placeholder="Pincode"
                    className=" w-2/3 placeholder:text-[#f3f4f6] text-white py-2 outline-0 bg-slate-600 border-b-2 border-b-black"
                  />
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={createSchool}
                    className=" bg-slate-600 active:bg-slate-700 rounded-md text-white px-10 py-2 hover:shadow-2xl"
                  >
                    Add
                  </button>
                  <button
                    onClick={handleForm}
                    name="Cancel"
                    className=" bg-slate-600 active:bg-slate-700 rounded-md text-white px-8 py-2 hover:shadow-2xl"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSchool;
