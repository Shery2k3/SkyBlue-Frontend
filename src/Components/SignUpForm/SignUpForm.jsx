import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import API_BASE_URL from "../../constant";
import { message } from "antd";
import "./SignUpForm.css";
import LogoAccent from "/Logos/LogoAccent.png";
import { Link } from "react-router-dom";
import { Upload, Button } from "antd";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  UploadOutlined,
} from "@ant-design/icons";

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState(null);
  const [fileList, setFileList] = useState([]);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/customer/countries`);
        const filteredCountries = response.data.filter(
          (country) => country.Id === 1 || country.Id === 2
        );
        setCountries(filteredCountries);
      } catch (error) {
        message.error("Failed to load countries");
      }
    };
    fetchCountries();
  }, []);

  console.log("Countries:", countries);

  useEffect(() => {
    if (selectedCountryId) {
      const fetchStates = async () => {
        try {
          const response = await axios.get(
            `${API_BASE_URL}/customer/states/${selectedCountryId}`
          );
          console.log("Fetching states");
          setStates(response.data);
        } catch (error) {
          message.error("Failed to load states");
        }
      };
      fetchStates();
    }
  }, [selectedCountryId]);

  const onSubmit = async (data) => {
    console.log("Form data before conversion:", data);

    const formData = new FormData();
    for (const key in data) {
      if (key === "documents") {
        for (const file of data[key]) {
          formData.append("documents", file);
        }
      } else {
        formData.append(key, data[key]);
      }
    }

    console.log("FormData object:", formData);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/signup`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        message.success("Signup successful!");
        reset();
      } else if (response.status === 400) {
        message.error("Email already present.");
      } else {
        message.error("Something went wrong.");
      }
    } catch (error) {
      message.error("Something went wrong.");
    }
  };

  const handleCountryChange = (e) => {
    const selectedCountryId = e.target.value;
    setSelectedCountryId(selectedCountryId);
  };

  const password = watch("password");

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
    setValue(
      "documents",
      fileList.map((file) => file.originFileObj)
    );
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
                {...register("firstName", {
                  required: "First name is required",
                })}
                autoComplete="given-name"
              />
              {errors.firstName && (
                <span className="error-message">
                  {errors.firstName.message}
                </span>
              )}
            </div>
            <div className="input-box">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                {...register("lastName", { required: "Last name is required" })}
                autoComplete="family-name"
              />
              {errors.lastName && (
                <span className="error-message">{errors.lastName.message}</span>
              )}
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
                autoComplete="email"
              />
              {errors.email && (
                <span className="error-message">{errors.email.message}</span>
              )}
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
                {...register("companyName", {
                  required: "Company name is required",
                })}
                autoComplete="organization"
              />
              {errors.companyName && (
                <span className="error-message">
                  {errors.companyName.message}
                </span>
              )}
            </div>
            <div className="input-box">
              <label htmlFor="storeAddress">Store Address</label>
              <input
                type="text"
                id="storeAddress"
                {...register("storeAddress", {
                  required: "Store address is required",
                })}
                autoComplete="address"
              />
              {errors.storeAddress && (
                <span className="error-message">
                  {errors.storeAddress.message}
                </span>
              )}
            </div>

            <label htmlFor="businessLicense">
              Business license or Corporation Paper
            </label>
            <div className="input-box-1">
              <div className="upload-icon">
                <Upload
                  fileList={fileList}
                  onChange={handleFileChange}
                  beforeUpload={() => false}
                  multiple
                >
                  <Button
                    icon={<UploadOutlined />}
                    className="upload-btn"
                  ></Button>
                </Upload>
              </div>
              <p className="drag-text">
                Click or drag file to this area to upload
              </p>
            </div>

            <div className="input-box">
              <label htmlFor="country">Country</label>
              <select
                id="country"
                {...register("country", { required: "Country is required" })}
                onChange={handleCountryChange}
                autoComplete="country"
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.Id} value={country.Id}>
                    {country.Name}
                  </option>
                ))}
              </select>
              {errors.country && (
                <span className="error-message">{errors.country.message}</span>
              )}
            </div>

            <div className="input-box">
              <label htmlFor="state">State / Province</label>
              <select
                id="state"
                {...register("state", {
                  required: "State is required if not showing then select none",
                })}
                autoComplete="state"
              >
                <option value="">Select State</option>
                <option value={null}>None</option>
                {states.map((state) => (
                  <option key={state.Id} value={state.Id}>
                    {state.Name}
                  </option>
                ))}
              </select>
              {errors.state && (
                <span className="error-message">{errors.state.message}</span>
              )}
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
                autoComplete="tel"
              />
              {errors.phone && (
                <span className="error-message">{errors.phone.message}</span>
              )}
            </div>

            <div className="linebreak">
              <h3>
                <span>Password</span>
              </h3>
            </div>
            <div className="input-box">
              <label htmlFor="password">Password</label>
              <div className="password-container">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                  autoComplete="new-password"
                />
                <span
                  className="eye-icon"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                </span>
              </div>
              {errors.password && (
                <span className="error-message">{errors.password.message}</span>
              )}
            </div>
            <div className="input-box">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-container">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                  autoComplete="new-password"
                />
                <span
                  className="eye-icon"
                  onClick={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                >
                  {confirmPasswordVisible ? (
                    <EyeInvisibleOutlined />
                  ) : (
                    <EyeOutlined />
                  )}
                </span>
              </div>
              {errors.confirmPassword && (
                <span className="error-message">
                  {errors.confirmPassword.message}
                </span>
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
