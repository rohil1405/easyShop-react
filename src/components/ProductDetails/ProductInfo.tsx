import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/CartSlice";
import { ProductData, CartItem } from "../ProductData/ProductData";

interface ProductInfoProps {
  product: ProductData;
  discountedPrice: number;
  savedPrice: number;
  low: number;
  getStarImage: (rating: number) => string;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  discountedPrice,
  savedPrice,
  low,
  getStarImage,
}) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: product.id,
      title: product.title,
      category: product.category,
      price: discountedPrice,
      rating: product.rating,
      images: product.images,
      thumbnail: product.thumbnail,
      description: product.description,
      discountPercentage: product.discountPercentage,
      quantity: 1,
      stock: product.stock,
      tags: product.tags,
      brand: product.brand,
      sku: product.sku,
      weight: product.weight,
      dimensions: product.dimensions,
      warrantyInformation: product.warrantyInformation,
      shippingInformation: product.shippingInformation,
      availabilityStatus: product.availabilityStatus,
      reviews: product.reviews,
      returnPolicy: product.returnPolicy,
      minimumOrderQuantity: product.minimumOrderQuantity,
      meta: product.meta,
    };

    dispatch(addToCart(cartItem));
  };

  return (
    <div className="product-info">
      <h2>{product.title}</h2>
      <p>{product.description}</p>

      <div className="star">
        <div className="star-image">
          <img
            src={getStarImage(product.rating)}
            alt={`${product.rating} star`}
          />
          <span>({product.rating})</span>
        </div>

        <div className="review">{product.reviews.length} Reviews</div>
      </div>

      <div className="price">
        <div className="main-price">${discountedPrice.toFixed(2)}</div>
        <div className="product-origin-price">${product.price.toFixed(2)}</div>
        <div className="discount">Now {product.discountPercentage}% OFF</div>
      </div>

      <div className="save">SAVE ${savedPrice.toFixed(2)}</div>

      <div className="saved-price">
        <div className="low">As low as ${low.toFixed(2)}/month</div>
        <div className="apply">
          <a href="#">Apply Now</a>
        </div>
      </div>

      <div className="dimensions">
        {product.dimensions.width} * {product.dimensions.height} * {product.dimensions.depth}
      </div>
      <div className="available">only {product.minimumOrderQuantity} left</div>

      <div className="add-to-cart">
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>

      <div className="shipping">
        <p>Free Shipping</p>
        <div className="delivery">Estimated Delivery: SEP 15-30</div>
      </div>
    </div>
  );
};

export default ProductInfo;
