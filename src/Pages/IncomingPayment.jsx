import React, { useEffect } from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { useNavigate } from "react-router-dom";
import SwipeableTemporaryDrawer from "../Components/Material/MaterialSidebar";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useRef } from "react";
import { useLayoutEffect } from "react";
import instance from "../Instance";
import Cookies from "js-cookie";
import { Backdrop, CircularProgress } from "@mui/material";
import { CurrencyRupee } from "@mui/icons-material";

const IncomingPayment = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  //   const navigate = useNavigate();
  const [chartTotal, setChartTotal] = useState(0);
  const [chartTotal2, setChartTotal2] = useState(0);
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState({
    todate: "2023-03-31",
    fromdate: "2022-04-01",
  });
  const [chartData, setChartData] = useState({});
  const [chartData2, setChartData2] = useState({});

  const sidebarRef = useRef();
  ChartJS.register(ArcElement, Tooltip, Legend, Title);

  const show = null;

  const navInfo = {
    title: "Incoming Payment",
    details: ["Home", "Incoming Payment"],
  };

  const handleSidebarCollapsed = () => {
    sidebarRef.current.openSidebar();
  };
  const getPaymentData = async () => {
    const userData = await instance({
      url: "user/profile",
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    const res = await instance({
      url: "incommingpayment/get/sales/series",
      method: "POST",
      data: {
        todate: year.todate,
        fromdate: year.fromdate,
        user: userData.data.message.emp_id,
      },
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    const data = {
      labels: [],
      datasets: [
        {
          label: "total",
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 1,
        },
      ],
    };

    const chartColor = [
      "#f1f5f9",
      "#f87171",
      "#4d7c0f",
      "#0284c7",
      "#6d28d9",
      "#be185d",
      "#c7d2fe",
      "#f9a8d4",
      "#a8a29e",
      "#99f6e4",
      "#facc15",
    ];
    // calc total of chart
    let chartTotal = 0;
    res.data.message.map((item, index) => {
      chartTotal += item.total;
    });
    setChartTotal(chartTotal);
    res.data.message.sort((a, b) => a.total - b.total);
    res.data.message.reverse();
    if (res.data.message.length > 11) {
      for (let index = 0; index < 10; index++) {
        const item = res.data.message[index];
        data.labels.push(item.customer);
        data.datasets[0].data.push(item.total);
        data.datasets[0].backgroundColor.push(`${chartColor[index]}`);
        data.datasets[0].borderColor.push(`${chartColor[index]}`);
      }
      // calculate total for other
      let total = 0;
      for (let index = 11; index < res.data.message.length; index++) {
        const item = res.data.message[index];
        total += item.total;
      }
      data.labels.push("Other");
      data.datasets[0].data.push(total);

      data.datasets[0].backgroundColor.push(`${chartColor[10]}`);
      data.datasets[0].borderColor.push(`${chartColor[10]}`);
      setChartData(data);
    } else {
      res.data.message.map((item, index) => {
        data.labels.push(item.customer);
        data.datasets[0].data.push(item.total);

        data.datasets[0].backgroundColor.push(`${chartColor[index]}`);
        data.datasets[0].borderColor.push(`${chartColor[index]}`);
      });
      setChartData(data);
    }
    const collData = await instance({
      url: "incommingpayment/get/collections",
      method: "POST",
      data: {
        todate: year.todate,
        fromdate: year.fromdate,
        user: userData.data.message.emp_id,
      },
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    setChartTotal2(collData.data.message.totalAmount);
    const data2 = {
      labels: [],
      datasets: [
        {
          label: "total",
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 1,
        },
      ],
    };
    data2.labels.push("Credit Note", "Discount", "Incoming Payment");
    // data2.labels.push("Discount")
    // data2.labels.push("Incoming Payment")
    data2.datasets[0].data.push(
      collData.data.message.creditnote,
      collData.data.message.discount,
      collData.data.message.incommingPayment
    );
    data2.datasets[0].backgroundColor.push(
      `${chartColor[4]}`,
      `${chartColor[5]}`,
      `${chartColor[6]}`
    );
    data2.datasets[0].borderColor.push(
      `${chartColor[4]}`,
      `${chartColor[5]}`,
      `${chartColor[6]}`
    );
    setChartData2(data2);
    setLoading(false);
  };
  useLayoutEffect(() => {
    getPaymentData();
  }, [year]);

  useEffect(() => {
    document.title = "CRM - Incoming Payment";
    const handleWidth = () => {
      if (window.innerWidth > 1024) {
        setSidebarCollapsed(false);
      } else {
        setSidebarCollapsed(true);
      }
    };
    window.addEventListener("resize", handleWidth);
    handleWidth();
    window.scroll(0, 0);

    return () => {
      window.removeEventListener("resize", handleWidth);
    };
  }, []);
  return (
    <>
      <div className="flex w-[100%] min-h-[100vh]">
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <Sidebar
          highLight={"dashboard"}
          sidebarCollapsed={sidebarCollapsed}
          show={show}
        />

        <div>
          <SwipeableTemporaryDrawer
            ref={sidebarRef}
            sidebarCollapsed={sidebarCollapsed}
            show={show}
            highLight={"dashboard"}
          />
        </div>
        <div
          className={`flex flex-col w-[100vw] relative transition-all ease-linear duration-300 lg:w-[83vw] lg:ml-[18vw] ${
            window.innerWidth < 1024 ? null : "md:ml-[30vw] ml-[85vw]"
          } `}
        >
          <Navbar
            handleSidebarCollapsed={handleSidebarCollapsed}
            info={navInfo}
          />

          <div className="min-h-[90vh] relative flex w-full justify-center items-center gap-4 bg-[#141728]">
            <h1 className="text-gray-100 sm:text-2xl text-base font-semibold absolute top-[2rem] left-[2rem]">
              Welcome
            </h1>
            {loading ? null : (
              <div className="w-full flex flex-col px-4 md:py-[5rem] py-12 sm:flex-row gap-6 items-center justify-center">
                <div className="w-full h-full flex flex-col items-center gap-2">
                  <p className="text-gray-200 text-2xl">Sales</p>
                  <Chart data={chartData} total={chartTotal} radius={"70%"} />
                </div>
                <div className="w-full h-full flex flex-col items-center gap-2">
                  <p className="text-gray-200 text-2xl">Collection</p>

                  <Chart data={chartData2} total={chartTotal2} radius={"66%"} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const Chart = ({ data, total, radius }) => {
  const textCenter = {
    id: "textCenter",
    beforeDatasetsDraw(chart, args, pluginOptions) {
      const { ctx, data } = chart;
      ctx.save();
      ctx.font = `bolder ${
        window.screen.width < 640 ? "10px" : "30px"
      } sans-serif`;
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        Math.round(total),
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y
      );
    },
    // afterDatasetsDraw(chart, args, pluginOptions) {
    //   const { ctx, data } = chart;
    //   ctx.save();

    //   data.datasets[0].data.forEach((datapoint, index) => {
    //     const { x, y } = chart.getDatasetMeta(0).data[index].tooltipPostion();
    //     ctx.font = `bolder 10px sans-serif`;
    //     ctx.fillStyle = "white";
    //     ctx.textAlign = "center";
    //     ctx.textBaseline = "middle";
    //     ctx.fillText("text");
    //   });
    // },
  };
  return (
    // <div className="flex flex-col gap-2">
    //   <p className="text-white">adf</p>
    <Doughnut
      data={data}
      options={{
        radius: `${window.screen.width < 640 ? "100%" : radius}`,
      }}
      plugins={[textCenter]}
    />
    // </div>
  );
};

export default IncomingPayment;
