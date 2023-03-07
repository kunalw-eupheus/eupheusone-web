import React, { useEffect}  from 'react'
import instance from '../../Instance';
import Cookies from "js-cookie";
import eupheusLogo from "./eupheusLogo.png";
import "./Inv.css";
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const GatePass = () => {

  const [invData, setInvData] = useState([])
  const [gatePassNo, setGatePassNo] = useState("")
  const [gatePassDate, setGatePassDate] = useState("")

  useEffect(() => { 
    getPDFData()
  }, []);

  const {id} = useParams()
  const getPDFData = async () => {
    const res = await instance({
      url: `eup_invoice/get/invoices/gatepass/pdfdata/${id}`,
      method: "GET",
      headers: {
        // Authorization: `${Cookies.get("accessToken")}`,
        accesskey: `auth74961a98ba76d4e4`
      },
    });
    // console.log(res.data.message.gatecode)
    let apiData = res.data.invoice
    let sl = 1
    for(let obj of apiData){
      obj.slNo = sl
      sl++
    }
    // console.log(res.data.message)
    setInvData(apiData)
    setGatePassNo(res.data.message.gatecode)
    setGatePassDate(res.data.message.date)
  }

  return (
    <div className='bg-white w-[21cm]'>
        <div>
      <table>
        <tbody>
          <tr>
            <td>
              <img width={130} src={eupheusLogo} />
            </td>
          </tr>
        </tbody>
      </table>
      <hr
        style={{
          borderWidth: "1px",
          marginTop: "0.3em",
          marginBottom: "0.3em",
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
          fontSize: "13pt",
        }}
      >
        Proficiency Learning Solutions Pvt Ltd.,
      </p>
      <p
        style={{
          paddingTop: "4pt",
          paddingLeft: "11pt",
          textIndent: "0pt",
          textAlign: "left",
          fontSize: "9pt",
        }}
      >
        Khasra No. 75, Village Malakpur, Ecotech-2, Opp. NTPC Ltd.(Netra)
        Greater Noida, Gautam Budh Nagar,
      </p>

      <p
        style={{
          paddingTop: "4pt",
          paddingLeft: "11pt",
          textIndent: "0pt",
          textAlign: "left",
          fontSize: "9pt",
        }}
      >
       Uttar Pradesh, Pin -201306
      </p>

      <p style={{ textIndent: "0pt", textAlign: "left" }}>
        <br />
      </p>
      <p style={{ textIndent: "0pt", textAlign: "left" }}></p>
      <h1
        style={{
          paddingLeft: "11pt",
          textIndent: "0pt",
          textAlign: "left",
          fontSize: "9pt",
        }}
      >
        <div>
        Gate Pass No : {gatePassNo}
        </div>
        
      </h1>
      <h1 style={{
          paddingLeft: "450pt",
          fontSize: "9pt",
        }}>
          Date: {gatePassDate}
        </h1>
  
      <table
        style={{ borderCollapse: "collapse", marginLeft: "6.75pt" }}
        cellSpacing={0}
      >
        <tbody>
          <tr style={{ height: "22pt" }}>
            <td
              style={{
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={13}
            >
              <p
                className="s1"
                style={{
                  paddingTop: "5pt",
                  paddingLeft: "223pt",
                  paddingRight: "240pt",
                  textIndent: "0pt",
                  lineHeight: "8.2pt",
                  textAlign: "center",
                  fontSize: "9pt",
                }}
              >
                GATE PASS
              </p>
            </td>
            <td
              style={{
                width: "6pt",
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
          </tr>

         
          <tr style={{ height: "18pt" }}>
            <td
              style={{
                width: "547pt",
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
                className="s1"
                style={{
                  paddingTop: "4pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "7pt",
                  paddingLeft: "20pt"
                }}
              >
                S.No
              </p>
            </td>
            <td
              style={{
                width: "1184pt",
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
                className="s1"
                style={{
                  paddingTop: "5pt",
                  paddingRight: "1pt",
                  textIndent: "0pt",
                  lineHeight: "8pt",
                  textAlign: "center",
                  fontSize: "7pt",
                }}
              >
                INV No
              </p>
              <p
                className="s1"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "6pt",
                  paddingRight: "1pt",
                  textIndent: "0pt",
                  lineHeight: "8pt",
                  textAlign: "center",
                  fontSize: "7pt",
                }}
              >
               
              </p>
            </td>
            <td
              style={{
                width: "1200pt",
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
                className="s1"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "40pt",
                  paddingRight: "14pt",
                  textIndent: "-14pt",
                  textAlign: "left",
                  fontSize: "7pt",
                }}
              >
                
                Customer Name
              </p>
            </td>
            <td
              style={{
                width: "1255pt",
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
                className="s1"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "30pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "7pt",
                }}
              >
                
                Date
              </p>
            </td>
            <td
              style={{
                width: "1160pt",
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
                className="s1"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "30pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "7pt",
                }}
              >
                
                Box
              </p>
            </td>
            <td
              style={{
                width: "3225pt",
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
                className="s1"
                style={{
                  paddingTop: "5pt",
                  paddingLeft: "1pt",
                  textIndent: "0pt",
                  lineHeight: "8pt",
                  textAlign: "center",
                  fontSize: "7pt",
                }}
              >
                Shipping Address
              </p>
              <p
                className="s1"
                style={{
                  marginTop: "3pt",
                  paddingLeft: "10pt",
                  textIndent: "0pt",
                  lineHeight: "8pt",
                  textAlign: "left",
                  fontSize: "7pt",
                }}
              >
                
              </p>
            </td>
            {/* <td
              style={{
                width: "50pt",
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
                className="s1"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "16pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "7pt",
                }}
              >
                Amount
              </p>
            </td>    */}
          </tr>


          <tr style={{ height: "18pt" }}>
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

          {invData.map((item) => {
            return (
              <tr style={{ height: "40pt" }}>
                <td
                  style={{
                    width: "17pt",
                    borderTopStyle: "solid",
                    borderTopWidth: "1pt",
                    borderLeftStyle: "solid",
                    borderLeftWidth: "1pt",
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
                      fontSize: "9pt",
                    }}
                  >
                    {item.slNo}
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
                      fontSize: "8pt",
                    }}
                  >
                    {item.inv_no}
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
                      paddingTop: "5pt",
                      paddingLeft: "5pt",
                      paddingRight: "14pt",
                      textIndent: "0pt",
                      lineHeight: "10pt",
                      textAlign: "left",
                      fontSize: "8pt",
                      lineHeight: "10.2pt",
                    }}
                  >
                    {/* WOW! Mathematics -CBSE Book 6 */}
                    {item.cardname}
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
                      fontSize: "8pt",
                    }}
                  >
                    {/* 240.00 */}
                    {/* {parseFloat(item.quantity).toFixed(2)} */}
                    {item.docdate}
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
                      textAlign: "center",
                      textIndent: "0pt",
                      fontSize: "8pt",
                    }}
                  >
                    {/* 490.00 */}
                    {item.boxes}
                    {/* {parseFloat(item.PRICE).toFixed(2)} */}
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
                      fontSize: "8pt",
                    }}
                  >
                    {/* 20.00 */}
                    {item.eup_invoice_addresses[0].ShipToAddress1}
                    {/* {parseFloat(item.DiscPrcnt).toFixed(2)} */}
                  </p>
                </td>   
              </tr>
           ); 
          })}

          

          <tr style={{ height: "20pt" }}>
            <td
              style={{
                width: "17pt",
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
                className="s1"
                style={{
                  paddingTop: "5pt",
                  paddingRight: "9pt",
                  textIndent: "0pt",
                  textAlign: "right",
                  fontSize: "8pt",
                }}
              >
                {/* Total: */}
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
                  paddingTop: "5pt",
                  paddingLeft: "16pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "8pt",
                }}
              >
          
                {/* {"12345"} */}
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
                borderRightWidth: "1pt",
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
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>

          
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default GatePass