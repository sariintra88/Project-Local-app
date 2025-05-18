// src/components/CustomNavbar.jsx
import React, { useState, useEffect } from 'react';
import './MuteluTrip.css';
import logo from '../assets/mutelu-logo.png';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

const CustomNavbar = ({ onNavClick = null, activeSection }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const location = useLocation();
  const navigate = useNavigate(); // ✅ เพิ่ม
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUsername = localStorage.getItem('username');
    if (token && savedUsername) {
      setIsLoggedIn(true);
      setUsername(savedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
    navigate('/login'); // ✅ เด้งกลับหน้า login
    window.location.reload(); // ✅ รีโหลดเพื่อเคลียร์ state อื่น ๆ
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <img src={logo} alt="MUTELU TRIP" className="logo" />
          </Link>
        </div>

        <div className="nav-links">
          {isHomePage ? (
            <>
              {['home', 'about', 'attractions', 'contact'].map(section => (
                <a
                  key={section}
                  className={`nav-item ${activeSection === section ? 'active' : ''}`}
                  onClick={() => onNavClick?.(section)}
                >
                  {section === 'home' ? 'หน้าแรก' :
                   section === 'about' ? 'เกี่ยวกับเรา' :
                   section === 'attractions' ? 'สถานที่ท่องเที่ยว' :
                   'ติดต่อเรา'}
                </a>
              ))}
            </>
          ) : (
            <>
              <Link to="/home" className={`nav-item ${location.pathname === '/home' ? 'active' : ''}`}>หน้าแรก</Link>
              <Link to="/about" className={`nav-item ${location.pathname === '/about' ? 'active' : ''}`}>เกี่ยวกับเรา</Link>
              <Link to="/attractions" className={`nav-item ${location.pathname === '/attractions' ? 'active' : ''}`}>สถานที่ท่องเที่ยว</Link>
              <Link to="/contact" className={`nav-item ${location.pathname === '/contact' ? 'active' : ''}`}>ติดต่อเรา</Link>
            </>
          )}
        </div>

        {isLoggedIn ? (
          <div className="user-control">
            <div className="user-display">
              <span className="user-icon">👤</span>
              <span className="username">{username}</span>
            </div>
            <button onClick={handleLogout} className="logout-button">ลงชื่อออก</button>
          </div>
        ) : (
          <Link to="/login" className="login-button">เข้าสู่ระบบ</Link>
        )}
      </div>
    </nav>
  );
};

export default CustomNavbar;
