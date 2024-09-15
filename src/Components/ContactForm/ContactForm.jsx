import React, { useState } from "react";
import "./ContactForm.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    enquiryType: "",
    enquiry: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="contact-form-wrapper">
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="enquiryType">Enquiry Type</label>
          <select
            name="enquiryType"
            value={formData.enquiryType}
            onChange={handleChange}
          >
            <option value="">Select Enquiry Type</option>
            <option value="general">General</option>
            <option value="support">Support</option>
            <option value="sales">Sales</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="enquiry">Enquiry</label>
          <textarea
            name="enquiry"
            placeholder="Enquiry..."
            value={formData.enquiry}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" className="submit-button">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
