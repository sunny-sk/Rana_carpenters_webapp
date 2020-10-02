import React, { useState, useEffect } from "react";
import Menu from "../../components/Menu";
import {
  getAllCategories,
  deleteCategory,
  createCategory,
} from "../../helper/Api";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
const ManageCategories = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading2] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [mode, setMode] = useState("create");
  const [category, setCategory] = useState("");
  const [id, setId] = useState("");
  const init = async () => {
    try {
      setIsLoading(true);
      const result = await getAllCategories();
      setIsLoading(false);
      if (result.success) {
        setAllCategories([...result.categories]);
      }
    } catch (error) {}
  };

  const onSelect = async (selected) => {
    setMode("update");
    setCategory(selected.name);
    setId(selected._id);
  };

  const onCreateCategory = async () => {
    try {
      setIsLoading2(true);
      const result = await createCategory({ name: category });
      setIsLoading2(false);
      if (result.success) {
        setAllCategories([result.category, ...allCategories]);
        setCategory("");
      }
      //add alert here
    } catch (error) {
      //handle error
    }
  };
  const onDeleteCategory = async () => {
    try {
      setIsLoading2(true);
      const result = await deleteCategory(id);
      setIsLoading2(false);
      console.log(result);
      if (result.success) {
        setCategory("");
        setMode("create");
        setAllCategories(allCategories.filter((e) => e._id !== id));
        setId("");
      }

      //add alert here
    } catch (error) {
      //handle error
    }
  };

  const onManage = async (action) => {
    try {
      if (action === "cancel") {
        setMode("create");
        setCategory("");
        setId("");
      } else if (action === "delete") {
        //call delete api
        onDeleteCategory();
      } else {
        //call update api
        alert("add update functionality here");
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
        <Modal
          id="deleteModal"
          ask="are you sure you want to remove this category"
          yes="Yes"
          cancel="No"
          onYes={() => {
            onManage("delete");
          }}
        />

        <div className="container">
          <div>
            <div className="text-center">
              <h3 className="lead">Manage Categories</h3>
            </div>
            <br />
            <div className="form-group">
              <input
                value={category}
                type="text"
                className="form-control"
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter Category"
              />
              <small id="emailHelp" className="form-text text-muted"></small>
            </div>

            <div className="text-center">
              {mode === "create" ? (
                <>
                  <button
                    onClick={onCreateCategory}
                    type="button"
                    className="btn btn-success mx-1"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => onManage("cancel")}
                    type="button"
                    className="btn btn-primary mx-1"
                  >
                    Reset
                  </button>
                </>
              ) : (
                <>
                  <button
                    data-toggle="modal"
                    data-target="#deleteModal"
                    type="button"
                    className="btn btn-danger mx-1"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => onManage("update")}
                    className="btn btn-info mx-1"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => onManage("cancel")}
                    className="btn btn-danger mx-1"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
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
              <table className="table">
                <thead className="thead-dark">
                  <tr className="text-center">
                    <th scope="col">ID</th>
                    <th scope="col">Category name</th>
                    <th scope="col">createdAt</th>
                    <th scope="col">Last Updated</th>
                  </tr>
                </thead>

                {!isLoading && (
                  <tbody>
                    {allCategories.map((cate, i) => {
                      return (
                        <tr
                          onClick={() => onSelect(cate)}
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
                )}
              </table>
              <div>
                {isLoading ? (
                  <>
                    <Loader />
                  </>
                ) : (
                  <>
                    {allCategories.length === 0 && (
                      <>
                        <div className="text-center">
                          <br />
                          <p>
                            <b>No Categories found</b>
                          </p>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageCategories;
