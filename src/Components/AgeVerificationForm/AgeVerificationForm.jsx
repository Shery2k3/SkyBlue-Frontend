import React, { useState } from 'react';
import './AgeVerificationForm.css';
import { useNavigate } from 'react-router-dom';



const AgeVerificationForm = () => {

  const navigate = useNavigate();

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
      const age = currentYear - year;
      if (age >= 18) {
        navigate('/'); 
        
      } else {
        alert("Access denied! You must be 18 or older.");
      }
    } else {
      alert("Please select a valid date of birth.");
    }
  };

  return (
    <div className='age-verification-page'>
      <div className='ageverification-wrapper'>
        <div><img src="./public/logos/logo.png" alt="logo" /></div> 
        <h3>Age Verification</h3>
        <div>
          <p>
            This website requires you to be of legal smoking age. Are you of legal age?
            Please enter your date of birth below.
          </p>
        </div>
        <div className='av-form'>
          <form onSubmit={handleSubmit}>
            <div className='d-m-y-wrapper'>
              <div className='d-m-y w'>
                <label htmlFor="month">Month<span>(</span><span>MM</span><span>)</span></label>
                <select id="month" value={month} onChange={handleMonthChange}>
                  <option value="">Select Month</option>
                  {months.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
              <div className='d-m-y w'>
                <label htmlFor="day">Day<span>(</span><span>DD</span><span>)</span></label>
                <select id="day" value={day} onChange={handleDayChange}>
                  <option value="">Select Day</option>
                  {days.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div className='d-m-y w'>
                <label htmlFor="year">Year<span>(</span><span>YYY</span><span>)</span></label>
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
              By entering this site you hereby agree you have read our Terms of Service
              and are in full compliance with it confirming you are a legal adult in your viewing Province.
            </p>
            <div className='av-button'>
              <button type="button" onClick={() => alert("Exiting...")}>Exit</button>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );  
};

export default AgeVerificationForm;
