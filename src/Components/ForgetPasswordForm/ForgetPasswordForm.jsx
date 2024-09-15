import React, { useState } from "react";
import API_BASE_URL from "../../constant";
import axios from "axios";
import "./ForgetPasswordForm.css"; 
import { Alert } from "antd";

const ForgetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({
    visible: false,
    message: "",
    type: "info", 
  });

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/forgot-password`, {
        email,
      });

      if (response.status === 200) {
        setAlert({
          visible: true,
          message: "Password reset link has been sent to your email.",
          type: "success",
        });
      } else {
        setAlert({
          visible: true,
          message: "Failed to send reset link. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      setAlert({
        visible: true,
        message: error.response ? error.response.data.message || "An error occurred. Please try again." : "An error occurred. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <div className="wrapper-forget-password">
      <div className="inner-wrapper-forget-password">
        <form onSubmit={handleSubmit}>
          <h2 className="form-heading">Trouble logging in?</h2>
          <p>Enter your email and we'll send you a link to get back into your account.</p>
          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          {alert.visible && (
            <Alert
              message={alert.message}
              type={alert.type}
              closable
              onClose={() => setAlert({ ...alert, visible: false })}
              style={{ marginBottom: 16 }}
            />
          )}
          <button type="submit" className="submit-button">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPasswordForm;
