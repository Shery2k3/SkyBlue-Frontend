import { Link } from "react-router-dom";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about">
        <h2>SkyBlue Wholesale</h2>
        <h3>
          Welcome to Your Trusted Wholesale Supplier with Over 4,000 Customers
          and More Than 260,000 Products Sold Annually
        </h3>
        <p>
          For years, we have consistently delivered millions of high-quality
          products to a diverse range of businesses, including independent
          retailers, convenience stores, gas stations, gift shops, pharmacies,
          and more. Our extensive inventory includes everything from beverages
          and snacks to essential goods and candies. It's no wonder that over
          4,000 customers choose us as their premier wholesale distributor for
          all their product needs.
        </p>
        <Link to="/all-products" className="shop-now-button">
          SHOP NOW
        </Link>
      </div>
    </div>
  );
};

export default About;
