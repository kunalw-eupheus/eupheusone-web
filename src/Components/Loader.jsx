import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-[100%] !opacity-100 absolute top-0 flex justify-center items-center">
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
