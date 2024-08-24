import React, { useState, useContext } from "react";
import API_BASE_URL from "../../constant";
import axios from "axios";
import "./LoginForm.css";
import LogoAccent from "/Logos/LogoAccent.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext/AuthContext";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    loginemail: "",
    password: "",
    rememberMe: false,
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email: formData.loginemail,
        password: formData.password,
      });

      if (response.status === 200) {
        const { token } = response.data;
        login(token, formData.rememberMe);
        navigate("/"); // Navigate to a protected route
      } else {
        console.error("Login failed");
        // Handle login errors (e.g., show a message)
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Handle error (e.g., show a message)
    }
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
