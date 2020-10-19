import React, { useEffect, useState } from "react";
import Card from "../../../components/Card";
import Loader from "../../../components/Loader";
import Menu from "../../../components/Menu";
import Modal from "../../../components/Modal";
import Select from "../../../components/Select";
import Url from "../../../constants/Url";
import {
  getAllProducts,
  getAllCategories,
  getAllProductInventories,
  deleteProductInventory,
  createProduct,
} from "../../../helper/Api";
import { filter } from "../../../helper/util";
import axios from "axios";

const ManageDesignsView = (props) => {
  //create product related state
  const [pTitle, setPtitle] = useState("");
  const [pCategory, setPcategory] = useState("Ceiling Design");
  const [pDescription, setPdescription] = useState("");
  const [pImg, setPimg] = useState(undefined);

  //action modes
  const [mode, setMode] = useState("create"); // edit
  const [action, setAction] = useState("create"); //upload

  //upload product inventories related
  const [pISelectedImage, setPiSelectedImage] = useState(undefined);
  //data
  const [productInventories, setProductInventories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activatedCategory, setActivatedCategory] = useState("All");
  const [productListingsTemp, setProductListingsTemp] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(undefined);
  const [products, setProducts] = useState([]);

  //loaders
  const [pisLoading, setPsetPisLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [piImageIsUploading, setPiImageIsUploading] = useState(false);

  const init = async () => {
    try {
      const result = await getAllCategories();
      if (result.success) {
        setCategories([
          {
            name: "All",
            _id: Math.random() + "Rana",
            imgUrl: undefined,
          },
          ...result.categories,
        ]);
      }
    } catch (error) {}
  };
  const loadDesigns = async () => {
    try {
      setIsLoading(true);
      const response = await getAllProducts();
      setIsLoading(false);
      if (response.success && response.products.length > 0) {
        setProducts([...response.products]);
        setProductListingsTemp([...response.products]);
      }
    } catch (error) {}
  };

  const filterCategory = (filterName) => {
    setActivatedCategory(filterName === "All" ? "All" : filterName);
    setProductListingsTemp(filter(products, filterName, "category", "All"));
  };

  useEffect(() => {
    init();
    loadDesigns();
  }, []);

  const getOptionsForForm = () => {
    const temp = [...categories];
    temp.shift();
    return temp;
  };

  const onLoadProductInevtories = async () => {
    try {
      const response = await getAllProductInventories();
      if (response.success && response.productInvetories.length > 0) {
        setProductInventories([...response.productInvetories]);
      }
    } catch (error) {}
  };

  const selectFile = (event) => setPiSelectedImage(event.target.files[0]);

  const onUpoadPI = async () => {
    try {
      if (!pISelectedImage) return;
      const data = new FormData();
      let token = localStorage.getItem("user");
      token = JSON.parse(token);
      data.append("file", pISelectedImage);
      data.append("folder", "Products");
      setPiImageIsUploading(true);
      axios
        .post(Url._uploadImageToProductInventories, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token": token.token,
          },
        })
        .then((res) => {
          console.log(res.data);
          const newProductInventories = [...productInventories];
          newProductInventories.push(res.data.productInventory);
          setProductInventories([...newProductInventories]);
          setPiSelectedImage(undefined);
          setPiImageIsUploading(false);
        })
        .catch((err) => {
          console.log(err);
          setPiSelectedImage(undefined);
          setPiImageIsUploading(false);
        });
    } catch (error) {}
  };

  const onDeleteProductInventory = async (prodIn) => {
    try {
      const res = await deleteProductInventory(prodIn._id);
      console.log(res);
      if (res.success) {
        setProductInventories(
          productInventories.filter((e) => e._id !== prodIn._id)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onCreateProduct = async () => {
    try {
      if (!pTitle) return;
      if (!pCategory) return;
      if (!pDescription) return;
      if (!pImg) return;

      const payLoad = {
        title: pTitle,
        category: pCategory,
        description: pDescription,
        imgId: pImg._id,
      };
      const result = await createProduct(payLoad);
      console.log(result);
      if (result.success) {
        setPtitle("");
        setPdescription("");
        setPimg(undefined);
        loadDesigns();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Menu signout={true} loggedIn={false} {...props} leftMenu={true} />
      <br />
      <div className="page">
        <Modal
          allowToClose={true}
          id="selectImageModal"
          cStyle="modal-dialog modal-dialog-full"
        >
          <div className="container text-center">
            {/* upoad image */}
            {!piImageIsUploading ? (
              <div className="input-group">
                <div className="custom-file">
                  <input
                    disabled={piImageIsUploading}
                    accept="image/*"
                    onChange={selectFile}
                    type="file"
                    className="custom-file-input"
                  />
                  <label className="custom-file-label">
                    {pISelectedImage ? pISelectedImage.name : "Select Image"}
                  </label>
                </div>
                <div className="input-group-append mx-2">
                  <button
                    disabled={
                      !pISelectedImage
                        ? true
                        : piImageIsUploading
                        ? true
                        : false
                    }
                    //  PI=product inventory
                    onClick={onUpoadPI}
                    className="btn btn-outline-secondary"
                    type="button"
                  >
                    Upload
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Loader />
              </>
            )}
            <br />

            {/* all images */}
            <br />
            <div className="row">
              {productInventories.length > 0 ? (
                <>
                  {productInventories.map((pI, i) => {
                    return (
                      <div
                        key={i + Math.random().toString()}
                        className="col-sm-2 mb-4"
                        style={{ position: "relative" }}
                      >
                        <div
                          onClick={() => {
                            onDeleteProductInventory(pI);
                          }}
                          className="delete-con-productInve"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </div>
                        <a
                          style={{ cursor: "pointer" }}
                          // if image is uploding do not allow to select available image
                          data-dismiss={piImageIsUploading ? " " : "modal"}
                          onClick={() => {
                            // if pi image is uploading do not allow to select image
                            if (!piImageIsUploading) setPimg(pI);
                          }}
                        >
                          <div key={i}>
                            <img
                              style={{ borderRadius: "6px" }}
                              className="img-fluid border"
                              src={Url._imageBase + pI.imgUrl}
                            />
                          </div>
                        </a>
                      </div>
                    );
                  })}
                </>
              ) : (
                <>
                  <p className="lead">No Product Inventories found</p>
                </>
              )}
            </div>
          </div>
        </Modal>
        <div className="container">
          <br />
          <button
            className="btn btn-success btn-sm mr-2"
            type="button"
            data-toggle="collapse"
            data-target="#formColapse"
            aria-expanded="false"
            aria-controls="formColapse"
          >
            Create<i className="fas fa-plus ml-1"></i>
          </button>
          <div className="collapse" id="formColapse">
            <div className="p-4 shadow">
              <div className="row">
                <div className={pImg ? "col-sm-8" : "col-sm-12"}>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Title</label>
                        <input
                          value={pTitle}
                          onChange={(e) => {
                            setPtitle(e.target.value);
                          }}
                          type="text"
                          className="form-control"
                          placeholder="Enter Title"
                        />
                        <small className="form-text text-muted"></small>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      {categories.length > 0 && (
                        <div className="dropDown-container w-100">
                          <Select
                            label="Select category"
                            options={
                              categories.length > 0 ? getOptionsForForm() : []
                            }
                            onChange={(e) => {
                              setPcategory(e);
                            }}
                            optionName="name"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <input
                      value={pDescription}
                      onChange={(e) => {
                        setPdescription(e.target.value);
                      }}
                      type="text"
                      className="form-control"
                      placeholder="Enter Description"
                    />
                  </div>
                  <div className="form-group">
                    <button
                      onClick={onLoadProductInevtories}
                      data-toggle="modal"
                      data-target="#selectImageModal"
                      className="btn btn-dark btn-sm"
                    >
                      Select Product Image
                      <i className="fas fa-photo-video ml-1"></i>
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      onCreateProduct();
                    }}
                    // type="button"
                    className="btn btn-primary mr-2 btn-sm"
                  >
                    Submit
                  </button>
                  <button
                    //onClick remove all data from form
                    type="button"
                    data-toggle="collapse"
                    data-target="#formColapse"
                    aria-expanded="false"
                    aria-controls="formColapse"
                    className="btn btn-danger mr-2 btn-sm"
                    onClick={() => {
                      setPimg(undefined);
                      setPtitle("");
                      setPcategory("");
                      setPdescription("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
                <div className="col-sm-4">
                  {pImg && (
                    <img
                      style={{ borderRadius: "6px" }}
                      className="img-fluid border"
                      src={Url._imageBase + pImg.imgUrl}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="line-c w-100" style={{ marginLeft: "0" }}></div>
          <br />
          <div className="row">
            <div
              className={
                selectedProduct ? "col-xl-7 col-sm-12 " : "col-xl-12 col-sm-12"
              }
            >
              <br />
              {categories.length > 0 && (
                <div className="dropDown-container w-25 ">
                  <Select
                    defaultValue={activatedCategory}
                    label="Select category"
                    options={categories}
                    onChange={(e) => {
                      filterCategory(e);
                    }}
                    optionName="name"
                  />
                </div>
              )}
              <br />
              <br />
              {isLoading ? (
                <>
                  <br />
                  <Loader />
                </>
              ) : (
                <>
                  {productListingsTemp.map((prod, i) => (
                    <Card
                      prod={prod}
                      key={i}
                      admin={true}
                      data={{
                        date: new Date(prod.createdAt).toDateString(),
                        imgUrl: prod.imgUrl
                          ? Url._imageBase + prod.imgUrl
                          : Url._noImageUrl,
                      }}
                      onCardClick={() => {
                        console.log(prod);
                        setSelectedProduct(prod);
                      }}
                    />
                  ))}
                </>
              )}
            </div>
            {selectedProduct && (
              <div className="col-xl-5 col-sm-12 border-left">
                <div
                  style={{
                    textAlign: "left",
                    display: "inline-block",
                    width: "80%",
                  }}
                >
                  <div
                    class="btn-group mr-2"
                    role="group"
                    aria-label="First group"
                  >
                    <button type="button" class="btn btn-sm btn-danger">
                      Delete Product
                    </button>
                    <button type="button" class="btn btn-sm btn-primary">
                      Add More Images +
                    </button>
                  </div>
                </div>
                <div style={{ textAlign: "right", display: "inline-block" }}>
                  <button
                    onClick={() => setSelectedProduct(undefined)}
                    className="btn btn-sm btn-info"
                  >
                    X
                  </button>
                </div>
                <br />
                <br />

                <div className="row ">
                  <br />
                  <br />

                  <>
                    {selectedProduct.more_images.length > 0 ? (
                      selectedProduct.more_images.map((e, i) => (
                        <div className="col-sm-4 mb-4" key={i}>
                          <img
                            alt={e.title}
                            style={{ borderRadius: "6px" }}
                            className="img-fluid"
                            src={Url._imageBase + e.imgUrl}
                          />
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="text-center w-100">
                          <br />
                          <br />
                          <p className="lead">No More imaged found</p>
                        </div>
                      </>
                    )}
                  </>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageDesignsView;
