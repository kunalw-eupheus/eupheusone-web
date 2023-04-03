import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import eupheusLogo from "./eupheusLogo.png";
import "./CustLedger.css";
import instance from "../../Instance";
import { useState } from "react";

const CustLedger = () => {
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [bpCode, setBpCode] = useState("");
  const [bpName, setBpName] = useState("");
  const [curr, setCurr] = useState("");
  const [openingDr, setOpeningDr] = useState("");
  const [closingDr, setClosingDr] = useState("");
  const [arrData, setArrData] = useState([]);
  const [ttlDebit, setTtlDebit] = useState("");
  const [ttlCredit, setTtlCredit] = useState("");

  const { bp, todate, fromdate } = useParams();

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    // const res = await axios
    //   .post(
    //     `http://192.168.7.148:5070/api/doc_print/invoice/detail`,
    //     {
    //       category: "inv",
    //       doc_num: docnum,
    //       doc_date: docdate,
    //     },
    //     {
    //       headers: {
    //         accesskey: ``,
    //       },
    //     }
    //   )
    //   .catch((e) => {
    //     console.log(e.message);
    //   });

    // console.log(process.env.CRM_V2KEY)

    console.log(bp, todate, fromdate);

    const res = await instance({
      url: `doc_print/ledger/getdata`,
      method: "post",
      data: {
        bpcode: bp,
        todate:  fromdate,
        fromdate: todate,
      },
      headers: {
        // Authorization: Cookies.get("accessToken"),
        // accesskey: `auth74961a98ba76d4e4`,
        accesskey: `auth0026c3956e3d0fba`
      },
    });
    // console.log(res.data.message)
    let data = res.data.message.message[0];
    let tableData = res.data.message.items;
    let totalDebit = 0,
      totalCredit = 0;
    for (let obj of tableData) {
      totalDebit += obj.debitAmount;
      totalCredit += obj.creditAmount;
      // console.log(obj.debitAmount)
    }
    // console.log(totalDebit)
    setTtlDebit(totalDebit);
    // console.log(totalCredit)
    setTtlCredit(totalCredit);
    // console.log(data);
    setDate(data.date);
    setAddress(data.address);
    setBpCode(data.bpcode);
    setBpName(data.bpname);
    setCurr(data.cur);
    setOpeningDr(data.opening);
    setClosingDr(data.closing);
    setArrData(tableData);
    console.log(tableData);
  };

  return (
    <div className="bg-white w-[21cm]">
      <p style={{ textIndent: "0pt", textAlign: "left" }}>
        <span></span>
      </p>
      <table border={0} cellSpacing={0} cellPadding={0}>
        <tbody>
          <tr>
            <td>
              <div
                style={{
                  paddingLeft: "15pt",
                }}
              >
                <img width={320} height={94} src={eupheusLogo} />
              </div>
            </td>
            <td>
              <h1
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "150pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                Proficiency Learning Solutions Pvt Ltd
              </h1>
              <h3
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "150pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                Khasra No. 75, Village Malakpur, Ecotech-2, Opp. NTPC Ltd. (Netra), Greater Noida, Gautam Budh Nagar              </h3>
              <h3
                style={{
                  paddingLeft: "150pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                Greater Noida - 201306, Uttar Pradesh - INDIA
              </h3>
            </td>
          </tr>
        </tbody>
      </table>
      <p />

      <p style={{ textIndent: "0pt", textAlign: "left" }}>
        <br />
      </p>

      <table style={{ borderCollapse: "collapse" }} cellSpacing={0}>
        <tbody>
          <tr style={{ height: "20pt" }}>
            <td style={{ width: "726pt" }} colSpan={6}>
              <h2
                style={{
                  paddingLeft: "240pt",
                  textIndent: "0pt",
                  lineHeight: "180%",
                  textAlign: "left",
                }}
              >
                Customer Ledger
              </h2>
            </td>
          </tr>
        </tbody>
      </table>

      <table style={{ borderCollapse: "collapse" }} cellSpacing={0}>
        <tbody>
          <tr style={{ height: "20pt" }}>
            <td style={{ width: "726pt" }} colSpan={6}>
              <h2
                style={{
                  paddingLeft: "15pt",
                  textIndent: "0pt",
                  lineHeight: "180%",
                  textAlign: "left",
                }}
              >
                {/* Date: {01-Oct-2021 to 18-Oct-2022} */}
                Date: {date}
              </h2>
            </td>
          </tr>
          {/* <tr style={{ height: "17pt" }}>
            <td style={{ width: "819pt" }} colSpan={7}>
              <p
                className="s4"
                style={{
                  paddingTop: "3pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                Currency INR Opening :- Dr 195,121.00
              </p>
            </td>
          </tr> */}

          <tr style={{ height: "18pt", borderBottom: '2px solid black' }}>
            <td
              style={{
                width: "93pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
              }}
              colSpan={3}
            >
              <h2
                style={{
                  paddingLeft: "15pt",
                  textIndent: "0pt",
                  lineHeight: "180%",
                  textAlign: "left",
                }}
              >
                Customer Code{" "}
                <span className="s8">
                  {/* CBP000211 */}
                  {bpCode}
                </span>
              </h2>
              <h2
                style={{
                  paddingLeft: "15pt",
                  textIndent: "0pt",
                  lineHeight: "180%",
                  textAlign: "left",
                }}
              >
                Customer Name{" "}
                <span className="s8">
                  {/* MKK Enterprises */}
                  {bpName}
                </span>
              </h2>
            </td>

            <td
              style={{
                width: "93pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
              }}
              colSpan={3}
            >
              <h2
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  lineHeight: "180%",
                  textAlign: "left",
                }}
              >
                Address:{" "}
                <span className="s8">
                  {/* F-2/13 Ratiya Marg Sangam Vihar , New Delhi, DELHI,India, 110080 */}
                  {address}
                </span>
              </h2>
            </td>

            <td
              style={{
                width: "293pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
              }}
            >
              <h2
                style={{
                  paddingLeft: "15pt",
                  textIndent: "0pt",
                  lineHeight: "180%",
                  textAlign: "left",
                }}
              >
                {/* Address:{" "} */}
                {/* <span className="s8"> */}
                {/* F-2/13 Ratiya Marg Sangam Vihar , New Delhi, DELHI,India, 110080 */}
                {/* {address} */}
                {/* </span> */}
              </h2>
            </td>
          </tr>

          {/* <hr style={{
          background: 'black',
          color: 'black',
          borderColor: 'black',
          height: '2px',
          width: "100%"
        }}/> */}

          {/* <tr style={{
          background: 'black',
          color: 'black',
          borderColor: 'black',
          height: '12px',
          width: "100%"
        }}>
        </tr> */}
          {/* <div className="w-[21cm]" style={{
          borderTop: "solid",
          
        }}>
            Hello */}

   

          <tr
            style={{
              // background: "black",
              color: "black",
              borderColor: "black",
              // height: "2px",
            }}
          >
            <td
              style={{
                width: "93pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p
                className="s4"
                style={{
                  paddingLeft: "20pt",
                  paddingTop: "4pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                Currency
              </p>
            </td>
            <td
              style={{
                width: "114pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
              colSpan={4}
            >
              <p
                className="s4"
                style={{
                  paddingTop: "5pt",
                  paddingLeft: "44pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                {/* INR */}
                {curr}
              </p>
            </td>
            <td
              style={{
                width: "255pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p
                className="s4"
                style={{
                  paddingTop: "5pt",
                  paddingLeft: "9pt",
                  paddingRight: "21pt",
                  textIndent: "0pt",
                  textAlign: "center",
                }}
              >
                Opening :- Dr
              </p>
            </td>

            <td
              style={{
                width: "169pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p
                className="s4"
                style={{
                  paddingTop: "5pt",
                  paddingRight: "86pt",
                  textIndent: "0pt",
                  textAlign: "right",
                }}
              >
                {/* 195,121.00 */}
                {`${openingDr}.00`}
              </p>
            </td>
          </tr>

          {/* </div> */}

          <tr style={{ height: "18pt" }}>
            <td
              style={{
                width: "150pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p
                className="s4"
                style={{
                  paddingLeft: "15pt",
                  paddingTop: "4pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                Document No
              </p>
            </td>
            <td
              style={{
                width: "114pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p
                className="s4"
                style={{
                  paddingTop: "5pt",
                  paddingLeft: "44pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                Doc Date
              </p>
            </td>
            <td
              style={{
                width: "107pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p
                className="s4"
                style={{
                  paddingTop: "5pt",
                  paddingLeft: "22pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                Description
              </p>
            </td>
            <td
              style={{
                width: "180pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p
                className="s4"
                style={{
                  paddingTop: "5pt",
                  paddingLeft: "9pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                Reference
              </p>
            </td>
            <td
              style={{
                width: "55pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p
                className="s4"
                style={{
                  paddingTop: "5pt",
                  paddingLeft: "9pt",
                  paddingRight: "21pt",
                  textIndent: "0pt",
                  textAlign: "center",
                }}
              >
                Dr/Cr
              </p>
            </td>
            <td
              style={{
                width: "101pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p
                className="s4"
                style={{
                  paddingTop: "5pt",
                  paddingRight: "19pt",
                  textIndent: "0pt",
                  textAlign: "right",
                }}
              >
                Debit Amount
              </p>
            </td>
            <td
              style={{
                width: "169pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p
                className="s4"
                style={{
                  paddingTop: "5pt",
                  paddingRight: "86pt",
                  textIndent: "0pt",
                  textAlign: "right",
                }}
              >
                Credit Amount
              </p>
            </td>
          </tr>

          {arrData.map((item) => {
            return (
              <tr style={{ height: "24pt" }}>
                <td
                  style={{
                    width: "100pt",
                    borderTopStyle: "solid",
                    borderTopWidth: "1pt",
                  }}
                >
                  <p
                    className="s5"
                    style={{
                      paddingLeft: "15pt",
                      paddingTop: "5pt",
                      textIndent: "0pt",
                      textAlign: "left",
                    }}
                  >
                    {/* CN/31581/21-22 */}
                    {item.docno}
                  </p>
                </td>
                <td
                  style={{
                    width: "250pt",
                    borderTopStyle: "solid",
                    borderTopWidth: "1pt",
                  }}
                >
                  <p
                    className="s5"
                    style={{
                      paddingTop: "5pt",
                      paddingLeft: "44pt",
                      textIndent: "0pt",
                      textAlign: "left",
                    }}
                  >
                    {/* 14-Dec-2021 */}
                    {item.docdate}
                  </p>
                </td>
                <td
                  style={{
                    width: "107pt",
                    borderTopStyle: "solid",
                    borderTopWidth: "1pt",
                  }}
                >
                  <p
                    className="s6"
                    style={{
                      paddingTop: "5pt",
                      paddingLeft: "22pt",
                      textIndent: "0pt",
                      textAlign: "left",
                    }}
                  >
                    {/* Credit Note */}
                    {item.desc}
                  </p>
                </td>
                <td
                  style={{
                    width: "180pt",
                    borderTopStyle: "solid",
                    borderTopWidth: "1pt",
                  }}
                >
                  <p
                    className="s6"
                    style={{
                      paddingTop: "5pt",
                      paddingLeft: "9pt",
                      textIndent: "0pt",
                      textAlign: "left",
                    }}
                  >
                    {/* 31581 */}
                    {item.ref}
                  </p>
                </td>
                <td
                  style={{
                    width: "55pt",
                    borderTopStyle: "solid",
                    borderTopWidth: "1pt",
                  }}
                >
                  <p
                    className="s5"
                    style={{
                      paddingTop: "5pt",
                      paddingLeft: "9pt",
                      paddingRight: "19pt",
                      textIndent: "0pt",
                      textAlign: "center",
                    }}
                  >
                    {/* Cr */}
                    {item.DrCr}
                  </p>
                </td>
                <td
                  style={{
                    width: "101pt",
                    borderTopStyle: "solid",
                    borderTopWidth: "1pt",
                  }}
                >
                  <p
                    className="s5"
                    style={{
                      paddingTop: "5pt",
                      paddingRight: "22pt",
                      textIndent: "0pt",
                      textAlign: "right",
                    }}
                  >
                    {/* 0.00 */}
                    {`${item.debitAmount}.00`}
                  </p>
                </td>
                <td
                  style={{
                    width: "169pt",
                    borderTopStyle: "solid",
                    borderTopWidth: "1pt",
                  }}
                >
                  <p
                    className="s5"
                    style={{
                      paddingTop: "5pt",
                      paddingRight: "89pt",
                      textIndent: "0pt",
                      textAlign: "right",
                    }}
                  >
                    {/* 56,056.00 */}
                    {`${item.creditAmount}.00`}
                  </p>
                </td>
              </tr>
            );
          })}

          {/* <tr style={{ height: "26pt" }}>
            <td style={{ width: "93pt" }}>
              <p
                className="s5"
                style={{
                  paddingLeft: "15pt",
                  paddingTop: "7pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                CN/31982/21-22
              </p>
            </td>
            <td style={{ width: "114pt" }}>
              <p
                className="s5"
                style={{
                  paddingTop: "7pt",
                  paddingLeft: "44pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                17-Jan-2022
              </p>
            </td>
            <td style={{ width: "107pt" }}>
              <p
                className="s6"
                style={{
                  paddingTop: "7pt",
                  paddingLeft: "22pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                Credit Note
              </p>
            </td>
            <td style={{ width: "180pt" }}>
              <p
                className="s6"
                style={{
                  paddingTop: "7pt",
                  paddingLeft: "9pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                31982
              </p>
            </td>
            <td style={{ width: "55pt" }}>
              <p
                className="s5"
                style={{
                  paddingTop: "7pt",
                  paddingLeft: "9pt",
                  paddingRight: "19pt",
                  textIndent: "0pt",
                  textAlign: "center",
                }}
              >
                Cr
              </p>
            </td>
            <td style={{ width: "101pt" }}>
              <p
                className="s5"
                style={{
                  paddingTop: "7pt",
                  paddingRight: "22pt",
                  textIndent: "0pt",
                  textAlign: "right",
                }}
              >
                0.00
              </p>
            </td>
            <td style={{ width: "169pt" }}>
              <p
                className="s5"
                style={{
                  paddingTop: "7pt",
                  paddingRight: "89pt",
                  textIndent: "0pt",
                  textAlign: "right",
                }}
              >
                3,136.00
              </p>
            </td>
          </tr>
          <tr style={{ height: "31pt" }}>
            <td style={{ width: "93pt" }}>
              <p
                className="s5"
                style={{
                  paddingLeft: "15pt",
                  paddingTop: "7pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                DISC/601210
              </p>
            </td>
            <td style={{ width: "114pt" }}>
              <p
                className="s5"
                style={{
                  paddingTop: "7pt",
                  paddingLeft: "44pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                11-Mar-2022
              </p>
            </td>
            <td style={{ width: "107pt" }}>
              <p
                className="s6"
                style={{
                  paddingTop: "7pt",
                  paddingLeft: "22pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                Discount Entry
              </p>
            </td>
            <td style={{ width: "180pt" }}>
              <p
                className="s6"
                style={{
                  paddingTop: "7pt",
                  paddingLeft: "9pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                Being SD reversed against CN-31581 &amp; 31982
              </p>
            </td>
            <td style={{ width: "55pt" }}>
              <p
                className="s5"
                style={{
                  paddingTop: "7pt",
                  paddingLeft: "9pt",
                  paddingRight: "19pt",
                  textIndent: "0pt",
                  textAlign: "center",
                }}
              >
                Dr
              </p>
            </td>
            <td style={{ width: "101pt" }}>
              <p
                className="s5"
                style={{
                  paddingTop: "7pt",
                  paddingRight: "22pt",
                  textIndent: "0pt",
                  textAlign: "right",
                }}
              >
                18,497.00
              </p>
            </td>
            <td style={{ width: "169pt" }}>
              <p
                className="s5"
                style={{
                  paddingTop: "7pt",
                  paddingRight: "89pt",
                  textIndent: "0pt",
                  textAlign: "right",
                }}
              >
                0.00
              </p>
            </td>
          </tr>
          <tr style={{ height: "23pt" }}>
            <td
              style={{
                width: "93pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p
                className="s5"
                style={{
                    paddingLeft: "15pt",
                  paddingTop: "2pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                INC/647
              </p>
            </td>
            <td
              style={{
                width: "114pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p
                className="s5"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "44pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                27-Apr-2022
              </p>
            </td>
            <td
              style={{
                width: "107pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p
                className="s6"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "22pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                Incoming Payment
              </p>
            </td>
            <td
              style={{
                width: "180pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p
                className="s6"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "9pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                647
              </p>
            </td>
            <td
              style={{
                width: "55pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p
                className="s5"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "9pt",
                  paddingRight: "19pt",
                  textIndent: "0pt",
                  textAlign: "center",
                }}
              >
                Cr
              </p>
            </td>
            <td
              style={{
                width: "101pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p
                className="s5"
                style={{
                  paddingTop: "2pt",
                  paddingRight: "22pt",
                  textIndent: "0pt",
                  textAlign: "right",
                }}
              >
                0.00
              </p>
            </td>
            <td
              style={{
                width: "169pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p
                className="s5"
                style={{
                  paddingTop: "2pt",
                  paddingRight: "89pt",
                  textIndent: "0pt",
                  textAlign: "right",
                }}
              >
                167,200.00
              </p>
            </td>
          </tr> */}

          <tr style={{ height: "9pt" }}>
            <td
              style={{
                width: "93pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "114pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "107pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "180pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "55pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "101pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
              }}
            >
              <p
                className="s7"
                style={{
                  paddingRight: "22pt",
                  textIndent: "0pt",
                  lineHeight: "8pt",
                  textAlign: "right",
                }}
              >
                {/* 18,497.00 */}
                {`${ttlDebit}.00`}
              </p>
            </td>
            <td
              style={{
                width: "169pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
              }}
            >
              <p
                className="s7"
                style={{
                  paddingRight: "89pt",
                  textIndent: "0pt",
                  lineHeight: "8pt",
                  textAlign: "right",
                }}
              >
                {/* 226,392.00 */}
                {`${ttlCredit}.00`}
              </p>
            </td>
          </tr>
          <tr style={{ height: "15pt" }}>
            <td style={{ width: "819pt" }} colSpan={7}>
              <p
                className="s4"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "362pt",
                  textIndent: "0pt",
                  lineHeight: "9pt",
                  textAlign: "left",
                }}
              >
                Closing Balance : {`${closingDr}.00`}
                {/* -12,774.00 */}
              </p>
            </td>
          </tr>
        </tbody>
      </table>

      <p
        style={{
          paddingLeft: "5pt",
          textIndent: "0pt",
          lineHeight: "1pt",
          textAlign: "left",
        }}
      ></p>
      <p style={{ textIndent: "0pt", textAlign: "left" }}>
        <br />
      </p>
      {/* <p style={{ textIndent: "0pt", textAlign: "left" }}>
        <br />
      </p> */}
      <p
        style={{
          paddingLeft: "5pt",
          textIndent: "0pt",
          lineHeight: "1pt",
          textAlign: "left",
        }}
      ></p>
      <hr
        style={{
          background: "black",
          color: "black",
          borderColor: "black",
          height: "2px",
        }}
      />
      <p
        className="s9"
        style={{
          paddingTop: "4pt",
          paddingLeft: "5pt",
          textIndent: "0pt",
          textAlign: "left",
        }}
      >
        System Generated Statement hence no signature required
      </p>
    </div>
  );
};

export default CustLedger;
