import React, { useState } from "react";
import message from "antd/es/message/";
import axiosInstance from "../../api/axiosConfig";
import retryRequest from "../../api/useRetryRequest";
import "./NewsLetter.css";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      message.error("Please enter a valid email address");
      return;
    }
    try {
      const response = await axiosInstance.post("/customer/newsletter", { email });
      message.success("Subscribed to Newsletter");
      setEmail("");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        message.error("Email already exists");
      } else {
        message.error("Failed to subscribe to Newsletter");
      }
      console.error("Error submitting email:", error);
    }
  };

  return (
    <div className="newsletter-container">
      <div className="newsletter">
        <h2>Subscribe to our Newsletter</h2>
        <p>
          Register today to receive exclusive updates on our latest promotions,
          special offers, and upcoming events. Be the first to know about
          exciting deals that can enhance your experience with us!
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;