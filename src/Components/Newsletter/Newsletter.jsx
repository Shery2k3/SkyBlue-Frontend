import React, { useState } from "react";
import message from "antd/es/message/";
import "./NewsLetter.css";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setEmail("");
    message.success("Subscribed to Newsletter");
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
