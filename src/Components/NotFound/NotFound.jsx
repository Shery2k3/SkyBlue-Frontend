
import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'; 

const NotFound = () => {
  return (
    <div className="bg-container">
        <div className='container'>
            <h1 className="title">404</h1>
            <p className="text">Oops! The page you're looking for doesn't exist.</p>
            <Link to="/" className="link">Return to Home</Link>
        </div>
    </div>
  );
};

export default NotFound;
