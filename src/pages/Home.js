import React, { useRef, useEffect } from "react";
import Footer from "../components/Footer";
import "../Landing.css";
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
            href="https:www.google.com"
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
        <div className="row">
          <div className="col-sm-4">
            <p>We have 20+ years hands on Experience.</p>
          </div>
          <div className="col-sm-4">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Explicabo, nostrum impedit reprehenderit error dicta temporibus
              eligendi doloremque quaerat porro nemo quasi nulla libero placeat
              accusamus ut! Excepturi, quidem. Sint asperiores incidunt
              assumenda autem maiores aspernatur tenetur corrupti, quibusdam,
              velit sit cumque est necessitatibus pariatur labore impedit harum
              nemo, magni omnis tempore at dignissimos officiis. Error corrupti
            </p>
          </div>
          <div className="col-sm-4">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Explicabo, nostrum impedit reprehenderit error dicta temporibus
              eligendi doloremque quaerat porro nemo quasi nulla libero placeat
              accusamus ut! Excepturi, quidem. Sint asperiores incidunt
              assumenda autem maiores aspernatur tenetur corrupti, quibusdam,
              velit sit cumque est necessitatibus pariatur labore impedit harum
              nemo, magni omnis tempore at dignissimos officiis. Error corrupti
            </p>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <p>We have 20+ years hands on Experience.</p>
          </div>
          <div className="col-sm-4">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Explicabo, nostrum impedit reprehenderit error dicta temporibus
              eligendi doloremque quaerat porro nemo quasi nulla libero placeat
              accusamus ut! Excepturi, quidem. Sint asperiores incidunt
              assumenda autem maiores aspernatur tenetur corrupti, quibusdam,
              velit sit cumque est necessitatibus pariatur labore impedit harum
              nemo, magni omnis tempore at dignissimos officiis. Error corrupti
            </p>
          </div>
          <div className="col-sm-4">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Explicabo, nostrum impedit reprehenderit error dicta temporibus
              eligendi doloremque quaerat porro nemo quasi nulla libero placeat
              accusamus ut! Excepturi, quidem. Sint asperiores incidunt
              assumenda autem maiores aspernatur tenetur corrupti, quibusdam,
              velit sit cumque est necessitatibus pariatur labore impedit harum
              nemo, magni omnis tempore at dignissimos officiis. Error corrupti
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
