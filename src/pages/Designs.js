import React from "react";
import "../css/All.css";
import Menu from "../components/Menu";
const Designs = (props) => {
  return (
    <>
      <Menu signout={true} loggedIn={false} {...props} leftMenu={false} />
      <br />
      <div className="page">
        <br />
        <div className="container">
          <div className="dropDown-container">
            <div class="form-group select-category-c">
              <label for="exampleFormControlSelect1">Select category</label>
              <select
                class="form-control select-category"
                id="exampleFormControlSelect1"
              >
                <option>All</option>
                <option>One</option>
                <option>Two</option>
                <option>Three</option>
                <option>Four</option>
              </select>
            </div>
          </div>
        </div>
        <div className="line-c"></div>
      </div>
    </>
  );
};

export default Designs;
