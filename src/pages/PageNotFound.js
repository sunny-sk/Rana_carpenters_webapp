import React from "react";
import Menu from "../components/Menu";

const PageNotFound = (props) => {
  return (
    <>
      <Menu signout={true} loggedIn={false} {...props} leftMenu={false} />
      <br />
      <div className="page">
        <div className="container text-center">
          <br />
          <br />
          <br />
          <div className="text-center" style={{ height: "250px" }}>
            <img
              src={require("../assets/page_not_found.svg")}
              style={{ height: "100%", width: "100%" }}
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
