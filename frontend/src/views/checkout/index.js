import React, { useState } from "react";
import DeliveryDetails from "./delivery";
import { useSelector, useDispatch } from "react-redux";
import { priceFormat } from "../../utils/helper";
import { UPLOAD_URL } from "../../config";
import { toast } from "react-toastify";
import { ToastObjects } from "../../utils/toast/toastObject";
import http from "../../services/api";
import { useNavigate } from "react-router-dom";
import { cartReset } from "../../store/actions/cartActions";
import StripeCheckout from "react-stripe-checkout";
function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.user.profile);
  const { cartItems } = useSelector((state) => state.cart);
  const currency = useSelector((state) => state.home.settings).symbol;
  const subTotal = cartItems.reduce(
    (sum, item) => (sum += item.quantity * item.priceAfterDiscount),
    0
  );
  const [state, setState] = useState({
    shippingAddress: "",
    paymentMethod: "",
  });
  const handleDeliveryAddress = (value) => {
    setState({ shippingAddress: value });
  };

  const handleRadioChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    const { shippingAddress, paymentMethod } = state;
    let orderId = Math.floor(
      Math.random() * Math.floor(Math.random() * Date.now())
    );

    let data = {
      customerId: customer._id,
      paymentMethod: paymentMethod,
      orderId: orderId,
      shippingAddress: shippingAddress,
      orderPrice: subTotal,
      totalPrice: subTotal,
      shippingPrice: 0,
      cart: cartItems,
      note: "",
      discount: 0,
    };
    try {
      let res = await http.post("/api/v1/user/order/place", data);
      if (res && res.status) {
        dispatch(cartReset());
        navigate("/order/success", { replace: true });
      }
    } catch (e) {
      toast.error("Something went wrong. Please try again.", ToastObjects);
    }
  };

  const onToken = (token) => {
    setState({
      shippingAddress: {
        name: token.card.name,
        phone: "",
        country: token.card.address_country,
        postalCode: token.card.address_zip,
        address: token.card.address_line1,
      },
    });
    const makePayment = async () => {
      const { shippingAddress } = state;
      let orderId = Math.floor(
        Math.random() * Math.floor(Math.random() * Date.now())
      );

      let data = {
        customerId: customer._id,
        paymentMethod: "stripe",
        orderId: orderId,
        shippingAddress: shippingAddress,
        orderPrice: subTotal,
        totalPrice: subTotal,
        shippingPrice: 0,
        cart: cartItems,
        note: "",
        discount: 0,
      };
      try {
        let res = await http.post("/api/v1/user/order/place", data);
        if (res && res.status) {
          dispatch(cartReset());
          navigate("/order/success", { replace: true });
        }
      } catch (e) {
        toast.error("Something went wrong. Please try again.", ToastObjects);
      }
    };
    makePayment();
  };
  return (
    <div>
      <section className="pt-3 pb-3 page-info section-padding border-bottom bg-white single-product-header-bk">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <a href="/">
                <strong>
                  <span class="mdi mdi-home"></span> Home
                </strong>
              </a>{" "}
              <span class="mdi mdi-chevron-right"></span> <a>Checkout</a>
            </div>
          </div>
        </div>
      </section>

      <section className="checkout-page section-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="checkout-step">
                <div className="accordion" id="accordionExample">
                  <div className="card checkout-step-one">
                    <div className="card-header" id="headingOne">
                      <h5 className="mb-0">
                        <button
                          className="btn btn-link checkout-login-bk"
                          disabled
                        >
                          <span className="number">1</span> Login{" "}
                          <span className="mdi mdi-checkbox-marked-circle-outline"></span>
                        </button>
                        <div className="_2jDL7w">
                          <div>
                            <span className="dNZmcB">{customer.name} </span>
                            <span className="_3MeY5j">{customer.email}</span>
                          </div>
                        </div>
                      </h5>
                    </div>
                  </div>
                  <div className="card checkout-step-two">
                    <div className="card-header" id="headingTwo">
                      <h5 className="mb-0">
                        <button
                          className="btn btn-link collapsed"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          <span className="number">2</span> Delivery Address
                        </button>
                      </h5>
                    </div>
                    <div
                      id="collapseTwo"
                      className="collapse show"
                      aria-labelledby="headingTwo"
                      data-parent="#accordionExample"
                    >
                      <DeliveryDetails
                        onSelectDeliveryAddress={handleDeliveryAddress}
                      />
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header" id="headingThree">
                      <h5 className="mb-0">
                        <button
                          className="btn btn-link collapsed"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          <span className="number">3</span> Payment
                        </button>
                      </h5>
                    </div>
                    <div
                      id="collapseThree"
                      className="collapse"
                      aria-labelledby="headingThree"
                      data-parent="#accordionExample"
                    >
                      <div className="checkout-step-body">
                        <div className="payment_method-checkout">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="rpt100">
                                <ul className="radio--group-inline-container_1">
                                  <li>
                                    <div className="radio-item_1">
                                      <input
                                        id="cashondelivery"
                                        value="cod"
                                        name="paymentMethod"
                                        type="radio"
                                        onChange={handleRadioChange}
                                      />
                                      <label
                                        htmlFor="cashondelivery"
                                        className="radio-label_1"
                                      >
                                        Cash on Delivery
                                      </label>
                                    </div>
                                  </li>
                                  <StripeCheckout
                                    name="Kosheli Express"
                                    image="https://firebasestorage.googleapis.com/v0/b/mern-ecommerce-5b054.appspot.com/o/cart.png?alt=media&token=ccfcfabc-f6c5-41ba-9991-b0a2911ec44a"
                                    billingAddress
                                    shippingAddress
                                    description={`Your total is ${priceFormat(
                                      currency,
                                      subTotal
                                    )}`}
                                    amount={subTotal * 100}
                                    token={onToken}
                                    stripeKey="pk_test_51Ivb1EKWmcMvWMrc8zHdmMdktWv8bAbywxvdNS2TzzJgq93J0u9lao33b4ScCEl3pkViZUDY9Py1JuI1uDfKtKna00a9D3UDcJ"
                                  >
                                    <li>
                                      <div className="radio-item_1">
                                        <input
                                          value="stripe"
                                          name="paymentMethod"
                                          type="radio"
                                        />
                                        <label
                                          htmlFor="card1"
                                          className="radio-label_1"
                                        >
                                          Stripe
                                        </label>
                                      </div>
                                    </li>
                                  </StripeCheckout>
                                </ul>
                              </div>
                              <button
                                className="next-btn16 hover-btn"
                                onClick={handlePlaceOrder}
                              >
                                Confirm Order
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <h5 className="card-header">
                  My Cart{" "}
                  <span className="text-secondary float-right">
                    ({cartItems.length} item)
                  </span>
                </h5>
                <div className="card-body pt-0 pr-0 pl-0 pb-0">
                  {cartItems.map((item, index) => (
                    <div className="cart-list-product" key={index}>
                      <img
                        className="img-fluid"
                        src={UPLOAD_URL + item.image}
                        alt="cart"
                      />
                      {item.discount > 0 && (
                        <span className="badge badge-success">
                          {item.discount}% OFF
                        </span>
                      )}
                      <h5>{item.name}</h5>
                      <h6>
                        <strong>
                          <span className="mdi mdi-approval" /> Available in
                        </strong>{" "}
                        - {item.quantity}
                      </h6>
                      <p className="offer-price mb-0">
                        {priceFormat(
                          currency,
                          item.quantity + "*" + item.priceAfterDiscount
                        )}{" "}
                        <i className="mdi mdi-tag-outline" />{" "}
                        <span className="regular-price">
                          {priceFormat(currency, item.price)}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
                <div className="total-checkout-group">
                  <div className="cart-total-dil">
                    <h4>Sub Total</h4>
                    <span>{priceFormat(currency, subTotal)}</span>
                  </div>
                  <div className="cart-total-dil pt-3">
                    <h4>Delivery Charges</h4>
                    <span>{priceFormat(currency, 0)}</span>
                  </div>
                </div>
                <div className="cart-total-dil saving-total ">
                  <h4>Total Saving</h4>
                  <span>{priceFormat(currency, 0)}</span>
                </div>
                <div className="main-total-cart">
                  <h2>Total</h2>
                  <span>{priceFormat(currency, subTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Checkout;
