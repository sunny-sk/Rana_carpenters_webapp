import React from "react";
import Menu from "../../components/Menu";
const ManageDetails = (props) => {
  return (
    <>
      <Menu signout={true} loggedIn={false} {...props} leftMenu={true} />
      <br />
      <div className="page">
        <p className="lead">Manage Details</p>
      </div>
    </>
  );
};

export default ManageDetails;
