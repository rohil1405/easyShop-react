import React, { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { setPage, setLoading, setError } from "../store/productSlice";
import { Product } from "./Product";
import { PaginationControls } from "./PaginationControls";
import { ProductData } from "../ProductData/ProductData";
import loader from "../../assets/loader.png";
import "../ProductData/loader.scss";

const fetchProducts = async (selectedCategory: string): Promise<ProductData[]> => {
  const url = selectedCategory
    ? `https://dummyjson.com/products/category/${selectedCategory}`
    : "https://dummyjson.com/products";
  const response = await fetch(url);
  console.log(url);

  if (!response.ok) {
    throw new Error("Network Issues");
  }

  const data = await response.json();
  return data.products;
};

interface ProductListProps {
  onAddToCart: (product: ProductData) => void;
  priceRange?: [number, number] | null;
  weightRange?: [number, number] | null;
  rating?: [number, number] | null;
  asc?: "price" | "discount" | "rating" | null;
  desc?: "price" | "discount" | "rating" | null;
  selectedCategory: string;
}

const ProductList: React.FC<ProductListProps> = ({
  selectedCategory,
  onAddToCart,
  priceRange,
  weightRange,
  rating,
  asc,
  desc,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentPage, limit } = useSelector((state: RootState) => state.products);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([]);

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery<ProductData[]>({
    queryKey: ["products", selectedCategory],
    queryFn: () => fetchProducts(selectedCategory),
  });

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading("loading"));
    } else {
      dispatch(setLoading("succeeded"));
    }
  }, [isLoading, dispatch]);

  useEffect(() => {
    if (isError && error instanceof Error) {
      dispatch(setError(error.message || "Failed to fetch products"));
      dispatch(setLoading("failed"));
    }
  }, [isError, error, dispatch]);

  const applyFiltersAndSort = useCallback(() => {
    let tempProducts = products
      .filter((product: ProductData) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((product: ProductData) => {
        if (priceRange) {
          const [minPrice, maxPrice] = priceRange;
          return product.price >= minPrice && product.price <= maxPrice;
        }
        if (weightRange) {
          const [minWeight, maxWeight] = weightRange;
          return (
            product.weight &&
            product.weight >= minWeight &&
            product.weight <= maxWeight
          );
        }
        if (rating) {
          const [minRating, maxRating] = rating;
          return product.rating >= minRating && product.rating <= maxRating;
        }
        return true;
      });

    tempProducts = tempProducts.sort((a: ProductData, b: ProductData) => {
      if (asc === "price") return a.price - b.price;
      if (asc === "discount") return a.discountPercentage - b.discountPercentage;
      if (asc === "rating") return a.rating - b.rating;
      if (desc === "price") return b.price - a.price;
      if (desc === "discount") return b.discountPercentage - a.discountPercentage;
      if (desc === "rating") return b.rating - a.rating;
      return 0;
    });

    setFilteredProducts(tempProducts);
  }, [products, searchQuery, priceRange, weightRange, rating, asc, desc]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [applyFiltersAndSort]);

  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (paginatedProducts.length === limit) {
      dispatch(setPage(currentPage + 1));
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(setPage(currentPage - 1));
    }
  };
  
  if (isLoading)
    return (
      <div className="loader-container">
        <div className="loader">
          <img src={loader} alt="Loading..." />
          <span>Loading Products...</span>
        </div>
      </div>
    );

  if (isError)
    return (
      <div>
        Error: {error instanceof Error ? error.message : "An error occurred"}
      </div>
    );

  return (
    <div className="container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Find anything here..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="range-display">
        {priceRange ? `Price Range: $${priceRange[0]} - $${priceRange[1]}` : ""}
        {weightRange ? `Weight Range: ${weightRange[0]} - ${weightRange[1]}` : ""}
        {rating ? `Rating: ${rating[0]} - ${rating[1]}` : ""}
      </div>
      <div className={`product-list ${filteredProducts.length === 1 ? "single-product" : ""}`}>
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((product: ProductData) => (
            <Product key={product.id} product={product} onAddToCart={onAddToCart} />
          ))
        ) : (
          <div className="no-products-container">
            <div className="no-products-message">No products found</div>
          </div>
        )}
      </div>
      {filteredProducts.length > limit && (
        <PaginationControls
          currentPage={currentPage}
          hasNextPage={paginatedProducts.length === limit}
          hasPrevPage={currentPage > 1}
          onNextPage={handleNextPage}
          onPrevPage={handlePrevPage}
        />
      )}
    </div>
  );
};

export default ProductList;
