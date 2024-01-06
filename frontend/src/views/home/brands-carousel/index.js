import React, { useEffect } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import homeServices from "../../../services/homeServices";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ToastObjects } from "../../../utils/toast/toastObject";
import { UPLOAD_URL } from "../../../config";
function BrandSlider() {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
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
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  const dispatch = useDispatch();
  let brands = useSelector((state) => state.home.brands);
  useEffect(() => {
    const getBrands = async () => {
      try {
        await homeServices.getHomeBrands(dispatch);
      } catch (e) {
        toast.error(e.message, ToastObjects);
      }
    };
    getBrands();
  }, [dispatch]);

  return (
    <div style={{ background: "#fff" }}>
      <div className="container" id="header-category-bk">
        <div className="section-header">
          <h5 className="heading-design-h5">All Brands</h5>
        </div>
        <Slider {...settings}>
          {brands &&
            brands.length > 0 &&
            brands.map((brand, index) => (
              <div className="item" key={index}>
                <div className="category-item">
                  <Link
                    to={{
                      pathname: ``,
                    }}
                  >
                    <img
                      className="img-fluid"
                      src={UPLOAD_URL + brand.logo}
                      alt={brand.name}
                    />
                    <h6>{brand.name}</h6>
                  </Link>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
}

export default BrandSlider;
