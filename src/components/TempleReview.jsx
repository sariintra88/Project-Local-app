import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TempleReview.css';

const API_BASE_URL = 'http://localhost:5001';

const TempleReviews = ({ templeId, refreshTrigger }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/api/reviews/temple/${templeId}`);
        // Sort reviews by date (newest first)
        const sortedReviews = response.data.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        setReviews(sortedReviews);
        setError(null);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("ไม่สามารถโหลดรีวิวได้ กรุณาลองใหม่อีกครั้ง");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [templeId, refreshTrigger]); // Re-fetch when templeId or refreshTrigger changes

  // Format date to Thai locale
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('th-TH', options);
  };

  // Generate star rating display
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, index) => (
      <span key={index} className={`review-star ${index < rating ? 'filled' : ''}`}>
        ★
      </span>
    ));
  };

  if (loading) return <div className="reviews-loading">กำลังโหลดรีวิว...</div>;
  
  return (
    <div className="temple-reviews-section">
      <h2 className="reviews-title">รีวิวจากผู้เข้าชม</h2>
      
      {error && <div className="reviews-error">{error}</div>}
      
      {!error && reviews.length === 0 ? (
        <div className="no-reviews">ยังไม่มีรีวิวสำหรับวัดนี้</div>
      ) : (
        <div className="reviews-list">
          {reviews.map((review) => (
            <div key={review._id} className="review-card">
              <div className="review-header">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">
                    {review.user?.profileImage ? (
                      <img src={`${API_BASE_URL}/uploads/users/${review.user.profileImage}`} alt="ผู้เขียนรีวิว" />
                    ) : (
                      <div className="avatar-placeholder">{review.user?.username?.charAt(0) || 'A'}</div>
                    )}
                  </div>
                  <div className="reviewer-details">
                    <div className="reviewer-name">{review.user?.username || 'ผู้ใช้นิรนาม'}</div>
                    <div className="review-date">{formatDate(review.createdAt)}</div>
                  </div>
                </div>
                <div className="review-rating">
                  {renderStars(review.rating)}
                </div>
              </div>
              
              {review.title && <h3 className="review-title">{review.title}</h3>}
              
              <div className="review-content">
                <p>{review.content}</p>
              </div>
              
              {review.visitDuration && (
                <div className="review-metadata">
                  <span className="visit-duration">
                    <i className="duration-icon">🕒</i> ระยะเวลา: {review.visitDuration}
                  </span>
                </div>
              )}
              
              {review.activities && (
                <div className="review-metadata">
                  <span className="activities">
                    <i className="activities-icon">🏆</i> กิจกรรม: {review.activities}
                  </span>
                </div>
              )}
              
              {review.images && review.images.length > 0 && (
                <div className="review-images">
                  {review.images.map((image, idx) => (
                    <div key={idx} className="review-image">
                      <img 
                        src={`${API_BASE_URL}/uploads/reviews/${image}`} 
                        alt={`รูปภาพจากรีวิว ${idx + 1}`} 
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TempleReviews;