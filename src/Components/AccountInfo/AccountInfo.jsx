import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosConfig";
import useRetryRequest from "../../api/useRetryRequest"; // Import the retry hook
import { message } from "antd";
import "./AccountInfo.css";

const AccountInfo = ({ isLoading, setIsLoading }) => {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Company: "",
    Address1: "",
    Address2: "",
    ZipPostalCode: "",
    City: "",
    CountryId: "",
    StateProvinceId: "",
    PhoneNumber: "",
    Email: "",
  });

  const [countries, setCountries] = useState([
    { Id: 1, Name: "United States" },
    { Id: 2, Name: "Canada" },
  ]);
  const [states, setStates] = useState([]);
  const [errors, setErrors] = useState({});

  const retryRequest = useRetryRequest(); // Use retryRequest

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfoResponse = await retryRequest(() =>
          axiosInstance.get("/customer/info")
        );
        const userInfo = userInfoResponse.data[0];
        const statesResponse = await retryRequest(() =>
          axiosInstance.get(`/customer/states/${userInfo.CountryId}`)
        );

        setFormData({
          FirstName: userInfo.FirstName || "",
          LastName: userInfo.LastName || "",
          Company: userInfo.Company || "",
          Address1: userInfo.Address1 || "",
          Address2: userInfo.Address2 || "",
          ZipPostalCode: userInfo.ZipPostalCode || "",
          City: userInfo.City || "",
          CountryId: userInfo.CountryId || "",
          StateProvinceId: userInfo.StateProvinceId || "",
          PhoneNumber: userInfo.PhoneNumber || "",
          Email: userInfo.Email || "",
        });
        setStates(statesResponse.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load data:", error);
        message.error("Failed to load user information.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [retryRequest, setIsLoading]);

  useEffect(() => {
    const fetchStates = async () => {
      if (!formData.CountryId) return;
      try {
        const response = await retryRequest(() =>
          axiosInstance.get(`/customer/states/${formData.CountryId}`)
        );
        setStates(response.data);
      } catch (error) {
        console.error("Failed to load states:", error);
        message.error("Failed to load states.");
      }
    };

    fetchStates();
  }, [formData.CountryId, retryRequest]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.FirstName) newErrors.FirstName = "First name is required";
    if (!formData.LastName) newErrors.LastName = "Last name is required";
    if (!formData.Address1) newErrors.Address1 = "Street address is required";
    if (!formData.ZipPostalCode)
      newErrors.ZipPostalCode = "Zip / postal code is required";
    if (!formData.City) newErrors.City = "City is required";
    if (!formData.CountryId) newErrors.CountryId = "Country is required";
    if (!formData.StateProvinceId)
      newErrors.StateProvinceId = "State / province is required";
    if (!formData.PhoneNumber)
      newErrors.PhoneNumber = "Phone number is required";
    if (!formData.Email) {
      newErrors.Email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.Email)) {
      newErrors.Email = "Email is not valid";
    }
    setErrors(newErrors);
    return newErrors;
  };

  const handleSave = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      const errorMessages = Object.values(validationErrors).join(", ");
      message.error(`Please fix the following errors: ${errorMessages}`);
      return;
    }

    try {
      await retryRequest(() => axiosInstance.put("/customer/update-info", formData));
      message.success("Info Updated");
    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to Update");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator if isLoading is true
  }

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
           {errors.FirstName && <span className="error-message">{errors.FirstName}</span>}
      
          </div>
          <div className="form-group">
            <label>Last name: *</label>
            <input
              type="text"
              name="LastName"
              value={formData.LastName}
              onChange={handleChange}
            />
            {errors.LastName && <span className="error-message">{errors.LastName}</span>}
      
          </div>
        </div>
        <div className="form-group">
          <label>Email: *</label>
          <input
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            readOnly
          />
          {errors.Email && <span className="error-message">{errors.Email}</span>}
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
          {errors.Address1 && <span className="error-message">{errors.Address1}</span>}
        </div>
        <div className="form-group">
          <label>Street address 2:</label>
          <input
            type="text"
            name="Address2"
            value={formData.Address2}
            onChange={handleChange}
          />
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
            {errors.ZipPostalCode && (
              <span className="error-message">{errors.ZipPostalCode}</span>
            )}
          </div>
          <div className="form-group">
            <label>City: *</label>
            <input
              type="text"
              name="City"
              value={formData.City}
              onChange={handleChange}
            />
            {errors.City && <span className="error-message">{errors.City}</span>}
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
              {countries.map((country) => (
                <option key={country.Id} value={country.Id}>
                  {country.Name}
                </option>
              ))}
            </select>
            {errors.CountryId && (
              <span className="error">{errors.CountryId}</span>
            )}
          </div>
          <div className="form-group">
            <label>State / province: *</label>
            <select
              name="StateProvinceId"
              value={formData.StateProvinceId}
              onChange={handleChange}
            >
              {states.map((state) => (
                <option key={state.Id} value={state.Id}>
                  {state.Name}
                </option>
              ))}
            </select>
            {errors.StateProvinceId && (
              <span className="error">{errors.StateProvinceId}</span>
            )}
          </div>
        </div>
        <div className="form-group">
          <label>Phone number: *</label>
          <input
            type="text"
            name="PhoneNumber"
            value={formData.PhoneNumber}
            onChange={handleChange}
          />
          {errors.PhoneNumber && (
            <span className="error-message">{errors.PhoneNumber}</span>
          )}
        </div>
      </section>

      <div className="form-submit-container">
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AccountInfo;
