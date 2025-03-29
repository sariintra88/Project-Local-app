import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import logo from '../assets/mutelu-logo.png';

function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Registration attempt with:', { email, username, password, confirmPassword });
  };
  
  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-logo">
          <img src={logo} alt="MUTELU TRIP" />
        </div>
        
        <h2 className="register-title">Create a new account</h2>
        
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-input"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="text"
              className="form-input"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group password-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-input"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button 
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
          
          <div className="form-group password-group">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="form-input"
              placeholder="confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button 
              type="button"
              className="toggle-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
          
          <button type="submit" className="register-submit-btn">
            SIGN UP
          </button>
        </form>
        
        <p className="login-account">
          Already Registered? 
          <Link to="/login" className="login-account-link"> Log in here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;