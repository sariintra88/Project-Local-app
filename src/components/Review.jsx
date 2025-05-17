import './Review.css';
import React, { useState, useRef } from 'react';

const ReviewModal = ({ onClose }) => {
  const [rating, setRating] = useState(0);
  const [selectedImages] = useState([]);
  const fileInputRef = useRef();

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const totalFiles = selectedImages.length + files.length;

    if (totalFiles > 5) {
      alert('คุณสามารถอัปโหลดได้ไม่เกิน 5 รูปเท่านั้น');
      event.target.value = ""; // รีเซ็ตช่องอัปโหลด
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

  };

  return (
    <div className="review-modal-overlay">
      <div className="review-modal">
        <h2>เขียนรีวิว</h2>

        {/* 🔹 ส่วนเลือกดาว */}
        <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                key={star}
                className={`star ${rating >= star ? "selected" : ""}`}
                onClick={() => setRating(star)}
                >
                ★
                </span>
            ))}
            </div>


        {/* 2. หัวเรื่อง */}
        <div className="review-section">
          <label>หัวเรื่องรีวิว</label>
          <input type="text" maxLength={120} placeholder="หัวข้อรีวิว" />
        </div>

        {/* 3. รายละเอียด */}
        <div className="review-section">
          <label>รายละเอียดรีวิว</label>
          <textarea rows={4} placeholder="รายละเอียดที่คุณอยากแบ่งปัน"></textarea>
        </div>

        {/* 4. ระยะเวลา */}
        <div className="review-section">
            <label>ระยะเวลาที่ใช้กับสถานที่นี้</label>
            <input type="text" placeholder="เช่น 1 - 2 ชั่วโมง, ครึ่งวัน, ตลอดทั้งวัน" />
        </div>

        {/* 5. กิจกรรมที่ทำ */}
        <div className="review-section">
            <label>กิจกรรมที่แนะนำในสถานที่นี้</label>
            <input type="text" placeholder="เช่น ไหว้พระ, ถ่ายรูป, ทำบุญ" />
        </div>


        {/* 6. อัปโหลดรูป */}
        <div className="review-section">
            <label htmlFor="images">รูปภาพ (ไม่เกิน 5 รูป)</label>
            <input
                type="file"
                id="images"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
            />
            {selectedImages.length > 0 && (
                <div className="preview-container">
                {selectedImages.map((file, index) => (
                    <div key={index} className="image-preview">
                    <img src={URL.createObjectURL(file)} alt={`preview-${index}`} />
                    </div>
                ))}
                </div>
            )}
        </div>


        {/* 7. ปุ่มบันทึก/ยกเลิก */}
        <div className="review-buttons">
          <button className="action-btn primary">บันทึกรีวิว</button>
          <button className="action-btn cancel" onClick={onClose}>ยกเลิก</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
