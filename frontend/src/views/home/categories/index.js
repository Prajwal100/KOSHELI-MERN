import React, { useEffect } from "react";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ToastObjects } from "../../../utils/toast/toastObject";
import homeServices from "../../../services/homeServices";
import { UPLOAD_URL } from "../../../config";
import { Link } from "react-router-dom";
function CategorySlider() {
  const dispatch = useDispatch();
  let categories = useSelector((state) => state.home.categories);
  if (categories.length > 0) {
    categories = categories.slice(0, 4);
  }
  useEffect(() => {
    const getCategories = async () => {
      try {
        await homeServices.getHomeCategories(dispatch);
      } catch (e) {
        toast.error(e.message, ToastObjects);
      }
    };
    getCategories();
  }, [dispatch]);
  return (
    <div style={{ background: "#fff" }}>
      <div className="container" id="header-category-bk">
        <div className="section-header">
          <h5 className="heading-design-h5">Top Categories</h5>
        </div>
        <div className="row ">
          {categories &&
            categories.length > 0 &&
            categories.map((category, index) => (
              <div className="col-12 col-md-3 " key={index}>
                <div className="single_catagory mt-50">
                  <Link
                    to={{
                      pathname: `/category/${category.slug}/${category._id}`,
                      state: category,
                    }}
                    className="best-offer-item"
                  >
                    <img src={UPLOAD_URL + category.image} alt="Laptop" />
                  </Link>
                  <h5>
                    <Link
                      to={{
                        pathname: `/category/${category.slug}/${category._id}`,
                        state: category,
                      }}
                    >
                      {category.name}
                    </Link>
                  </h5>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default CategorySlider;
