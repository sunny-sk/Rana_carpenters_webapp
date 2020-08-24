import React from "react";
import Menu from "../../components/Menu";

const ManageCategories = (props) => {
  return (
    <>
      <Menu signout={true} loggedIn={false} {...props} leftMenu={true} />
      <br />
      <div className="page">
        <p className="lead">Manage categories Page</p>
      </div>
    </>
  );
};

export default ManageCategories;
