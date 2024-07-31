import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faWhatsapp,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faPhone,
  faLocationDot,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import logo from "/Logos/logo.png";
import bytesync from "/Logos/bytesync.png";
import { Link } from "react-router-dom";
import "./Footer1.css";

const Footer1 = () => {
  const emailAddress = "sales@skybluewholesale.com";
  const phoneNumber = "416-841-9595";

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const handleContactClick = (contactType) => {
    if (contactType === "email") {
      window.location.href = `mailto:${emailAddress}`;
    } else if (contactType === "phone" && isMobile) {
      window.location.href = `tel:${phoneNumber}`;
    } else if (contactType === "whatsapp") {
      window.open(`https://wa.me/${phoneNumber}`, "_blank");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <footer className="footer1">
        <div className="footer1-sections">
          <div className="footer1-logo">
            <Link onClick={scrollToTop} to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>

          <div className="footer1-quick-links">
            <h2 className="footer1-heading">INFORMATION</h2>
            <span>
              <Link className="footer1-link" onClick={scrollToTop} to="/">
                Refunds policy
              </Link>
              <Link className="footer1-link" onClick={scrollToTop} to="/">
                Privacy policy
              </Link>
              <Link className="footer1-link" onClick={scrollToTop} to="/">
                Terms & Conditions
              </Link>
            </span>
          </div>

          <div className="footer1-get-in-touch">
            <div>
              <h2 className="footer1-heading">GET IN TOUCH</h2>
              <span onClick={() => handleContactClick("phone")}>
                <FontAwesomeIcon icon={faLocationDot} className="footer1-icon" />{" "}
                <p>1300 Kamato Rd Unit 8 &  <br /> Mississauga, Ontario L4W 2N2</p>
              </span>
              <span onClick={() => handleContactClick("phone")}>
                <FontAwesomeIcon icon={faPhone} className="footer1-icon" />{" "}
                <p>416-841-9595 <br />647-522-7419</p>
              </span>
              <span onClick={() => handleContactClick("email")}>
                <FontAwesomeIcon icon={faEnvelope} className="footer1-icon" />{" "}
                <p>sales@skybluewholesale.com</p>
              </span>
             
            </div>
          </div>

          <div className="footer1-socials-section">
            <h2 className="footer1-heading">OUR SOCIALS</h2>
            <div className="footer1-socials">
              <a
                href="https://www.facebook.com/profile.php?id=61550104945269"
                target="_"
              >
                <FontAwesomeIcon icon={faFacebookF} className="footer1-social" />
              </a>
              <a href="https://www.instagram.com/m_fast_food/" target="_">
                <FontAwesomeIcon icon={faInstagram} className="footer1-social" />
              </a>
              <FontAwesomeIcon icon={faXTwitter} className="footer1-social" />
              <FontAwesomeIcon
                icon={faWhatsapp}
                className="footer1-social"
                onClick={() => handleContactClick("whatsapp")}
              />
            </div>
          </div>
        </div>

        <div className="footer1-attributes">
          <p className="footer1-name">
            Copyright © 2024 Sky Blue Wholesale. All rights reserved.
          </p>
          <span>
            <p>Powered by: </p>
            <a href="https://bytesyncstudio.com/" target="_blank">
              <img className="footer1-bytesync" src={bytesync} alt="bytesync logo" />
            </a>
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer1;
