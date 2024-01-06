import React, { useState } from "react";
import { toast } from "react-toastify";
import { ToastObjects } from "../../utils/toast/toastObject";
import { emailIsValid, validateForm } from "../../utils/helper";
import authServices from "../../services/authService";
import { useDispatch } from "react-redux";

function Register() {
  const dispatch = useDispatch();
  const [isAggreed, setIsAggreed] = useState(false);
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const initialFormErrors = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [errors, setErrors] = useState(initialFormErrors);
  const validateInputs = () => {
    const { name, email, password, confirmPassword } = state;

    const err = { ...errors };
    err.name = !name ? "Name field is required" : "";
    err.email = !email
      ? "Email field is required."
      : !emailIsValid(email)
      ? "Email is invalid"
      : "";
    err.password = !password
      ? "Password field is required"
      : password.length < 6
      ? "Password must be at least 6 characters."
      : "";
    err.confirmPassword = !confirmPassword
      ? "Confirm Password field is required"
      : confirmPassword.length < 6
      ? "Confirm Password must be at least 6 characters."
      : password !== confirmPassword
      ? "Password does not match."
      : "";
    setErrors({ ...err });
    return validateForm(err);
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log('before')
    if (validateInputs()) {
console.log('after')
        
      try {
        let res = await authServices.registerUser(
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
    }
  };

  return (
    <div>
      <h5 className="heading-design-h5">Register Now!</h5>
      <form noValidate onSubmit={handleSubmit}>
        <fieldset className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Enter full name"
            onChange={handleChange}
          />
          {errors && errors.name.length > 0 && (
            <div className="text-danger">{errors.name}</div>
          )}
        </fieldset>
        <fieldset className="form-group">
          <label>Email Address</label>
          <input
            type="text"
            className="form-control"
            name="email"
            placeholder="Enter email address"
            onChange={handleChange}
          />
          {errors && errors.email.length > 0 && (
            <div className="text-danger">{errors.email}</div>
          )}
        </fieldset>

        <div className="row">
          <div className="col-md-6">
            <fieldset className="form-group">
              <label>Enter Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={handleChange}
              />
              {errors && errors.password.length > 0 && (
                <div className="text-danger">{errors.password}</div>
              )}
            </fieldset>
          </div>
          <div className="col-md-6">
            <fieldset className="form-group">
              <label>Enter Confirm Password </label>
              <input
                type="password"
                className="form-control"
                placeholder="********"
                name="confirmPassword"
                onChange={handleChange}
              />
              {errors && errors.confirmPassword.length > 0 && (
                <div className="text-danger">{errors.confirmPassword}</div>
              )}
            </fieldset>
          </div>
        </div>

        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            onChange={(e) => setIsAggreed(e.target.checked)}
            className="custom-control-input"
            name="aggrement"
            id="customCheck2"
          />
          <label className="custom-control-label" htmlFor="customCheck2">
            I Agree with <a href="#">Term and Conditions</a>
          </label>
        </div>
        <fieldset className="form-group">
          <button
            disabled={!isAggreed}
            type="submit"
            className="btn btn-lg btn-secondary btn-block"
          >
            Create Your Account
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default Register;
