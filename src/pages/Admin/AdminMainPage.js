import React, { useRef, useEffect } from "react";
import Menu from "../../components/Menu";
const AdminMainPage = (props) => {
  useEffect(() => {}, []);
  return (
    <>
      <Menu signout={true} loggedIn={false} {...props} leftMenu={true} />
      <br />
      <div className="page">
        <div className="container">
          <div className="row text-center">
            <div className="col-sm-4 p-2">
              <div className="box border bg-light rounded">
                <h4 className="mt-2">Designs</h4>
                <p>20</p>
              </div>
            </div>
            <div className="col-sm-4 p-2">
              <div className="box border bg-light rounded">
                <h4 className="mt-2">Inventories</h4>
                <p>20</p>
              </div>
            </div>
            <div className="col-sm-4 p-2">
              <div className="box border bg-light rounded">
                <h4 className="mt-2">Feedbacks</h4>
                <p>20</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminMainPage;
