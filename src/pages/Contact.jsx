import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact">
      <div className="contact-container">
        <h1 className="contact-title">ติดต่อเรา</h1>
        <div className="contact-content">
          <div className="contact-info">
            <h2>ข้อมูลการติดต่อ</h2>
            <p><strong>อีเมล:</strong> mutelutrip@gmail.com</p>
            <p><strong>เบอร์โทร:</strong> 012-345-6789</p>
            <p><strong>เวลาทำการ:</strong> ทุกวัน 08:00 - 18:00 น.</p>
          </div>
          <div className="contact-form">
            <h2>ส่งข้อความหาเรา</h2>
            <form>
              <div className="form-group">
                <label htmlFor="name">ชื่อ</label>
                <input type="text" id="name" name="name" placeholder="กรอกชื่อของคุณ" />
              </div>
              <div className="form-group">
                <label htmlFor="email">อีเมล</label>
                <input type="email" id="email" name="email" placeholder="กรอกอีเมลของคุณ" />
              </div>
              <div className="form-group">
                <label htmlFor="message">ข้อความ</label>
                <textarea id="message" name="message" rows="5" placeholder="เขียนข้อความของคุณที่นี่..." />
              </div>
              <button type="submit" className="submit-button">ส่งข้อความ</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
