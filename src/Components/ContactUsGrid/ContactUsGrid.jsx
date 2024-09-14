import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faFax,
  faEnvelope,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import "./ContactUsGrid.css";

const ContactUsGrid = () => {
  return (
    <div className="contact-us">
      <h2>Contact Us</h2>
      <div className="contact-us-grid">
        <span className="grid-item">
          <FontAwesomeIcon icon={faPhone} />
          <span>
            <span className="sub-text">For order related inquiries:</span>{" "}
            +16473545465
          </span>
        </span>
        <span className="grid-item">
          <FontAwesomeIcon icon={faPhone} />
          <span>
            <span className="sub-text">For delivery related inquiries:</span>{" "}
            +16473545465
          </span>
        </span>
        <span className="grid-item">
          <FontAwesomeIcon icon={faPhone} />
          <span>
            <span className="sub-text">For pallets shipping inquiries:</span>{" "}
            +14169515320
          </span>
        </span>
        <span className="grid-item">
          <FontAwesomeIcon icon={faPhone} />
          <span>
            <span className="sub-text">For sales related inquiries:</span>{" "}
            +14169515320
          </span>
        </span>
        <span className="grid-item">
          <FontAwesomeIcon icon={faPhone} />
          <span>
            <span className="sub-text">
              For customer service related inquiries:
            </span>{" "}
            905 625 2583
          </span>
        </span>
        <span className="grid-item">
          <FontAwesomeIcon icon={faPhone} />
          <span>
            <span className="sub-text">For price issue or any complains:</span>{" "}
            647 482 2582
          </span>
        </span>

        <span className="grid-item">
          <FontAwesomeIcon icon={faEnvelope} />
          <span>sales@skybluewholesale.com</span>
        </span>
        <span className="grid-item">
          <FontAwesomeIcon icon={faLocationDot} />
          <span>1300 Kamato Rd Unit 8 & 9 Mississauga, Ontario L4W 2N2</span>
        </span>
      </div>
    </div>
  );
};

export default ContactUsGrid;
