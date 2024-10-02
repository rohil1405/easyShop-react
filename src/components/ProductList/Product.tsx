import React from "react";
import { ProductData } from "../ProductData/ProductData";
import cart from "../../assets/cart.png";
import FourFive from "../../assets/4.5.png";
import Second from "../../assets/2.png";
import Three from "../../assets/3.png";
import Four from "../../assets/4.png";
import Five from "../../assets/5.png";
import ThreeFour from "../../assets/3.5.png";
import TwoThree from "../../assets/2.5.png";
import { Link } from "react-router-dom";
import "./ProductList.scss";

type ProductProps = {
  product: ProductData;
  onAddToCart: (product: ProductData) => void;
};

export const Product: React.FC<ProductProps> = ({ product, onAddToCart }) => {
  const getRandomBoolean = (): boolean => Math.random() > 0.5;
  const showSale = getRandomBoolean();
  const showCloseout = getRandomBoolean();

  const discountedPrice =
    product.price - (product.price * product.discountPercentage) / 100;

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

  const handleAddToCart = () => {
    onAddToCart(product); 
  };

  return (
    <div className="product">
      <div className="product-image">
        <Link to={`product/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.title}
            width="100%"
            height="200px"
            style={{ objectFit: "cover" }}
          />
        </Link>
        {showSale && <span className="product-badge sale">Sale</span>}
        {showCloseout && (
          <span className="product-badge closeout">Closeout</span>
        )}
        <div className="discount">{product.discountPercentage}%</div>
      </div>
      <div className="product-details">
        <h3 className="product-title">{product.title}</h3>
        <div className="product-info">
          <div className="product-price">
            ${discountedPrice.toFixed(2)}
            <span className="orign-price">${product.price.toFixed(2)}</span>
          </div>
        </div>
        <div className="star-image">
          <img
            src={getStarImage(product.rating)}
            alt={`${product.rating} star`}
          />
          <span>({product.rating})</span>
        </div>
        <div className="product-actions">
          <button onClick={() => onAddToCart(product)}>
            <span>
              <img src={cart} alt="cart" />
            </span>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
