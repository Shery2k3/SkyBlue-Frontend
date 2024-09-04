import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAgeVerification } from "../../Context/AuthContext/AgeVerificationContext";
import VerifcationLayout from "../VerificationLayout/VerificationLayout";
import { message } from "antd"; // Import Ant Design message
import "./AgeVerificationForm.css";

const AgeVerificationForm = () => {
  const navigate = useNavigate();
  const { verifyAge } = useAgeVerification();
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const handleDayChange = (e) => setDay(e.target.value);
  const handleMonthChange = (e) => setMonth(e.target.value);
  const handleYearChange = (e) => setYear(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (day && month && year) {
      const birthDate = new Date(year, month - 1, day); // month is 0-indexed
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();

      const isOldEnough =
        age > 18 ||
        (age === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)));

      if (isOldEnough) {
        verifyAge();
        message.success("You are old enough!"); // Success message
        navigate("/");
      } else {
        message.error("Access denied! You must be 18 or older."); // Error message
      }
    } else {
      message.error("Please select a valid date of birth."); // Error message for missing fields
    }
  };

  return (
    <VerifcationLayout isLoading={false}>
      <div className="ageverification-wrapper">
        <div>
          <img src="./public/logos/logo.png" alt="logo" />
        </div>
        <h3>Age Verification</h3>
        <div>
          <p>
            This website requires you to be of legal smoking age. Are you of
            legal age? Please enter your date of birth below.
          </p>
        </div>
        <div className="av-form">
          <form className="age-form" onSubmit={handleSubmit}>
            <div className="d-m-y-wrapper">
              <div className="d-m-y w">
                <label htmlFor="month">
                  Month<span>(</span>
                  <span>MM</span>
                  <span>)</span>
                </label>
                <select id="month" value={month} onChange={handleMonthChange}>
                  <option value="">Select Month</option>
                  {months.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
              <div className="d-m-y w">
                <label htmlFor="day">
                  Day<span>(</span>
                  <span>DD</span>
                  <span>)</span>
                </label>
                <select id="day" value={day} onChange={handleDayChange}>
                  <option value="">Select Day</option>
                  {days.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div className="d-m-y w">
                <label htmlFor="year">
                  Year<span>(</span>
                  <span>YYY</span>
                  <span>)</span>
                </label>
                <select id="year" value={year} onChange={handleYearChange}>
                  <option value="">Select Year</option>
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <p>
              By entering this site you hereby agree you have read our Terms of
              Service and are in full compliance with it confirming you are a
              legal adult in your viewing Province.
            </p>
            <div className="av-button">
              <button type="button" onClick={() => message.info("Exiting...")}>
                Exit
              </button>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </VerifcationLayout>
  );
};

export default AgeVerificationForm;
