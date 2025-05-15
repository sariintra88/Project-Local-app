import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/mutelu-logo.png';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  
  // Check login status on component mount and when localStorage changes
  useEffect(() => {
    checkLoginStatus();
    
    // Listen for storage events (in case user logs in/out in another tab)
    window.addEventListener('storage', checkLoginStatus);
    return () => window.removeEventListener('storage', checkLoginStatus);
  }, []);
  
  const checkLoginStatus = () => {
    const token = localStorage.getItem('token');
    const savedUsername = localStorage.getItem('username');
    
    if (token && savedUsername) {
      setIsLoggedIn(true);
      setUsername(savedUsername);
    } else {
      setIsLoggedIn(false);
      setUsername('');
    }
  };
  
  const handleLogout = () => {
    // Clear stored data
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    
    // Update state
    setIsLoggedIn(false);
    setUsername('');
    
    // Optionally navigate to home page
    navigate('/');
  };

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
          
          {isLoggedIn ? (
            <div className="user-container">
              <span className="username">{username}</span>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="login-button">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;