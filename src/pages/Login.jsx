import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import logo from '../assets/mutelu-logo.png';
 
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
 
    try {
      const response = await axios.post('http://localhost:5001/auth/login', {
        username,
        password
      });
 
      console.log('Login success:', response.data);
      
      // Store token and username in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', username);
 
      // Navigate to home page after successful login
      navigate('/');
      window.location.reload(); // บังคับ refresh เพื่อให้ Navbar ตรวจสถานะใหม่
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Login failed');
    }
  };
 
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-logo">
          <img src={logo} alt="MUTELU TRIP" />
        </div>
 
        <h2 className="login-title">Sign in to continue</h2>
 
        <form className="login-form" onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
 
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
 
          <button type="submit" className="login-submit-btn">
            LOGIN
          </button>
        </form>
 
        <p className="create-account">
          don't have an account?
          <Link to="/register" className="create-account-link"> create a new account</Link>
        </p>
      </div>
    </div>
  );
}
 
export default Login;