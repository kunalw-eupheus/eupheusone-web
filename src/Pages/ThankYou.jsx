import React from "react";
// import './PDF/Thankyou.css'
import eupheusLogo from "../Pages/PDF/eupheusLogo.png";

const ThankYou = () => {
  return (
    <div className="bg-slate-200 h-screen">
  
        <div>
          <img width={170} src={eupheusLogo} />
        </div>
        <div className="flex justify-center ">
          <div className="flex-col">
            <div className="flex justify-center">
              <h1 className="text-[5rem] text-[#45b1c7] font-Roboto">Thank you !</h1>
            </div>

            <div>
              <p className="text-[2rem] text-[#45b1c7]">
                Your account was verified successfully.
              </p>
            </div>

            <div className="flex justify-center mt-5">
              {" "}
              <p>
                <b className="text-[1rem] text-[#45b1c7]">
                  You can close this tab now.
                </b>
              </p>
            </div>
          </div>

          {/* <p>you should receive a confirmation email soon</p> */}
          {/* <button className="go-home">go home</button> */}
        </div>
      </div>
  );
};

export default ThankYou;
