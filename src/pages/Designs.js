import React, { useEffect, useState } from "react";
import "../css/All.css";
import Menu from "../components/Menu";
import { getAllCategories } from "../helper/Api";
const Designs = (props) => {
  const [categories, setCategories] = useState([{ name: "All" }]);

  const init = async () => {
    try {
      const result = await getAllCategories();
      if (result.success) {
        setCategories([...categories, ...result.categories]);
      }
    } catch (error) {}
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Menu signout={true} loggedIn={false} {...props} leftMenu={false} />
      <br />
      <div className="page">
        <br />
        <div className="container">
          <div className="dropDown-container">
            <div className="form-group select-category-c">
              <label htmlFor="exampleFormControlSelect1">Select category</label>
              <select
                onChange={(e) => {
                  console.log(e.target.value);
                }}
                className="form-control select-category"
                id="exampleFormControlSelect1"
              >
                {categories.map((category, i) => (
                  <option key={i}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="line-c"></div>
        <br />
        <div className="container">
          <div className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-8">
              <div className="row">
                <div className="col-sm-8">
                  <p>Title</p>
                </div>
                <div className="col-sm-4">
                  <p>Fav</p>
                </div>
              </div>
              <p>Date</p>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Delectus consequatur expedita beatae accusamus et inventore
                magnam corrupti eius, recusandae, sequi doloribus in consectetur
                exercitationem? Expedita natus suscipit at iusto odio.
              </p>
              <p>comments : 12</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Designs;
