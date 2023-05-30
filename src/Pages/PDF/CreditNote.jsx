import React, { useEffect, useState } from "react";
import eupheusLogo from "./eupheusLogo.png";
import "./CreditNote.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import instance from "../../Instance";
import Cookies from "js-cookie";
import { useLayoutEffect } from "react";
import { toWords } from "number-to-words";
import { wordify } from "../../util/NumtoWords";

const CreditNote = () => {
  const [tableData, setTableData] = useState([]);
  const [billToGst, setBillToGst] = useState("");
  const [boxes, setBoxes] = useState("");
  const [curr, setCurr] = useState("");
  const [docDate, setDocDate] = useState("");
  const [LrNo, setLrNo] = useState("");
  const [pmntTerms, setPmntTerms] = useState("");
  const [refDate, setRefDate] = useState("");
  const [refNo, setRefNo] = useState("");
  const [shipsTo, setShipsTo] = useState("");
  const [shipsToMobile, setShipsToMobile] = useState("");
  const [shipsToState, setShipsToState] = useState("");
  const [shipsToStateCode, setShipsToStateCode] = useState("");
  const [uGrno, setUgrno] = useState("");
  const [cIn, setCin] = useState("");
  const [remarks, setRemarks] = useState("");
  const [taxAmount, setTaxAmount] = useState("");
  const [totalAmnt, setTotalAmnt] = useState("");
  const [billToName, setBillToName] = useState("");
  const [billToAdd, setBillToAdd] = useState("");
  const [transporteName, setTransporterName] = useState("");
  const [creditNum, setCreditNum] = useState("");
  const [grDate, setGrDate] = useState("");
  const [amountInwords, setAmountInWords] = useState("");

  const { docNum, docdate } = useParams();

  useLayoutEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    const res = await instance({
      url: `doc_print/credits/azure/pdfdetail`,
      method: "POST",
      data: {
        docnum: docNum,
        docdate: docdate,
      },
      headers: {
        // Authorization: `${Cookies.get("accessToken")}`,
        accesskey: `auth0026c3956e3d0fba`,
      },
    });
    // console.log(res.data.message);

    let tblData = res.data.message.items;
    for (let obj of tblData) {
      obj.PRICE = "" + obj.PRICE + ".00";
      obj.DiscPrcnt = "" + obj.DiscPrcnt + ".00";
      obj.amount = "" + obj.amount + ".00";
      obj.CGSTRATE = "" + obj.CGSTRATE + ".00";
      obj.CGSTAMNT = "" + obj.CGSTAMNT + ".00";
      obj.SGSTRATE = "" + obj.SGSTRATE + ".00";
      obj.SGSTAMNT = "" + obj.SGSTAMNT + ".00";
      obj.IGSTAMNT = "" + obj.IGSTAMNT + ".00";
      obj.IGSTRATE = "" + obj.IGSTRATE + ".00";
    }
    setTableData(tblData);

    let msgData = res.data.message.message[0];
    console.log(msgData);
    setBillToGst(msgData?.Bill_to_GST_No);
    setBoxes(msgData?.Boxes);
    setCurr(msgData?.CUR);
    setDocDate(msgData?.DOCDATE);
    setLrNo(msgData?.LRNo);
    setPmntTerms(msgData?.Payment_Terms);
    setRefDate(msgData?.Reference_Date);
    setRefNo(msgData?.Reference_No);
    setShipsTo(msgData?.SHIP_TO);
    setShipsToMobile(msgData?.SHIP_TO_MOBILE);
    setTransporterName(msgData?.transporter_name);
    setCreditNum(msgData?.credit_num);
    setShipsToState(msgData?.SHIP_TO_STATE_NAME);
    setShipsToStateCode(msgData?.SHIP_TO_STATE_CODE);
    setGrDate(msgData?.U_GRNO_DATE);
    setUgrno(msgData?.U_GRNO);
    setCin(msgData?.cin);
    setRemarks(msgData?.remarks);
    setTaxAmount(msgData?.tax_amount);

    setTotalAmnt(msgData?.total);
    setAmountInWords(wordify(msgData?.total));
    let billToName = msgData?.bill_to[0];
    setBillToName(billToName);
    let billToAdd = msgData?.bill_to[1];
    setBillToAdd(billToAdd);
    // console.log(billToAdd);
  };

  return (
    <div className="bg-white">
      <p style={{ textIndent: "0pt", textAlign: "left" }}>
        <span />
      </p>
      <table border={0} cellSpacing={0} cellPadding={0}>
        <tbody>
          <tr>
            <td>
              <img width={295} height={87} src={eupheusLogo} />
            </td>
            <td>
              <p
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "20pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "13pt",
                  // fontWeight: "bold",
                }}
              >
                Proficiency Learning Solutions Pvt Ltd
              </p>
              <p
                style={{
                  paddingTop: "5pt",
                  paddingLeft: "20pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "10pt",
                }}
              >
                Main Mathura Road A-12 2nd Floor,Mohan Cooperative Industrial
                Estate <br /> New Delhi DL 110044 India
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <p />

      <p style={{ textIndent: "0pt", textAlign: "left" }}>
        <br />
      </p>
      <table
        style={{ borderCollapse: "collapse", marginLeft: "5.5pt" }}
        cellSpacing={0}
      >
        <tbody>
          <tr style={{ height: "20pt" }}>
            <td
              style={{
                width: "1030pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
              colSpan={17}
            >
              <p
                className="s1"
                style={{
                  paddingTop: "5pt",
                  paddingLeft: "220pt",
                  paddingRight: "267pt",
                  textIndent: "0pt",
                  lineHeight: "11pt",
                  textAlign: "center",
                }}
              >
                CREDIT NOTE
              </p>
            </td>
          </tr>
          <tr style={{ height: "29pt" }}>
            <td
              style={{
                width: "186pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={5}
              rowSpan={3}
            >
              <p
                className="s5"
                style={{
                  paddingTop: "3pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                Bill To :
              </p>
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
              <p
                className="s3"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "10pt",
                }}
              >
                {billToName}
              </p>
              <p
                className="s4"
                style={{
                  paddingTop: "1pt",
                  paddingLeft: "5pt",
                  textIndent: "2pt",
                  textAlign: "left",
                  fontSize: "10pt",
                }}
              >
                {/* F-2/13 Ratiya Marg Sangam Vihar,MKK Enterprises, */}
                {billToAdd}
              </p>
            </td>
            <td
              style={{
                width: "181pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={8}
            >
              <p
                className="s5"
                style={{
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  lineHeight: "9pt",
                  textAlign: "left",
                  paddingTop: "7pt",
                }}
              >
                Sales Credit Invoice No.
              </p>
              <p
                className="s6"
                style={{
                  paddingLeft: "22pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  marginTop: "3pt",
                }}
              >
                CN / {creditNum}
              </p>
            </td>
            <td
              style={{
                width: "193pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
              colSpan={4}
            >
              <p
                className="s5"
                style={{
                  paddingLeft: "34pt",
                  textIndent: "0pt",
                  lineHeight: "9pt",
                  textAlign: "left",
                  paddingTop: "7pt",
                }}
              >
                Dated
              </p>
              <p
                className="s6"
                style={{
                  paddingTop: "1pt",
                  paddingLeft: "34pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                {docDate}
              </p>
            </td>
          </tr>
          <tr style={{ height: "30pt" }}>
            <td
              style={{
                width: "181pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={8}
            >
              <p
                className="s5"
                style={{
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  lineHeight: "9pt",
                  textAlign: "left",
                  paddingTop: "7pt",
                }}
              >
                Challan No.
              </p>
              <p
                className="s6"
                style={{
                  marginTop: "3pt",
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  lineHeight: "11pt",
                  textAlign: "left",
                }}
              >
                {/* Test */}
              </p>
            </td>
            <td
              style={{
                width: "193pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
              colSpan={4}
            >
              <p
                className="s5"
                style={{
                  paddingLeft: "34pt",
                  textIndent: "0pt",
                  lineHeight: "9pt",
                  textAlign: "left",
                  paddingTop: "7pt",
                }}
              >
                Mode/Terms of Payment
              </p>
              <p
                className="s6"
                style={{
                  marginTop: "3pt",
                  paddingLeft: "34pt",
                  textIndent: "0pt",
                  lineHeight: "11pt",
                  textAlign: "left",
                }}
              >
                {pmntTerms}
              </p>
            </td>
          </tr>
          <tr style={{ height: "13pt" }}>
            <td
              style={{
                width: "181pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={8}
            >
              <p
                className="s5"
                style={{
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  lineHeight: "9pt",
                  textAlign: "left",
                  paddingTop: "7pt",
                }}
              >
                Reference No.
              </p>
            </td>
            <td
              style={{
                width: "193pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
              }}
              colSpan={4}
            >
              <p
                className="s5"
                style={{
                  paddingLeft: "34pt",
                  textIndent: "0pt",
                  lineHeight: "9pt",
                  textAlign: "left",
                  paddingTop: "7pt",
                }}
              >
                Reference Date
              </p>
            </td>
          </tr>
          <tr style={{ height: "16pt" }}>
            <td
              style={{
                width: "186pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={5}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "181pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={8}
            >
              <p
                className="s6"
                style={{
                  paddingTop: "3pt",
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  lineHeight: "11pt",
                  textAlign: "left",
                }}
              >
                {refNo}
              </p>
            </td>
            <td
              style={{
                width: "193pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
              }}
              colSpan={4}
            >
              <p
                className="s6"
                style={{
                  paddingTop: "3pt",
                  paddingLeft: "34pt",
                  textIndent: "0pt",
                  lineHeight: "11pt",
                  textAlign: "left",
                }}
              >
                {refDate}
              </p>
            </td>
          </tr>
          <tr style={{ height: "7pt" }}>
            <td
              style={{
                width: "186pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={5}
              rowSpan={2}
            >
              <p
                className="s5"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                GSTIN Number :
              </p>
              <p
                className="s6"
                style={{
                  paddingTop: "3pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  lineHeight: "11pt",
                  textAlign: "left",
                }}
              >
                {billToGst}
              </p>
            </td>
            <td
              style={{
                width: "181pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={8}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "193pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
              colSpan={4}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "33pt" }}>
            <td
              style={{
                width: "181pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={8}
            >
              <p
                className="s5"
                style={{
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  lineHeight: "9pt",
                  textAlign: "left",
                  paddingTop: "5pt",
                }}
              >
                Order No.
              </p>
              <p
                className="s6"
                style={{
                  marginTop: "3pt",
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  lineHeight: "11pt",
                  textAlign: "left",
                }}
              >
                {/* Test */}
              </p>
            </td>
            <td
              style={{
                width: "193pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
              colSpan={4}
            >
              <p
                className="s5"
                style={{
                  paddingLeft: "34pt",
                  textIndent: "0pt",
                  lineHeight: "9pt",
                  textAlign: "left",
                  paddingTop: "5pt",
                }}
              >
                Dated
              </p>
              <p
                className="s6"
                style={{
                  marginTop: "3pt",
                  paddingLeft: "34pt",
                  textIndent: "0pt",
                  lineHeight: "11pt",
                  textAlign: "left",
                }}
              >
                {/* Test */}
              </p>
            </td>
          </tr>
          <tr style={{ height: "13pt" }}>
            <td
              style={{
                width: "186pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={5}
            >
              <p
                className="s5"
                style={{
                  paddingTop: "1pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                Ship To :
              </p>
            </td>
            <td
              style={{
                width: "181pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={8}
            >
              <p
                className="s5"
                style={{
                  // paddingTop: "1pt",
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  lineHeight: "10pt",
                  textAlign: "left",
                  marginTop: "7pt",
                }}
              >
                Dispatch Doc No.
              </p>
              <p
                className="s6"
                style={{
                  marginTop: "5pt",
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  lineHeight: "11pt",
                  textAlign: "left",
                }}
              >
                {/* Test */}
              </p>
            </td>
            <td
              style={{
                width: "193pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
              }}
              colSpan={4}
            >
              <p
                className="s5"
                style={{
                  // paddingTop: "1pt",
                  paddingLeft: "34pt",
                  textIndent: "0pt",
                  lineHeight: "10pt",
                  textAlign: "left",
                  marginTop: "7pt",
                }}
              >
                Motor Vehicle No.
              </p>
              <p
                className="s6"
                style={{
                  marginTop: "5pt",
                  paddingLeft: "33pt",
                  textIndent: "0pt",
                  lineHeight: "11pt",
                  textAlign: "left",
                }}
              >
                {/* Test */}
              </p>
            </td>
          </tr>
          <tr style={{ height: "12pt" }}>
            <td
              style={{
                width: "186pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={5}
            >
              <p
                className="s3"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "10pt",
                }}
              >
                MKK Enterprises
              </p>
            </td>
            <td
              style={{
                width: "181pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={8}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "193pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
              }}
              colSpan={4}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "8pt" }}>
            <td
              style={{
                width: "186pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={5}
              rowSpan={2}
            >
              <p
                className="s4"
                style={{
                  paddingTop: "1pt",
                  paddingLeft: "5pt",
                  textIndent: "2pt",
                  textAlign: "left",
                  fontSize: "10pt",
                }}
              >
                {/* F-2/13 Ratiya Marg Sangam Vihar New Delhi,MKK Enterprises, */}
                {shipsTo}
              </p>
              {/* <p
                className="s4"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  lineHeight: "8pt",
                  textAlign: "left",
                }}
              >
                ,
              </p> */}
              {/* <p
                className="s4"
                style={{
                  paddingLeft: "5pt",
                  paddingRight: "105pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "10pt",
                }}
              >
                New Delhi - 110080 Delhi - INDIA
              </p> */}
            </td>
            <td
              style={{
                width: "181pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={8}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "193pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
              colSpan={4}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "35pt" }}>
            <td
              style={{
                width: "181pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={8}
            >
              <p
                className="s5"
                style={{
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  lineHeight: "9pt",
                  textAlign: "left",
                  paddingTop: "7pt",
                }}
              >
                Transporter Name
              </p>
              <p
                className="s6"
                style={{
                  paddingTop: "7pt",
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                {transporteName}
              </p>
            </td>
            <td
              style={{
                width: "193pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
              colSpan={4}
            >
              <p
                className="s5"
                style={{
                  paddingLeft: "34pt",
                  paddingRight: "81pt",
                  textIndent: "0pt",
                  lineHeight: "9pt",
                  // textAlign: "center",
                  paddingTop: "7pt",
                }}
              >
                Number of Boxes
              </p>
              <p
                className="s6"
                style={{
                  paddingTop: "7pt",
                  paddingLeft: "34pt",
                  paddingRight: "81pt",
                  textIndent: "0pt",
                  // textAlign: "left",
                }}
              >
                {boxes}
              </p>
            </td>
          </tr>
          <tr style={{ height: "16pt" }}>
            <td
              style={{
                width: "186pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={5}
            >
              <p
                className="s5"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  // fontSize: "8pt",
                }}
              >
                State Code : <span className="s6">{shipsToStateCode}</span>
              </p>
            </td>
            <td
              style={{
                width: "181pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={8}
            >
              <p
                className="s5"
                style={{
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  lineHeight: "9pt",
                  textAlign: "left",
                  paddingTop: "7pt",
                }}
              >
                Bill of Ladding/LR-RR No.
              </p>
              <p
                className="s5"
                style={{
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  lineHeight: "9pt",
                  textAlign: "left",
                  paddingTop: "7pt",
                }}
              >
                {uGrno}
              </p>
            </td>
            <td
              style={{
                width: "193pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
              }}
              colSpan={4}
            >
              <p
                className="s5"
                style={{
                  paddingLeft: "34pt",
                  textIndent: "0pt",
                  lineHeight: "9pt",
                  textAlign: "left",
                  paddingTop: "7pt",
                }}
              >
                GR Date
              </p>
              <p
                className="s6"
                style={{
                  paddingTop: "7pt",
                  paddingLeft: "34pt",
                  paddingRight: "81pt",
                  textIndent: "0pt",
                  // textAlign: "left",
                }}
              >
                {grDate?.split("T")[0]}
              </p>
            </td>
          </tr>
          <tr style={{ height: "14pt" }}>
            <td
              style={{
                width: "186pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={5}
            >
              <p
                className="s5"
                style={{
                  paddingTop: "1pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                State Name : <span className="s6">{shipsToState}</span>
              </p>
            </td>
            <td
              style={{
                width: "181pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={8}
            >
              <p
                className="s6"
                style={{
                  paddingTop: "1pt",
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  lineHeight: "11pt",
                  textAlign: "left",
                }}
              >
                {LrNo}
              </p>
            </td>
            <td
              style={{
                width: "193pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
              }}
              colSpan={4}
            >
              <p
                className="s6"
                style={{
                  paddingTop: "1pt",
                  paddingLeft: "34pt",
                  textIndent: "0pt",
                  lineHeight: "11pt",
                  textAlign: "left",
                }}
              >
                {/* Test-09/12/2021 */}
              </p>
            </td>
          </tr>
          <tr style={{ height: "7pt" }}>
            <td
              style={{
                width: "186pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={5}
              rowSpan={2}
            >
              <p
                className="s5"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                Mobile : <span className="s6">{shipsToMobile}</span>
              </p>
            </td>
            <td
              style={{
                width: "181pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={8}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "193pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
              colSpan={4}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "23pt" }}>
            <td
              style={{
                width: "374pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
              colSpan={12}
            >
              <p
                className="s7"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                Terms of Delivery
              </p>
            </td>
          </tr>
          <tr style={{ height: "12pt" }}>
            <td
              style={{
                width: "18pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              rowSpan={2}
            >
              <p
                className="s8"
                style={{
                  paddingTop: "8pt",
                  paddingLeft: "1pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                S.No
              </p>
            </td>
            <td
              style={{
                width: "43pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              rowSpan={2}
            >
              <p
                className="s2"
                style={{
                  paddingLeft: "7pt",
                  paddingRight: "1pt",
                  textIndent: "0pt",
                  lineHeight: "8pt",
                  textAlign: "center",
                  paddingTop: "8pt",
                }}
              >
                HSN/SAC
              </p>
              <p
                className="s2"
                style={{
                  paddingLeft: "7pt",
                  paddingRight: "1pt",
                  textIndent: "0pt",
                  lineHeight: "8pt",
                  textAlign: "center",
                }}
              >
                Code
              </p>
            </td>
            <td
              style={{
                width: "83pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              rowSpan={2}
            >
              <p
                className="s2"
                style={{
                  paddingLeft: "30pt",
                  paddingRight: "16pt",
                  textIndent: "-13pt",
                  textAlign: "left",
                  paddingTop: "8pt",
                }}
              >
                Description of Goods
              </p>
            </td>
            <td
              style={{
                width: "55pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={2}
              rowSpan={2}
            >
              <p
                className="s2"
                style={{
                  paddingLeft: "12pt",
                  textIndent: "0pt",
                  lineHeight: "8pt",
                  textAlign: "left",
                  paddingTop: "8pt",
                }}
              >
                Quantity
              </p>
            </td>
            <td
              style={{
                width: "36pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              rowSpan={2}
            >
              <p
                className="s2"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  lineHeight: "8pt",
                  textAlign: "left",
                  paddingTop: "8pt",
                }}
              >
                Rate
              </p>
            </td>
            <td
              style={{
                width: "36pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              rowSpan={2}
            >
              <p
                className="s2"
                style={{
                  paddingLeft: "14pt",
                  textIndent: "0pt",
                  lineHeight: "8pt",
                  textAlign: "left",
                  paddingTop: "8pt",
                }}
              >
                Per
              </p>
            </td>
            <td
              style={{
                width: "25pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              rowSpan={2}
            >
              <p
                className="s2"
                style={{
                  paddingLeft: "4pt",
                  textIndent: "0pt",
                  lineHeight: "8pt",
                  textAlign: "left",
                  paddingTop: "8pt",
                }}
              >
                Disc
              </p>
              <p
                className="s2"
                style={{
                  paddingLeft: "9pt",
                  textIndent: "0pt",
                  lineHeight: "8pt",
                  textAlign: "left",
                }}
              >
                %
              </p>
            </td>
            <td
              style={{
                width: "57pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={2}
              rowSpan={2}
            >
              <p
                className="s2"
                style={{
                  paddingLeft: "16pt",
                  textIndent: "0pt",
                  lineHeight: "8pt",
                  textAlign: "left",
                  paddingTop: "8pt",
                }}
              >
                Amount
              </p>
            </td>
            <td
              style={{
                width: "62pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={3}
            >
              <p
                className="s2"
                style={{
                  paddingLeft: "13pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  marginTop: "2pt",
                }}
              >
                CGST [INR]
              </p>
            </td>
            <td
              style={{
                width: "65pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s2"
                style={{
                  marginTop: "2pt",
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                SGST[INR]
              </p>
            </td>
            <td
              style={{
                width: "80pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p
                className="s2"
                style={{
                  marginTop: "2pt",
                  paddingLeft: "20pt",
                  textAlign: "left",
                }}
              >
                IGST[INR]
              </p>
            </td>
          </tr>
          <tr style={{ height: "17pt" }}>
            <td
              style={{
                width: "27pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={2}
            >
              <p
                className="s2"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "2pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                Rate
              </p>
            </td>
            <td
              style={{
                width: "35pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s2"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "3pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                Amount
              </p>
            </td>
            <td
              style={{
                width: "29pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s2"
                style={{
                  paddingTop: "2pt",
                  paddingRight: "4pt",
                  textIndent: "0pt",
                  textAlign: "center",
                }}
              >
                Rate
              </p>
            </td>
            <td
              style={{
                width: "36pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s2"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "4pt",
                  textIndent: "0pt",
                  textAlign: "center",
                }}
              >
                Amount
              </p>
            </td>
            <td
              style={{
                width: "28pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s2"
                style={{
                  paddingTop: "2pt",
                  paddingRight: "5pt",
                  textIndent: "0pt",
                  textAlign: "right",
                }}
              >
                Rate
              </p>
            </td>
            <td
              style={{
                width: "52pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p
                className="s2"
                style={{
                  paddingTop: "2pt",
                  paddingRight: "5pt",
                  textIndent: "0pt",
                  textAlign: "center",
                }}
              >
                Amount
              </p>
            </td>
          </tr>

          {tableData.map((item) => {
            return (
              <tr style={{ height: "15pt" }}>
                <td
                  style={{
                    width: "18pt",
                    borderLeftStyle: "solid",
                    borderLeftWidth: "1pt",
                    borderRightStyle: "solid",
                    borderRightWidth: "1pt",
                  }}
                >
                  <p
                    className="s10"
                    style={{
                      marginTop: "6pt",
                      paddingLeft: "6pt",
                      textIndent: "0pt",
                      textAlign: "left",
                    }}
                  >
                    2
                  </p>
                </td>
                <td
                  style={{
                    paddingTop: "4pt",
                    width: "43pt",
                    borderLeftStyle: "solid",
                    borderLeftWidth: "1pt",
                    borderRightStyle: "solid",
                    borderRightWidth: "1pt",
                  }}
                >
                  <p
                    className="s10"
                    style={{
                      paddingLeft: "5pt",
                      textIndent: "0pt",
                      lineHeight: "7pt",
                      textAlign: "left",
                      marginTop: "5pt",
                    }}
                  >
                    {item.hsc_code}
                  </p>
                </td>
                <td
                  style={{
                    paddingTop: "2pt",
                    width: "83pt",
                    borderLeftStyle: "solid",
                    borderLeftWidth: "1pt",
                    borderRightStyle: "solid",
                    borderRightWidth: "1pt",
                  }}
                >
                  <p
                    className="s4"
                    style={{
                      paddingLeft: "5pt",
                      textIndent: "0pt",
                      lineHeight: "7pt",
                      textAlign: "left",
                      marginTop: "5pt",
                    }}
                  >
                    {item.item_name}
                  </p>
                </td>
                <td
                  style={{
                    paddingTop: "4pt",
                    paddingTop: "4pt",
                    width: "55pt",
                    borderLeftStyle: "solid",
                    borderLeftWidth: "1pt",
                    borderRightStyle: "solid",
                    borderRightWidth: "1pt",
                  }}
                  colSpan={2}
                >
                  <p
                    className="s10"
                    style={{
                      paddingLeft: "19pt",
                      paddingRight: "18pt",
                      textIndent: "0pt",
                      lineHeight: "7pt",
                      textAlign: "center",
                      marginTop: "5pt",
                    }}
                  >
                    {item.quantity}
                  </p>
                </td>
                <td
                  style={{
                    paddingTop: "4pt",
                    width: "36pt",
                    borderLeftStyle: "solid",
                    borderLeftWidth: "1pt",
                    borderRightStyle: "solid",
                    borderRightWidth: "1pt",
                  }}
                >
                  <p
                    className="s10"
                    style={{
                      textIndent: "0pt",
                      lineHeight: "7pt",
                      textAlign: "center",
                      marginTop: "5pt",
                    }}
                  >
                    {item.PRICE}
                  </p>
                </td>
                <td
                  style={{
                    paddingTop: "4pt",
                    width: "36pt",
                    borderLeftStyle: "solid",
                    borderLeftWidth: "1pt",
                    borderRightStyle: "solid",
                    borderRightWidth: "1pt",
                  }}
                >
                  <p
                    className="s10"
                    style={{
                      paddingLeft: "12pt",
                      paddingRight: "10pt",
                      textIndent: "0pt",
                      lineHeight: "7pt",
                      textAlign: "center",
                      marginTop: "5pt",
                    }}
                  >
                    {item.per}
                  </p>
                </td>
                <td
                  style={{
                    paddingTop: "4pt",
                    width: "25pt",
                    borderLeftStyle: "solid",
                    borderLeftWidth: "1pt",
                    borderRightStyle: "solid",
                    borderRightWidth: "1pt",
                  }}
                >
                  <p
                    className="s10"
                    style={{
                      paddingRight: "1pt",
                      textIndent: "0pt",
                      lineHeight: "7pt",
                      textAlign: "center",
                      marginTop: "5pt",
                    }}
                  >
                    {item.DiscPrcnt}
                  </p>
                </td>
                <td
                  style={{
                    width: "57pt",
                    borderLeftStyle: "solid",
                    borderLeftWidth: "1pt",
                    borderRightStyle: "solid",
                    borderRightWidth: "1pt",
                  }}
                  colSpan={2}
                >
                  <p
                    className="s10"
                    style={{
                      paddingTop: "4pt",
                      paddingLeft: "20pt",
                      textIndent: "0pt",
                      lineHeight: "7pt",
                      textAlign: "left",
                      marginTop: "5pt",
                    }}
                  >
                    {item.amount}
                  </p>
                </td>
                <td
                  style={{
                    width: "27pt",
                    borderLeftStyle: "solid",
                    borderLeftWidth: "1pt",
                    borderRightStyle: "solid",
                    borderRightWidth: "1pt",
                  }}
                  colSpan={2}
                >
                  <p
                    className="s10"
                    style={{
                      paddingTop: "2pt",
                      paddingLeft: "11pt",
                      textIndent: "0pt",
                      textAlign: "left",
                      marginTop: "5pt",
                    }}
                  >
                    {item.CGSTRATE}
                  </p>
                </td>
                <td
                  style={{
                    width: "35pt",
                    borderLeftStyle: "solid",
                    borderLeftWidth: "1pt",
                    borderRightStyle: "solid",
                    borderRightWidth: "1pt",
                  }}
                >
                  <p
                    className="s10"
                    style={{
                      paddingTop: "2pt",
                      paddingRight: "3pt",
                      textIndent: "0pt",
                      textAlign: "center",
                      marginTop: "5pt",
                    }}
                  >
                    {item.CGSTAMNT}
                  </p>
                </td>
                <td
                  style={{
                    width: "29pt",
                    borderLeftStyle: "solid",
                    borderLeftWidth: "1pt",
                    borderRightStyle: "solid",
                    borderRightWidth: "1pt",
                  }}
                >
                  <p
                    className="s10"
                    style={{
                      paddingRight: "3pt",
                      textIndent: "0pt",
                      textAlign: "center",
                      marginTop: "5pt",
                    }}
                  >
                    {item.SGSTRATE}
                  </p>
                </td>
                <td
                  style={{
                    width: "36pt",
                    borderLeftStyle: "solid",
                    borderLeftWidth: "1pt",
                    borderRightStyle: "solid",
                    borderRightWidth: "1pt",
                  }}
                >
                  <p
                    className="s10"
                    style={{
                      paddingLeft: "17pt",
                      textIndent: "0pt",
                      textAlign: "center",
                      marginTop: "5pt",
                    }}
                  >
                    {item.SGSTAMNT}
                  </p>
                </td>
                <td
                  style={{
                    width: "28pt",
                    borderLeftStyle: "solid",
                    borderLeftWidth: "1pt",
                    borderRightStyle: "solid",
                    borderRightWidth: "1pt",
                  }}
                >
                  <p
                    className="s10"
                    style={{
                      paddingTop: "2pt",
                      paddingRight: "2pt",
                      textIndent: "0pt",
                      lineHeight: "7pt",
                      textAlign: "right",
                      marginTop: "6pt",
                    }}
                  >
                    {item.IGSTRATE}
                  </p>
                </td>
                <td
                  style={{
                    width: "52pt",
                    borderLeftStyle: "solid",
                    borderLeftWidth: "1pt",
                  }}
                >
                  <p
                    className="s10"
                    style={{
                      paddingTop: "1pt",
                      paddingRight: "2pt",
                      textIndent: "0pt",
                      textAlign: "center",
                      marginTop: "5pt",
                    }}
                  >
                    {item.IGSTAMNT}
                  </p>
                </td>
              </tr>
            );
          })}

          <tr style={{ height: "8pt" }}>
            <td
              style={{
                width: "18pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "43pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "83pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            ></td>
            <td
              style={{
                width: "55pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={2}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "36pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "36pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "25pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "57pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={2}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "27pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={2}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "35pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "29pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "36pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "28pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "52pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>

          <tr style={{ height: "16pt" }}>
            <td
              style={{
                width: "18pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "43pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "83pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s2"
                style={{
                  paddingLeft: "4pt",
                  textIndent: "0pt",
                  lineHeight: "8pt",
                  textAlign: "left",
                  marginTop: "4pt",
                }}
              >
                Total :
              </p>
            </td>
            <td
              style={{
                width: "55pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={2}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "72pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={2}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "25pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "57pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={2}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "27pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={2}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "35pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s8"
                style={{
                  paddingTop: "1pt",
                  textIndent: "0pt",
                  textAlign: "center",
                }}
              >
                0.00
              </p>
            </td>
            <td
              style={{
                width: "29pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "36pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s8"
                style={{
                  paddingTop: "1pt",
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  textAlign: "center",
                }}
              >
                0.00
              </p>
            </td>
            <td
              style={{
                width: "28pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "52pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p
                className="s8"
                style={{
                  paddingTop: "1pt",
                  paddingRight: "5pt",
                  textIndent: "0pt",
                  textAlign: "center",
                }}
              >
                0.00
              </p>
            </td>
          </tr>
          <tr style={{ height: "32pt" }}>
            <td
              style={{
                width: "324pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={9}
            >
              <p
                className="s3"
                style={{
                  paddingTop: "5pt",
                  paddingLeft: "2pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                Amount Chargeable (In Words) :
              </p>
              <p
                className="s10"
                style={{
                  paddingTop: "1pt",
                  paddingLeft: "2pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                {/* Rupees Fifty-Six Thousand Fifty-Six Only */}
                {amountInwords}
              </p>
            </td>
            <td
              style={{
                width: "236pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
              colSpan={8}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "18pt" }}>
            <td
              style={{
                width: "18pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "43pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "83pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "42pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "13pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "36pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "36pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "25pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "28pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "29pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "14pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "13pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "35pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
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
                className="s5"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  lineHeight: "10pt",
                  textAlign: "left",
                  paddingTop: "5pt",
                }}
              >
                Untaxed Amount:
              </p>
            </td>
            <td
              style={{
                width: "52pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p
                className="s11"
                style={{
                  textIndent: "0pt",
                  textAlign: "left",
                  paddingTop: "3pt",
                  paddingLeft: "5pt",
                }}
              >
                {/* <span className="s14">₹ </span> */}
                {/* <span className="s15">56,056.00</span> */}
              </p>
            </td>
          </tr>
          <tr style={{ height: "29pt" }}>
            <td
              style={{
                width: "324pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={9}
            >
              <p
                className="s3"
                style={{
                  paddingLeft: "2pt",
                  textIndent: "0pt",
                  lineHeight: "9pt",
                  textAlign: "left",
                  paddingTop: "5pt",
                }}
              >
                Tax Amount (In Words) :
              </p>
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                {/* <br /> */}
              </p>
              <p
                className="s10"
                style={{
                  paddingLeft: "2pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  paddingTop: "5pt",
                }}
              >
                {wordify(taxAmount)}
              </p>
            </td>
            <td
              style={{
                width: "29pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "14pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "13pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "35pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
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
                className="s5"
                style={{
                  paddingLeft: "51pt",
                  textIndent: "0pt",
                  lineHeight: "9pt",
                  textAlign: "left",
                  paddingTop: "5pt",
                }}
              >
                Taxable: {taxAmount}.00
              </p>
            </td>
            <td
              style={{
                width: "52pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p
                className="s11"
                style={{
                  textIndent: "0pt",
                  lineHeight: "9pt",
                  textAlign: "left",
                  paddingLeft: "5pt",
                  marginTop: "5pt",
                }}
              >
                {/* <span className="s14">₹ </span>
                <span className="s15">{taxAmount}</span> */}
              </p>
            </td>
          </tr>
          <tr style={{ height: "21pt" }}>
            <td
              style={{
                width: "324pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={9}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "236pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
              colSpan={8}
            >
              <p
                className="s3"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "129pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                Total <span className="s13">: </span>
                <span className="s14">₹ </span>
                <span className="s15">
                  {Number(totalAmnt).toLocaleString()}.00
                </span>
              </p>
            </td>
          </tr>
          <tr style={{ height: "40pt" }}>
            <td
              style={{
                width: "324pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={9}
            >
              <p
                className="s3"
                style={{
                  paddingTop: "5pt",
                  paddingLeft: "2pt",
                  paddingRight: "205pt",
                  textIndent: "0pt",
                  lineHeight: "124%",
                  textAlign: "left",
                }}
              >
                Company's Bank Details
              </p>
              <p
                className="s3"
                style={{
                  paddingLeft: "2pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  paddingTop: "5pt",
                }}
              >
                Bank Name : <span className="s10"></span>
              </p>
              <p
                className="s3"
                style={{
                  paddingLeft: "2pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                A/c No. : <span className="s10"></span>
              </p>
            </td>
            <td
              style={{
                width: "236pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
              }}
              colSpan={8}
            >
              <p
                className="s3"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  lineHeight: "9pt",
                  textAlign: "left",
                  paddingTop: "3pt",
                }}
              >
                Company's PAN : <span className="s10"></span>
              </p>
              <p
                className="s3"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                CIN: <span className="s10"></span>
              </p>
              <p
                className="s3"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                GSTIN/UIN :<span className="s10">09AAJCP2139H1ZA</span>
              </p>
            </td>
          </tr>
          <tr style={{ height: "15pt" }}>
            <td
              style={{
                width: "324pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={9}
            >
              <p
                className="s3"
                style={{
                  paddingTop: "1pt",
                  paddingLeft: "2pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                IFSC Code : <span className="s10"></span>
              </p>
            </td>
            <td
              style={{
                width: "236pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
              colSpan={8}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "54pt" }}>
            <td
              style={{
                width: "324pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={9}
            >
              <p
                className="s16"
                style={{
                  paddingTop: "1pt",
                  paddingLeft: "1pt",
                  paddingRight: "75pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                Declaration: We declare that this invoice shows the actual price
                of the goods described and that all particulars are true and
                correct.
              </p>
              <p
                className="s16"
                style={{
                  paddingLeft: "1pt",
                  paddingRight: "42pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                No E-Way Bill Required as notified under Annexure to Rule 138
                (14) (a) of CGST Rule 2017 for HSN Code 4901 for Printed Books.
                (Notification No. 27/2017 Dt 30th August, 2017).
              </p>
            </td>
            <td
              style={{
                width: "236pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
              colSpan={8}
            >
              <p
                className="s5"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  lineHeight: "10pt",
                  textAlign: "left",
                  paddingTop: "5pt",
                }}
              >
                For Proficiency Learning Solutions Private Limited
              </p>
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
              <p
                className="s12"
                style={{
                  paddingLeft: "149pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                Authorised Signatory
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <p
        style={{
          paddingTop: "3pt",
          paddingLeft: "100pt",
          textIndent: "0pt",
          textAlign: "left",
        }}
      >
        <a href="mailto:info@eupheus.in" className="a" target="_blank">
          Email ID:{" "}
        </a>
        <a href="http://www.eupheus.in/" className="a" target="_blank">
          info@eupheus.in , Contact No: 01161400200 , Website:{" "}
        </a>
        <a href="http://www.eupheus.in/" target="_blank">
          http://www.eupheus.in
        </a>
      </p>
      <h2
        style={{
          paddingTop: "1pt",
          paddingLeft: "0pt",
          textIndent: "0pt",
          textAlign: "center",
        }}
      >
        SUBJECT TO DELHI JURISDICTION
      </h2>
      <h1
        style={{ paddingLeft: "0pt", textIndent: "0pt", textAlign: "center" }}
      >
        This is a Computer Generated Invoice
      </h1>
    </div>
  );
};

export default CreditNote;
