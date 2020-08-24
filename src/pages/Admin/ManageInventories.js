import React from "react";
import Menu from "../../components/Menu";

const ManageInventories = (props) => {
  return (
    <>
      <Menu signout={true} loggedIn={false} {...props} leftMenu={true} />
      <br />
      <div className="page">
        <p className="lead">manage Inventories</p>
      </div>
    </>
  );
};

export default ManageInventories;
