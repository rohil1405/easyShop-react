import React, { useState, useEffect } from "react";
import Menu from "../Menu/Menu";
import "./Header.scss";
import { Link } from "react-router-dom";
import Category from "../Cateogry/Category";
import HeaderIcon from "../../assets/header-icon.png";
import cart from "../../assets/cart.png";
import { useNavigate } from "react-router-dom";
import logout from "../../assets/logout.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface HeaderProps {
  cartCount: number;
}

const Header: React.FC<HeaderProps> = ({ cartCount }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number] | null>(null);
  const [selectedWeightRange, setSelectedWeightRange] = useState<[number, number] | null>(null);
  const [selectedRating, setSelectedRating] = useState<[number, number] | null>(null);

  const handlePriceRangeChange = (priceRange: [number, number] | null) => {
    setSelectedPriceRange(priceRange);
  };

  const navigate = useNavigate();

  const handleWeightRangeChange = (weightRange: [number, number] | null) => {
    setSelectedWeightRange(weightRange);
  };
  const handleRatingChange = (rating: [number, number] | null) => {
    setSelectedPriceRange(rating);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/products/categories"
        );
        const data: Category[] = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("error");
      }
    };
    fetchCategories();
  }, []);

  const togglePopup = () => {
    setIsPopupOpen((prev) => !prev);
  };

  const handleLogout = () => {
    toast.success("Successfully logged out!");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <section className="hero-header">
      <div className="container">
        <div className="hero-header-wrap">
          <div className="header-menu" onClick={togglePopup}>
            <svg
              focusable="false"
              viewBox="2 2 24 24"
              aria-label="Open Menu"
              className="menu-icon"
            >
              <title>Open Menu</title>
              <path d="M23 14.5H5a.5.5 0 010-1h18a.5.5 0 010 1zM23 20.5H5a.5.5 0 010-1h18a.5.5 0 010 1zM23 8.5H5a.5.5 0 010-1h18a.5.5 0 010 1z"></path>
            </svg>
            <div className="menu-title">
              <span>Menu</span>
            </div>
          </div>

          <Menu
            isOpen={isPopupOpen}
            onClose={togglePopup}
            categories={categories}
            onPriceRangeChange={handlePriceRangeChange}
            onWeightRangeChange={handleWeightRangeChange}
            onRatingChange={handleRatingChange}
          />

          <div className="header-logo">
            <Link to="/Home">
              <img src={HeaderIcon} alt="header-logo" />
            </Link>
          </div>

          <div className="header-wrap">
            <div className="header-profile">
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
            <div className="header-cart">
              <Link to="/Home/cart">
                <img src={cart} alt="cart" />
                <div className="cart-count">{cartCount}</div>
              </Link>
            </div>
            <div className="header-logos" onClick={handleLogout}>
              <img src={logout} alt="logout" />
              <span>Logout</span>

              {/* <div className="sign-click">
                <div className="sign-header">
                  <button>Sign In</button>
                  <p>Create an Account</p>
                </div>
                <div className="sign-order" onClick={handleMyOrder}>
                  <div className="sign-list">
                    <svg
                      focusable="false"
                      viewBox="2 2 24 24"
                      aria-hidden="true"
                      className="header-icon"
                    >
                      <path d="M14 4.5a9.5 9.5 0 109.5 9.5A9.51 9.51 0 0014 4.5zM9.26 21.05v-2.17a3.37 3.37 0 013.36-3.36h2.74a3.37 3.37 0 013.36 3.36v2.19a8.47 8.47 0 01-9.48 0zM14 14.5a2.5 2.5 0 112.5-2.5 2.5 2.5 0 01-2.5 2.5zm5.73 5.76v-1.38a4.37 4.37 0 00-3.44-4.26A3.45 3.45 0 0017.5 12a3.5 3.5 0 00-7 0 3.45 3.45 0 001.21 2.62 4.37 4.37 0 00-3.44 4.26v1.38a8.5 8.5 0 1111.46 0z"></path>
                    </svg>
                    <span>Order</span>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
