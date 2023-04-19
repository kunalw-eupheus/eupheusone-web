import React from "react";
import './PDF/Thankyou.css'
import eupheusLogo from "../Pages/PDF/eupheusLogo.png";


const ThankYou = () => {
 
  return (
    <div className="bg-slate-200 h-screen">
  
    <div className="wrapper-2">
    <div className="">
            <img width={170} src={eupheusLogo} />
          </div>
      <h1>Thank you !</h1>
      <p>Your account was verified successfully.</p>
      {/* <p>you should receive a confirmation email soon</p> */}
      {/* <button className="go-home">go home</button> */}
    </div>
    <div className="footer-like">
      <p>
        
        <b>You can close this tab now.</b>
      </p>
    {/* </div> */}
  {/* </div> */}
</div>

    </div>
  );
};

export default ThankYou;
