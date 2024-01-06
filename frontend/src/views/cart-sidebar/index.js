import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPLOAD_URL } from "../../config";
import { priceFormat } from "../../utils/helper";
import { Link } from "react-router-dom";
import {
  incrementCart,
  decrementCart,
  removeFromCart,
} from "../../store/actions/cartActions";
function CartSideBar() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const currency = useSelector((state) => state.home.settings).symbol;
  const subTotal = cartItems.reduce(
    (sum, i) => (sum += i.quantity * i.priceAfterDiscount),
    0
  );
  const incrementToCart = (id) => {
    dispatch(incrementCart(id));
  };

  const decrementToCart = (id) => {
    dispatch(decrementCart(id));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  // Check the auth
  function checkAuth() {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      return true;
    }
    return false;
  }
  return (
    <div>
      <span data-toggle="offcanvas" className="btn btn-link border-none">
        <i className="mdi mdi-cart" /> My Cart{" "}
        <small className="cart-value">{cartItems.length}</small>
      </span>
      <div className="cart-sidebar">
        <div className="bs-canvas-header side-cart-header p-3 ">
          <div className="d-inline-block  main-cart-title">
            My Cart <span>({cartItems.length} Items)</span>
          </div>
          <button
            type="button"
            className="bs-canvas-close close"
            data-toggle="offcanvas"
          >
            <i className="mdi mdi-close"></i>
          </button>
        </div>
        <div className="cart-sidebar-body">
          {cartItems.map((item, index) => (
            <div className="cart-item" key={index}>
              <div className="cart-product-img">
                <img
                  className="img-fluid"
                  src={UPLOAD_URL + item.image}
                  alt="cart"
                />
                {item.discount > 0 && (
                  <div className="offer-badge">
                    {priceFormat(currency, item.discount)} OFF
                  </div>
                )}
              </div>
              <div className="cart-text">
                <h4>{item.name}</h4>
                <div className="qty-group mt-5">
                  <div className="quantity buttons_added">
                    <input
                      type="button"
                      defaultValue="-"
                      className="minus minus-btn"
                      onClick={() => decrementToCart(item.id)}
                    />
                    <input
                      type="number"
                      value={item.quantity}
                      className="input-text qty text"
                      disabled
                    />
                    <input
                      type="button"
                      defaultValue="+"
                      className="plus plus-btn"
                      onClick={() => incrementToCart(item.id)}
                    />
                    <button
                      type="button"
                      className="cart-close-btn"
                      onClick={() => removeFromCartHandler(item.id)}
                    >
                      <i className="mdi mdi-close" />
                    </button>
                  </div>
                  <div className="cart-item-price">
                    {priceFormat(
                      currency,
                      item.quantity * item.priceAfterDiscount
                    )}
                    <span>
                      {priceFormat(currency, item.quantity * item.price)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-sidebar-footer">
          <div className="cart-store-details">
            <p>
              Sub Total{" "}
              <strong className="float-right">
                {priceFormat(currency, subTotal)}
              </strong>
            </p>
            <p>
              Delivery Charges{" "}
              <strong className="float-right text-danger">
                + {priceFormat(currency, 0)}
              </strong>
            </p>
            <h6>
              Your total savings{" "}
              <strong className="float-right text-danger">
                {priceFormat(currency, subTotal)}
              </strong>
            </h6>
          </div>
          {checkAuth() ? (
            <>
              <Link to={{ pathname: "/checkout" }}>
                <button
                  data-toggle="offcanvas"
                  className="btn btn-secondary btn-lg btn-block text-left"
                  type="button"
                >
                  <span className="float-left">
                    <i className="mdi mdi-cart-outline" /> Proceed to Checkout{" "}
                  </span>
                  <span className="float-right">
                    <strong>{priceFormat(currency, subTotal)}</strong>{" "}
                    <span className="mdi mdi-chevron-right" />
                  </span>
                </button>
              </Link>{" "}
            </>
          ) : (
            <>
              <button
                data-target="#bd-example-modal"
                data-toggle="modal"
                className="btn btn-secondary btn-lg btn-block text-left"
                type="button"
              >
                <span className="float-left">
                  <i className="mdi mdi-cart-outline" /> Proceed to Checkout{" "}
                </span>
                <span className="float-right">
                  <strong>{priceFormat(currency, subTotal)}</strong>{" "}
                  <span className="mdi mdi-chevron-right" />
                </span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartSideBar;
