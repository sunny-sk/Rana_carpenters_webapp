import React from "react";

const Loader = () => {
  return (
    <div className="container text-center">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
