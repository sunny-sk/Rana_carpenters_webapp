import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { isAuthenticated, signOut } from "../helper/Api";
import Modal from "./Modal";
const Menu = (props) => {
  const [hide, setHide] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  let location = useLocation();
  const registerScroll = () => {
    const navbar = document.querySelector(".navbar");
    const navbarLinks = document.querySelectorAll(".nav-link");
    const pwaIcon = document.querySelector(".pwa-add-icon");
    const notiIcon = document.querySelector(".notification-icon");
    const headerBtns = document.querySelectorAll(".navbar-toggler");

    var prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        // console.log("up");
        navbar.classList.remove("navbar-up-slide");
        navbar.classList.add("navbar-down-slide");

        if (currentScrollPos !== 0) {
          navbar.classList.add("shadow");
          pwaIcon.classList.add("primary");
          notiIcon.classList.add("primary");
          navbar.classList.add("navbar-red");
          for (let i = 0; i < navbarLinks.length; i++) {
            navbarLinks[i].classList.add("primary");
          }
          for (let i = 0; i < headerBtns.length; i++) {
            headerBtns[i].classList.add("primary");
          }
        } else {
          notiIcon.classList.remove("primary");
          pwaIcon.classList.remove("primary");
          navbar.classList.remove("navbar-red");
          navbar.classList.remove("shadow");
          for (let i = 0; i < navbarLinks.length; i++) {
            navbarLinks[i].classList.remove("primary");
          }
          for (let i = 0; i < headerBtns.length; i++) {
            headerBtns[i].classList.remove("primary");
          }
        }
      } else {
        // console.log("down:", currentScrollPos);
        navbar.classList.remove("navbar-down-slide");
        navbar.classList.add("navbar-up-slide");
      }
      prevScrollpos = currentScrollPos;
    };
  };

  const registerScroll1 = () => {
    const navbar = document.querySelector(".navbar");

    navbar.classList.add("bg-primary");
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        navbar.classList.remove("navbar-up-slide");
        navbar.classList.add("navbar-down-slide");
        if (currentScrollPos !== 0) {
          navbar.classList.add("shadow");
        } else {
          navbar.classList.remove("shadow");
        }
      } else {
        navbar.classList.remove("navbar-down-slide");
        navbar.classList.add("navbar-up-slide");
      }
      prevScrollpos = currentScrollPos;
    };
  };

  useEffect(() => {
    if (location.pathname === "/") {
      registerScroll();
    } else {
      registerScroll1();
    }
  }, [location]);
  return (
    <>
      <nav className="navbar navbar-expand-lg  navbar-light bg-light">
        <div className="container">
          <div>
            {props.leftMenu ? (
              <span
                className="navbar-left-icon-c"
                onClick={() => {
                  setHide(!hide);
                }}
              >
                <i
                  className="fas fa-bars mx-2 left-menu-icon"
                  style={{
                    fontSize: "28px",
                    verticalAlign: "middle",
                    color: "white",
                  }}
                ></i>
              </span>
            ) : null}
            <Link to="/" className="navbar-brand ">
              <img
                src={require("../assets/icon.png")}
                width="35"
                height="35"
                className="d-inline-block align-top"
                alt="logo"
                loading="lazy"
              />
              &nbsp;
              <span style={{ fontSize: "20px", color: "black" }}>
                {/* Rana Carpenters */}
              </span>
            </Link>
          </div>
          <div>
            <button className="navbar-toggler" type="button" onClick={() => {}}>
              <i
                className="fas fa-mobile"
                style={{
                  fontSize: "28px",
                  verticalAlign: "middle",
                }}
              ></i>
            </button>

            <button
              className="navbar-toggler"
              type="button"
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i
                className={
                  !mobileMenuOpen
                    ? "fas fa-chevron-circle-down rotate-clock-icon"
                    : "fas fa-chevron-circle-down rotate-anticlock-icon"
                }
                style={{
                  fontSize: "28px",
                  verticalAlign: "middle",
                }}
              ></i>
            </button>
          </div>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto text-center">
              <li className="nav-item ">
                <NavLink to="/designs" className="nav-link">
                  Design
                </NavLink>
              </li>
              <li className="nav-item ">
                <NavLink to="/blogs" className="nav-link">
                  Blogs
                </NavLink>
              </li>
            </ul>
            <div className="ml-auto">
              <ul className="navbar-nav mr-auto text-center">
                {/* //header right icons */}
                <button className="btn pwa-add-icon  mx-3" type="button">
                  <i
                    className="fas fa-mobile"
                    // style={{ fontSize: "30px", color: "rgba(227, 0, 41, 1)" }}
                    style={{ fontSize: "30px" }}
                  ></i>
                </button>
                <button
                  className="btn pwa-add-icon notification-icon mx-3"
                  type="button"
                >
                  <i
                    className="far fa-bell"
                    // style={{ fontSize: "30px", color: "black" }}
                    style={{ fontSize: "30px" }}
                  ></i>
                </button>
                <li
                  className="nav-item first-link"
                  // data-toggle="collapse"
                  // data-target="#navbarSupportedContent"
                ></li>

                {!isAuthenticated() && (
                  <>
                    <li className="nav-item ">
                      <NavLink to="/dashboard/admin" className="nav-link">
                        Login
                      </NavLink>
                    </li>
                  </>
                )}
                {isAuthenticated() && (
                  <>
                    <li className="nav-item ">
                      <NavLink to="/dashboard/admin" className="nav-link">
                        Dashboard
                      </NavLink>
                    </li>
                  </>
                )}

                {isAuthenticated() && (
                  <>
                    <li
                      className="nav-item "
                      data-toggle="modal"
                      data-target="#exampleModal"
                    >
                      <a href="#!" className="nav-link">
                        Signout
                      </a>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* //signout modal */}

      <Modal
        id="exampleModal"
        ask="Are you sure?"
        yes="Signout"
        cancel="Close"
        onYes={() => {
          //add signout here
          signOut(() => {
            props.history.replace("/");
          });
        }}
      />

      {/* left menu */}

      <div
        className={
          hide ? "left-menu bg-white" : "left-menu sidebar-active bg-white"
        }
      >
        <div id="sidebar text-center">
          <br />
          <br />
          <br />

          <hr />
          <NavLink className="side-links-c" to="/dashboard/admin">
            <div className="side-links my-1">
              <span>Dashboard</span>
            </div>
          </NavLink>
          <NavLink className="side-links-c" to="/dashboard/admin/feedbacks">
            <div className="side-links my-1">
              <span>Feedbacks</span>
            </div>
          </NavLink>
          <NavLink className="side-links-c" to="/dashboard/admin/categories">
            <div className="side-links my-1">
              <span>Categories</span>
            </div>
          </NavLink>
          <NavLink className="side-links-c" to="/dashboard/admin/inventories">
            <div className="side-links my-1">
              <span>Inventories</span>
            </div>
          </NavLink>
          <NavLink className="side-links-c" to="/dashboard/admin/designs">
            <div className="side-links my-1">
              <span>Designs</span>
            </div>
          </NavLink>
          <NavLink className="side-links-c" to="/dashboard/admin/details">
            <div className="side-links my-1">
              <span>Details</span>
            </div>
          </NavLink>
          <br />
          <br />
          <br />
        </div>
      </div>

      {/* overlay */}

      <div
        onClick={() => {
          setHide(true);
        }}
        className={hide ? "overlay" : "overlay sidebar-active-overlay"}
      ></div>
    </>
  );
};

export default Menu;
