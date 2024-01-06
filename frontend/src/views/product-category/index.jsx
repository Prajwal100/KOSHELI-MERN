import React, { useState, useEffect } from "react";
import FilterCategorySidebar from "./FilterSidebar";
import "./index.css";
import { useMatch, Link } from "react-router-dom";
import http from "../../services/api";
import { UPLOAD_URL } from "../../config";
import { useSelector, useDispatch } from "react-redux";
import { priceFormat } from "../../utils/helper";
import { addToCart } from "../../store/actions/cartActions";
function ProductCategory() {
    const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState();
//   const [filters,setFilters]=useState({});
  const [sort,setSort]=useState('newest')

  const [catId, setCatId] = useState();
  const match = useMatch("category/:slug/:id");
  const currency = useSelector((state) => state.home.settings).symbol;
  
//   useEffect(() => {
//     setFilteredProducts(
//         products.filter((item)=>
//         Object.entries(filters).every(([key,value])=>
//         item[key].includes(value)))
//     )
//   },[products,filters])
  useEffect(() => {
    if (match) {
      setCatId(match.params.id);
    }
  }, [match]);
  useEffect(() => {
    const getProductsByCat = async () => {
      try {
        const res = await http.get(`/api/v1/home/product-by-category/${catId}`);
        if (res && res.status) {
          setProducts(res.data);
        }
      } catch (e) {
        console.error(e);
      }
    };

    const getCategory = async () => {
      try {
        const res = await http.get(`/api/v1/home/category/${catId}`);
        if (res && res.status) {
          setCategory(res.data);
        }
      } catch (e) {
        console.error(e);
      }
    };

    getProductsByCat();
    getCategory();
  }, [catId]);
  
//   const handleFilter=(e)=>{
//     const value = e.target.value;
//     setFilters({
//         ...filters,
//         [e.target.name]:value.toLowerCase()
//     });
//   }
useEffect(() => {
    if(sort==="newest"){
        setFilteredProducts((prev)=>
        [...products].sort((a,b)=>a.createdAt - b.createdAt)
        )
    }
    if(sort==="priceAsc"){
        setFilteredProducts((prev)=>
        [...products].sort((a,b)=>a.priceAfterDiscount - b.priceAfterDiscount)
        )
    }
    
    if(sort==="priceDec"){
        setFilteredProducts((prev)=>
        [...products].sort((a,b)=>b.priceAfterDiscount - a.priceAfterDiscount)
        )
    }
    if(sort==="alphaAsc"){
        setFilteredProducts((prev)=>
        [...products].sort((a,b)=>a.title > b.title ? 1 : -1)
        )
    }
    if(sort==="alphaDesc"){
        setFilteredProducts((prev)=>
        [...products].sort((a,b)=>a.title > b.title ? -1 : 1)
        )
    }
},[sort,products])
  const addToCartHandler = (id) => {
    dispatch(addToCart(id, 1));
  };
  return (
    <div>
      <section className="pt-3 pb-3 page-info section-padding border-bottom bg-white single-product-header-bk">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/">
                <strong>
                  <span className="mdi mdi-home" /> Home
                </strong>
              </Link>{" "}
              <span className="mdi mdi-chevron-right" />{" "}
              <Link to="#">{category && category.name}</Link>{" "}
            </div>
          </div>
        </div>
      </section>

      {/* All product */}
      <div className="all-product-grid">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="product-top-dt">
                <div className="product-left-title">
                  <h2>All Products</h2>
                </div>
                {/* <FilterCategorySidebar /> */}
                <div className="product-sort">
                  <select className="form-control" onChange={(e)=>setSort(e.target.value)}>
                    <option className="item" value="">
                      Sort by Products
                    </option>
                    <option className="item" value="priceAsc">
                      Price - Low to High
                    </option>
                    <option className="item" value="priceDec">
                      Price - High to Low
                    </option>
                    <option className="item" value="alphaAsc">
                      Alphabetical Ascending
                    </option>
                    
                    <option className="item" value="alphaDesc">
                      Alphabetical descending
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End product */}
      {/* product section */}
      <section className="shop-list section-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                {filteredProducts &&
                  filteredProducts.length > 0 &&
                  filteredProducts.slice(0,8).map((product,index) => (
                    <div className="col-md-3" key={index}>
                      <div className="item">
                        <div className="product">
                          <Link
                            to={{
                              pathname: `/product/${product.slug}/${product._id}`,
                              state: product,
                            }}
                          >
                            <div className="product-header">
                              {product.discount && (
                                <span className="badge badge-success">
                                  {priceFormat(currency, product.discount)} OFF
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
                                  <span className="mdi mdi-approval" />{" "}
                                  Available in
                                </strong>{" "}
                                - {product.quantity}
                              </h6>
                            </div>
                          </Link>
                          <div className="product-footer">
                            <button
                              type="button"
                              onClick={() =>addToCartHandler(product._id)}
                              className="btn btn-secondary btn-sm float-right"
                            >
                              <i className="mdi mdi-cart-outline" /> Add To Cart
                            </button>
                            <p className="offer-price mb-0">
                              {priceFormat(
                                currency,
                                product.priceAfterDiscount
                              )}
                              <i className="mdi mdi-tag-outline" />
                              <br />
                              <span className="regular-price">
                                {priceFormat(currency, product.price)}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* end product section */}
    </div>
  );
}

export default ProductCategory;
