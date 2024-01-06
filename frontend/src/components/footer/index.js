import { Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UPLOAD_URL } from "../../config";
import http from "../../services/api";
import { ToastObjects } from "../../utils/toast/toastObject";
import { useDispatch, useSelector } from "react-redux";
import homeServices from "../../services/homeServices";
function Footer() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.home.settings);
  let categories = useSelector((state) => state.home.categories);
  if (categories.length > 0) {
    categories = categories.slice(0, 6);
  }
  useEffect(() => {
    const getSettings = async () => {
      try {
        await homeServices.getHomeSettings(dispatch);
      } catch (error) {
        toast.error(error.message, ToastObjects);
      }
    };
    getSettings();
  }, []);
  return (
    <div>
      {/* Footer */}
      <section className="section-padding bg-white border-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-sm-6">
              <div className="feature-box">
                <i className="mdi mdi-truck-fast" />
                <h6>Free &amp; Next Day Delivery</h6>
                <p>Lorem ipsum dolor sit amet, cons...</p>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="feature-box">
                <i className="mdi mdi-basket" />
                <h6>100% Satisfaction Guarantee</h6>
                <p>Rorem Ipsum Dolor sit amet, cons...</p>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="feature-box">
                <i className="mdi mdi-tag-heart" />
                <h6>Great Daily Deals Discount</h6>
                <p>Sorem Ipsum Dolor sit amet, Cons...</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding footer bg-white border-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-3">
              <h4 className="mb-5 mt-0">
                <Link className="logo" to="/">
                  <img
                    src={UPLOAD_URL + settings.logo}
                    alt={settings.site_name}
                  />
                </Link>
              </h4>
              <p className="mb-0">
                <Link to="#" className="text-dark">
                  <i className="mdi mdi-phone" /> {settings.phone}
                </Link>
              </p>
              <p className="mb-0">
                <Link to="#" className="text-dark">
                  <i className="mdi mdi-gmail" /> {settings.email}
                </Link>
              </p>
              <p className="mb-0">
                <Link to="#" className="text-dark">
                  <i className="mdi mdi-map-marker" /> {settings.address}
                </Link>
              </p>
            </div>
            <div className="col-lg-2 col-md-2">
              <h6 className="mb-4">INFORMATION </h6>
              <ul className="footer-list">
                <li>
                  <a href="#"> Your Account</a>
                </li>
                <li>
                  <a href="#"> Free Shipping Policy</a>
                </li>
                <li>
                  <a href="#"> Your Cart</a>
                </li>
                <li>
                  <a href="#"> Return Policy</a>
                </li>
                <li>
                  <a href="#">Free Coupon</a>
                </li>
                <ul></ul>
              </ul>
            </div>
            <div className="col-lg-2 col-md-2">
              <h6 className="mb-4">CATEGORIES</h6>
              <ul className="footer-list">
                {categories &&
                  categories.length > 0 &&
                  categories.map((category, index) => (
                    <li key={index}>
                      <a href="#">{category.name}</a>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="col-lg-2 col-md-2">
              <h6 className="mb-4">CUSTOMER CARE</h6>
              <ul className="footer-list">
                <li>
                  <a href="#">Payment Method</a>
                </li>
                <li>
                  <a href="#">Help</a>
                </li>
                <li>
                  <a href="#">Product Support</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Terms & Conditions</a>
                </li>
                <ul></ul>
              </ul>
            </div>
            <div className="col-lg-3 col-md-3">
              <h6 className="mb-4">Download App</h6>
              <div className="app">
                <a href="#">
                  <img src="img/google.png" alt="" />
                </a>
                <a href="#">
                  <img src="img/apple.png" alt="" />
                </a>
              </div>
              <h6 className="mb-3 mt-4">GET IN TOUCH</h6>
              <div className="footer-social">
                <a
                  className="btn-facebook mx-1"
                  href={settings.facebookUrl}
                  target="_blank"
                >
                  <i className="mdi mdi-facebook" />
                </a>

                <a
                  className="btn-twitter mx-1"
                  href={settings.twitterUrl}
                  target="_blank"
                >
                  <i className="mdi mdi-twitter" />
                </a>
                <a
                  className="btn-linkedin mx-1"
                  href={settings.linkedinUrl}
                  target="_blank"
                >
                  <i className="mdi mdi-linkedin" />
                </a>
                <a
                  className="btn-instagram mx-1"
                  href={settings.instagramUrl}
                  target="_blank"
                >
                  <i className="mdi mdi-instagram" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Footer */}
      {/* Copyright */}
      <section className="pt-4 pb-4 footer-bottom">
        <div className="container">
          <div className="row no-gutters">
            <div className="col-lg-6 col-sm-6">
              <p className="mt-1 mb-0">
                © Copyright {new Date().getFullYear()}
                <strong className="text-dark"></strong>
                . All Rights Reserved
                <br />
                <small className="mt-0 mb-0">
                  Made with <i className="mdi mdi-heart text-danger" />
                  by{" "}
                  <a href="https://github.com/Prajwal100" target="_blank">
                    Prajwal R.
                  </a>
                </small>
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* End Copyright */}
    </div>
  );
}

export default Footer;
