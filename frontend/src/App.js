import React, { Component, Suspense } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Toast from "./utils/toast/toast";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./views/home";
import SingleProduct from "./views/product-details";
import ProductCategory from "./views/product-category";
import Checkout from "./views/checkout";
import ConfirmOrder from "./views/checkout/complete";
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);
// Check the auth
function checkAuth() {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    return true;
  }
  return false;
}
function App() {
  return (
    <>
      <Toast />

      <BrowserRouter>
        <Header />

        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/" name="home page" element={<Home />} />
            <Route
              exact
              path="/product/:slug/:id"
              element={<SingleProduct />}
            />
            <Route
              exact
              path="/category/:slug/:id"
              element={<ProductCategory />}
            />
            <Route
              exact
              path="/checkout"
              name="checkout page"
              element={<Checkout />}
            />

            {/* Order success */}
            <Route
              exact
              path="/order/success"
              name="Order success"
              element={<ConfirmOrder />}
            />
          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
