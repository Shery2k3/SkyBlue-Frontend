import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faFax,
  faEnvelope,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import "./ContactUsGrid.css"

const ContactUsGrid = () => {
  return (
    <div className="contact-us">
      <h2>Contact Us</h2>
      <div className="contact-us-grid">
        <span className="grid-item">
          <FontAwesomeIcon icon={faPhone} />
          <span>
            <p>416-841-9595</p>
            <p>647-522-7419</p>
          </span>
        </span>
        <span className="grid-item">
          <FontAwesomeIcon icon={faFax} />
          <span>905-625-5389</span>
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