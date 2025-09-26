import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import API_BASE_URL from "../../constant";
import { message } from "antd";
import "./SignUpForm.css";
import LogoAccent from "/Logos/LogoAccent.png";
import { Link, useNavigate } from "react-router-dom";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const navigate = useNavigate();

  // File validation constants
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED_FILE_TYPES = [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'application/pdf',
    'image/webp'
  ];

  useEffect(() => {
    // Configure AntD message globally
    message.config({
      top: 70,
      duration: 4,
      maxCount: 1,
    });
  }, []);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/customer/countries`, {
          timeout: 10000
        });
        const canada = response.data.find((country) => country.Id === 2);
        if (canada) {
          setCountries([canada]);
          setSelectedCountryId(canada.Id);
          setValue("country", canada.Id);
        }
      } catch (error) {
        console.error("Failed to load countries:", error);
        message.error("Failed to load countries. Please try again.");
      }
    };
    fetchCountries();
  }, [setValue]);

  useEffect(() => {
    if (selectedCountryId) {
      const fetchStates = async () => {
        try {
          const response = await axios.get(
            `${API_BASE_URL}/customer/states/${selectedCountryId}`,
            { timeout: 10000 }
          );
          setStates(response.data);
        } catch (error) {
          console.error("Failed to load states:", error);
          message.error("Failed to load states. Please try again.");
        }
      };
      fetchStates();
    }
  }, [selectedCountryId]);

  // Improved file validation
  const validateFile = (file) => {
    const actualFile = file.originFileObj || file;
    
    if (!actualFile) {
      console.error("No file object found");
      return false;
    }

    // Check file size
    if (actualFile.size > MAX_FILE_SIZE) {
      message.error(`File "${actualFile.name}" is too large. Maximum size is 10MB.`);
      return false;
    }

    // Check file type
    if (!ALLOWED_FILE_TYPES.includes(actualFile.type)) {
      message.error(`File "${actualFile.name}" has invalid type. Only JPG, PNG, PDF, and WebP files are allowed.`);
      return false;
    }

    return true;
  };

  // Improved file change handler - single file only
  const handleFileChange = ({ fileList: newFileList }) => {
    console.log("File change triggered:", newFileList);
    
    // Take only the last file (most recent)
    const latestFile = newFileList.length > 0 ? [newFileList[newFileList.length - 1]] : [];
    
    if (latestFile.length > 0) {
      // Validate the single file
      if (!validateFile(latestFile[0])) {
        setFileList([]);
        setValue("documents", []);
        return;
      }
    }

    setFileList(latestFile);
    
    // Extract actual file object for form submission
    if (latestFile.length > 0) {
      const actualFile = latestFile[0].originFileObj || latestFile[0];
      console.log("Processing file:", actualFile?.name, actualFile?.size, actualFile?.type);
      setValue("documents", [actualFile]);
      console.log("File set in form:", [actualFile]);
    } else {
      setValue("documents", []);
    }
  };

  // Enhanced form submission
  const onSubmit = async (data) => {
    console.log("Form submission started");
    console.log("Form data:", data);
    console.log("File list:", fileList);
    console.log("Documents in data:", data.documents);

    // Prevent double submission
    if (isSubmitting) {
      console.log("Already submitting, ignoring");
      return;
    }

    setIsSubmitting(true);

    try {
      // Validate single file upload
      if (!fileList.length) {
        message.error("Please upload a Business License document.");
        return;
      }

      if (!data.documents || !data.documents.length) {
        message.error("No document found. Please try uploading again.");
        return;
      }

      // Create FormData with better error handling
      const formData = new FormData();
      
      // Add single file with validation
      let fileAdded = false;
      for (const file of data.documents) {
        if (file instanceof File || file instanceof Blob) {
          formData.append("documents", file);
          fileAdded = true;
          console.log(`Added file: ${file.name}, Size: ${file.size}, Type: ${file.type}`);
          break; // Only add the first (and should be only) file
        } else {
          console.error("Invalid file object:", file);
        }
      }

      if (!fileAdded) {
        message.error("No valid file to upload. Please try again.");
        return;
      }

      // Add other form data
      const excludeKeys = ['documents'];
      for (const key in data) {
        if (!excludeKeys.includes(key) && data[key] !== undefined && data[key] !== null) {
          formData.append(key, String(data[key]));
          console.log(`Added form field: ${key} = ${data[key]}`);
        }
      }

      // Log FormData contents for debugging
      console.log("FormData contents:");
      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`${key}: File(${value.name}, ${value.size} bytes)`);
        } else {
          console.log(`${key}: ${value}`);
        }
      }

      // Make API request with enhanced configuration
      const response = await axios.post(
        `${API_BASE_URL}/auth/signup`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 60000, // 60 seconds for mobile networks
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
          // Add progress tracking for large uploads
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log(`Upload Progress: ${percentCompleted}%`);
          },
        }
      );

      console.log("Signup response:", response);

      if (response.status === 201) {
        message.success("Signup successful! Waiting for approval.");
        reset();
        setFileList([]);
        
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        console.warn("Unexpected response status:", response.status);
        message.error("Unexpected response from server. Please try again.");
      }

    } catch (error) {
      console.error("Signup error:", error);
      
      // Enhanced error handling
      if (error.code === 'ECONNABORTED') {
        message.error("Request timeout. Please check your internet connection and try again.");
      } else if (error.response) {
        const { status, data } = error.response;
        console.error("Error response:", status, data);
        
        switch (status) {
          case 400:
            if (data?.message === "Email already exists") {
              message.error("An account with this email already exists.");
            } else if (data?.message) {
              message.error(data.message);
            } else {
              message.error("Invalid form data. Please check all fields.");
            }
            break;
          case 413:
            message.error("Files are too large. Please reduce file sizes and try again.");
            break;
          case 415:
            message.error("Unsupported file type. Please use JPG, PNG, or PDF files.");
            break;
          case 500:
            message.error("Server error. Please try again later.");
            break;
          default:
            message.error(`Error ${status}: ${data?.message || "Something went wrong"}`);
        }
      } else if (error.request) {
        message.error("Network error. Please check your internet connection.");
      } else {
        message.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Custom upload props
  const uploadProps = {
    fileList,
    onChange: handleFileChange,
    beforeUpload: () => false, // Prevent auto upload
    multiple: true,
    accept: ".pdf,.jpg,.jpeg,.png,.webp",
    maxCount: 5,
    showUploadList: {
      showPreviewIcon: true,
      showRemoveIcon: true,
      showDownloadIcon: false,
    },
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
                  minLength: {
                    value: 2,
                    message: "First name must be at least 2 characters"
                  },
                  maxLength: {
                    value: 50,
                    message: "First name must be less than 50 characters"
                  }
                })}
                autoComplete="given-name"
                disabled={isSubmitting}
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
                {...register("lastName", { 
                  required: "Last name is required",
                  minLength: {
                    value: 2,
                    message: "Last name must be at least 2 characters"
                  },
                  maxLength: {
                    value: 50,
                    message: "Last name must be less than 50 characters"
                  }
                })}
                autoComplete="family-name"
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                  minLength: {
                    value: 2,
                    message: "Company name must be at least 2 characters"
                  }
                })}
                autoComplete="organization"
                disabled={isSubmitting}
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
                disabled={isSubmitting}
              />
              {errors.storeAddress && (
                <span className="error-message">
                  {errors.storeAddress.message}
                </span>
              )}
            </div>

            <label htmlFor="businessLicense">
              Business License or Corporation Paper (Max 10MB per file)
            </label>
            <div className="input-box-1">
              <div className="upload-icon">
                <Upload {...uploadProps}>
                  <Button
                    icon={<UploadOutlined />}
                    className="upload-btn"
                    disabled={isSubmitting}
                  >
                    {fileList.length > 0 ? `${fileList.length} file(s) selected` : 'Select Files'}
                  </Button>
                </Upload>
              </div>
              <p className="drag-text">
                Click or drag files to this area to upload
                <br />
                <small>Supported formats: JPG, PNG, PDF, WebP (Max 10MB each)</small>
              </p>
            </div>

            <div className="input-box">
              <label htmlFor="country">Country</label>
              <select
                id="country"
                {...register("country", { required: "Country is required" })}
                value={selectedCountryId || ""}
                disabled
              >
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
                  required: "State is required",
                })}
                autoComplete="address-level1"
                disabled={isSubmitting}
              >
                <option value="">Select State</option>
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
                {...register("phone", { 
                  required: "Phone number is required",
                  pattern: {
                    value: /^[+]?[\d\s\-\(\)]{10,}$/,
                    message: "Enter a valid phone number"
                  }
                })}
                autoComplete="tel"
                disabled={isSubmitting}
              />
              {errors.phone && (
                <span className="error-message">{errors.phone.message}</span>
              )}
            </div>

            <div className="input-box">
              <label htmlFor="streetAddress1">Street Address 1</label>
              <input
                type="text"
                id="streetAddress1"
                {...register("streetAddress1", {
                  required: "Street Address 1 is required",
                })}
                autoComplete="address-line1"
                disabled={isSubmitting}
              />
              {errors.streetAddress1 && (
                <span className="error-message">
                  {errors.streetAddress1.message}
                </span>
              )}
            </div>

            <div className="input-box">
              <label htmlFor="streetAddress2">Street Address 2</label>
              <input
                type="text"
                id="streetAddress2"
                {...register("streetAddress2")}
                autoComplete="address-line2"
                disabled={isSubmitting}
              />
            </div>

            <div className="input-box">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                {...register("city", {
                  required: "City is required",
                })}
                autoComplete="address-level2"
                disabled={isSubmitting}
              />
              {errors.city && (
                <span className="error-message">{errors.city.message}</span>
              )}
            </div>

            <div className="input-box">
              <label htmlFor="zipCode">Zip Code</label>
              <input
                type="text"
                id="zipCode"
                {...register("zipCode", { 
                  required: "Zip Code is required",
                  pattern: {
                    value: /^[A-Za-z0-9\s\-]{3,10}$/,
                    message: "Enter a valid zip code"
                  }
                })}
                autoComplete="postal-code"
                disabled={isSubmitting}
              />
              {errors.zipCode && (
                <span className="error-message">{errors.zipCode.message}</span>
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
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    }
                  })}
                  autoComplete="new-password"
                  disabled={isSubmitting}
                />
                <span
                  className="eye-icon"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  style={{ cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
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
                  disabled={isSubmitting}
                />
                <span
                  className="eye-icon"
                  onClick={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                  style={{ cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
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
              <button 
                type="submit" 
                className="submit-button"
                disabled={isSubmitting}
                style={{
                  opacity: isSubmitting ? 0.7 : 1,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
              >
                {isSubmitting ? 'Registering...' : 'Register'}
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