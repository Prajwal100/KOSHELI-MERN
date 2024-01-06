import React, { useState } from "react";
import { toast } from "react-toastify";
import { ToastObjects } from "../../utils/toast/toastObject";
import { emailIsValid } from "../../utils/helper";
import authServices from "../../services/authService";
import { useDispatch } from "react-redux";
import Register from "./register";

function Login() {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = state;
    if (!email) {
      toast.error("Email address is required.", ToastObjects);
      return;
    }
    if (!password) {
      toast.error("Password is required.", ToastObjects);
      return;
    }
    if (!emailIsValid(email)) {
      toast.error("Email address is invalid.", ToastObjects);
    }
    if (password && password.length < 6) {
      toast.error("Password must have at least 6 characters.", ToastObjects);
      return;
    }

    try {
      let res = await authServices.loginUser(
        { ...state, panel: "user" },
        dispatch
      );
      if (res && res.status) {
        window.location.href = "/";
        toast.success("User successfully logged in", ToastObjects);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong", ToastObjects);
    }
  };

  return (
    <div>
      <div className="modal fade login-modal-main" id="bd-example-modal">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="login-modal">
                <div className="row">
                  <div className="col-lg-12 pad-left-0">
                    <button
                      type="button"
                      className="close close-top-right"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">
                        <i className="mdi mdi-close" />
                      </span>
                      <span className="sr-only">Close</span>
                    </button>
                    <div className="login-modal-right">
                      {/* Tab panes */}
                      <div className="tab-content">
                        <div
                          className="tab-pane active"
                          id="login"
                          role="tabpanel"
                        >
                          <h5 className="heading-design-h5">
                            Login to your account
                          </h5>
                          <form noValidate onSubmit={handleSubmit}>
                            <fieldset className="form-group">
                              <label>Enter Email Address</label>
                              <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={state.email}
                                onChange={handleChange}
                                placeholder="Enter Email Address"
                              />
                            </fieldset>
                            <fieldset className="form-group">
                              <label>Enter Password</label>
                              <input
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="******"
                                onChange={handleChange}
                                value={state.password}
                              />
                            </fieldset>

                            <fieldset className="form-group">
                              <button
                                type="submit"
                                className="btn btn-lg btn-secondary btn-block"
                              >
                                Login to your account
                              </button>
                            </fieldset>
                          </form>
                        </div>
                        <div className="tab-pane" id="register" role="tabpanel">
                          <Register />
                        </div>
                      </div>
                      <div className="clearfix" />
                      <div className="text-center login-footer-tab">
                        <ul className="nav nav-tabs" role="tablist">
                          <li className="nav-item">
                            <a
                              className="nav-link active"
                              data-toggle="tab"
                              href="#login"
                              role="tab"
                            >
                              <i className="mdi mdi-lock" /> LOGIN
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#register"
                              role="tab"
                            >
                              <i className="mdi mdi-pencil" /> REGISTER
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="clearfix" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
