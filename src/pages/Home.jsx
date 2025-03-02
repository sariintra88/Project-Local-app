import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import heroImage from '../assets/temple-hero.jpg';
import templeImage1 from '../assets/temple1.jpg';
import templeImage2 from '../assets/temple2.jpg';

function Home() {
  return (
    <div className="home">
      <div className="hero-section">
        <img src={heroImage} alt="Sacred temples in Chiang Mai" className="hero-image" />
        {/* Text content will be displayed as part of the image */}
      </div>
      
      <div className="sacred-temples-section">
        <h1 className="section-title">สถานที่ท่องเที่ยวสำหรับสายมู ในจังหวัดเชียงใหม่</h1>
        
        <div className="filter-section">
          <div className="rating-filter">
            <h3>เรตติ้ง</h3>
            <div className="rating-options">
              <div className="rating-option">
                <span className="star">★</span>
                <span>5.0</span>
              </div>
              <div className="rating-option">
                <span className="star gold">★</span>
                <span>4.0 +</span>
              </div>
              <div className="rating-option">
                <span className="star">★</span>
                <span>3.0 +</span>
              </div>
              <div className="rating-option">
                <span className="star">★</span>
                <span>2.0 +</span>
              </div>
              <div className="rating-option">
                <span className="star">★</span>
                <span>1.0 +</span>
              </div>
            </div>
          </div>
          
          <div className="distance-filter">
            <h3>ค้นหาตามระยะทาง</h3>
            <input 
              type="text" 
              placeholder="สถานที่"
              className="distance-input"
            />
            <div className="distance-dropdown">
              <span>1 กม.</span>
              <span className="dropdown-arrow">▼</span>
            </div>
          </div>
        </div>
        
        <div className="temples-list">
          <div className="temple-card">
            <img src={templeImage1} alt="Wat Phra Singh" className="temple-image" />
            <div className="temple-info">
              <div className="temple-header">
                <h2>วัดพระสิงห์</h2>
                <div className="temple-rating">
                  <span className="star gold">★</span>
                  <span>4.5</span>
                </div>
              </div>
              <p className="temple-description">
                วัดพระสิงห์ เป็นวัดประจำเมืองเป็นโบราณสถาน พระสิงห์ (พระพุทธสิหิงค์) 
                พระพุทธรูปศักดิ์สิทธิ์ของเมืองเชียงใหม่และแผ่นดินล้านนา เป็นศูนย์รวม ...อ่านต่อ
              </p>
              <p className="temple-location">
                ที่ตั้ง : 2 ถนน สามล้าน ตำบล พระสิงห์ อำเภอเมืองเชียงใหม่ เชียงใหม่ 50280
              </p>
              <p className="temple-hours">
                วันเวลาเปิด-ปิด : 09.00-18.00 น.
              </p>
              <p className="temple-gps">
                GPS : <a href="https://goo.gl/maps/qXFBfKU4aVmV8D2W8">https://goo.gl/maps/qXFBfKU4aVmV8D2W8</a>
              </p>
            </div>
          </div>
          
          <div className="temple-card">
            <img src={templeImage2} alt="Wat Phra That Doi Suthep" className="temple-image" />
            <div className="temple-info">
              <div className="temple-header">
                <h2>วัดพระธาตุดอยสุเทพ</h2>
                <div className="temple-rating">
                  <span className="star gold">★</span>
                  <span>4.9</span>
                </div>
              </div>
              <p className="temple-description">
                มาเที่ยวเชียงใหม่ก็ต้องไม่พลาดที่จะมาสักการะพระธาตุดอยสุเทพ วัดพระธาตุ
                เมืองเชียงใหม่ ตั้งบนบนเฉลียรเขียงแสงทองร่วมทั้งโดดเด่นอยู่...อ่านต่อ
              </p>
              <p className="temple-location">
                ที่ตั้ง : 9 หมู่ที่ 9 อำเภอเมืองเชียงใหม่ เชียงใหม่ 50200
              </p>
              <p className="temple-hours">
                วันเวลาเปิด-ปิด : 06.00-20.00 น.
              </p>
              <p className="temple-gps">
                GPS : <a href="https://goo.gl/maps/FsbUY5BKEBnNEt5A6">https://goo.gl/maps/FsbUY5BKEBnNEt5A6</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;