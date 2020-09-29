import React, { useState, useEffect } from "react";
import Menu from "../../components/Menu";
import { getAllCategories } from "../../helper/Api";
const ManageCategories = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [mode, setMode] = useState("create");
  const init = async () => {
    try {
      const result = await getAllCategories();
      if (result.success) {
        setAllCategories([...result.categories]);
      }
    } catch (error) {}
  };

  const onSelect = async () => {
    setMode("update");
  };

  const onManage = async (action) => {
    try {
      if (action === "cancel") {
        setMode("create");
        //reset all fields
      } else if (action === "delete") {
        //call delete api
      } else {
        //call update api
      }
    } catch (error) {
      //handle error
    }
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
          <div>
            <div className="text-center">
              <h3 className="lead">Manage Categories</h3>
            </div>
            <br />
            <form>
              <div class="form-group">
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter Category"
                />
                <small id="emailHelp" className="form-text text-muted"></small>
              </div>

              <div className="text-center">
                {mode === "create" ? (
                  <>
                    <button className="btn btn-success mx-1">Create</button>
                    <button className="btn btn-primary mx-1">Reset</button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => onManage("delete")}
                      className="btn btn-danger mx-1"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => onManage("update")}
                      className="btn btn-info mx-1"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => onManage("cancel")}
                      className="btn btn-danger mx-1"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
          <br />
          <hr />
          <br />
          <div className="text-center">
            <h3 className="lead">All Categories</h3>
          </div>

          <br />
          <div className="row">
            <div className="col-sm-12">
              <table class="table">
                <thead class="thead-dark">
                  <tr className="text-center">
                    <th scope="col">ID</th>
                    <th scope="col">Category name</th>
                    <th scope="col">createdAt</th>
                    <th scope="col">Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {allCategories.map((cate, i) => {
                    return (
                      <tr
                        onClick={onSelect}
                        key={i}
                        className="text-center"
                        style={{ cursor: "pointer" }}
                      >
                        <td>
                          {cate._id.substring(
                            cate._id.length - 5,
                            cate._id.length
                          )}
                        </td>
                        <td>{cate.name}</td>
                        <td>{new Date(cate.createdAt).toDateString()}</td>
                        <td>{new Date(cate.updatedAt).toDateString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageCategories;
