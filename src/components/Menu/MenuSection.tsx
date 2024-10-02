import React, { useState } from "react";
import "./Menu.scss";

interface MenuSectionProps {
  title: string;
  children: React.ReactNode;
}

const MenuSection: React.FC<MenuSectionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="menu-section">
      <div className="section-title" onClick={handleToggle}>
        <h3>{title}</h3>
        <svg
          focusable="false"
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={`section-icon ${isOpen ? "up" : "down"}`}
        >
          <path d="M9.5 4.5c.13 0 .26.05.35.15l7 7c.2.2.2.51 0 .71l-7 7c-.2.2-.51.2-.71 0s-.2-.51 0-.71L15.79 12 9.14 5.35c-.2-.2-.2-.51 0-.71.1-.1.23-.15.35-.15z"></path>
        </svg>
      </div>
      {isOpen && <div className="section-content">{children}</div>}
    </div>
  );
};

export default MenuSection;
