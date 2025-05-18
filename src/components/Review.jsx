import './Review.css';
import React, { useState, useRef } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001';

const ReviewModal = ({ onClose, templeId, templeName, onSubmitSuccess }) => {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [visitDuration, setVisitDuration] = useState('');
  const [activities, setActivities] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
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

    // Update selected images
    setSelectedImages(prevImages => [...prevImages, ...files]);
  };

  const handleRemoveImage = (indexToRemove) => {
    setSelectedImages(prevImages => 
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    // Validation
    if (rating === 0) {
      setError('กรุณาให้คะแนนดาว');
      return;
    }
    
    if (!content.trim()) {
      setError('กรุณากรอกรายละเอียดรีวิว');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      
      // Create form data for multipart/form-data (for image uploads)
      const formData = new FormData();
      formData.append('templeId', templeId);
      formData.append('rating', rating);
      formData.append('title', title);
      formData.append('content', content);
      formData.append('visitDuration', visitDuration);
      formData.append('activities', activities);
      
      // Append each image to the form data
      selectedImages.forEach(image => {
        formData.append('images', image);
      });
      
      // API call to submit the review
      await axios.post(`${API_BASE_URL}/api/reviews`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Call success callback to refresh reviews
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (err) {
      console.error('Error submitting review:', err);
      setError('เกิดข้อผิดพลาดในการบันทึกรีวิว กรุณาลองอีกครั้ง');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="review-modal-overlay">
      <div className="review-modal">
        <h2>เขียนรีวิว - {templeName}</h2>

        {error && (
          <div className="review-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmitReview}>
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
            <input 
              type="text" 
              maxLength={120} 
              placeholder="หัวข้อรีวิว" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* 3. รายละเอียด */}
          <div className="review-section">
            <label>รายละเอียดรีวิว <span className="required">*</span></label>
            <textarea 
              rows={4} 
              placeholder="รายละเอียดที่คุณอยากแบ่งปัน"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>

          {/* 4. ระยะเวลา */}
          <div className="review-section">
            <label>ระยะเวลาที่ใช้กับสถานที่นี้</label>
            <input 
              type="text" 
              placeholder="เช่น 1 - 2 ชั่วโมง, ครึ่งวัน, ตลอดทั้งวัน"
              value={visitDuration}
              onChange={(e) => setVisitDuration(e.target.value)}
            />
          </div>

          {/* 5. กิจกรรมที่ทำ */}
          <div className="review-section">
            <label>กิจกรรมที่แนะนำในสถานที่นี้</label>
            <input 
              type="text" 
              placeholder="เช่น ไหว้พระ, ถ่ายรูป, ทำบุญ"
              value={activities}
              onChange={(e) => setActivities(e.target.value)}
            />
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
              ref={fileInputRef}
            />
            {selectedImages.length > 0 && (
              <div className="preview-container">
                {selectedImages.map((file, index) => (
                  <div key={index} className="image-preview">
                    <img src={URL.createObjectURL(file)} alt={`preview-${index}`} />
                    <button 
                      type="button" 
                      className="remove-image" 
                      onClick={() => handleRemoveImage(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 7. ปุ่มบันทึก/ยกเลิก */}
          <div className="review-buttons">
            <button 
              type="submit" 
              className="action-btn primary"
              disabled={submitting}
            >
              {submitting ? 'กำลังบันทึก...' : 'บันทึกรีวิว'}
            </button>
            <button 
              type="button" 
              className="action-btn cancel" 
              onClick={onClose}
              disabled={submitting}
            >
              ยกเลิก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;