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
  const [showPopup, setShowPopup] = useState(false);

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
      // Replace with your actual backend API endpoint
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

      // Handle successful registration - check for token which indicates success
      if (response.data && response.data.token) {
        // Show success message in popup
        setSuccessMessage('ลงทะเบียนสำเร็จ');
        setShowPopup(true);

        // ลบ setTimeout ออกเพราะเราจะไปที่หน้า login เมื่อกดปุ่มแทน
      } else {
        // Handle server response without expected format
        setError('การลงทะเบียนล้มเหลว: รูปแบบการตอบกลับไม่ถูกต้อง');
      }
    } catch (err) {
      // More detailed error logging
      console.log('Full error object:', err);

      // Handle registration errors
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log('Error response data:', err.response.data);
        console.log('Error response status:', err.response.status);
        console.log('Error response headers:', err.response.headers);

        setError(
            err.response.data.message ||
            err.response.data.error ||
            'การลงทะเบียนล้มเหลว'
        );
      } else if (err.request) {
        // The request was made but no response was received
        console.log('Error request:', err.request);
        setError('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error message:', err.message);
        setError('เกิดข้อผิดพลาดบางอย่าง: ' + err.message);
      }
    }
  };

  // เพิ่มฟังก์ชันจัดการการกดปุ่มตกลงใน popup
  const handlePopupButtonClick = () => {
    setShowPopup(false); // ปิด popup
    navigate('/login'); // นำทางไปยังหน้า login ทันที
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

        {/* Success Popup - แก้ไข onClick ของปุ่มให้เรียกฟังก์ชัน handlePopupButtonClick */}
        {showPopup && (
            <div className="popup-overlay">
              <div className="popup-container">
                <div className="popup-content">
                  <p>{successMessage}</p>
                  <button onClick={handlePopupButtonClick}>ตกลง</button>
                </div>
              </div>
            </div>
        )}
      </div>
  );
}

export default Register;