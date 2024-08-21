
import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'; 

const NotFound = () => {
  return (
    <div className="bg-container">
        <div className='container'>
            <img src='./public/images/404.png' alt="404 images"></img>
            < p className="text">SORRY WE CAN'T FIND THE PAGE.</p>
            <p>The page you are looking for was moved, removed, renamed or never existed.</p>
            <Link to="/" className="link">Return to Home</Link>
        </div>
    </div>
  );
};

export default NotFound;
