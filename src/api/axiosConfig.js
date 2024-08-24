// src/api/axiosConfig.js
import axios from "axios";
import API_BASE_URL from "../constant";

const token = localStorage.getItem("token");

// Create an Axios instance with default configurations
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default axiosInstance;
