import React, { useEffect } from "react";
import CartSideBar from "../../views/cart-sidebar";
import Login from "../../views/auth/login";
import { toast } from "react-toastify";
import { ToastObjects } from "../../utils/toast/toastObject";
import { useDispatch, useSelector } from "react-redux";
import authServices from "../../services/authService";
import homeServices from "../../services/homeServices";
import { Link } from "react-router-dom";
const Navigation = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  useEffect(() => {
    if (!profile || Object.keys(profile).length < 1) {
      try {
        authServices.userProfile(dispatch);
      } catch (e) {
        toast.error(e, ToastObjects);
      }
    }
  }, [dispatch]);
  const checkAuth = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      return true;
    }
    return false;
  };

  // logout handler
  const handleLogout = async () => {
    try {
      localStorage.removeItem("accessToken");
      window.location.reload();
    } catch (e) {
      toast.error("Something went wrong.", ToastObjects);
    }
  };
  return (
    <div>
      <header className="header clearfix">
        <nav className="navbar navbar-light navbar-expand-lg bg-dark bg-faded osahan-menu">
          <div className="container-fluid">
            <a className="navbar-brand" href="/" style={{ color: "#fff" }}>
              Kosheli Express
            </a>
            <button
              className="navbar-toggler navbar-toggler-white"
              type="button"
              data-toggle="collapse"
              data-target="#navbarText"
              aria-controls="navbarText"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="navbar-collapse" id="navbarNavDropdown">
              <div className="navbar-nav mr-auto mt-2 mt-lg-0 margin-auto top-categories-search-main">
                <div
                  className="top-categories-search"
                  //   onSubmit={this.handleClickSearch}
                >
                  <div className="input-group">
                    <input
                      className="form-control"
                      placeholder="Search products in Your City"
                      aria-label="Search products in Your City"
                      type="text"
                      name="searchtxt"
                      //   value={searchtxt}
                      //   onChange={(e) => this.handleChange(e)}
                    />
                    <span className="input-group-btn">
                      <button
                        className="btn btn-secondary"
                        type="submit"
                        // onClick={this.handleClickSearch}
                      >
                        <i className="mdi mdi-file-find" /> Search
                      </button>
                    </span>
                  </div>
                </div>
              </div>
              <div className="my-2 my-lg-0">
                <ul className="list-inline main-nav-right">
                  <li className="list-inline-item">
                    {checkAuth() ? (
                      <>
                        <div className="dropdown">
                          <button
                            className="btn btn-account dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="mdi mdi-account-circle px-2" />
                            {profile.name}
                          </button>

                          <div
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <a className="dropdown-item" href="/account/view">
                              <i className="uil uil-apps" />
                              Dashboard
                            </a>
                            <a
                              className="dropdown-item"
                              href="/account/profile"
                            >
                              <i
                                className="mdi mdi-account-outline"
                                aria-hidden="true"
                              ></i>
                              My Profile
                            </a>
                            <a
                              className="dropdown-item"
                              href="/account/wishlist"
                            >
                              <i
                                className="mdi mdi-heart-outline"
                                aria-hidden="true"
                              ></i>
                              Wish List
                            </a>
                            <a
                              className="dropdown-item"
                              href="/account/order/list"
                            >
                              <i
                                className="mdi mdi-format-list-bulleted"
                                aria-hidden="true"
                              ></i>{" "}
                              Orders List
                            </a>
                            <div className="dropdown-divider"></div>
                            <Link
                              to="#"
                              className="dropdown-item"
                              onClick={handleLogout}
                            >
                              <i
                                className="mdi mdi-lock"
                                aria-hidden="true"
                              ></i>{" "}
                              Logout
                            </Link>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <a
                          href=""
                          data-target="#bd-example-modal"
                          data-toggle="modal"
                          className="btn btn-link"
                        >
                          <i className="mdi mdi-account-circle" /> Login/Sign Up
                        </a>
                      </>
                    )}
                  </li>
                  <li className="list-inline-item cart-btn">
                    <CartSideBar />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
      {/* login popup */}

      <Login />
    </div>
  );
};

export default Navigation;
