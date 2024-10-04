import React, { useState } from "react";
import message from "antd/es/message/";
import axiosInstance from "../../api/axiosConfig";
import retryRequest from "../../api/useRetryRequest";
import "./NewsLetter.css";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    setIsSubmitting(true)
    message.loading({ content: "Subscribing", key: "subscribe" });
    e.preventDefault();
    if (!validateEmail(email)) {
      message.error("Please enter a valid email address");
      return;
    }
    
    try {
      const response = await axiosInstance.post("/customer/newsletter", { email });
      message.success({
        content: "Subscribed to Newsletter",
        key: "subscribe",
        duration: 1,
      });
      setEmail("");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        message.error({
          content: "Email already exists",
          key: "subscribe",
          duration: 1,
        });
      } else {
        message.error({
          content: "Failed to subscribe to Newsletter",
          key: "subscribe",
          duration: 1,
        });
      }
      console.error("Error submitting email:", error);
    } finally {
      setIsSubmitting(false)
      setEmail("");
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
          <button className={`subscribe-button ${isSubmitting ? "disabled" : ""}`} type="submit">Subscribe</button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;