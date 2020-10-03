import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import Loader from "../../components/Loader";
import Menu from "../../components/Menu";
import Select from "../../components/Select";
import Url from "../../constants/Url";
import { getAllProducts, getAllCategories } from "../../helper/Api";
import { filter } from "../../helper/util";
const ManageDesigns = (props) => {
  const [categories, setCategories] = useState([
    {
      name: "All",
      _id: Math.random() + "Rana",
      imgUrl: undefined,
    },
  ]);
  const [activatedCategory, setActivatedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [productListingsTemp, setProductListingsTemp] = useState([]);
  const [products, setProducts] = useState([]);
  const init = async () => {
    try {
      const result = await getAllCategories();
      if (result.success) {
        setCategories([...categories, ...result.categories]);
      }
    } catch (error) {}
  };
  const loadDesigns = async () => {
    try {
      setIsLoading(true);
      const response = await getAllProducts();
      setIsLoading(false);
      if (response.success && response.products.length > 0) {
        console.log(response.products);
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

  return (
    <>
      <Menu signout={true} loggedIn={false} {...props} leftMenu={true} />
      <br />
      <div className="page">
        <div className="container">
          <div className="row">
            <div
              className={
                selectedProduct ? "col-xl-7 col-sm-12 " : "col-xl-12 col-sm-12"
              }
            >
              <br />
              <div className="dropDown-container w-25">
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
                      data={{
                        title: prod.title,
                        description: prod.description,
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
            <div className="col-xl-5 col-sm-12 border-left">
              <div className="row ">
                <br />
                <br />
                {selectedProduct && (
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageDesigns;
