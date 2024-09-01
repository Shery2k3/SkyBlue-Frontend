import React, { useState } from "react";
import "./SignUpForm.css";
import LogoAccent from "/Logos/LogoAccent.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox } from '@fortawesome/free-solid-svg-icons';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    storeAddress: "",
    businessLicense: null,
    streetAddress1: "",
    streetAddress2: "",
    zipCode: "",
    city: "",
    country: "",
    state: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="bg-signup">

    
    <div className="wrapper-signup">
      <div className="logo">
        <img src={LogoAccent} alt="Company Logo" />
      </div>
      <div className="inner-wrapper-signup">
        <form onSubmit={handleSubmit}>
          <h2 className="form-heading">Register Your Account</h2>

          <div className="linebreak"><h3><span>Your Personal Details</span></h3></div>
          <div className="input-box">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="linebreak"><h3><span>Company Details</span></h3></div>
          <div className="input-box">
            <label htmlFor="companyName">Company Name</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <label htmlFor="storeAddress">Store Address</label>
            <input
              type="text"
              id="storeAddress"
              name="storeAddress"
              value={formData.storeAddress}
              onChange={handleChange}
              required
            />
          </div>

          
          <label htmlFor="businessLicense">Business license or Corporation Paper</label>
          <div className="input-box-1">
            
            
            <div className="upload-icon">
              <input
                type="file"
                id="businessLicense"
                name="businessLicense"
                onChange={handleChange}
              />
            </div>
            <FontAwesomeIcon icon={faBox} size="3x" style={{ color: '#00273E' }}  />
            <p>Click or drag file to this area to upload</p>
          </div>

          <div className="linebreak"><h3><span>Your Address</span></h3></div>
          <div className="input-box">
            <label htmlFor="streetAddress1">Street Address</label>
            <input
              type="text"
              id="streetAddress1"
              name="streetAddress1"
              value={formData.streetAddress1}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <label htmlFor="streetAddress2">Street Address 2</label>
            <input
              type="text"
              id="streetAddress2"
              name="streetAddress2"
              value={formData.streetAddress2}
              onChange={handleChange}
            />
          </div>
          <div className="input-box">
            <label htmlFor="zipCode">Zip / Postal Code</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <label htmlFor="state">State / Province</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>

          <div className="linebreak"><h3><span>Your Contact Information</span></h3></div>
          <div className="input-box">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="linebreak"><h3><span>Password</span></h3></div>
          <div className="input-box">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Register
          </button>
        </form>
        <div className="linebreak"><h3><span>Or</span></h3></div>
        <p>
            Already had An Account? <Link to="/login" className="link-of-signup">Sign in</Link> 
        </p>
      </div>
    </div>
    </div>
  );
};

export default SignupForm;
