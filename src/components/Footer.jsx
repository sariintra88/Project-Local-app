import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from '../assets/mutelu-logo.png';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo-section">
          <img src={logo} alt="MUTELU TRIP" className="footer-logo" />
          <p className="footer-description">
            เว็บไซต์แนะนำสถานที่ศักดิ์สิทธิ์ สำหรับสายมูที่
            ต้องการเสริมดวง โชคลาภ ความรัก การงาน
            และสุขภาพ ทั้งในจังหวัดเชียงใหม่แบบเจาะลึก
            ให้สามารถเที่ยวชมได้จริง
          </p>
        </div>
        
        <div className="footer-links-section">
          <h3>Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About us</Link></li>
            <li><Link to="/attractions">Attractions</Link></li>
            <li><Link to="/contact">Contact us</Link></li>
          </ul>
        </div>
        
        <div className="footer-contact-section">
          <h3>Contact</h3>
          <p>ติดต่อสอบถาม</p>
          <p>โทร: 012 345 6789</p>
          <p>อีเมล์: mutelutrip@gmail.com</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;