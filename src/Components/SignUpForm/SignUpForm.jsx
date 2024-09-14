import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import API_BASE_URL from "../../constant";
import { message } from "antd"; // Import message from antd
import "./SignUpForm.css";
import LogoAccent from "/Logos/LogoAccent.png";
import { Link } from "react-router-dom";
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [countries, setCountries] = useState([]); // State to store country list
  const [fileList, setFileList] = useState([]); // State to manage uploaded files

  useEffect(() => {
    // Fetch countries from API
    const fetchCountries = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/customer/countries`);
        setCountries(response.data); // Store fetched countries in state
      } catch (error) {
        message.error("Failed to load countries");
      }
    };
    fetchCountries();
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (key === "documents") {
        for (const file of data[key]) {
          formData.append("documents", file); // Append the file list
        }
      } else {
        formData.append(key, data[key]);
      }
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        message.success("Signup successful!");
        reset();
      } else if (response.status === 400) {
        message.error("Email already present.");
      } else {
        message.error("Something went wrong.");
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        message.error("Something went wrong.");
      } else {
        message.error(error.message);
      }
    }
  };

  // Watch password value to compare with confirm password
  const password = watch("password");

  // Handle file changes for the Upload component
  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
    setValue("documents", fileList.map(file => file.originFileObj)); // Manually set the files in react-hook-form
  };

  return (
    <div className="bg-signup">
      <div className="wrapper-signup">
        <div className="logo">
          <img src={LogoAccent} alt="Company Logo" />
        </div>
        <div className="inner-wrapper-signup">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="form-heading">Register Your Account</h2>

            <div className="linebreak">
              <h3>
                <span>Your Personal Details</span>
              </h3>
            </div>
            <div className="input-box">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                {...register("firstName", { required: "First name is required" })}
              />
              {errors.firstName && <span className="error-message">{errors.firstName.message}</span>}
            </div>
            <div className="input-box">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                {...register("lastName", { required: "Last name is required" })}
              />
              {errors.lastName && <span className="error-message">{errors.lastName.message}</span>}
            </div>
            <div className="input-box">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.email && <span className="error-message">{errors.email.message}</span>}
            </div>

            <div className="linebreak">
              <h3>
                <span>Company Details</span>
              </h3>
            </div>
            <div className="input-box">
              <label htmlFor="companyName">Company Name</label>
              <input
                type="text"
                id="companyName"
                {...register("companyName", { required: "Company name is required" })}
              />
              {errors.companyName && <span className="error-message">{errors.companyName.message}</span>}
            </div>
            <div className="input-box">
              <label htmlFor="storeAddress">Store Address</label>
              <input
                type="text"
                id="storeAddress"
                {...register("storeAddress", { required: "Store address is required" })}
              />
              {errors.storeAddress && <span className="error-message">{errors.storeAddress.message}</span>}
            </div>

            <label htmlFor="businessLicense">
              Business license or Corporation Paper
            </label>
            <div className="input-box-1">
              <div className="upload-icon">
                <Upload
                  fileList={fileList} // Set fileList state
                  onChange={handleFileChange} // Handle file change
                  beforeUpload={() => false} // Disable auto upload
                  multiple
                >
                  <Button icon={<UploadOutlined />} className="upload-btn"></Button>
                </Upload>
              </div>
              <p className="drag-text">Click or drag file to this area to upload</p>
            </div>

            {/* Country dropdown */}
            <div className="input-box">
              <label htmlFor="country">Country</label>
              <select
                id="country"
                {...register("country", { required: "Country is required" })}
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.Id} value={country.Name}>
                    {country.Name}
                  </option>
                ))}
              </select>
              {errors.country && <span className="error-message">{errors.country.message}</span>}
            </div>
            <div className="input-box">
              <label htmlFor="state">State / Province</label>
              <input
                type="text"
                id="state"
                {...register("state", { required: "State is required" })}
              />
              {errors.state && <span className="error-message">{errors.state.message}</span>}
            </div>

            <div className="linebreak">
              <h3>
                <span>Your Contact Information</span>
              </h3>
            </div>
            <div className="input-box">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                {...register("phone", { required: "Phone number is required" })}
              />
              {errors.phone && <span className="error-message">{errors.phone.message}</span>}
            </div>

            <div className="linebreak">
              <h3>
                <span>Password</span>
              </h3>
            </div>
            <div className="input-box">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
              />
              {errors.password && <span className="error-message">{errors.password.message}</span>}
            </div>
            <div className="input-box">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword.message}</span>
              )}
            </div>

            <div className="input-box">
              <button type="submit" className="submit-button">
                Register
              </button>
            </div>
            <div className="form-footer">
              <p>
                Already have an account? <Link to="/login">Login here</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
