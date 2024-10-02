import React from "react";
import { useDispatch } from "react-redux";
import ProductList from "../ProductList/ProductList";
import { useLocation } from "react-router-dom";
import { addToCart } from "../store/CartSlice";
import { CartItem, ProductData } from "../ProductData/ProductData";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const parseRange = (param: string | null): [number, number] | null => {
    return param ? (param.split("-").map(Number) as [number, number]) : null;
  };

  const queryParams = new URLSearchParams(location.search);

  const priceRange = parseRange(queryParams.get("priceRange"));
  const weightRange = parseRange(queryParams.get("weightRange"));
  const rating = parseRange(queryParams.get("rating"));

  const asc = queryParams.get("asc") as "price" | "discount" | "rating" | null;
  const desc = queryParams.get("desc") as
    | "price"
    | "discount"
    | "rating"
    | null;

  const selectedCategory = queryParams.get("category") || "";

  const handleAddToCart = (product: ProductData) => {
    const cartItem: CartItem = {
      ...product,
      quantity: 1,
    };
    dispatch(addToCart(cartItem));
  };

  return (
    <ProductList
      onAddToCart={handleAddToCart}
      priceRange={priceRange}
      weightRange={weightRange}
      rating={rating}
      asc={asc}
      desc={desc}
      selectedCategory={selectedCategory}
    />
  );
};

export default Home;
