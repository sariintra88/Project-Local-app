import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import logo from '../assets/mutelu-logo.png';
import axios from "axios";
 
const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
 
 
  const validateForm = () => {
    // Basic client-side validation
    if (!email || !username || !password || !confirmPassword) {
      setError('กรุณากรอกข้อมูลให้ครบทุกช่อง');
      return false;
    }
 
    if (password !== confirmPassword) {
      setError('รหัสผ่านไม่ตรงกัน');
      return false;
    }
 
    if (password.length < 6) {
      setError('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร');
      return false;
    }
 
    return true;
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
 
    // Validate form
    if (!validateForm()) {
      return;
    }
 
    try {
      const response = await axios.post('http://localhost:5001/auth/register', {
        email,
        username,
        password,
        confirmPassword
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
 
      // Log the full response for debugging
      console.log('Registration response:', response.data);
 
      // Check if response contains token or user object
      if (response.data.token && response.data.user) {
        // Handle successful registration
        setSuccessMessage('ลงทะเบียนสำเร็จ');
 
        // Optional: Save token to localStorage or cookie (for authentication purposes)
        localStorage.setItem('authToken', response.data.token);
        // Redirect to login page or home
        navigate('/login');
      } else {
        // Handle server-side validation errors
        setError(response.data.message || 'การลงทะเบียนล้มเหลว');
      }
    } catch (err) {
      console.log('Full error object:', err);
 
      if (err.response) {
        console.log('Error response data:', err.response.data);
        setError(
          err.response.data.message ||
          err.response.data.error ||
          'การลงทะเบียนล้มเหลว'
        );
      } else if (err.request) {
        console.log('Error request:', err.request);
        setError('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
      } else {
        console.log('Error message:', err.message);
        setError('เกิดข้อผิดพลาดบางอย่าง: ' + err.message);
      }
    }
};
 
  return (
      <div className="register-page">
        <div className="register-container">
          <div className="register-logo">
            <img src={logo} alt="MUTELU TRIP" />
          </div>
 
          <h2 className="register-title">สร้างบัญชีใหม่</h2>
 
          {error && (
              <div className="error-message" style={{color: 'red', marginBottom: '10px'}}>
                {error}
              </div>
          )}
 
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                  type="email"
                  className="form-input"
                  placeholder="อีเมล"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
              />
            </div>
 
            <div className="form-group">
              <input
                  type="text"
                  className="form-input"
                  placeholder="ชื่อผู้ใช้"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
              />
            </div>
 
            <div className="form-group password-group">
              <input
                  type={showPassword ? "text" : "password"}
                  className="form-input"
                  placeholder="รหัสผ่าน"
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
                  placeholder="ยืนยันรหัสผ่าน"
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
              ลงทะเบียน
            </button>
          </form>
 
          <p className="login-account">
            มีบัญชีอยู่แล้ว?
            <Link to="/login" className="login-account-link"> เข้าสู่ระบบที่นี่</Link>
          </p>
        </div>
      </div>
  );
}
 
 
export default Register;