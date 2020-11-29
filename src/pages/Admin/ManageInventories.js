import React, { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import Menu from "../../components/Menu";
import Url from "../../constants/Url";
import { getAllInventories, deleteInventory } from "../../helper/Api";
import axios from "axios";
import Modal from "../../components/Modal";

const ManageInventories = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [tempAllProductInventories, setTempAllProductInventories] = useState(
    []
  );
  const [selectedImages, setSelectedImages] = useState([]);

  const onLoadInevtories = async () => {
    try {
      setIsLoading(true);
      const response = await getAllInventories();
      setIsLoading(false);
      console.log(response);
      if (response.success && response.Inventories.length > 0) {
        setTempAllProductInventories(response.Inventories);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const onUploadInventory = async () => {
    try {
      let token = localStorage.getItem("user");
      token = JSON.parse(token);
      const data = new FormData();
      data.append("folder", "Inventory");
      let url =
        selectedImages.length > 1
          ? Url._uploadMultipleInventories
          : Url._uploadSingleInventories;

      if (selectedImages.length > 1) {
        for (let i = 0; i < selectedImages.length; i++) {
          data.append("file", selectedImages[i]);
        }
      } else {
        data.append("file", selectedImages[0]);
      }
      setIsUploading(true);
      axios
        .post(url, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token": token.token,
          },
        })
        .then((res) => {
          setIsUploading(false);
          if (res.data.success && res.data.inventories.length > 0) {
            setTempAllProductInventories([
              ...res.data.inventory,
              ...tempAllProductInventories,
            ]);
          }
        })
        .catch((err) => {
          setIsUploading(false);
        });
    } catch (error) {
      setIsUploading(false);
    }
  };

  const selectFile = (event) => {
    setSelectedImages(event.target.files);
  };

  const onDeleteInventory = async (id) => {
    try {
      const res = await deleteInventory(id);
      if (res.success) {
        setTempAllProductInventories(
          tempAllProductInventories.filter((e) => e._id !== id)
        );
      }
    } catch (error) {}
  };

  useEffect(() => {
    onLoadInevtories();
  }, []);

  return (
    <>
      <Menu signout={true} loggedIn={false} {...props} leftMenu={true} />

      <br />
      <div className="page">
        <div className="container">
          <div className="accordion" id="accordionExample">
            <button
              className="btn btn-outline-dark collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#collapseT"
              aria-expanded="false"
              aria-controls="collapseT"
              disabled={isUploading}
            >
              + Add Inventories
            </button>
            <br />
            <br />
            <div
              id="collapseT"
              className="collapse"
              aria-labelledby="headingTwo"
              data-parent="#accordionExample"
            >
              <div className="shadow p-2 text-center">
                <div className="input-group mt-4">
                  <div className="custom-file">
                    <input
                      accept="image/*"
                      type="file"
                      multiple
                      onChange={selectFile}
                      className="custom-file-input"
                    />
                    <label className="custom-file-label">
                      {"Select Image"}
                    </label>
                  </div>
                  <div className="input-group-append mx-2">
                    <button
                      disabled={isUploading}
                      onClick={onUploadInventory}
                      //  PI=product inventory
                      className="btn btn-outline-secondary"
                      type="button"
                    >
                      Upload
                    </button>
                  </div>
                </div>
                <br />
                {isUploading && <Loader />}
              </div>
            </div>
          </div>
          <br />
          <br />
          <hr />
          <br />
          <div className="row">
            {isLoading ? (
              <>
                <Loader />
              </>
            ) : (
              <>
                {tempAllProductInventories.length > 0 ? (
                  tempAllProductInventories.map((item, i) => {
                    return (
                      <div
                        key={i + Math.random().toString()}
                        className="col-sm-2 mb-4"
                        style={{ position: "relative" }}
                      >
                        <Modal
                          id="deleteConfirmModal"
                          onYes={() => {
                            onDeleteInventory(item._id);
                          }}
                          yes="Delete"
                          cancel="Cancel"
                          ask="Are you sure? you want to delete this."
                        />
                        <div
                          data-toggle="modal"
                          data-target="#deleteConfirmModal"
                          className="delete-con-productInve"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </div>
                        <div key={23}>
                          <img
                            alt="df"
                            style={{ borderRadius: "6px" }}
                            className="img-fluid border"
                            src={Url._imageBase + item.imgUrl}
                          />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <>
                    <div className="col-sm-12 text-center">
                      <p className="lead ">No Product Inventories found</p>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageInventories;
