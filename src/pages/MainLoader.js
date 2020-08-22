import React, { useState, useEffect } from "react";
import Routes from "../Routes";

const MainLoader = () => {
  const [isLading, setIsLading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLading(false);
    }, 1500);
  }, [isLading]);
  return (
    <>
      {isLading ? (
        <div className="main text-center display">
          <object
            type="image/svg+xml"
            data={require("../assets/mainAnimation.svg")}
          >
            <img
              src={require("../assets/mainAnimation.svg")}
              className="img-fluid"
              alt=""
            />
          </object>
        </div>
      ) : (
        <>
          <Routes />
        </>
      )}
    </>
  );
};

export default MainLoader;
