import React, { useState } from "react";
import InfoIcon from "../../assets/info.png";
import Warranty from "../../assets/warrany.png";
import Star from "../../assets/star.png";
import QrCode from "../../assets/QrCode.png";
import { ProductData } from "../ProductData/ProductData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ProductBottomProps {
  product: ProductData;
}

const ProductBottom: React.FC<ProductBottomProps> = ({ product }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? 0 : index);
  };

  return (
    <>
      <div className="product-bottom-wrap">
        <div className="product-bottom">
          <div className="product-item" onClick={() => toggleItem(1)}>
            <img src={InfoIcon} alt="info-icon" />
            <span>Product Info</span>
          </div>

          <div className="product-item" onClick={() => toggleItem(0)}>
            <img src={Star} alt="reviews-icon" />
            <span>Reviews</span>
          </div>

          <div className="product-item" onClick={() => toggleItem(2)}>
            <img src={Warranty} alt="warranty-icon" />
            <span>Warranty</span>
          </div>

          <div className="product-item" onClick={() => toggleItem(3)}>
            <img src={QrCode} alt="qr-code-icon" />
            <span>QR</span>
          </div>
        </div>

        <div className="tab">
          {activeIndex === 1 && (
            <div className="product-info">
              <div className="product-info-header">
                <h2>{product.title}</h2>
                <p className="price">${product.price.toFixed(2)}</p>
                <img
                  className="qr-code"
                  src={product.meta.qrCode}
                  alt={product.title}
                />
              </div>
              <p className="description">{product.description}</p>
              <ul>
                <li>
                  <strong>Category:</strong> {product.category}
                </li>
                <li>
                  <strong>Discount:</strong> {product.discountPercentage}%
                </li>
                <li>
                  <strong>Rating:</strong> {product.rating}
                </li>
                <li>
                  <strong>Tags:</strong> {product.tags[0]}, {product.tags[1]}
                </li>
                <li>
                  <strong>Brand:</strong> {product.brand}
                </li>
                <li>
                  <strong>SKU:</strong> {product.sku}
                </li>
                <li>
                  <strong>Weight:</strong> {product.weight}gm
                </li>
                <li>
                  <strong>Dimensions:</strong> {product.dimensions.width} *{" "}
                  {product.dimensions.height} * {product.dimensions.depth} mm
                </li>
                <li>
                  <strong>Warranty:</strong> {product.warrantyInformation}
                </li>
                <li>
                  <strong>Shipping:</strong> {product.shippingInformation}
                </li>
                <li>
                  <strong>Status:</strong> {product.availabilityStatus}
                </li>
                <li>
                  <strong>Return Policy:</strong> {product.returnPolicy}
                </li>
                <li>
                  <strong>Minimum Order Quantity:</strong>{" "}
                  {product.minimumOrderQuantity}
                </li>
              </ul>
            </div>
          )}

          {activeIndex === 0 && (
            <div className="review-center">
              <div className="review-slider">
                <Swiper
                  slidesPerView={1}
                  pagination={{ clickable: true }}
                  scrollbar={{ draggable: true }}
                  loop={true}
                  modules={[Autoplay]}
                  autoplay={{
                    delay: 300000,
                    disableOnInteraction: false,
                  }}
                >
                  {product.reviews.map((review, index) => (
                    <SwiperSlide key={index}>
                      <div className="swiper-slide">
                        <p className="review-rating">Rating: {review.rating}</p>
                        <p className="review-comment">
                          Comment: {review.comment}
                        </p>
                        <p className="reviewer-name">
                          Reviewer: {review.reviewerName}
                        </p>
                        <p className="review-date">
                          Date: {new Date(review.date).toLocaleDateString()}
                        </p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          )}

          {activeIndex === 2 && (
            <div className="image-bg-wrap">
              <div className="image-wrap">
                <div className="text">{product.warrantyInformation}</div>
              </div>
            </div>
          )}

          {activeIndex === 3 && (
            <div className="qr">
              <img
                src={product.meta.qrCode}
                alt="main-qr"
                className="main-qr"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductBottom;
