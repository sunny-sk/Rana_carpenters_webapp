import React, { useEffect } from "react";
import Menu from "../../components/Menu";

const ManageFeedbacks = (props) => {
  useEffect(() => {
    console.log("manage Feedback.js");
  }, []);
  return (
    <>
      <Menu signout={true} loggedIn={false} {...props} leftMenu={true} />
      <br />
      <div className="page">
        <p className="lead">manage feedbacks</p>
      </div>
    </>
  );
};

export default ManageFeedbacks;
