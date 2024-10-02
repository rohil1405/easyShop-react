import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./Modal.scss";
import closeButton from "../../assets/close-icon.png";
import trucklogo from "../../assets/truck.png";
import boxlogo from "../../assets/box.png";
import Shipping from "../../assets/box.png";

type ModalProps = {
  closeModal: () => void;
};

const Modal: React.FC<ModalProps> = ({ closeModal }) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  const modalContent = (
    <>
      <div className="modal-section" onClick={closeModal}></div>
      <div className="modal">
        <div className="modal-wrap">
          <div className="cta-btn">
            <a href="#" onClick={closeModal}>
              <img src={closeButton} alt="close-button" />
            </a>
          </div>

          <h2>Simple Shipping and Returns</h2>
          <div className="ship-free">
            <div className="col">
              <div className="img">
                <img src={trucklogo} alt="truck" />
              </div>
              <div className="content">
                Free Shipping on everything* Hurry! This Special offer ends
                soon.
              </div>
            </div>
            <div className="col">
              <div className="img">
                <img src={Shipping} alt="shipping" />
              </div>
              <div className="content">
                Fast 2-day shipping on thousands of items-from toasters to towel
                racks
              </div>
            </div>
            <div className="col">
              <div className="img">
                <img src={boxlogo} alt="box" />
              </div>
              <div className="content">
                Easy returns on most orders if something's not quite right
              </div>
            </div>
          </div>
          <p className="modal-content">
            *Free shipping is only available in the contiguous U.S. Some
            exclusions apply, including flooring, large fixtures, and
            non-standard items. Wayfair reserves the rights to change this offer
            at any time. Read more on{" "}
            <a href="#">shipping policy, or return policy</a>.
          </p>
        </div>
      </div>
    </>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("modal-root")!
  );
};

export default Modal;
