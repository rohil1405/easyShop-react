import "./Footer.scss";
import FooterLogo from '../../assets/header-icon.png';
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const handleVisitStore = () => {
    navigate("/Home");
  };
  return (
    <>
      <div className="footer-section-wrap">
        <div className="container">
          <footer>
            <div className="footer-top">
              <div className="footer-header">
                <div className="header-left">
                  <img
                    src={FooterLogo}
                    alt="footer-logo"
                    className="footer-logo"
                    onClick={handleVisitStore}
                  ></img>
                  <button className="cta-btn" onClick={handleVisitStore}>Visit Store</button>
                </div>
                <div className="header-right">
                  <div className="contact-us">
                    <a href="tel: 111111111" className="cta-btn">
                      <span>
                        <svg
                          focusable="false"
                          viewBox="2 2 24 24"
                          role="img"
                          aria-label="Call Us"
                          data-hb-id="pl-icon"
                        >
                          <title>Call Us</title>
                          <path d="M18.88 23h-.07C12.18 22 6 15.84 5 9.21a.47.47 0 01.13-.42l3.59-3.66A.52.52 0 019.11 5a.47.47 0 01.36.2l3.2 4.24a.5.5 0 01-.05.66l-1.73 1.68a7.21 7.21 0 005.36 5.37l1.64-1.76a.49.49 0 01.67-.06l4.24 3.17a.5.5 0 01.05.76l-3.62 3.62a.5.5 0 01-.35.12zM6 9.31A16.43 16.43 0 0018.71 22l3-3-3.43-2.58L16.8 18a.51.51 0 01-.44.16 8.22 8.22 0 01-6.5-6.51.49.49 0 01.14-.43l1.61-1.56L9 6.24z"></path>
                        </svg>
                      </span>
                      Call us
                    </a>
                  </div>
                </div>
              </div>

              <div className="footer-nav">
                <div className="nav-left">
                  <div className="nav-email">
                    <div className="email-wrap">
                      <svg
                        version="1.0"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24.000000pt"
                        height="24.000000pt"
                        viewBox="0 0 24.000000 24.000000"
                        preserveAspectRatio="xMidYMid meet"
                      >
                        <g
                          transform="translate(0.000000,24.000000) scale(0.100000,-0.100000)"
                          fill="#FFF"
                          stroke="none"
                        >
                          <path
                            d="M24 187 c-3 -8 -4 -43 -2 -78 l3 -64 95 0 95 0 0 75 0 75 -93 3 c-72
                    2 -94 0 -98 -11z m176 -12 c0 -3 -18 -17 -40 -31 l-40 -27 -40 27 c-22 14 -40
                    28 -40 31 0 3 36 5 80 5 44 0 80 -2 80 -5z m-107 -57 c27 -19 27 -19 55 0 52
                    36 52 36 52 -12 l0 -46 -80 0 -80 0 0 46 c0 48 0 48 53 12z"
                          />
                        </g>
                      </svg>
                    </div>
                    <a href="mailto: info@shop.org.com">info@shop.org.com</a>
                  </div>

                  <div className="nav-address">
                    <div className="address-wrap">
                      <svg
                        version="1.0"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20.000000pt"
                        height="20.000000pt"
                        viewBox="0 0 20.000000 20.000000"
                        preserveAspectRatio="xMidYMid meet"
                      >
                        <g
                          transform="translate(0.000000,20.000000) scale(0.100000,-0.100000)"
                          fill="#FFF"
                          stroke="none"
                        >
                          <path
                            d="M66 174 c-9 -8 -16 -23 -16 -32 0 -22 37 -82 50 -82 13 0 50 60 50
                    82 0 22 -27 48 -50 48 -10 0 -26 -7 -34 -16z m52 -6 c16 -16 15 -49 -3 -72
                    -15 -20 -15 -20 -30 0 -8 10 -15 28 -15 40 0 19 17 44 30 44 3 0 11 -5 18 -12z"
                          />
                          <path
                            d="M90 145 c0 -8 5 -15 10 -15 6 0 10 7 10 15 0 8 -4 15 -10 15 -5 0
                    -10 -7 -10 -15z"
                          />
                          <path
                            d="M33 53 c-3 -10 -8 -21 -10 -25 -2 -5 32 -8 76 -8 79 0 80 0 72 23 -5
                    12 -17 23 -27 25 -18 3 -18 2 -1 -8 32 -20 18 -30 -43 -30 -60 0 -75 10 -42
                    29 16 10 16 10 -1 11 -10 0 -20 -8 -24 -17z"
                          />
                        </g>
                      </svg>
                    </div>
                    <a href="#">510, abc way, Elisbridge, Ahmadabad, 387001 </a>
                  </div>
                </div>
                <div className="nav-right">
                  <div className="follow">
                    <p>Follow us: </p>
                  </div>
                  <div className="social-image">
                    <a href="#" target="_blank">
                      <svg
                        focusable="false"
                        viewBox="2 2 24 24"
                        role="img"
                        aria-label="Facebook Icon"
                        data-hb-id="pl-icon"
                        data-enzyme-id="HomebaseIcon"
                      >
                        <title>Facebook Icon</title>
                        <path d="M22.9 4H5.1C4.5 4 4 4.5 4 5.1v17.8c0 .6.5 1.1 1.1 1.1h9.6v-7.7h-2.6v-3h2.6V11c0-2.6 1.6-4 3.9-4 1.1 0 2.1.1 2.3.1v2.7h-1.6c-1.3 0-1.5.6-1.5 1.5v1.9h3l-.4 3h-2.6V24h5.1c.6 0 1.1-.5 1.1-1.1V5.1c0-.6-.5-1.1-1.1-1.1"></path>
                      </svg>
                    </a>
                    <a href="#">
                      <svg
                        focusable="false"
                        viewBox="2 2 24 24"
                        role="img"
                        aria-label="Pinterest Icon"
                        data-hb-id="pl-icon"
                        data-enzyme-id="HomebaseIcon"
                      >
                        <title>Pinterest Icon</title>
                        <path d="M14 4C8.5 4 4 8.5 4 14c0 4.2 2.6 7.9 6.4 9.3-.1-.8-.2-2 0-2.9.2-.8 1.2-5 1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.9 0 1.3.6 1.3 1.4 0 .9-.5 2.1-.8 3.3-.2 1 .5 1.8 1.5 1.8 1.8 0 3.1-1.9 3.1-4.6 0-2.4-1.7-4.1-4.2-4.1-2.8 0-4.5 2.1-4.5 4.3 0 .9.3 1.8.7 2.3.1.1.1.2.1.3-.1.3-.2 1-.3 1.1 0 .2-.1.2-.3.1-1.2-.6-2-2.4-2-3.9 0-3.2 2.3-6.1 6.6-6.1 3.5 0 6.2 2.5 6.2 5.8 0 3.4-2.2 6.2-5.2 6.2-1 0-2-.5-2.3-1.1 0 0-.5 1.9-.6 2.4-.2.9-.8 2-1.2 2.6.8.5 1.8.7 2.8.7 5.5 0 10-4.5 10-10S19.5 4 14 4"></path>
                      </svg>
                    </a>
                    <a href="#">
                      <svg
                        focusable="false"
                        viewBox="2 2 24 24"
                        role="img"
                        aria-label="Instagram Icon"
                        data-hb-id="pl-icon"
                        data-enzyme-id="HomebaseIcon"
                      >
                        <title>Instagram Icon</title>
                        <path d="M23.9 9.9c0-1.1-.2-1.8-.5-2.4-.3-.7-.6-1.2-1.2-1.8-.6-.6-1.1-.9-1.8-1.2-.6-.2-1.4-.4-2.4-.5h-4c-2.7 0-3.1 0-4.1.1-1.1 0-1.8.2-2.4.5-.7.2-1.3.5-1.8 1.1-.6.5-.9 1.1-1.2 1.8-.2.6-.4 1.3-.4 2.4-.1 1-.1 1.4-.1 4.1 0 2.7 0 3.1.1 4.1 0 1.1.2 1.8.5 2.4.3.7.6 1.2 1.2 1.8.6.6 1.1.9 1.8 1.2.6.2 1.4.4 2.4.5 1.1 0 1.4.1 4.1.1s3.1 0 4.1-.1c1.1 0 1.8-.2 2.4-.5.7-.3 1.2-.6 1.8-1.2.6-.6.9-1.1 1.2-1.8.2-.6.4-1.4.5-2.4 0-1.1.1-1.4.1-4.1-.2-2.7-.2-3.1-.3-4.1zM22.1 18c0 1-.2 1.5-.3 1.9-.2.5-.4.8-.7 1.1-.3.3-.7.6-1.1.7-.4.1-.9.3-1.9.3-1.1 0-1.4.1-4 .1s-3 0-4-.1c-1 0-1.5-.2-1.9-.3-.6-.1-.9-.3-1.2-.7-.3-.3-.6-.7-.7-1.1-.2-.4-.4-.9-.4-1.9 0-1.1-.1-1.4-.1-4 0-2.7 0-3 .1-4 0-1 .2-1.5.3-1.9.2-.5.4-.8.8-1.1.3-.3.7-.6 1.1-.7.4-.2.9-.4 1.9-.4 1.1 0 1.4-.1 4-.1s3 0 4 .1c1 0 1.5.2 1.9.3.5.2.8.4 1.1.8.3.3.6.7.7 1.1.1.4.3.9.3 1.9 0 1.1.1 1.4.1 4 .1 2.7.1 3 0 4z"></path>
                        <path d="M14 8.9c-2.8 0-5.1 2.3-5.1 5.1s2.3 5.1 5.1 5.1 5.1-2.3 5.1-5.1-2.3-5.1-5.1-5.1zm0 8.4c-1.8 0-3.3-1.5-3.3-3.3s1.5-3.3 3.3-3.3 3.3 1.5 3.3 3.3-1.5 3.3-3.3 3.3z"></path>
                        <circle cx="19.3" cy="8.7" r="1.2"></circle>
                      </svg>
                    </a>
                    <a href="#">
                      <svg
                        focusable="false"
                        viewBox="0 0 24 24"
                        role="img"
                        aria-label="TikTok"
                        data-hb-id="pl-icon"
                        data-enzyme-id="HomebaseIcon"
                      >
                        <title>TikTok</title>
                        <path d="M13.105 16.021V2.25h3.102v.756C16.207 4.461 18.5 6.97 20 6.97h.75v2.91c-.316 0-.453 0-.75.004-1.473-.024-3-.864-3.92-1.584-.018-.015 0 1.977 0 7.721 0 3.569-3.07 5.729-5.914 5.729-3.77 0-5.916-3.3-5.916-5.75-.14-4.163 3.25-6.75 6.67-6.48v3.04c-.332.01-.646.002-.92 0-2.193.11-2.9 2.11-2.9 3.44s.955 2.844 3.066 2.844c1.998 0 2.94-1.703 2.94-2.823z"></path>
                      </svg>
                    </a>

                    <a href="#">
                      <svg
                        focusable="false"
                        viewBox="0 0 24 24"
                        role="img"
                        aria-label="YouTube"
                        data-hb-id="pl-icon"
                        data-enzyme-id="HomebaseIcon"
                      >
                        <title>YouTube</title>
                        <path d="M17.9 5.2c-2.8-.2-9-.2-11.8 0-3 .2-3.4 2-3.4 6.8s.4 6.6 3.4 6.8c2.8.2 9 .2 11.8 0 3-.2 3.4-2 3.4-6.8s-.4-6.5-3.4-6.8zm-8.2 9.9V8.9l6.2 3.1-6.2 3.1z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
      <div className="footer-bottom-wrap">
        <div className="container">
          <div className="footer-bottom">
            <div className="bottom-left">
              <div className="footer-privacy">
                <ul>
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li style={{ color: "white" }}>|</li>
                  <li>
                    <a>Terms & Conditions</a>
                  </li>
                  <li style={{ color: "white" }}>|</li>
                  <li>
                    <a>Copyright &copy; easyShop India</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bottom-right">Charity number: 1069048</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
