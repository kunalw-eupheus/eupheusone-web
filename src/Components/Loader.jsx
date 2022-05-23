import React from "react";

const Loader = () => {
  return (
    <div className="w-[100vw] h-[100vh] z-50 fixed bg-[rgba(0,0,0,0.75)] left-0 top-0 flex justify-center items-center">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
