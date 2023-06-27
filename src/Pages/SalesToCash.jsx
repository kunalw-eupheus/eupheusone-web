import React, { useEffect } from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import SwipeableTemporaryDrawer from "../Components/Material/MaterialSidebar";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

import { Doughnut } from "react-chartjs-2";
import { useRef } from "react";
import { useLayoutEffect } from "react";
import instance from "../Instance";
import Cookies from "js-cookie";
import { Backdrop, CircularProgress } from "@mui/material";
import { CurrencyRupee } from "@mui/icons-material";
import BasicButton from "../Components/Material/Button";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";

const SalesToCash = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  //   const navigate = useNavigate();
  const [chartTotal, setChartTotal] = useState(0);
  const [chartTotal2, setChartTotal2] = useState(0);
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState({
    todate: "2024-03-31",
    fromdate: "2023-04-01",
  });
  const [error, setError] = useState(false);
  const [chartData, setChartData] = useState({});
  const [chartData2, setChartData2] = useState({});
  const [xlData, setXlData] = useState([]);
  const sidebarRef = useRef();
  ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

  const show = null;

  const navInfo = {
    title: "Order To Cash",
    details: ["Home", "Order To Cash"],
  };

  const handleSidebarCollapsed = () => {
    sidebarRef.current.openSidebar();
  };
  const getPaymentData = async () => {
    setLoading(true);
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
    if (res.data.message === "No data found") {
      setError(true);
    } else {
      setError(false);
      setXlData(res.data.message);
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
          if (item.customer != null) {
            data.labels.push(item.customer);
            data.datasets[0].data.push(item.total);
            data.datasets[0].backgroundColor.push(`${chartColor[index]}`);
            data.datasets[0].borderColor.push(`${chartColor[index]}`);
          }
        }
        // calculate total for other
        let total = 0;
        for (let index = 11; index < res.data.message.length; index++) {
          const item = res.data.message[index];
          if (item.customer != null) {
            total += item.total;
          }
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
    }
    setLoading(false);
  };
  useLayoutEffect(() => {
    getPaymentData();
  }, [year]);

  const exportToCSV = async () => {
    let columnsName = ["SNo", "Customer", "Collection"];
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    let reqExportData = [];
    console.log(xlData);
    for (let i = 0; i < xlData.length; i++) {
      const obj = xlData[i];
      if (obj.customer != null && obj.total != null) {
        let reqObj = {
          SNo: i + 1,
          Customer: obj.customer,
          Collection: obj.total,
        };
        reqExportData.push(reqObj);
      }
    }
    console.log(reqExportData);

    let fileName = "sales_report";
    const ws = XLSX.utils.json_to_sheet(reqExportData);
    /* custom headers */
    XLSX.utils.sheet_add_aoa(ws, [columnsName], {
      origin: "A1",
    });
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

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

  const changeYear = (year) => {
    console.log(year);
    setLoading(true);
    setYear({ fromdate: year.start, todate: year.end });
    setLoading(false);
  };

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
          highLight={"salesToCash"}
          sidebarCollapsed={sidebarCollapsed}
          show={show}
        />

        <div>
          <SwipeableTemporaryDrawer
            ref={sidebarRef}
            sidebarCollapsed={sidebarCollapsed}
            show={show}
            highLight={"salesToCash"}
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
            changeYear={changeYear}
          />

          <div className="min-h-[90vh] relative flex w-full justify-center items-center gap-4 bg-[#141728]">
            <h1 className="text-gray-100 sm:text-2xl text-base font-semibold absolute top-[2rem] left-[2rem]">
              Welcome
            </h1>
            {loading ? null : error ? (
              <p className="text-gray-200 sm:text-xl text-sm">No Data Found</p>
            ) : (
              <main className="w-full flex flex-col gap-1">
                <div
                  className="w-full flex justify-end pr-8 pt-8"
                  onClick={exportToCSV}
                >
                  <BasicButton size={"small"} text={"Download Sales Report"} />
                </div>
                <div className="w-full flex flex-col px-4 md:py-[5rem] py-12 sm:flex-row gap-6 items-center justify-center">
                  <div className="w-full h-full flex flex-col items-center gap-2">
                    <p className="text-gray-200 text-2xl">Sales</p>
                    <Chart data={chartData} total={chartTotal} radius={"70%"} />
                  </div>
                  <div className="w-full h-full flex flex-col items-center gap-2">
                    <p className="text-gray-200 text-2xl">Collection</p>

                    <Chart
                      data={chartData2}
                      total={chartTotal2}
                      radius={"66%"}
                    />
                  </div>
                </div>
              </main>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const returnCr = (num) => {
  // console.log(num);
  const incr = num / 10000000;
  // console.log(incr);
  return incr;
};

const Chart = ({ data, total, radius }) => {
  const chartRef = React.useRef(null);

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
        returnCr(Math.round(total))?.toFixed(4) + "Cr",
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y
      );
    },
  };
  return (
    <Doughnut
      ref={chartRef}
      data={data}
      options={{
        radius: `${window.screen.width < 640 ? "100%" : radius}`,
        spacing: 10,
        responsive: true,
        plugins: {
          legend: {
            display: window.screen.width < 640 ? false : true,
            position: "top",
          },

          datalabels: {
            display: true,
            color: "#fff",
            backgroundColor: "#404040",

            align: "end",
            padding: {
              right: 2,
            },
            anchor: "center",
            // labels: {
            //   padding: { top: 20 },

            //   title: {
            //     font: {
            //       weight: "bold",
            //       size: 10,
            //     },
            //     anchor:"start"
            //   },
            //   // value: {
            //   //   color: "black",
            //   //   font: {
            //   //     size: 20,
            //   //     weight: "bold",
            //   //   },
            //   // },
            // },
            formatter: function (value, ctx) {
              const label = ctx.chart.data.labels[ctx.dataIndex];
              return `${label}; ${Math.round(value)}`;
            },
          },
        },
      }}
      plugins={[textCenter]}
    />
  );
};

export default SalesToCash;
