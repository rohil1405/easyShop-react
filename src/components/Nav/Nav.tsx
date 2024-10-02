import React, { useState } from "react";
import "./Nav.scss";
import Modal from "../Modal/Modal";

const Nav = () => {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section className="nav-section">
      <div className="container">
        <div className="nav-wrap">
          <div className="nav-left">
            <a>
              Black Friday in August starts 8/15 | Get ready & shop Deals of the Day Now!
            </a>
            <svg
              focusable="false"
              viewBox="2 2 24 24"
              aria-hidden="true"
              data-hb-id="pl-icon"
              data-enzyme-id="SitewideBannerIcon"
              fill="#FFFFFF"
            >
              <path d="M21.46 14.19a.5.5 0 000-.38.36.36 0 00-.11-.16l-6-6a.49.49 0 00-.7.7l5.14 5.15H7a.5.5 0 000 1h12.79l-5.14 5.15a.48.48 0 000 .7.48.48 0 00.7 0l6-6a.36.36 0 00.11-.16z"></path>
            </svg>
          </div>
          <div className="nav-right">
            <a>Financing</a>
            <div className="nav-line">|</div>
            <a href='#' onClick={() => setShowModal(true)}>
              Everything Ships FREE*
            </a>
          </div>
        </div>
      </div>
      {showModal && <Modal closeModal={closeModal} />}
    </section>
  );
};

export default Nav;
