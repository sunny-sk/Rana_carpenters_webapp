import React, { useEffect, useState } from "react";
import "../App.css";
import { getProductDetails } from "../helper/Api";
import Menu from "../components/Menu";
import Loader from "../components/Loader";
import Url from '../constants/Url'
const BASE_IMG_URL = Url._imageBase;
 
function DesignDetail(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState({
    id: undefined,
    createdAt: undefined,
    title: "",
    description: "",
    mainImgUrl: "",
    moreImages: [],
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const onChnageActiveImg = (imgUrl, i) => {
    setDetails({ ...details, mainImgUrl: imgUrl });
    setActiveIndex(i);
  };

  const fetchDesignDetails = async (id) => {
    try {
      setIsLoading(true);
      const response = await getProductDetails(id);
      setIsLoading(false);
      console.log(response);
      if (response.success) {
        const { product } = response;
        let more_images = [];
        if (product.more_images.length > 0) {
          product.more_images.map((e, i) => {
            more_images.push(e.imgUrl);
            return 1;
          });
        }

        setDetails({
          title: product.title,
          createdAt: `${new Date(product.createdAt).getDate()}/${new Date(
            product.createdAt
          ).getMonth()}/${new Date(product.createdAt).getFullYear()}`,
          mainImgUrl: product.imgUrl,
          description: product.description,
          id: product._id,
          moreImages: [product.imgUrl, ...more_images],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const { designId } = props.match.params;
    fetchDesignDetails(designId);
  }, [props.match.params]);
  return (
    <>
      <Menu signout={true} loggedIn={false} {...props} leftMenu={false} />
      <br />

      <div className="page">
        {isLoading ? (
          <>
            <br />
            <br />
            <br />
            <br />
            <Loader />
          </>
        ) : (
          <>
            {details.id ? (
              <>
                <div className="img_container">
                  <div className="img_box">
                    <img
                      className="img-fluid"
                      src={BASE_IMG_URL + "/" + details.mainImgUrl}
                      alt=""
                    />
                  </div>
                  <div className="mobile-view-bottom-box">
                    {details.moreImages.length > 0 &&
                      details.moreImages.map((e, i) => {
                        return (
                          <div className="sub_images_container" key={i}>
                            <div
                              className={
                                activeIndex === i
                                  ? "sub_images sub_images_active"
                                  : "sub_images"
                              }
                            >
                              <img src={BASE_IMG_URL + "/" + e} alt="" />
                            </div>
                            <div
                              className="sub_images_overlay "
                              onClick={() => {
                                onChnageActiveImg(e, i);
                              }}
                            >
                              <p>{i + 1}</p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
                <br />
                <div className="line"></div>
                <div className="content_container">
                  <div className="my-3 text-center">
                    <a
                      rel="noopener noreferrer"
                      target="_blank"
                      href={
                        BASE_IMG_URL + "/" + details.moreImages[activeIndex]
                      }
                      download="myImage"
                    >
                      View full size
                    </a>
                  </div>

                  <div className="container mt-3">
                    <h4 className="content_title">{details.title}</h4>
                    <p className="content_date">{details.createdAt}</p>
                    <p className="content_description my-3">
                      {details.description}
                    </p>
                  </div>
                </div>
                <br />
                <br />
              </>
            ) : (
              <>
                <div className="container text-center">
                  <br />
                  <br />
                  <p className="lead">Designs Not-Found</p>
                  <br />
                  <div className="text-center" style={{ height: "250px" }}>
                    <img
                      src={require("../assets/undraw_empty1.svg")}
                      style={{ height: "100%", width: "100%" }}
                      alt=""
                    />
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default DesignDetail;
