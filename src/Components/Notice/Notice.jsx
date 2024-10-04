import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import "./Notice.css";
import axiosInstance from '../../api/axiosConfig'
import useRetryRequest from "../../api/useRetryRequest";

const Notice = () => {
  const [isActive, setIsActive] = useState(true);
  const [notice, setNotice] = useState('');

  const retryRequest = useRetryRequest();

  const handleClose = () => {
    setIsActive(false);
  };

  const handleClickOutside = (e) => {
    if (e.target.classList.contains("notice-modal-container")) {
      handleClose();
    }
  };

  useEffect(() => {
    if (!isActive) {
      setTimeout(() => {
        document.querySelector(".notice-modal-container").style.display = "none";
      }, 500);
    }
  }, [isActive]);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await retryRequest(() => 
          axiosInstance.get('/product/slider/notice')
        );
        setNotice(response.data[0].image);
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    }
    fetchNotice();
  }, [retryRequest]);

  return (
    <div
      className={`notice-modal-container ${isActive ? "active" : "inactive"}`}
      onClick={handleClickOutside}
    >
      <div className="notice-modal">
        <FontAwesomeIcon className="modal-closer" icon={faX} onClick={handleClose} />
        <img src={notice} alt="Notice" />
      </div>
    </div>
  );
};

export default Notice;
