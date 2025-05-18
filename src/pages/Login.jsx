import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import logo from '../assets/mutelu-logo.png';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const navigate = useNavigate();

  // ใช้ useEffect เพื่อซ่อน popup หลังจากแสดงไปครบ 3 วินาที
  useEffect(() => {
    let timer;
    if (showSuccessPopup) {
      timer = setTimeout(() => {
        setShowSuccessPopup(false);
        // ทำการ navigate หลังจาก popup แสดงเสร็จ
        navigate('/');
        window.location.reload(); // บังคับ refresh เพื่อให้ Navbar ตรวจสถานะใหม่
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [showSuccessPopup, navigate]);

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

      // แสดง popup แทนการ navigate ทันที
      setShowSuccessPopup(true);

      // การ navigate จะถูกจัดการโดย useEffect หลังจาก popup แสดงแล้ว
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
      <div className="login-page">
        {showSuccessPopup && (
            <div className="success-popup">
              <div className="success-popup-content">
                <div className="success-icon">✓</div>
                <p>Login successful!</p>
                <p className="success-message">เข้าสู่ระบบสำเร็จ {username}! ✅</p>
              </div>
            </div>
        )}

        <div className="login-container">
          <div className="login-logo">
            <img src={logo} alt="MUTELU TRIP" />
          </div>

          <h2 className="login-title">ลงทะเบียนเข้าสู่ระบบ</h2>

          <form className="login-form" onSubmit={handleSubmit}>
            {error && <p className="error-message">{error}</p>}

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

            <button type="submit" className="login-submit-btn">
              ล็อกอิน
            </button>
          </form>

          <p className="create-account">
            ยังไม่มีบัญชีผู้ใช้?
            <Link to="/register" className="create-account-link"> สร้างบัญชีใหม่ที่นี่</Link>
          </p>
        </div>
      </div>
  );
}

export default Login;