import React, { useState } from "react";
import "./Menu.scss";
import MenuSection from "./MenuSection";
import CloseButton from "../../assets/close-icon.png";
import HeaderIcon from "../../assets/header-icon.png";
import { useNavigate, Link } from "react-router-dom";

interface Category {
  slug: string;
  name: string;
}

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onPriceRangeChange: (priceRange: [number, number] | null) => void;
  onWeightRangeChange: (priceRange: [number, number] | null) => void;
  onRatingChange: (priceRange: [number, number] | null) => void;
}

const Menu: React.FC<MenuProps> = ({
  isOpen,
  onClose,
  categories,
  onPriceRangeChange,
  onWeightRangeChange,
  onRatingChange,
}) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedPriceRange, setSelectedPriceRange] = useState<
    [number, number] | null
  >(null);
  const [selectedWeightRange, setSelectedWeightRange] = useState<
    [number, number] | null
  >(null);
  const [selectedRating, setSelectedRating] = useState<[number, number] | null>(
    null
  );
  const [asc, setAsc] = useState<"price" | "discount" | "rating">("price");
  const [desc, setDesc] = useState<"price" | "discount" | "rating">("price");

  const handlePriceRangeClick = (min: number, max: number) => {
    const newRange: [number, number] = [min, max];
    setSelectedPriceRange(newRange);
    onPriceRangeChange(newRange);
    navigate(`/Home?priceRange=${min}-${max}`);
  };

  const handleRatingClick = (min: number, max: number) => {
    const newRange: [number, number] = [min, max];
    setSelectedRating(newRange);
    onRatingChange(newRange);
    navigate(`/Home?rating=${min}-${max}`);
  };

  const handleWeightRangeClick = (min: number, max: number) => {
    const newRange: [number, number] = [min, max];
    setSelectedWeightRange(newRange);
    onWeightRangeChange(newRange);
    navigate(`/Home?weightRange=${min}-${max}`);
  };

  const handleHighChange = (sortCriteria: "price" | "discount" | "rating") => {
    setAsc(sortCriteria);
    navigate(`/Home?asc=${sortCriteria}`);
  };

  const handleLowChange = (sortCriteria: "price" | "discount" | "rating") => {
    setDesc(sortCriteria);
    navigate(`/Home?desc=${sortCriteria}`);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    navigate(`/Home?category=${category}`);
  };

  const handleMainPage = () => {
    navigate("/Home");
  };

  const handleLogo = () => {
    navigate("/");
  };

  const handleMyOrder = () => {
    navigate("/Home/cart");
  };

  return (
    <div className={`menu-show ${isOpen ? "open" : ""}`}>
      <header className="menu-header">
        <img
          src={HeaderIcon}
          alt="header-logo"
          className="logo"
          onClick={handleLogo}
        />
        <img
          src={CloseButton}
          alt="close button"
          onClick={onClose}
          className="close-icon"
        />
      </header>
      <div className="menu-list" onClick={handleMyOrder}>
        <svg
          focusable="false"
          viewBox="2 2 24 24"
          aria-hidden="true"
          data-hb-id="pl-icon"
          data-enzyme-id="HomebaseIcon"
        >
          <path d="M23.36 7a.48.48 0 00-.52-.13l-7.07 2.31-1.43-.54-1.69-3.36A.5.5 0 0012 5L4.83 7.72a.52.52 0 00-.3.28.53.53 0 000 .41l1.77 3.47v7.94a.5.5 0 00.32.46L13.78 23a.47.47 0 00.22 0 .59.59 0 00.31-.09l7.08-2.63a.49.49 0 00.33-.46v-8l1.76-4.38a.48.48 0 00-.12-.44zm-9.65 6.8l-5.48-2L14 9.6l1.1.41zM12 6.12l1.3 2.69L7 11.14 5.7 8.46zm1.5 15.68l-6.2-2.33v-7l6.2 2.31zm1 0v-7l6.2-2.31v7zm6.32-10.39l-6 2.22 1.32-3.49 5.95-2z"></path>
        </svg>
        <span>My Orders</span>
      </div>
      <div className="menu-list">
        <Link to="/Home/profile">
          <svg
            focusable="false"
            viewBox="2 2 24 24"
            aria-hidden="true"
            className="header-icon"
          >
            <path d="M14 4.5a9.5 9.5 0 109.5 9.5A9.51 9.51 0 0014 4.5zM9.26 21.05v-2.17a3.37 3.37 0 013.36-3.36h2.74a3.37 3.37 0 013.36 3.36v2.19a8.47 8.47 0 01-9.48 0zM14 14.5a2.5 2.5 0 112.5-2.5 2.5 2.5 0 01-2.5 2.5zm5.73 5.76v-1.38a4.37 4.37 0 00-3.44-4.26A3.45 3.45 0 0017.5 12a3.5 3.5 0 00-7 0 3.45 3.45 0 001.21 2.62 4.37 4.37 0 00-3.44 4.26v1.38a8.5 8.5 0 1111.46 0z"></path>
          </svg>
          <span>Profile</span>
        </Link>
      </div>

      <MenuSection title="Type">
        <div className="category-list">
          <div className="clear" onClick={handleMainPage}>
            Clear
          </div>
          {categories.map((category) => (
            <div
              key={category.slug}
              className={`category-item ${
                selectedCategory === category.name ? "selected" : ""
              }`}
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="category-name">{category.slug}</div>
              <svg
                focusable="false"
                viewBox="0 0 24 24"
                aria-hidden="true"
                data-hb-id="pl-icon"
                className={`menu-icon`}
              >
                <path d="M9.5 4.5c.13 0 .26.05.35.15l7 7c.2.2.2.51 0 .71l-7 7c-.2.2-.51.2-.71 0s-.2-.51 0-.71L15.79 12 9.14 5.35c-.2-.2-.2-.51 0-.71.1-.1.23-.15.35-.15z"></path>
              </svg>
            </div>
          ))}
        </div>
      </MenuSection>

      <MenuSection title="Ascending">
        <div className="filter">
          <div className="item" onClick={() => handleHighChange("price")}>
            By Price
          </div>
          <div className="item" onClick={() => handleHighChange("discount")}>
            By Discount
          </div>
          <div className="item" onClick={() => handleHighChange("rating")}>
            By Rating
          </div>
          <div className="clear" onClick={handleMainPage}>
            Clear
          </div>
        </div>
      </MenuSection>

      <MenuSection title="Descending">
        <div className="filter">
          <div className="item" onClick={() => handleLowChange("price")}>
            By Price
          </div>
          <div className="item" onClick={() => handleLowChange("discount")}>
            By Discount
          </div>
          <div className="item" onClick={() => handleLowChange("rating")}>
            By Rating
          </div>
          <div className="clear" onClick={handleMainPage}>
            Clear
          </div>
        </div>
      </MenuSection>

      <MenuSection title="Rating">
        <div className="filter">
          <div className="item" onClick={() => handleRatingClick(0, 1)}>
            0 - 1
          </div>
          <div className="item" onClick={() => handleRatingClick(2, 3)}>
            2 - 3
          </div>
          <div className="item" onClick={() => handleRatingClick(4, 5)}>
            4 - 5
          </div>
          <div className="clear" onClick={handleMainPage}>
            Clear
          </div>
        </div>
      </MenuSection>

      <MenuSection title="Price">
        <div className="filter">
          <div className="item" onClick={() => handlePriceRangeClick(0, 500)}>
            $0 - $50
          </div>
          <div className="item" onClick={() => handlePriceRangeClick(51, 100)}>
            $51 - $100
          </div>
          <div className="item" onClick={() => handlePriceRangeClick(51, 125)}>
            $101 - $250
          </div>
          <div className="item" onClick={() => handlePriceRangeClick(126, 250)}>
            $251 - $500
          </div>
          <div
            className="item"
            onClick={() => handlePriceRangeClick(250, 5000)}
          >
            $501 - $1500
          </div>
          <div
            className="item"
            onClick={() => handlePriceRangeClick(250, 5000)}
          >
            Greater than 1500
          </div>
          <div className="clear" onClick={handleMainPage}>
            Clear
          </div>
        </div>
      </MenuSection>

      <MenuSection title="Weight">
        <div className="filter">
          <div className="item" onClick={() => handleWeightRangeClick(0, 2)}>
            0 - 2
          </div>
          <div className="item" onClick={() => handleWeightRangeClick(3, 5)}>
            3 - 5
          </div>
          <div className="item" onClick={() => handleWeightRangeClick(6, 8)}>
            5 - 7
          </div>
          <div className="item" onClick={() => handleWeightRangeClick(8, 10)}>
            7 - 9
          </div>
          <div className="item" onClick={() => handleWeightRangeClick(11, 200)}>
            Greater Than 10
          </div>
          <div className="clear" onClick={handleMainPage}>
            Clear
          </div>
        </div>
      </MenuSection>

      <footer className="menu-footer">
        <div className="cta-btn">
          <Link to="/">Logout</Link>
        </div>
      </footer>
    </div>
  );
};

export default Menu;
