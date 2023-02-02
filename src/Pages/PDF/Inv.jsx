import React, {useEffect, useState} from "react";
import "./Inv.css";
import eupheusLogo from "./eupheusLogo.png";
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";
import Cookies from "js-cookie";
var converter = require('number-to-words')



const Inv = () => {

  const [billTo, setBillTo] = useState("")
  const [billToAddress, setBillToAddress] = useState("")
  const [shipTo, setShipTo] = useState("")
  const [shipToAddress, setshipToAddress] = useState("")
  const [billToGST, setbillToGST] = useState("")
  const [shipToGST, setshipToGST] = useState("")
  const [stateCode, setstateCode] = useState("")
  const [contactPerson, setcontactPerson] = useState("")
  const [mobile, setmobile] = useState("")
  const [invoiceNo, setinvoiceNo] = useState("")
  const [customerCode, setcustomerCode] = useState("")
  const [supplierRef, setsupplierRef] = useState("")
  const [orderNo, setorderNo] = useState("")
  const [dated, setdated] = useState("")
  const [customerName, setcustomerName] = useState("")
  const [otherReference, setotherReference] = useState("")
  const [GRno, setGRno] = useState("")
  const [dispatchDocNo, setdispatchDocNo] = useState("")
  const [dispatchThrough, setdispatchThrough] = useState("")
  const [LRno, setLRno] = useState("")
  const [GRdate, setGRdate] = useState("")
  const [noOfBox, setnoOfBox] = useState("")
  const [motorVehicleNo, setmotorVehicleNo] = useState("")
  const [termsOfDelivery, settermsOfDelivery] = useState("")
  const [total, settotal] = useState("")
  const [untaxedAmount, setuntaxedAmount] = useState("")
  const [tableData, setTableData] = useState([])
  const [totalQuantity, setTotalQuantity] = useState("")



  useEffect(() => {
    getAllData()
  },[])

  const getAllData = async () => {

    const res = await axios.post(`http://192.168.7.148:5070/api/doc_print/invoice/detail`,
     {
        category:"inv",
        doc_num:"56866",
        doc_date:"2022-02-22"
    },
    {  headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },}
    );
    
    console.log(res.data);
    let data = res.data.message[0]
    // console.log(data)
    setBillTo(data.bill_to[0])
    setBillToAddress(data.bill_to[1])
    setShipTo(data.SHIPTOCODE)
    setshipToAddress(data.SHIP_TO)
    setbillToGST(data.Bill_to_GST_No)
    setshipToGST(data.ship_to_gst)
    setcontactPerson(data.contact_person_name)
    setmobile(data.mobile_no)
    setinvoiceNo(data.Invoice_No)
    setcustomerCode(data.CARDCODE)
    setsupplierRef(data.Ref_No)
    setorderNo(data.order_no)
    setdated(data.DOCDATE)
    setcustomerName(data.CARDNAME)
    setotherReference(data.other_ref)
    setGRno(data.U_GRNO)
    setdispatchDocNo(data.Dispatch_No)
    setdispatchThrough(data.Transporter_Name)
    setLRno(data.LRNo)
    setGRdate(data.GR_Date)
    setnoOfBox(data.U_Boxes)
    setmotorVehicleNo(data.U_UNE_VEH_NO)
    settermsOfDelivery(data.delivery_term)
    settotal(data.total)
    setuntaxedAmount(data.tax_amount)
    setstateCode(data.state_code)

    let dataTable = res.data.items
    let totalQuant = 0
    for(let obj of dataTable){
      console.log(obj)
      totalQuant += obj.quantity
    }
    // console.log(totalQuant)
    setTotalQuantity(totalQuant)
    // console.log(dataTable)
    setTableData(dataTable)

  };


  return (
    <div>
     
      <table>
        <tbody>
          <tr>
            <td>
              <img width={381} height={126} src={eupheusLogo} />
            </td>
          </tr>
        </tbody>
      </table>
      <hr
        style={{
          borderWidth: "2px",
          marginTop: "0.5em",
          marginBottom: "0.5em",
          width: "100%",
        }}
      />
      <p
        style={{
          paddingTop: "2pt",
          paddingLeft: "11pt",
          textIndent: "0pt",
          lineHeight: "11pt",
          textAlign: "left",
          fontSize: "20pt"
        }}
      >
        Proficiency Learning Solutions Pvt Ltd.,
      </p>
      <p
        style={{
          paddingTop: "10pt",
          paddingLeft: "11pt",
          textIndent: "0pt",
          textAlign: "left",
          fontSize: "15pt"
        }}
      >
        Khasra No. 75, Village Malakpur, Ecotech-2, Opp. NTPC Ltd.(Netra)
        Greater Noida, Gautam Budh Nagar, Uttar Pradesh, Pin -201306
      </p>
    
      <p style={{ textIndent: "0pt", textAlign: "left" }}>
        <br />
      </p>
      <p style={{ textIndent: "0pt", textAlign: "left" }}></p>
      <h1
        style={{
          paddingTop: "8pt",
          paddingBottom: "2pt",
          paddingLeft: "11pt",
          textIndent: "0pt",
          textAlign: "left",
          fontSize: "15pt"
        }}
      >
        IRN No<span className="p">:</span>
      </h1>
      <table
        style={{ borderCollapse: "collapse", marginLeft: "6.75pt" }}
        cellSpacing={0}
      >
        <tbody>
          <tr style={{ height: "48pt" }}>
            <td
              style={{
                width: "1030pt",
                borderTopStyle: "solid",
                borderTopWidth: "2pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={13}
            >
              <p
                className="s1"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "223pt",
                  paddingRight: "240pt",
                  textIndent: "0pt",
                  lineHeight: "12pt",
                  textAlign: "center",
                  fontSize: "15pt"
                }}
              >
                BILL OF SUPPLY
              </p>
            </td>
            <td
              style={{
                width: "6pt",
                borderTopStyle: "solid",
                borderTopWidth: "2pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "55pt" }}>
            <td
              style={{
                width: "186pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={4}
              rowSpan={3}
            >
              <p
                className="s2"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "13pt"
                }}
              >
                Bill To :
              </p>
              <p
                className="s2"
                style={{
                  paddingTop: "6pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "12pt"
                }}
              >
                {/* MKK Enterprises */}
                {billTo}
              </p>
              {/* <p
                className="s3"
                style={{
                  paddingTop: "1pt",
                  paddingLeft: "5pt",
                  paddingRight: "4pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                F-2/13 Ratiya Marg Sangam Vihar,MKK Enterprises,
                {billToAddress}
              </p> */}

              <p
                className="s3"
                style={{
                  paddingLeft: "5pt",
                  paddingRight: "94pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "12pt"
                }}
              >
                {/* New Delhi - 110080 Delhi - INDIA */}
                {billToAddress}
              </p>
            </td>
            <td
              style={{
                width: "180pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={4}
            >
              <p
                className="s10"
                style={{
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  lineHeight: "9pt",
                  textAlign: "left",
                  fontSize: "15pt"
                }}
              >
                Invoice No.
              </p>
              <p
                className="s5"
                style={{
                  paddingTop: "7pt",
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  lineHeight: "12pt",
                  textAlign: "left",
                  fontSize: "12pt"
                }}
              >
                {/* RI/52941/20-21 */}
                {invoiceNo}
              </p>
            </td>
            <td
              style={{
                width: "191pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={5}
            >
              <p
                className="s10"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  lineHeight: "9pt",
                  textAlign: "left",
                  fontSize: "15pt"
                }}
              >
                Dated
              </p>
              <p
                className="s5"
                style={{
                  paddingTop: "1pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "12pt"
                }}
              >
                {/* 25/02/2021 */}
                {dated}
              </p>
            </td>
            <td
              style={{
                width: "6pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "49pt" }}>
            <td
              style={{
                width: "180pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={4}
            >
              <p
                className="s10"
                style={{
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  lineHeight: "9pt",
                  textAlign: "left",
                  fontSize: "15pt"
                }}
              >
                Customer Code
              </p>
              <p
                className="s5"
                style={{
                  paddingTop: "7pt",
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "12pt"
                }}
              >
                {/* CBP000211 */}
                {customerCode}
              </p>
            </td>
            <td
              style={{
                width: "191pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={5}
            >
              <p
                className="s10"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  lineHeight: "9pt",
                  textAlign: "left",
                  fontSize: "15pt"
                }}
              >
                Customer Name
              </p>
              <p
                className="s5"
                style={{
                  paddingTop: "7pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "12pt"
                }}
              >
                {/* MKK Enterprises */}
                {customerName}
              </p>
            </td>
            <td
              style={{
                width: "6pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "35pt" }}>
            <td
              style={{
                width: "180pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={4}
            >
              <p
                className="s10"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "15pt"
                }}
              >
                Supplier's Ref
              </p>
              <p
                className="s5"
                style={{
                  paddingTop: "7pt",
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "12pt"
                }}
              >
              {/* Test supplier Ref */}
                {supplierRef}
              </p>
            </td>
            <td
              style={{
                width: "191pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={5}
            >
              <p
                className="s10"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "15pt"
                }}
              >
                Other Reference
              </p>
              <p
                className="s5"
                style={{
                  paddingTop: "7pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "12pt"
                }}
              >
                {/* Test Other Ref */}
                {otherReference}
              </p>
            </td>
            <td
              style={{
                width: "6pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
              rowSpan={2}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "28pt" }}>
            <td
              style={{
                width: "186pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={4}
              rowSpan={2}
            >
              <p
                className="s2"
                style={{
                  paddingTop: "5pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "13pt"
                }}
              >
                GSTIN Number :
              </p>
              <p
                className="s3"
                style={{
                  paddingTop: "1pt",
                  paddingLeft: "5pt",
                  paddingRight: "4pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "12pt"
                }}
              >
                {/* TEST GST NUMBER */}
                {billToGST}
              </p>
            </td>
            <td
              style={{
                width: "180pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={4}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "191pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={5}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "58pt" }}>
            <td
              style={{
                width: "180pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={4}
            >
              <p
                className="s10"
                style={{
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  lineHeight: "9pt",
                  textAlign: "left",
                  fontSize: "15pt"
                }}
              >
                Order No.
              </p>
              <p
                className="s5"
                style={{
                  paddingTop: "7pt",
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "12pt"
                }}
              >
                {/* 23471 */}
                {orderNo}
              </p>
            </td>
            <td
              style={{
                width: "191pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={5}
            >
              <p
                className="s10"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "15pt"
                }}
              >
                GR No
              </p>
              <p
                className="s5"
                style={{
                  paddingTop: "1pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "12pt"
                }}
              >
                {/* DL 1LX 6955 */}
                {GRno}
              </p>
            </td>
            <td
              style={{
                width: "6pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "42pt" }}>
            <td
              style={{
                width: "186pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={4}
            >
              <p
                className="s2"
                style={{
                  paddingTop: "1pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  lineHeight: "10pt",
                  textAlign: "left",
                  fontSize: "13pt"
                }}
              >
                Ship To :
              </p>
            </td>
            <td
              style={{
                width: "180pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={4}
            >
              <p
                className="s10"
                style={{
                  paddingTop: "1pt",
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  lineHeight: "10pt",
                  textAlign: "left",
                  fontSize: "15pt"
                }}
              >
                Dispatch Doc No.
              </p>
            </td>
            <td
              style={{
                width: "191pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={5}
            >
              <p
                className="s10"
                style={{
                  paddingTop: "1pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  lineHeight: "10pt",
                  textAlign: "left",
                  fontSize: "15pt"
                }}
              >
                GR Date
              </p>
            </td>
            <td
              style={{
                width: "6pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
              rowSpan={2}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "34pt" }}>
            <td
              style={{
                width: "186pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={4}
            >
              <p
                className="s2"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "12pt"
                }}
              >
                {/* Mkk Enterprises */}
                {shipTo}
              </p>
            </td>
            <td
              style={{
                width: "180pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={4}
            >
              <p
                className="s5"
                style={{
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  lineHeight: "11pt",
                  textAlign: "left",
                  fontSize: "12pt"
                }}
              >
                {/* 23780 */}
                {dispatchDocNo}
              </p>
            </td>
            <td
              style={{
                width: "191pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={5}
            >
              <p
                className="s5"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  lineHeight: "11pt",
                  textAlign: "left",
                  fontSize: "12pt"
                }}
              >
                {/* 25-February-2021 */}
                {GRdate}
              </p>
            </td>
          </tr>
          <tr style={{ height: "59pt" }}>
            <td
              style={{
                width: "186pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={4}
              rowSpan={2}
            >
              <p
                className="s3"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "2pt",
                  textAlign: "left",
                  fontSize: "12pt"
                }}
              >
                {/* F-2/13 Ratiya Marg Sangam Vihar New Delhi,MKK Enterprises -
                110080 */}
                {shipToAddress}
              </p>

              {/* <p
                className="s3"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  lineHeight: "9pt",
                  textAlign: "left",
                }}
              >
                Delhi - INDIA
                {shipToAddress}
              </p> */}
              <p
                className="s2"
                style={{
                  paddingTop: "9pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  lineHeight: "9pt",
                  textAlign: "left",
                  fontSize: "12pt"
                }}
              >
                State Code : <span className="s3" style={{fontSize: "12pt"}}>{stateCode}</span>
              </p>
            </td>
            <td
              style={{
                width: "180pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={4}
            >
              <p
                className="s10"
                style={{
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  lineHeight: "9pt",
                  textAlign: "left",
                  fontSize: "15pt"
                }}
              >
                Dispatch Through
              </p>
              <p
                className="s5"
                style={{
                  paddingTop: "7pt",
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "12pt"
                }}
              >
                {/* A V R N */}
                {dispatchThrough}
              </p>
            </td>
            <td
              style={{
                width: "191pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={5}
            >
              <p
                className="s10"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "15pt"
                }}
              >
                No of Boxes
              </p>
              <p
                className="s5"
                style={{
                  paddingTop: "1pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "12pt"
                }}
              >
                {/* 17 */}
                {noOfBox}
              </p>
            </td>
            <td
              style={{
                width: "6pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "53pt" }}>
            <td
              style={{
                width: "180pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={4}
            >
              <p
                className="s10"
                style={{
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  lineHeight: "9pt",
                  textAlign: "left",
                  fontSize: "15pt"
                }}
              >LRno Bill of Ladding/LR-RR No.
              </p>
              <p
                className="s5"
                style={{
                  paddingTop: "7pt",
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "12pt"
                }}
              >
                {/* Test Bill of Ladding */}
                {LRno}
              </p>
            </td>
            <td
              style={{
                width: "191pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={5}
            >
              <p
                className="s10"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  lineHeight: "9pt",
                  textAlign: "left",
                  fontSize: "15pt"
                }}
              >
                Motor Vehicle No.
              </p>
              <p
                className="s5"
                style={{
                  paddingTop: "7pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "12pt"
                }}
              >
                {/* Test Motor Vehicle No */}
                {motorVehicleNo}
              </p>
            </td>
            <td
              style={{
                width: "6pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
              rowSpan={2}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "22pt" }}>
            <td
              style={{
                width: "186pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={4}
              rowSpan={2}
            >
              <p
                className="s2"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  lineHeight: "9pt",
                  textAlign: "left",
                  fontSize: "12pt"
                }}
              >
                Contact Person :{" "}
                {/* <span className="s3">Ksk academy senior secondar</span> */}
                <span className="s3" style={{fontSize: "12pt"}}>{contactPerson}</span>
              </p>
              <p
                className="s2"
                style={{
                  paddingTop: "9pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  lineHeight: "9pt",
                  textAlign: "left",
                  fontSize: "12pt"
                }}
              >
                {/* Mobile : <span className="s3">9582400777</span> */}
                Mobile : <span className="s3" style={{fontSize: "12pt"}}>{mobile}</span>
              </p>
            </td>
            <td
              style={{
                width: "180pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={4}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "191pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={5}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "14pt" }}>
            <td
              style={{
                width: "371pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={9}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "6pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
              rowSpan={3}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "22pt" }}>
            <td
              style={{
                width: "186pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={4}
            >
              <p
                className="s2"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              ></p>
            </td>
            <td
              style={{
                width: "371pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={9}
            >
              <p
                className="s6"
                style={{
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  lineHeight: "10pt",
                  textAlign: "left",
                  fontSize: "13pt"
                }}
              >
                Terms of Delivery: <span className="s3" style={{fontSize: "12pt"}}>{termsOfDelivery}</span>
              </p>
            </td>
          </tr>
          <tr style={{ height: "33pt" }}>
            <td
              style={{
                width: "186pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={4}
            >
              <p
                className="s2"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  lineHeight: "10pt",
                  textAlign: "left",
                  fontSize: "12pt"
                }}
              >
                GSTIN Number : <span className="s3" style={{fontSize: "12pt"}}>{shipToGST}</span>
              </p>
            </td>
            <td
              style={{
                width: "371pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={9}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "28pt" }}>
            <td
              style={{
                width: "17pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              rowSpan={2}
            >
              <p
                className="s7"
                style={{
                  paddingTop: "4pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "12pt"
                }}
              >
                S.No
              </p>
            </td>
            <td
              style={{
                width: "44pt",
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
                  paddingTop: "11pt",
                  paddingLeft: "6pt",
                  paddingRight: "1pt",
                  textIndent: "0pt",
                  lineHeight: "8pt",
                  textAlign: "center",
                  fontSize: "12pt"
                }}
              >
                HSN/SAC
              </p>
              <p
                className="s8"
                style={{
                  paddingTop: "8pt",
                  paddingLeft: "6pt",
                  paddingRight: "1pt",
                  textIndent: "0pt",
                  lineHeight: "8pt",
                  textAlign: "center",
                  fontSize: "12pt"
                }}
              >
                Code
              </p>
            </td>
            <td
              style={{
                width: "97pt",
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
                  paddingTop: "3pt",
                  paddingLeft: "30pt",
                  paddingRight: "14pt",
                  textIndent: "-14pt",
                  textAlign: "left",
                  fontSize: "12pt"
                }}
              >
                Description of Goods
              </p>
            </td>
            <td
              style={{
                width: "64pt",
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
                  paddingTop: "4pt",
                  paddingLeft: "15pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "12pt"
                }}
              >
                Quantity
              </p>
            </td>
            <td
              style={{
                width: "48pt",
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
                  paddingTop: "4pt",
                  paddingLeft: "10pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "12pt"
                }}
              >
                Rate
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
                className="s8"
                style={{
                  paddingTop: "9pt",
                  paddingLeft: "6pt",
                  textIndent: "0pt",
                  lineHeight: "8pt",
                  textAlign: "left",
                  fontSize: "12pt"
                }}
              >
                Disc
              </p>
              <p
                className="s8"
                style={{
                  marginTop: "6pt",
                  paddingLeft: "10pt",
                  textIndent: "0pt",
                  lineHeight: "8pt",
                  textAlign: "left",
                  fontSize: "10pt"
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
              rowSpan={2}
            >
              <p
                className="s8"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "16pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "12pt"
                }}
              >
                Amount
              </p>
            </td>
            <td
              style={{
                width: "61pt",
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
                className="s8"
                style={{
                  paddingTop: "8pt",
                  paddingLeft: "13pt",
                  textIndent: "0pt",
                  lineHeight: "8pt",
                  textAlign: "left",
                  fontSize: "12pt"
                }}
              >
                CGST [INR]
              </p>
            </td>
            <td
              style={{
                width: "66pt",
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
                className="s8"
                style={{
                  paddingTop: "8pt",
                  paddingLeft: "20pt",
                  textIndent: "0pt",
                  lineHeight: "8pt",
                  textAlign: "left",
                  fontSize: "12pt"
                }}
              >
                SGST[INR]
              </p>
            </td>
            <td
              style={{
                width: "78pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={2}
            >
              <p
                className="s8"
                style={{
                  paddingTop: "8pt",
                  paddingLeft: "19pt",
                  textIndent: "0pt",
                  lineHeight: "8pt",
                  textAlign: "left",
                  fontSize: "12pt"
                }}
              >
                IGST [INR]
              </p>
            </td>
            <td
              style={{
                width: "6pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "29pt" }}>
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
              <p
                className="s8"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "6pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "10pt"
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
                className="s8"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "4pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "10pt"
                }}
              >
                Amount
              </p>
            </td>
            <td
              style={{
                width: "30pt",
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
                  paddingTop: "2pt",
                  paddingLeft: "10pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "10pt"
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
                className="s8"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "10pt"
                }}
              >
                Amount
              </p>
            </td>
            <td
              style={{
                width: "30pt",
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
                  paddingTop: "2pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "10pt"
                }}
              >
                Rate
              </p>
            </td>
            <td
              style={{
                width: "48pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
            >
              <p
                className="s8"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "10pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "10pt"
                }}
              >
                Amount
              </p>
            </td>
            <td
              style={{
                width: "6pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>




              {/* start of first row */}      

              {/* <div style={{ height: 400, width: '100%' }}>
          <DataGrid
        rows={tableData}
        // columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // checkboxSelection
        />
        </div> */}
        

                             
          {tableData.map(item => {
           return (
            <tr style={{ height: "58pt" }}>
            <td
              style={{
                width: "17pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p
                className="s3"
                style={{
                  paddingTop: "3pt",
                  paddingLeft: "3pt",
                  textIndent: "0pt",
                  textAlign: "center",
                  fontSize: "13pt"
                }}
              >
                1
              </p>
            </td>

            <td
              style={{
                width: "44pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s3"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "6pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "13pt"
                }}
              >
                {item.hsc_code}
              </p>
            </td>
            <td
              style={{
                width: "97pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s3"
                style={{
                  paddingTop: "1pt",
                  paddingLeft: "5pt",
                  paddingRight: "14pt",
                  textIndent: "0pt",
                  lineHeight: "10pt",
                  textAlign: "left",
                  fontSize: "13pt",
                  lineHeight:"15pt"
                }}
              >
                {/* WOW! Mathematics -CBSE Book 6 */}
                {item.item_name}
              </p>
            </td>
            <td
              style={{
                width: "64pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s3"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "6pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "13pt"
                }}
              >
                {/* 240.00 */}
                {item.quantity}
              </p>
            </td>
            <td
              style={{
                width: "48pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s3"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "2pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "13pt"
                }}
              >
                {/* 490.00 */}
                {item.PRICE}
              </p>
            </td>
            <td
              style={{
                width: "25pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s3"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "2pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "13pt"
                }}
              >
                {/* 20.00 */}
                {item.DiscPrcnt}
              </p>
            </td>
            <td
              style={{
                width: "57pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s3"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "7pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "13pt"
                }}
              >
                {/* 94080.00 */}
                {item.VATSUM}
              </p>
            </td>
            <td
              style={{
                width: "25pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s3"
                style={{
                  paddingTop: "3pt",
                  paddingLeft: "3pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "13pt"
                }}
              >
                {/* 0.00 */}
                {item.CGSTRATE}
              </p>
            </td>
            <td
              style={{
                width: "36pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s3"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "3pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "13pt"
                }}
              >
                {item.CGSTAMNT}
              </p>
            </td>
            <td
              style={{
                width: "30pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s3"
                style={{
                  paddingTop: "3pt",
                  paddingLeft: "3pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "13pt"
                }}
              >
                {/* 0.00 */}
                {item.SGSTRATE}
              </p>
            </td>
            <td
              style={{
                width: "36pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s3"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "3pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "13pt"
                }}
              >
                {/* 0.00 */}
                {item.SGSTAMNT}
              </p>
            </td>
            <td
              style={{
                width: "30pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s3"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "3pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "13pt"
                }}
              >
                {/* 0.00 */}
                {item.IGSTRATE}
              </p>
            </td>
            <td
              style={{
                width: "48pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
            >
              <p
                className="s3"
                style={{
                  paddingTop: "3pt",
                  paddingLeft: "2pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "13pt"
                }}
              >
                {/* 0.00 */}
                {item.IGSTAMNT}
              </p>
            </td>
            <td
              style={{
                width: "6pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
              rowSpan={1}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
           )
          })}

        {/* end of first row */}



          {/* <tr style={{ height: "28pt" }}>
            <td
              style={{
                width: "17pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p
                className="s3"
                style={{
                  paddingTop: "3pt",
                  paddingLeft: "3pt",
                  textIndent: "0pt",
                  textAlign: "center",
                }}
              >
                1
              </p>
            </td>

            <td
              style={{
                width: "44pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s3"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "6pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                490199
              </p>
            </td>
            <td
              style={{
                width: "97pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s3"
                style={{
                  paddingTop: "1pt",
                  paddingLeft: "5pt",
                  paddingRight: "14pt",
                  textIndent: "0pt",
                  lineHeight: "10pt",
                  textAlign: "left",
                }}
              >
                WOW! Mathematics -CBSE Book 6
              </p>
            </td>
            <td
              style={{
                width: "64pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s3"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "6pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                240.00
              </p>
            </td>
            <td
              style={{
                width: "48pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s3"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "2pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                490.00
              </p>
            </td>
            <td
              style={{
                width: "25pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s3"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "2pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                20.00
              </p>
            </td>
            <td
              style={{
                width: "57pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s3"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "7pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                94080.00
              </p>
            </td>
            <td
              style={{
                width: "25pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s3"
                style={{
                  paddingTop: "3pt",
                  paddingLeft: "3pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                0.00
              </p>
            </td>
            <td
              style={{
                width: "36pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s3"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "3pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                0.00
              </p>
            </td>
            <td
              style={{
                width: "30pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s3"
                style={{
                  paddingTop: "3pt",
                  paddingLeft: "3pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                0.00
              </p>
            </td>
            <td
              style={{
                width: "36pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s3"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "3pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                0.00
              </p>
            </td>
            <td
              style={{
                width: "30pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s3"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "3pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                0.00
              </p>
            </td>
            <td
              style={{
                width: "48pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
            >
              <p
                className="s3"
                style={{
                  paddingTop: "3pt",
                  paddingLeft: "2pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                0.00
              </p>
            </td>
            <td
              style={{
                width: "6pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
              rowSpan={1}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr> */}

          <tr style={{ height: "44pt" }}>
            <td
              style={{
                width: "17pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
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
                width: "44pt",
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
                width: "97pt",
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
                  paddingRight: "9pt",
                  textIndent: "0pt",
                  textAlign: "right",
                  fontSize: "15pt"
                }}
              >
                Total:
              </p>
            </td>
            <td
              style={{
                width: "64pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p
                className="s4"
                style={{
                  paddingTop: "8pt",
                  paddingLeft: "20pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "13pt"
                }}
              >
                {/* 720 */}
                {totalQuantity}
              </p>
            </td>
            <td
              style={{
                width: "48pt",
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
                width: "11pt",
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
                width: "102pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
              colSpan={2}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "30pt",
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
                width: "48pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "6pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "68pt" }}>
            <td
              style={{
                width: "324pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={7}
            >
              <p
                className="s2"
                style={{
                  paddingTop: "1pt",
                  paddingLeft: "2pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "13pt"
                }}
              >
                Amount Chargeable (In Words) :
              </p>
              <p
                className="s3"
                style={{
                  paddingTop: "1pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "13pt"
                }}
              >
                {/* INR Two Lakhs Eighty-Two Thousand Two Hundred Forty */}
                {`INR ${converter.toWords(Number(total))} Only`}
              </p>
            </td>
            <td
              style={{
                width: "233pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={6}
            >
              <p
                className="s2"
                style={{
                  paddingTop: "1pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "13pt"
                }}
              >
                {/* Untaxed Amount :- INR 282240.00  */}
                {`Untaxed Amount :- INR ${total}`}
              </p>
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
              <p
                className="s2"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "13pt"
                }}
              >
                Freight :- INR 0.00
              </p>
            </td>
            <td
              style={{
                width: "6pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "59pt" }}>
            <td
              style={{
                width: "324pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={7}
            >
              <p
                className="s2"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "2pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "13pt"
                }}
              >
                Tax Amount (In Words) :
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
                  fontSize: "13pt",
                  paddingBottom:"10pt"
                }}
              >
                INR Zero Only
              </p>
            </td>
            <td
              style={{
                width: "42pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
              <p
                className="s2"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "13pt"
                }}
              >
                Taxable
              </p>
            </td>
            <td
              style={{
                width: "11pt",
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
                width: "102pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
              colSpan={2}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
              <p
                className="s2"
                style={{
                  paddingLeft: "21pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "13pt"
                }}
              >
                :- INR {untaxedAmount}
              </p>
            </td>
            <td
              style={{
                width: "30pt",
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
                width: "48pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "6pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "28pt" }}>
            <td
              style={{
                width: "324pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={7}
            >
              <p
                className="s2"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "13pt"
                }}
              >
                Remarks
                <span className="s9" style={{
                  fontSize: "9pt"
                }}>
                  :- Based On Sales Orders 23471. Based On Deliveries 23780.
                </span>
              </p>
            </td>
            <td
              style={{
                width: "42pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p
                className="s2"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "13pt"
                }}
              >
                Total
              </p>
            </td>
            <td
              style={{
                width: "11pt",
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
                width: "102pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
              colSpan={2}
            >
              <p
                className="s2"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "19pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "13pt"
                }}
              >
               
                {`:- INR ${total}`}
              </p>
            </td>
            <td
              style={{
                width: "30pt",
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
                width: "48pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "6pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "28pt" }}>
            <td
              style={{
                width: "324pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={7}
            >
              <p
                className="s2"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "2pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "12pt"
                }}
              >
                Company's Bank Details
              </p>
            </td>
            <td
              style={{
                width: "233pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={6}
            >
              <p
                className="s2"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  lineHeight: "10pt",
                  textAlign: "left",
                  fontSize: "12pt"
                }}
              >
                Company's PAN : <span className="s10" style={{fontSize: "12pt"}}>AAJCP2139H</span>
              </p>
            </td>
            <td
              style={{
                width: "6pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
              rowSpan={4}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "15pt" }}>
            <td
              style={{
                width: "324pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={7}
            >
              <p
                className="s2"
                style={{
                  paddingLeft: "2pt",
                  textIndent: "0pt",
                  lineHeight: "10pt",
                  textAlign: "left",
                  fontSize: "12pt"
                }}
              >
                Bank Name :{" "}
                <span className="s10" style={{
                  fontSize: "12pt"
                }}>ICICI BANK,SAKET WEALTH BRANCH</span>
              </p>
            </td>
            <td
              style={{
                width: "233pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={6}
            >
              <p
                className="s2"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  lineHeight: "10pt",
                  textAlign: "left",
                  fontSize: "11pt"
                }}
              >
                CIN: <span className="s10" style={{fontSize: "12pt"}}>U80904DL2016PTC309293</span>
              </p>
            </td>
          </tr>
          <tr style={{ height: "18pt" }}>
            <td
              style={{
                width: "324pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={7}
            >
              <p
                className="s2"
                style={{
                  paddingLeft: "2pt",
                  textIndent: "0pt",
                  lineHeight: "10pt",
                  textAlign: "left",
                  fontSize: "11pt"
                }}
              >
                A/c No : <span className="s10" style={{fontSize: "12pt"}}>164705000227</span>
              </p>
            </td>
            <td
              style={{
                width: "233pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={6}
            >
              <p
                className="s2"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "11pt"
                }}
              >
                GSTIN/UIN : <span className="s3" style={{fontSize: "12pt"}}>09AAJCP2139H1ZA</span>
              </p>
            </td>
          </tr>
          <tr style={{ height: "30pt" }}>
            <td
              style={{
                width: "324pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={7}
            >
              <p
                className="s2"
                style={{
                  paddingLeft: "2pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "11pt"
                }}
              >
                IFSC Code : <span className="s10" style={{fontSize: "12pt"}}>ICIC0001647</span>
              </p>
            </td>
            <td
              style={{
                width: "233pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={6}
            >
              <p
                className="s2"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "11pt"
                }}
              >
                MSMED: <span className="s3" style={{fontSize: "12pt"}}>DL09E0003137</span>
              </p>
            </td>
          </tr>
          <tr style={{ height: "83pt" }}>
            <td
              style={{
                width: "324pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={7}
            >
              <p
                className="s11"
                style={{
                  paddingTop: "1pt",
                  paddingLeft: "1pt",
                  paddingRight: "77pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "12pt"
                }}
              >
                Declaration: We declare that this invoice shows the actual price
                of the goods described and that all particulars are true and
                correct.
              </p>
              <p
                className="s11"
                style={{
                  paddingLeft: "1pt",
                  paddingRight: "44pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "12pt"
                }}
              >
                No E-Way Bill Required as notified under Annexure to Rule 138
                (14) (a) of CGST Rule 2017 for HSN Code 4901 for Printed Books.
                (Notification No. 27/2017 Dt 30th August, 2017).
              </p>
            </td>
            <td
              style={{
                width: "239pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={7}
            >
              <p
                className="s4"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  lineHeight: "10pt",
                  textAlign: "left",
                  fontSize: "12pt"
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
                  marginTop: "15pt",
                  paddingLeft: "149pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "12pt"
                }}
              >
                Authorised Signatory
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Inv;
