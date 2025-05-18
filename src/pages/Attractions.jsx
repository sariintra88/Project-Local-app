import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Attractions.css';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001';

function Attractions() {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterRating, setFilterRating] = useState(null);
  const [searchLocation, setSearchLocation] = useState('');

  useEffect(() => {
    fetchTemples();
  }, []);

  const fetchTemples = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/temples`);
      if (Array.isArray(response.data)) {
        setTemples(response.data);
      } else {
        setTemples([]);
        setError('รูปแบบข้อมูลไม่ถูกต้อง');
      }
    } catch (err) {
      console.error("เกิดข้อผิดพลาดในการโหลด:", err);
      setError('ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchLocation.trim()) return;
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/temples/search?q=${searchLocation}`);
      if (Array.isArray(response.data)) {
        setTemples(response.data);
        setError(null);
      } else {
        setTemples([]);
        setError('รูปแบบข้อมูลไม่ถูกต้อง');
      }
    } catch (err) {
      console.error("ค้นหาผิดพลาด:", err);
      setError('ไม่สามารถค้นหาข้อมูลได้ กรุณาลองใหม่');
    } finally {
      setLoading(false);
    }
  };

  const filteredTemples = filterRating
    ? temples.filter((temple) => temple.rating >= filterRating)
    : temples;

  return (
    <div className="attractions">
      <div className="attractions-container">
        <h1 className="attractions-title">สถานที่ท่องเที่ยวสำหรับสายบุญ ในจังหวัดเชียงใหม่</h1>

        {/* 🔍 ช่องค้นหา */}
        <div className="search-bar">
          <input
            type="text"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            placeholder="ค้นหาชื่อวัด..."
          />
          <button onClick={handleSearch}>ค้นหา</button>
        </div>

        <div className="attractions-content">
          {/* 🔽 Sidebar filter */}
          <div className="filter-sidebar">
            <h3>เรตติ้ง</h3>
            <div className="rating-filters">
              {[5, 4, 3, 2, 1].map(rating => (
                <div
                  key={rating}
                  className={`rating-option ${filterRating === rating ? 'selected' : ''}`}
                  onClick={() => setFilterRating(rating)}
                >
                  <span className="star">★</span>
                  {rating}.0{rating !== 5 ? ' +' : ''}
                </div>
              ))}
            </div>
            {filterRating && (
              <button className="clear-filter" onClick={() => setFilterRating(null)}>
                เคลียร์เรตติ้ง
              </button>
            )}
          </div>

          {/* 📜 รายการวัด */}
          <div className="temple-listings">
            {loading ? (
              <div className="loading">กำลังโหลดข้อมูล...</div>
            ) : error ? (
              <div className="error">{error}</div>
            ) : filteredTemples.length === 0 ? (
              <div className="no-results">ไม่พบข้อมูลวัดที่ค้นหา</div>
            ) : (
              filteredTemples.map(temple => (
                <div key={temple._id} className="temple-listing">
                  <div className="temple-image">
                    <img
                      src={temple.image ? `${API_BASE_URL}/uploads/1-temple/${temple.image}` : '/images/temple-default.jpg'}
                      alt={temple.name}
                    />
                  </div>
                  <div className="temple-details">
                    <div className="temple-header">
                      <h2>
                        <Link to={`/attractions/${encodeURIComponent(temple.name)}`}>
                          {temple.name}
                        </Link>
                      </h2>
                      {temple.rating && (
                        <div className="rating-display">
                          <span className="star gold">⭐</span>
                          <span className="rating-value">{temple.rating}</span>
                        </div>
                      )}
                    </div>
                    <p className="temple-description">{temple.description}</p>
                    {temple.location && (
                      <div className="temple-info">
                        <p className="location">ที่ตั้ง: {temple.location}</p>
                        {temple.openingHours && <p className="opening-hours">วันเวลาเปิด-ปิด: {temple.openingHours}</p>}
                        {temple.gps && <p className="gps">GPS: <a href={temple.gps} target="_blank" rel="noopener noreferrer">{temple.gps}</a></p>}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Attractions;
