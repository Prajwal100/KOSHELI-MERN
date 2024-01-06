import React, { Component } from "react";
import BannerSlider from "../home/banner-carousel";
import Categories from "../home/categories";
import Brands from "./brands-carousel";
import TopProduct from "../home/top-products";
// import Bestofferbanner from "./best-offers-banner";
// import Topstample from "./top-stample";

export default class Home extends Component {
  render() {
    return (
      <div className="wrapper">
        <BannerSlider />
        <Categories />
        <Brands />
        <TopProduct />
      </div>
    );
  }
}
