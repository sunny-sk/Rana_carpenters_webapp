import React, { useEffect, useState } from "react";
import Menu from "../../components/Menu";
import { getAllProducts, getAllInventories } from "../../helper/Api";
const AdminMainPage = (props) => {
  const [count, setCount] = useState({
    invetories: 0,
    products: 0,
    feedbacks: 0,
  });
  const init = async (params) => {
    try {
      let data = {
        invetories: 0,
        products: 0,
        feedbacks: 0,
      };
      let result = await getAllInventories();
      if (result.success) {
        data.invetories = result.count;
      }
      result = await getAllProducts();
      if (result.success) {
        data.products = result.count;
      }
      setCount({ ...data });
    } catch (error) {}
  };

  useEffect(() => {
    init();
  }, []);
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
                <p>{count.products}</p>
              </div>
            </div>
            <div className="col-sm-4 p-2">
              <div className="box border bg-light rounded">
                <h4 className="mt-2">Inventories</h4>
                <p>{count.invetories}</p>
              </div>
            </div>
            <div className="col-sm-4 p-2">
              <div className="box border bg-light rounded">
                <h4 className="mt-2">Feedbacks</h4>
                <p>{count.feedbacks}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminMainPage;
