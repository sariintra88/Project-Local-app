import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/mutelu-logo.png';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="MUTELU TRIP" className="logo" />
        </Link>
        
        <div className="nav-links">
          <Link to="/" className="nav-item">Home</Link>
          <Link to="/about" className="nav-item">About us</Link>
          <Link to="/attractions" className="nav-item">Attractions</Link>
          <Link to="/contact" className="nav-item">Contact us</Link>
        </div>
        
        <div className="nav-search-login">
          <div className="search-container">
            <input 
              type="text" 
              className="search-input" 
              placeholder="พิมพ์สถานที่ท่องเที่ยว" 
            />
            <button className="search-button">
              <i className="search-icon">🔍</i>
            </button>
          </div>
          
          <Link to="/login" className="login-button">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;