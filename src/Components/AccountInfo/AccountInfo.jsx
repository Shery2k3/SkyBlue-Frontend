import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosConfig";
import { message } from "antd";
import "./AccountInfo.css";

const AccountInfo = ({ userInfo }) => {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Company: "",
    Address1: "",
    ZipPostalCode: "",
    City: "",
    CountryId: "",
    StateProvinceId: "",
    PhoneNumber: "",
  });

  // Update formData whenever userInfo changes
  useEffect(() => {
    setFormData({
      FirstName: userInfo.FirstName || "",
      LastName: userInfo.LastName || "",
      Company: userInfo.Company || "",
      Address1: userInfo.Address1 || "",
      ZipPostalCode: userInfo.ZipPostalCode || "",
      City: userInfo.City || "",
      CountryId: userInfo.CountryId || "",
      StateProvinceId: userInfo.StateProvinceId || "",
      PhoneNumber: userInfo.PhoneNumber || "",
    });
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await axiosInstance.put(
        "/customer/update-info",
        formData
      );
      message.success("Info Updated");
    } catch (error) {
      console.error("Error:", error);
      message.success("Failed to Update");
    }
  };

  return (
    <div className="account-info">
      <h2>Account Info</h2>

      <section className="form-section">
        <h3>Your Personal Details</h3>
        <div className="form-groups-container">
          <div className="form-group">
            <label>First name: *</label>
            <input
              type="text"
              name="FirstName"
              value={formData.FirstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Last name: *</label>
            <input
              type="text"
              name="LastName"
              value={formData.LastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
            <label>Email: *</label>
            <input
              type="email"
              name="Email"
              value="Noman@skybluewholesale.com"
              readOnly
            />
          </div>
      </section>

      <section className="form-section">
        <h3>Company Details</h3>
        <div className="form-group">
          <label>Company name:</label>
          <input
            type="text"
            name="Company"
            value={formData.Company}
            onChange={handleChange}
          />
        </div>
      </section>

      <section className="form-section">
        <h3>Your Address</h3>
        <div className="form-group">
          <label>Street address: *</label>
          <input
            type="text"
            name="Address1"
            value={formData.Address1}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Street address 2:</label>
          <input type="text" name="Address2" value="" readOnly />
        </div>
        <div className="form-groups-container">
          <div className="form-group">
            <label>Zip / postal code: *</label>
            <input
              type="text"
              name="ZipPostalCode"
              value={formData.ZipPostalCode}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>City: *</label>
            <input
              type="text"
              name="City"
              value={formData.City}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-groups-container">
          <div className="form-group">
            <label>Country: *</label>
            <select
              name="CountryId"
              value={formData.CountryId}
              onChange={handleChange}
            >
              <option value="2">Canada</option>
              {/* Add more countries as needed */}
            </select>
          </div>
          <div className="form-group">
            <label>State / province: *</label>
            <select
              name="StateProvinceId"
              value={formData.StateProvinceId}
              onChange={handleChange}
            >
              <option value="71">{userInfo.StateProvinceName}</option>
              {/* Add more states as needed */}
            </select>
          </div>
        </div>
      </section>

      <section className="form-section">
        <h3>Your Contact Information</h3>
        <div className="form-group">
          <label>Phone: *</label>
          <input
            type="text"
            name="PhoneNumber"
            value={formData.PhoneNumber}
            onChange={handleChange}
          />
        </div>
      </section>

      <button type="button" className="save-button" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default AccountInfo;
