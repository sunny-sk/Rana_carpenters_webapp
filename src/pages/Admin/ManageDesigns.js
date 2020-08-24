import React from "react";
import Menu from "../../components/Menu";
const ManageDesigns = (props) => {
  return (
    <>
      <Menu signout={true} loggedIn={false} {...props} leftMenu={true} />
      <br />
      <div className="page">
        <p className="lead">ManageDesigns Page</p>
      </div>
    </>
  );
};

export default ManageDesigns;
