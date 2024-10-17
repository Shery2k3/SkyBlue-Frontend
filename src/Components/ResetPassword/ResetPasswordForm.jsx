import React, { useState, useEffect } from "react";
import API_BASE_URL from "../../constant";
import axios from "axios";
import "./ResetPasswordForm.css"; 
import { Alert } from "antd";
import { useLocation } from "react-router-dom";

const ResetPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState({
    visible: false,
    message: "",
    type: "info",
  });
  const [isTokenValid, setIsTokenValid] = useState(false);
  const location = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setAlert({
        visible: true,
        message: "Passwords do not match.",
        type: "error",
      });
      return;
    }

    const token = new URLSearchParams(location.search).get("token");

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/save-new-password`, {
        token,
        newPassword: password,
      });

      if (response.status === 200) {
        setAlert({
          visible: true,
          message: "Password has been changed successfully.",
          type: "success",
        });
      } else {
        setAlert({
          visible: true,
          message: "Failed to change password. Please try again.",
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

  useEffect(() => {
    const validateToken = async () => {
      const token = new URLSearchParams(location.search).get("token");

      try {
        const response = await axios.get(`${API_BASE_URL}/auth/validate-reset-token`, {
          params: { token },
        });

        if (response.status === 200) {
          setIsTokenValid(true);
        } else {
          setAlert({
            visible: true,
            message: "Invalid or expired token.",
            type: "error",
          });
        }
      } catch (error) {
        setAlert({
          visible: true,
          message: "Invalid or expired token.",
          type: "error",
        });
      }
    };

    validateToken();
  }, [location.search]);

  return (
    <div className="wrapper-change-password">
      <div className="inner-wrapper-change-password">
        {isTokenValid ? (
          <form onSubmit={handleSubmit}>
            <h2 className="form-heading">Change Password</h2>
            <p>Enter your new password below.</p>
            <div className="input-box">
              <input
                type="password"
                placeholder="New Password"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Confirm Password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
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
              Change Password
            </button>
          </form>
        ) : (
          <Alert
            message="Invalid or expired token."
            type="error"
            style={{ marginBottom: 16 }}
          />
        )}
      </div>
    </div>
  );
};

export default ResetPasswordForm;