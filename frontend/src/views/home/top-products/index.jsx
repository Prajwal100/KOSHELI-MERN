import React, { useState,useEffect } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import homeServices from "../../../services/homeServices";
import { toast } from "react-toastify";
import { ToastObjects } from "../../../utils/toast/toastObject";
import { UPLOAD_URL } from "../../../config";
import { addToCart } from "../../../store/actions/cartActions";
function TopProducts() {
  const [quantity,setQuantity]=useState(1);
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.home.settings).symbol;
  let products = useSelector((state) => state.home.topProducts);

  useEffect(() => {
    const getCategories = async () => {
      try {
        await homeServices.getHomeTopProducts(dispatch);
      } catch (e) {
        toast.error(e.message, ToastObjects);
      }
    };
    getCategories();
  }, [dispatch]);
  
  const addToCartHandler= (id) => {
    console.log(id);
    dispatch(addToCart(id,quantity));
  }

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      {/* New Item slider */}
      <section className="product-items-slider section-padding">
        <div className="container" id="header-category-bk">
          <div className="section-header">
            <h5 className="heading-design-h5">
              Top Products
              <Link to="">
                <span className="float-right text-secondary">View All</span>
              </Link>
            </h5>
          </div>
          <Slider {...settings}>
            {products &&
              products.length > 0 &&
              products.map((product,index) => (
                  <div className="item" key={index}>
                    <div className="product">
                      <Link to={{ pathname:`/product/${product.slug}/${product._id}`,state:product }}>
                        <div className="product-header">
                          {product && product.discount > 0 && (
                            <span className="badge badge-success">
                              {currency}
                              {product.discount} OFF
                            </span>
                          )}
                          <img
                            className="img-fluid"
                            src={UPLOAD_URL + product.thumbnailImage}
                            alt="product"
                          />
                        </div>
                        <div className="product-body">
                          <h5>{product.name}</h5>
                          <h6>
                            <strong>
                              <span className="mdi mdi-approval" /> Available in
                            </strong>{" "}
                            - {product.quantity}
                          </h6>
                        </div>
                      </Link>
                      <div className="product-footer">
                        <button
                        onClick={()=>addToCartHandler(product._id)}
                          type="button"
                          className="btn btn-secondary btn-sm float-right"
                        >
                          <i className="mdi mdi-cart-outline" /> Add To Cart
                        </button>
                        <p className="offer-price mb-0">
                          {currency}
                          {product.priceAfterDiscount}{" "}
                          <i className="mdi mdi-tag-outline" />
                          <br />
                          <span className="regular-price">
                            {currency}
                            {product.price}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
              ))}
          </Slider>
        </div>
      </section>

      {/* End New item slider */}
    </div>
  );
}

export default TopProducts;
