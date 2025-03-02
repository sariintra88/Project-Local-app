import React from 'react';
import './About.css';
import templeImage1 from '../assets/temple1.jpg';
import templeImage2 from '../assets/temple2.jpg';
import templeImage3 from '../assets/temple3.jpg';
import templeImage4 from '../assets/temple4.jpg';

function About() {
  return (
    <div className="about">
      <div className="about-container">
        <div className="about-images">
          <div className="images-row">
            <img src={templeImage1} alt="Temple in Chiang Mai" className="about-image" />
            <img src={templeImage2} alt="Temple in Chiang Mai" className="about-image" />
          </div>
          <div className="images-row">
            <img src={templeImage3} alt="Temple in Chiang Mai" className="about-image" />
            <img src={templeImage4} alt="Temple in Chiang Mai" className="about-image" />
          </div>
        </div>
        
        <div className="about-content">
          <h1 className="about-title">About us</h1>
          <p className="about-description">
            ยินดีต้อนรับสู่ MUTELU TRIP เว็บไซต์ที่รวบรวม วัด ศาลเจ้า 
            และสถานที่ศักดิ์สิทธิ์ในเชียงใหม่ สำหรับสายมูที่ต้องการเสริมดวง
            ขอพร และสัมผัสพลังแห่งศรัทธา เราตั้งใจคัดสรรสถานที่ที่ต้องไป
            ไหว้ พร้อมบอกวิธีไหว้ที่ถูกต้อง เคล็ดลับเสริมโชค และแนะนำ
            เครื่องรางมงคลที่เหมาะกับแต่ละสาย
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;