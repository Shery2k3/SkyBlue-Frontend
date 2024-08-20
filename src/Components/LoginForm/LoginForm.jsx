import React, { useState } from "react";
import "./LoginForm.css";
import LogoAccent from "/Logos/LogoAccent.png";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    loginemail: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="wrapper-login">
      <div className="logo">
        <img src={LogoAccent} alt="Company Logo" />
      </div>
      <div className="inner-wrapper-login">
        <form onSubmit={handleSubmit}>
          <h2 className="form-heading">Welcome, Please Sign In!</h2>
          <div className="input-box">
            <label htmlFor="loginemail">Your Email</label>
            <input
              type="text"
              placeholder="example@gmail.com"
              id="loginemail"
              name="loginemail"
              value={formData.loginemail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="remember-forget">
            <label>
              <input    
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <p className="remember-me">Remember me</p>
            </label>
            <Link to="/forget-password">Forget password?</Link>
          </div>
          <button type="submit" className="submit-button">
            Log in
          </button>
        </form>
        <div className="linebreak">
        <h3><span>or</span></h3>
        </div>
        <div className="register_link">
          <p>
            Do not Have an Account? <Link to="/signup">Sign Up</Link> 
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
