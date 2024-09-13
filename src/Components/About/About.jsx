import { Link } from "react-router-dom";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about">
        <h2>SkyBlue Wholesale</h2>
        <h3>
          An online candy store with more than 4.000 customers and more than 260
          thousand products sold yearly.
        </h3>
        <p>
          Over the years, we've reliably shipped millions of delicious products
          to independent candy stores, convenience stores, gas stations, gift
          stores, pharmacies, and other candy vendors too. It's the reason why
          more than 4000 different customers choose Pacific Candy Wholesale as
          their number one Canadian candy distributor.
        </p>
        <Link to="/all-products" className="shop-now-button">
          SHOP NOW
        </Link>
      </div>
    </div>
  );
};

export default About;
