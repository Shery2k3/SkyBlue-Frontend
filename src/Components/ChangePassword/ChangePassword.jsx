import { useState } from "react";
import axiosInstance from "../../api/axiosConfig";
import { message } from "antd";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    const { currentPassword, newPassword, confirmPassword } = formData;

    // Check if all fields are filled
    if (!currentPassword || !newPassword || !confirmPassword) {
      message.error("All fields are required.");
      return;
    }

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      message.error("New Password and Confirm Password do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axiosInstance.put("/customer/change-password", {
        currentPassword,
        newPassword,
      });
      console.log(response);
      message.success("Password Updated");
    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to Update");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="account-info">
      <h2>Change password</h2>

      <section className="form-section">
        <div className="form-group">
          <label>Old Password: *</label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
          />
        </div>
        <div className="form-groups-container">
          <div className="form-group">
            <label>New Password: *</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Confirm Password: *</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
        </div>
      </section>
      <button
        type="button"
        className="save-button"
        onClick={handleSave}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Updating..." : "Change Password"}
      </button>
    </div>
  );
};

export default ChangePassword;
