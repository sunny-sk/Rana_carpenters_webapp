import React, { useRef, useEffect } from "react";
import Footer from "../components/Footer";
import "../css/Landing.css";
import Menu from "../components/Menu";

const Home = (props) => {
  const landing = useRef(null);
  let landingPageImageInterval = undefined;
  const onChangingBackImage = () => {
    const images = [
      require("../assets/landing_2_1.jpg"),
      require("../assets/landing_1_2.jpg"),
      require("../assets/landing_3_1.jpg"),
    ];
    landingPageImageInterval = setInterval(() => {
      const random = Math.floor(Math.random() * Math.floor(3));
      if (landing) {
        landing.current.style.backgroundImage = `url(${images[random]})`;
      }
    }, [2000]);
  };

  useEffect(() => {
    onChangingBackImage();
    return () => clearInterval(landingPageImageInterval);
  }, [landingPageImageInterval, onChangingBackImage]);
  return (
    <>
      <Menu signout={true} loggedIn={false} {...props} leftMenu={false} />
      <div ref={landing} className="landing">
        <div className="landing-overlay"></div>
        <div className="landing-content">
          <h3>RANA CARPENTERS</h3>
          <p>Furnish your home with us</p>
          <a
            href="https://play.google.com/store/apps/details?id=com.ranacarpenters.ranacarpenters"
            className="btn btn-light app-download-btn primary"
          >
            <i className="fab fa-google-play"></i> DOWNLOAD APP
          </a>
        </div>
        <div className="down-arrow">
          <i className="fas fa-angle-down"></i>
        </div>
      </div>
      <br />
      <br />
      <div className="container">
        <div className="text-center">
          <h2>OUR SPECIALITY</h2>
        </div>
        <br />
        <div className="row">
          <div className="col-sm-4 mt-3 text-center">
            <div className="custom-card p-3">
              <h3 className="my-3">20+ experience</h3>
              <p>We have more then 20+ years of experience.</p>
            </div>
          </div>
          <div className="col-sm-4 mt-3 text-center">
            <div className="custom-card p-3">
              <h3 className="my-3">Modern Designs</h3>
              <p>
                we work with all modern designs that you see in other
                furnitures. we also work with mostly all modern kitchen and
                other related fittings
              </p>
            </div>
          </div>
          <div className="col-sm-4 mt-3 text-center">
            <div className="custom-card p-3">
              <h3 className="my-3">Fastest</h3>
              <p>
                We care about your time. we try to furnish your home in minimum
                time span
              </p>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />

      {/* <div className="container">
        <div className="text-center">
          <h2>MEET OUR CREATORS</h2>
        </div>
      </div> */}

      <br />
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
};

export default Home;
