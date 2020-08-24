import React from "react";
import Menu from "../../components/Menu";
const AdminMainPage = (props) => {
  return (
    <>
      <Menu signout={true} loggedIn={false} {...props} leftMenu={true} />
      <br />
      <div className="page">
        <p className="lead">Admin main page</p>
      </div>
    </>
  );
};

export default AdminMainPage;
