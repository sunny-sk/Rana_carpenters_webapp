import React from "react";
import Menu from "../../components/Menu";
const ManageDesigns = (props) => {
  return (
    <>
      <Menu signout={true} loggedIn={false} {...props} leftMenu={true} />
      <br />
      <div className="page">
        <div className="container"></div>
      </div>
    </>
  );
};

export default ManageDesigns;
