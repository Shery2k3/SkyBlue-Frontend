import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import API_BASE_URL from "../../constant";
import { message } from "antd"; // Import message from antd
import "./SignUpForm.css";
import LogoAccent from "/Logos/LogoAccent.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox } from "@fortawesome/free-solid-svg-icons";
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';


const SignupForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (key === "documents") {
        for (const file of data[key]) {
          formData.append(key, file);
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
        // Handle successful signup (e.g., navigate to login page)
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
      {...register("documents")}
      listType="picture-card"
      beforeUpload={() => false}
      multiple
    >
      <Button icon={<UploadOutlined />} className="upload-btn">
        
      </Button>
    </Upload>
  </div>
  <p className="drag-text">Click or drag file to this area to upload</p>
</div>


            <div className="linebreak">
              <h3>
                <span>Your Address</span>
              </h3>
            </div>
            <div className="input-box">
              <label htmlFor="streetAddress1">Street Address</label>
              <input
                type="text"
                id="streetAddress1"
                {...register("streetAddress1", {
                  required: "Street address is required",
                })}
              />
              {errors.streetAddress1 && <span className="error-message">{errors.streetAddress1.message}</span>}
            </div>
            <div className="input-box">
              <label htmlFor="streetAddress2">Street Address 2</label>
              <input
                type="text"
                id="streetAddress2"
                {...register("streetAddress2")}
              />
            </div>
            <div className="input-box">
              <label htmlFor="zipCode">Zip / Postal Code</label>
              <input
                type="text"
                id="zipCode"
                {...register("zipCode", { required: "Zip code is required" })}
              />
              {errors.zipCode && <span className="error-message">{errors.zipCode.message}</span>}
            </div>
            <div className="input-box">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                {...register("city", { required: "City is required" })}
              />
              {errors.city && <span className="error-message">{errors.city.message}</span>}
            </div>
            <div className="input-box">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                {...register("country", { required: "Country is required" })}
              />
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
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword.message}</span>}
            </div>

            <button type="submit" className="submit-button">
              Register
            </button>
          </form>
          <div className="linebreak">
            <h3>
              <span>Or</span>
            </h3>
          </div>
          <div className="register_link">
            <p>
              Already have an Account?{" "}
              <Link to="/login" className="link-of-signup">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;