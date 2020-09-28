import React from "react";
import Menu from "../../components/Menu";

const ManageInventories = (props) => {
  return (
    <>
      <Menu signout={true} loggedIn={false} {...props} leftMenu={true} />
      <br />
      <div className="page">
        <div className="container">
          <div className="row">
            <div className="col-sm-8"></div>
            <div className="col-sm-4"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageInventories;
