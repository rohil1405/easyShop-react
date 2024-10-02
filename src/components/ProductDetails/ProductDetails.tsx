import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import {
  fetchProductStart,
  fetchProductSuccess,
  fetchProductFailure,
} from "../store/productDetailsSlice";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import ReviewScore from "./ReviewScore";
import ProductBottom from "./ProductBottom";
import FourFive from "../../assets/4.5.png";
import Second from "../../assets/2.png";
import Three from "../../assets/3.png";
import Four from "../../assets/4.png";
import Five from "../../assets/5.png";
import ThreeFour from "../../assets/3.5.png";
import TwoThree from "../../assets/2.5.png";
import "../ProductData/loader.scss";
import loader from "../../assets/loader.png";
import "./ProductDetails.scss";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state: RootState) => state.productDetails
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProductStart());
      fetch(`https://dummyjson.com/products/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network Issues");
          }
          return response.json();
        })
        .then((data) => {
          dispatch(fetchProductSuccess(data));
        })
        .catch((err) => {
          dispatch(fetchProductFailure(err.message));
        });
    }
  }, [id, dispatch]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader">
          <img src={loader} alt="Loading..." />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) return null;

  const discountedPrice =
    product.price - (product.price * product.discountPercentage) / 100;
  const savedPrice = product.price - discountedPrice;
  const low = 3 * savedPrice;

  const getStarImage = (rating: number) => {
    if (rating > 4 && rating < 5) return FourFive;
    if (rating > 3 && rating < 4) return ThreeFour;
    if (rating > 2 && rating < 3) return TwoThree;
    if (rating >= 5) return Five;
    if (rating >= 4) return Four;
    if (rating >= 3) return Three;
    if (rating >= 2) return Second;
    return "";
  };

  const handleVisitStore = () => {
    navigate("/Home");
  };

  return (
    <section className="product-show">
      <div className="container">
        <div className="product-individual">
          <div className="product-display">
            Home / Product / {product.title}
          </div>
          <div className="social-image">
            <a href="#" target="_blank">
              <svg
                focusable="false"
                viewBox="2 2 24 24"
                role="img"
                aria-label="Facebook Icon"
                data-hb-id="pl-icon"
                data-enzyme-id="HomebaseIcon"
              >
                <title>Facebook Icon</title>
                <path d="M22.9 4H5.1C4.5 4 4 4.5 4 5.1v17.8c0 .6.5 1.1 1.1 1.1h9.6v-7.7h-2.6v-3h2.6V11c0-2.6 1.6-4 3.9-4 1.1 0 2.1.1 2.3.1v2.7h-1.6c-1.3 0-1.5.6-1.5 1.5v1.9h3l-.4 3h-2.6V24h5.1c.6 0 1.1-.5 1.1-1.1V5.1c0-.6-.5-1.1-1.1-1.1"></path>
              </svg>
            </a>
            <a href="#">
              <svg
                focusable="false"
                viewBox="2 2 24 24"
                role="img"
                aria-label="Pinterest Icon"
                data-hb-id="pl-icon"
                data-enzyme-id="HomebaseIcon"
              >
                <title>Pinterest Icon</title>
                <path d="M14 4C8.5 4 4 8.5 4 14c0 4.2 2.6 7.9 6.4 9.3-.1-.8-.2-2 0-2.9.2-.8 1.2-5 1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.9 0 1.3.6 1.3 1.4 0 .9-.5 2.1-.8 3.3-.2 1 .5 1.8 1.5 1.8 1.8 0 3.1-1.9 3.1-4.6 0-2.4-1.7-4.1-4.2-4.1-2.8 0-4.5 2.1-4.5 4.3 0 .9.3 1.8.7 2.3.1.1.1.2.1.3-.1.3-.2 1-.3 1.1 0 .2-.1.2-.3.1-1.2-.6-2-2.4-2-3.9 0-3.2 2.3-6.1 6.6-6.1 3.5 0 6.2 2.5 6.2 5.8 0 3.4-2.2 6.2-5.2 6.2-1 0-2-.5-2.3-1.1 0 0-.5 1.9-.6 2.4-.2.9-.8 2-1.2 2.6.8.5 1.8.7 2.8.7 5.5 0 10-4.5 10-10S19.5 4 14 4"></path>
              </svg>
            </a>
            <a href="#">
              <svg
                focusable="false"
                viewBox="2 2 24 24"
                role="img"
                aria-label="Instagram Icon"
                data-hb-id="pl-icon"
                data-enzyme-id="HomebaseIcon"
              >
                <title>Instagram Icon</title>
                <path d="M23.9 9.9c0-1.1-.2-1.8-.5-2.4-.3-.7-.6-1.2-1.2-1.8-.6-.6-1.1-.9-1.8-1.2-.6-.2-1.4-.4-2.4-.5h-4c-2.7 0-3.1 0-4.1.1-1.1 0-1.8.2-2.4.5-.7.2-1.3.5-1.8 1.1-.6.5-.9 1.1-1.2 1.8-.2.6-.4 1.3-.4 2.4-.1 1-.1 1.4-.1 4.1 0 2.7 0 3.1.1 4.1 0 1.1.2 1.8.5 2.4.3.7.6 1.2 1.2 1.8.6.6 1.1.9 1.8 1.2.6.2 1.4.4 2.4.5 1.1 0 1.4.1 4.1.1s3.1 0 4.1-.1c1.1 0 1.8-.2 2.4-.5.7-.3 1.2-.6 1.8-1.2.6-.6.9-1.1 1.2-1.8.2-.6.4-1.4.5-2.4 0-1.1.1-1.4.1-4.1-.2-2.7-.2-3.1-.3-4.1zM22.1 18c0 1-.2 1.5-.3 1.9-.2.5-.4.8-.7 1.1-.3.3-.7.6-1.1.7-.4.1-.9.3-1.9.3-1.1 0-1.4.1-4 .1s-3 0-4-.1c-1 0-1.5-.2-1.9-.3-.6-.1-.9-.3-1.2-.7-.3-.3-.6-.7-.7-1.1-.2-.4-.4-.9-.4-1.9 0-1.1-.1-1.4-.1-4 0-2.7 0-3 .1-4 0-1 .2-1.5.3-1.9.2-.5.4-.8.8-1.1.3-.3.7-.6 1.1-.7.4-.2.9-.4 1.9-.4 1.1 0 1.4-.1 4-.1s3 0 4 .1c1 0 1.5.2 1.9.3.5.2.8.4 1.1.8.3.3.6.7.7 1.1.1.4.3.9.3 1.9 0 1.1.1 1.4.1 4 .1 2.7.1 3 0 4z"></path>
                <path d="M14 8.9c-2.8 0-5.1 2.3-5.1 5.1s2.3 5.1 5.1 5.1 5.1-2.3 5.1-5.1-2.3-5.1-5.1-5.1zm0 8.4c-1.8 0-3.3-1.5-3.3-3.3s1.5-3.3 3.3-3.3 3.3 1.5 3.3 3.3-1.5 3.3-3.3 3.3z"></path>
                <circle cx="19.3" cy="8.7" r="1.2"></circle>
              </svg>
            </a>
            <a href="#">
              <svg
                focusable="false"
                viewBox="0 0 24 24"
                role="img"
                aria-label="TikTok"
                data-hb-id="pl-icon"
                data-enzyme-id="HomebaseIcon"
              >
                <title>TikTok</title>
                <path d="M13.105 16.021V2.25h3.102v.756C16.207 4.461 18.5 6.97 20 6.97h.75v2.91c-.316 0-.453 0-.75.004-1.473-.024-3-.864-3.92-1.584-.018-.015 0 1.977 0 7.721 0 3.569-3.07 5.729-5.914 5.729-3.77 0-5.916-3.3-5.916-5.75-.14-4.163 3.25-6.75 6.67-6.48v3.04c-.332.01-.646.002-.92 0-2.193.11-2.9 2.11-2.9 3.44s.955 2.844 3.066 2.844c1.998 0 2.94-1.703 2.94-2.823z"></path>
              </svg>
            </a>

            <a href="#">
              <svg
                focusable="false"
                viewBox="0 0 24 24"
                role="img"
                aria-label="YouTube"
                data-hb-id="pl-icon"
                data-enzyme-id="HomebaseIcon"
              >
                <title>YouTube</title>
                <path d="M17.9 5.2c-2.8-.2-9-.2-11.8 0-3 .2-3.4 2-3.4 6.8s.4 6.6 3.4 6.8c2.8.2 9 .2 11.8 0 3-.2 3.4-2 3.4-6.8s-.4-6.5-3.4-6.8zm-8.2 9.9V8.9l6.2 3.1-6.2 3.1z"></path>
              </svg>
            </a>
          </div>
        </div>

        <div className="product-details">
          <div className="product-left">
            <ProductImages images={product.images} title={product.title} />

            <div className="stylish">
              <ReviewScore rating={product.rating} />

              <div className="btn">
                <button onClick={handleVisitStore}>Visit Store</button>
              </div>
            </div>
          </div>

          <div className="product-right">
            <ProductInfo
              product={product}
              discountedPrice={discountedPrice}
              savedPrice={savedPrice}
              low={low}
              getStarImage={getStarImage}
            />
          </div>
        </div>

        <ProductBottom product={product} />
      </div>
    </section>
  );
};

export default ProductDetails;
