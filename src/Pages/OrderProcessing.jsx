import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import SearchDropDown from "../Components/SearchDropDown";
import { useFormik } from "formik";
import Button from "../Components/Material/Button";
import BasicTextFields from "../Components/Material/TextField";
import instance from "../Instance";
import Cookies from "js-cookie";
import DatePicker from "../Components/Material/Date";
import { Backdrop, CircularProgress, Collapse, TextField } from "@mui/material";
import Snackbars from "../Components/Material/SnackBar";
import SwipeableTemporaryDrawer from "../Components/Material/MaterialSidebar";

const OrderProcessing = () => {
  const [loading, setLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [highLight, setHighLight] = useState("tagging");
  const [customerData, setCustomerData] = useState([]);
  const [schoolData, setSchoolData] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [seriesData, setSeriesData] = useState([{ series: "", disable: true }]);
  const [address, setAddress] = useState({ disable: true });
  const [open, setOpen] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [snackbarErrStatus, setSnackbarErrStatus] = useState(true);
  const sidebarRef = useRef();

  const [value, setValue] = useState({
    item_quan: true,
    total_quan: "0",
    total_before_tax: "0",
    total: "0",
  });
  const snackbarRef = useRef();
  const [rowData, setRowData] = useState([]);

  const formik = useFormik({
    initialValues: {
      order_type: "",
      cutomer_name: "",
      s_address: "",
      b_address: "",
      date: new Date(),
      order_pref: "",
      school: "",
      subject: "",
      series: "",
      item_quan: "",
      items: [],
      order_priority: "",
      total_quan: value.total_quan,
      total_before_tax: value.total_before_tax,
      total: value.total,
      pref_transpoter_name: "",
      remarks: "",
    },
    validate: () => {
      const errors = {};
      if (!formik.values.order_type) {
        errors.order_type = "Required";
      }
      // if (!formik.values.cutomer_name) {
      //   errors.cutomer_name = "Required";
      // }
      if (!formik.values.date) {
        errors.date = "Required";
      }
      if (!formik.values.order_pref) {
        errors.order_pref = "Required";
      }
      if (!formik.values.school) {
        errors.school = "Required";
      }
      if (!formik.values.subject) {
        errors.subject = "Required";
      }
      if (!formik.values.series) {
        errors.series = "Required";
      }
      if (!formik.values.item_quan) {
        errors.item_quan = "Required";
      }
      // if ((formik.values.items.length = 0)) {
      //   errors.items = "Required";
      // }
      if (!formik.values.order_priority) {
        errors.order_priority = "Required";
      }
      if (!formik.values.total_quan) {
        errors.total_quan = "Required";
      }
      if (!formik.values.total_before_tax) {
        errors.total_before_tax = "Required";
      }
      if (!formik.values.total) {
        errors.total = "Required";
      }
      if (!formik.values.pref_transpoter_name) {
        errors.pref_transpoter_name = "Required";
      }
      if (!formik.values.remarks) {
        errors.remarks = "Required";
      }

      if (Object.keys(errors).length > 0) {
        setErrMessage("Please Fill All The Fields");
        snackbarRef.current.openSnackbar();
      }

      return errors;
    },
    onSubmit: async (values) => {
      setLoading(true);
      console.log(values);
      const res = await instance({
        url: "sales_data/createorder",
        method: "POST",
        data: {
          order_type: formik.values.order_type,
          fk_bp_id: formik.values.cutomer_name,
          order_ref: formik.values.order_pref,
          fk_school_id: formik.values.school,
          delivery_date: formik.values.date,
          order_priority: formik.values.order_priority,
          transporter_name: formik.values.pref_transpoter_name,
          quantity: value.total_quan,
          amount: value.total,
          remarks: formik.values.remarks,
          fk_shipping_address_id: formik.values.s_address,
          fk_billing_address_id: formik.values.b_address,
          fk_item_id: formik.values.items.map((item) => {
            return { fk_item_id: item.item_id, quantity: item.quantity };
          }),
        },
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      });
      if (res.data.status === "success") {
        setSnackbarErrStatus(false);
        setErrMessage("Order Created SuccessFully");
        snackbarRef.current.openSnackbar();
      }
      setLoading(false);
      setOpen(true);
    },
  });

  const navInfo = {
    title: "Order process",
    details: ["Home", " / Order process"],
  };

  const handleSidebarCollapsed = () => {
    // setSidebarCollapsed(!sidebarCollapsed);
    sidebarRef.current.openSidebar();
  };

  useLayoutEffect(() => {
    const getCustomerData = async () => {
      const customerRes = await instance({
        url: "sales_data/getcustomer",
        method: "GET",
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      });
      // console.log(customerRes.data.message);
      setCustomerData(customerRes.data.message);
    };
    const getSchoolData = async () => {
      const schoolRes = await instance({
        url: "school/get/allschools",
        method: "GET",
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      });
      setSchoolData(schoolRes.data.message);
    };
    const getSubjectData = async () => {
      const SubjectRes = await instance({
        url: "subject/getsubjects",
        method: "GET",
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      });

      setSubjectData(SubjectRes.data.message);
    };

    getCustomerData();
    getSchoolData();
    getSubjectData();
  }, []);

  const getCustomerAddress = async (id) => {
    setLoading(true);
    const addressRes = await instance({
      url: `sales_data/getcustomer/${id}`,
      method: "GET",
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    setAddress({
      billing: JSON.parse(
        JSON.stringify(addressRes.data.message[0].bp_addresses[0])
      ),
      shipping: JSON.parse(
        JSON.stringify(addressRes.data.message[0].bp_addresses[1])
      ),
    });
    setLoading(false);
  };

  const getSeriesData = async (id) => {
    setLoading(true);
    const SeriesRes = await instance({
      url: `series/getseries/${id}`,
      method: "GET",
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    // console.log(SeriesRes.data);
    setSeriesData(SeriesRes.data.message);

    setLoading(false);
  };

  const getListData = async (seriesID) => {
    setLoading(true);
    const getListData = await instance({
      url: `items/getitem/${seriesID}/${formik.values.subject.id}`,
      method: "GET",
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });

    // console.log(getListData.data);
    setRowData(getListData.data.message);
    formik.values.items = [];
    getListData.data.message.map((item) => {
      formik.values.items.push({
        item_id: item.id,
        quantity: formik.values.item_quan,
        price: item.price_masters[0].price,
        tax: item.fk_tax.tax,
      });
    });
    setValue({
      item_quan: false,
      total_quan: calValues("total_quan"),
      total: calValues("total_after_tax"),
      total_before_tax: calValues("total_before_tax"),
    });
    setLoading(false);
    setOpen(true);
  };

  const handleDate = (date) => {
    let modifiedDate = `${date.split(" ")[1]} ${date.split(" ")[2]} ${
      date.split(" ")[3]
    }`;
    return modifiedDate;
  };

  const handleOrderProcessingForm = async (value, type) => {
    switch (type) {
      case "order_type":
        formik.values.order_type = value.order_type;
        break;
      case "customer_name":
        getCustomerAddress(value.id);
        formik.values.cutomer_name = value.id;
        break;
      case "date":
        formik.values.date = handleDate(value.toString());
        break;
      case "Order Reference":
        formik.values.order_pref = value;
        break;
      case "school_name":
        formik.values.school = value.id;
        break;
      case "subject_name":
        formik.values.subject = value;
        break;
      case "series_name":
        formik.values.series = value;
        // getListData(value.id);
        setValue({
          item_quan: false,
          total_quan: "0",
          total_before_tax: "0",
          total: "0",
        });
        break;
      case "Items Quantity":
        formik.values.item_quan = value;
        if (rowData.length === 0) {
          getListData(formik.values.series.id);
        }
        break;
      case "order_priority":
        formik.values.order_priority = value.order_priority;
        break;
      case "shipping_address":
        formik.values.s_address = value.id;
        break;
      case "billing_address":
        formik.values.b_address = value.id;
        break;
      case "Total Quantity":
        formik.values.total_quan = value;
        break;
      case "Total Before Tax":
        formik.values.total_before_tax = value;
        break;
      case "Total":
        formik.values.total = value;
        break;
      case "Preffered Transpoter Name":
        formik.values.pref_transpoter_name = value;
        break;
      case "Remarks":
        formik.values.remarks = value;
        break;

      default:
        break;
    }
    console.log(formik.values);
  };
  // console.log(address);

  const calValues = (type) => {
    if (type === "total_quan") {
      let total = 0;
      formik.values.items.map((item) => {
        total = total + Number(item.quantity);
      });
      return total.toString();
    }
    if (type === "total_before_tax") {
      let total = 0;
      formik.values.items.map((item) => {
        total = total + Number(item.price) * Number(item.quantity);
      });
      return total.toString();
    }
    if (type === "total_after_tax") {
      let total = 0;
      formik.values.items.map((item) => {
        let percentage = (Number(item.tax) / 100) * Number(item.price);
        total = total + Number(item.price) * Number(item.quantity) + percentage;
      });
      return total.toString();
    }
  };

  const alterItemQuantity = (index, value) => {
    formik.values.items[index] = {
      item_id: formik.values.items[index].item_id,
      quantity: value,
      price: formik.values.items[index].price,
      tax: formik.values.items[index].tax,
    };
    console.log(formik.values.items);
    setValue({
      item_quan: false,
      total_quan: calValues("total_quan"),
      total: calValues("total_after_tax"),
      total_before_tax: calValues("total_before_tax"),
    });
  };
  // console.log(value);
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
    <div className="flex">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Sidebar sidebarCollapsed={sidebarCollapsed} highLight={highLight} />
      <div
        className={`flex flex-col w-[100vw] transition-all duration-300 ease-linear lg:w-[83vw] lg:ml-[18vw] ${
          sidebarCollapsed ? null : "md:ml-[30vw] ml-[85vw]"
        }`}
      >
        <Snackbars
          ref={snackbarRef}
          snackbarErrStatus={snackbarErrStatus}
          errMessage={errMessage}
        />
        <div>
          <SwipeableTemporaryDrawer
            ref={sidebarRef}
            sidebarCollapsed={sidebarCollapsed}
            highLight={highLight}
            // show={show}
          />
        </div>
        <Navbar
          handleSidebarCollapsed={handleSidebarCollapsed}
          info={navInfo}
        />
        <div className="min-h-[100vh] pt-[2vh] max-h-full bg-[#141728]">
          <div className=" px-8 py-3 bg-[#141728]">
            <div className="flex flex-col gap-[2rem] px-6 py-6 bg-slate-600 rounded-md">
              <section
                className={`grid grid-cols-1 grid-rows-10 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 lg:grid-rows-3 md:grid-rows-4 sm:grid-rows-5 bg-slate-600 rounded-md`}
              >
                <div className=" flex flex-col gap-2 w-full">
                  {/* <label className=" text-gray-100">Order Type</label> */}

                  <SearchDropDown
                    handleOrderProcessingForm={handleOrderProcessingForm}
                    data={[{ order_type: "Order" }, { order_type: "Sample" }]}
                    Name={"order_type"}
                    label={"Order Type"}
                    color={"rgb(243, 244, 246)"}
                  />
                </div>
                <div className=" flex flex-col gap-2 w-full">
                  {/* <label className="text-gray-100">Customer Name</label> */}

                  <SearchDropDown
                    handleOrderProcessingForm={handleOrderProcessingForm}
                    data={customerData}
                    Name="customer_name"
                    label={"Customer Name"}
                    color={"rgb(243, 244, 246)"}
                  />
                </div>
                <div className=" flex flex-col gap-2 w-full">
                  {/* <label className=" text-gray-100">Order Type</label> */}

                  <SearchDropDown
                    handleOrderProcessingForm={handleOrderProcessingForm}
                    disable={address.disable}
                    data={[address.shipping]}
                    Name={"shipping_address"}
                    label={"Shipping Address"}
                    color={"rgb(243, 244, 246)"}
                  />
                </div>
                <div className=" flex flex-col gap-2 w-full">
                  {/* <label className=" text-gray-100">Order Type</label> */}

                  <SearchDropDown
                    handleOrderProcessingForm={handleOrderProcessingForm}
                    disable={address.disable}
                    data={[address.billing]}
                    Name={"billing_address"}
                    label={"Billing Address"}
                    color={"rgb(243, 244, 246)"}
                  />
                </div>
                <div className=" flex flex-col gap-2 w-full">
                  {/* <label className="text-gray-100">Delivery Date</label> */}

                  {/* <BasicTextFields
                    lable={"Delivery Date"}
                    variant={"standard"}
                    multiline={false}
                  /> */}
                  <DatePicker
                    handleOrderProcessingForm={handleOrderProcessingForm}
                  />
                </div>
                <div className=" flex flex-col gap-2 w-full">
                  {/* <label className="text-gray-100">Order Reference</label> */}

                  <BasicTextFields
                    handleOrderProcessingForm={handleOrderProcessingForm}
                    lable={"Order Reference"}
                    variant={"standard"}
                    multiline={false}
                  />
                </div>
                <div className=" flex flex-col gap-2 w-full">
                  {/* <label className="text-gray-100">Select School</label> */}

                  <SearchDropDown
                    handleOrderProcessingForm={handleOrderProcessingForm}
                    data={schoolData}
                    Name={"school_name"}
                    label={"Select School"}
                    color={"rgb(243, 244, 246)"}
                  />
                </div>
                <div className=" flex flex-col gap-2 w-full">
                  {/* <label className="text-gray-100">Select Subject</label> */}

                  <SearchDropDown
                    handleOrderProcessingForm={handleOrderProcessingForm}
                    getSeriesData={getSeriesData}
                    data={subjectData}
                    Name={"subject_name"}
                    label={"Select Subject"}
                    color={"rgb(243, 244, 246)"}
                  />
                </div>
                <div className=" flex flex-col gap-2 w-full">
                  {/* <label className="text-gray-100">Select Series</label> */}

                  <SearchDropDown
                    handleOrderProcessingForm={handleOrderProcessingForm}
                    Name={"series_name"}
                    disable={seriesData[0].disable}
                    data={seriesData}
                    label={"Select Series"}
                    color={"rgb(243, 244, 246)"}
                  />
                </div>
                <div className=" flex flex-col gap-2 w-full">
                  {/* <label className="text-gray-100">Items Quantity</label> */}

                  <BasicTextFields
                    handleOrderProcessingForm={handleOrderProcessingForm}
                    lable={"Items Quantity"}
                    disable={value.item_quan}
                    variant={"standard"}
                    multiline={false}
                  />
                </div>
              </section>
              <Collapse in={open}>
                <section className="bg-white px-3 py-2 rounded-md w-full h-[15rem] overflow-auto sm:grid sm:grid-cols-2 flex flex-col gap-2 col-span-4">
                  {rowData.map((item, index) => {
                    return (
                      <div
                        key={item.id}
                        className="flex flex-col rounded-md text-xs gap-1 px-4 py-2 bg-slate-300 text-slate-700 font-bold"
                      >
                        <span>Item Name: {item.item_name}</span>
                        <span>Item Code: {item.item_code}</span>
                        <span>Discount: {item.fk_discount.discount}%</span>
                        <span>Price: {item.price_masters[0].price}</span>
                        <span>Tax: {item.fk_tax.tax}%</span>
                        <span>
                          Quantity:{"   "}
                          <input
                            type="text"
                            onChange={(e) =>
                              alterItemQuantity(index, e.target.value)
                            }
                            defaultValue={formik.values.item_quan}
                            placeholder="Enter Quantity"
                            className="px-4 py-2 font-bold rounded-md sm:w-[30%] w-[70%] outline-none"
                          />
                        </span>
                      </div>
                    );
                  })}
                </section>
              </Collapse>
              <div className="grid grid-cols-1 grid-rows-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 lg:grid-rows-1 md:grid-rows-2 sm:grid-rows-3 bg-slate-600 rounded-md">
                <div className=" flex flex-col gap-2 w-full">
                  {/* <label className="text-gray-100">Order Priority</label> */}
                  <SearchDropDown
                    handleOrderProcessingForm={handleOrderProcessingForm}
                    data={[
                      { order_priority: "Low" },
                      { order_priority: "Medium" },
                      { order_priority: "High" },
                    ]}
                    label={"Order Priority"}
                    Name={"order_priority"}
                    color={"rgb(243, 244, 246)"}
                  />
                </div>
                <div className=" flex flex-col gap-2 w-full">
                  {/* <label className="text-gray-100">Total Quantity</label> */}

                  <BasicTextFields
                    handleOrderProcessingForm={handleOrderProcessingForm}
                    lable={"Total Quantity"}
                    readOnly={true}
                    defaultValue={value.total_quan}
                    value={value.total_quan}
                    variant={"standard"}
                    multiline={false}
                  />
                </div>
                <div className=" flex flex-col gap-2 w-full">
                  {/* <label className="text-gray-100">Total Before Tax</label> */}

                  <BasicTextFields
                    handleOrderProcessingForm={handleOrderProcessingForm}
                    lable={"Total Before Tax"}
                    defaultValue={value.total_before_tax}
                    value={value.total_before_tax}
                    readOnly={true}
                    variant={"standard"}
                    multiline={false}
                  />
                </div>
                <div className=" flex flex-col gap-2 w-full">
                  {/* <label className="text-gray-100">Total</label> */}

                  <BasicTextFields
                    handleOrderProcessingForm={handleOrderProcessingForm}
                    lable={"Total"}
                    readOnly={true}
                    defaultValue={value.total}
                    value={value.total}
                    variant={"standard"}
                    multiline={false}
                  />
                </div>
              </div>
              <div className="flex sm:flex-row flex-col items-center gap-[2rem] justify-between">
                <div className=" flex flex-col gap-2 w-full md:col-span-2">
                  {/* <label className="text-gray-100">
                    Preffered Transpoter Name
                  </label> */}

                  <BasicTextFields
                    handleOrderProcessingForm={handleOrderProcessingForm}
                    lable={"Preffered Transpoter Name"}
                    variant={"standard"}
                    multiline={false}
                  />
                </div>
                <div className=" flex flex-col gap-2 w-full md:col-span-2">
                  {/* <label className="text-gray-100">Remarks</label> */}

                  <BasicTextFields
                    handleOrderProcessingForm={handleOrderProcessingForm}
                    lable={"Remarks"}
                    //   variant={"standard"}
                    multiline={true}
                  />
                </div>
              </div>
              <div onClick={formik.handleSubmit}>
                <Button text={"Submit"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderProcessing;
