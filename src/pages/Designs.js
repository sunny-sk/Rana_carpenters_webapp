import React, { useEffect, useState } from "react";
import "../css/All.css";
import Menu from "../components/Menu";
import { getAllCategories, getAllProducts } from "../helper/Api";
import Url from "../constants/Url";
import Loader from "../components/Loader";
import Card from "../components/Card";
import Select from "../components/Select";
import { filter } from "../helper/util";
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
    loadDesigns();
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
          </div>
          <div className="dropDown-container">
            <div className="form-group select-category-c">
              <Select
                label="Sory By"
                options={[{ name: "Date" }, { name: "name" }]}
                onChange={(e) => {}}
                optionName="name"
              />
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
                    <Card
                      like={true}
                      prod={prod}
                      key={i}
                      data={{
                        title: prod.title,
                        description: prod.description,
                        date: new Date(prod.createdAt).toDateString(),
                        imgUrl: Url._imageBase + prod.imgUrl,
                      }}
                      isFavourite={isFavourite}
                      AddToFavourites={() => {
                        onAddToFavourites(prod);
                      }}
                      onCardClick={() => {
                        props.history.push(`/designs/${prod._id}`);
                      }}
                    />
                  ))}
                  <br />
                  <br />
                  <nav aria-label="Page navigation example">
                    <br />
                    <br />
                    <ul className="pagination justify-content-center">
                      <li className="page-item disabled">
                        <a className="page-link" href="#!" tabIndex="-1">
                          Previous
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#!">
                          1
                        </a>
                      </li>

                      <li className="page-item">
                        <a className="page-link" href="#!">
                          Next
                        </a>
                      </li>
                    </ul>
                  </nav>
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
