import React, { useEffect, useState } from "react";
import "../css/All.css";
import Menu from "../components/Menu";
import { getAllCategories, getAllProducts } from "../helper/Api";
import Url from "../constants/Url";
import Loader from "../components/Loader";
const Designs = (props) => {
  const [categories, setCategories] = useState([
    {
      name: "All",
      _id: Math.random() + "Rana",
      imgUrl: undefined,
    },
  ]);
  const [products, setProducts] = useState([]);
  const [productListingsTemp, setProductListingsTemp] = useState([]);
  const [favourites, setFovourites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activatedCategory, setActivatedCategory] = useState("All");
  const init = async () => {
    try {
      const result = await getAllCategories();
      if (result.success) {
        setCategories([...categories, ...result.categories]);
      }
    } catch (error) {}
  };

  const onAddToFavourites = (item) => {
    let favs = localStorage.getItem("favs");
    if (!favs) {
      localStorage.setItem("favs", JSON.stringify({ favsItem: [item._id] }));
      setFovourites([item._id]);
    } else {
      favs = JSON.parse(favs);
      if (favs.favsItem.indexOf(item._id) < 0) {
        favs.favsItem.push(item._id);
        favs.favsItem = [...new Set(favs.favsItem)];
        localStorage.setItem(
          "favs",
          JSON.stringify({ favsItem: favs.favsItem })
        );
      } else {
        favs.favsItem = favs.favsItem.filter((e) => e !== item._id);
        localStorage.setItem(
          "favs",
          JSON.stringify({ favsItem: favs.favsItem })
        );
      }
      setFovourites([...favs.favsItem]);
    }
  };

  const loadProducts = async () => {
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
    console.log(filterName);
    setActivatedCategory(filterName === "All" ? "All" : filterName);
    if (filterName === "All") setProductListingsTemp([...products]);
    else
      setProductListingsTemp([
        ...products.filter((e) => e.category === filterName),
      ]);
  };

  const loadFavouries = async () => {
    let favs = localStorage.getItem("favs");
    if (favs) {
      favs = JSON.parse(favs);
      setFovourites([...favs.favsItem]);
    }
  };

  const isFavourite = (id) => (favourites.indexOf(id) < 0 ? false : true);

  useEffect(() => {
    init();
    loadProducts();
    loadFavouries();
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
                value={activatedCategory}
                onChange={(e) => {
                  filterCategory(e.target.value);
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
          {isLoading ? (
            <>
              <br />
              <Loader />
            </>
          ) : (
            <>
              {productListingsTemp.length > 0 ? (
                <>
                  {productListingsTemp.map((prod, i) => (
                    <div
                      onClick={(e) => {
                        if (
                          e.target.className === "far fa-heart" ||
                          e.target.className === "fas fa-heart"
                        ) {
                          //do nothing
                        } else {
                          props.history.push(`/designs/${prod._id}`);
                        }
                      }}
                      className="row mt-1 prod-container"
                      key={i}
                    >
                      <div className="col-sm-4">
                        <div className="design-prod-image">
                          <img src={Url._imageBase + prod.imgUrl} />
                        </div>
                      </div>
                      <div className="col-sm-8">
                        <div className="row mt-3">
                          <div className="col-sm-8">
                            <p className="design-title">{prod.title}</p>
                            <p className="design-date">
                              {new Date(prod.createdAt).toDateString()}
                            </p>
                            <p className="design-description">
                              {prod.description}
                            </p>
                          </div>
                          <div className="col-sm-4">
                            <div
                              onClick={() => {
                                onAddToFavourites(prod);
                              }}
                              className="fav-container"
                            >
                              <p>
                                {isFavourite(prod._id) ? (
                                  <i className="fas fa-heart"></i>
                                ) : (
                                  <i className="far fa-heart"></i>
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="line-c"></div>
                      <br />
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <div className="container text-center">
                    <br />
                    <br />
                    <p className="lead">No design Found</p>
                    <button
                      onClick={() => {
                        setActivatedCategory("All");
                        setProductListingsTemp([...products]);
                      }}
                      className="btn"
                    >
                      Refresh
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Designs;
