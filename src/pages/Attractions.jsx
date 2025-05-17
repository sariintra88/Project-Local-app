import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Attractions.css';
import axios from 'axios'; // เพิ่ม axios สำหรับการเรียก API

// ตั้งค่า baseURL สำหรับ axios
// ถ้าใช้ Vite กับ proxy ไม่ต้องมี domain ใน URL
const API_BASE_URL = 'http://localhost:5001'; // แก้ไขตามที่ตั้งค่าใน server ของคุณ

function Attractions() {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterRating, setFilterRating] = useState(null);
  const [searchDistance, setSearchDistance] = useState('1 กม.');
  const [searchLocation, setSearchLocation] = useState('');

  // ดึงข้อมูลวัดจาก API เมื่อ component ถูกโหลด
  useEffect(() => {
    const fetchTemples = async () => {
      try {
        setLoading(true);
        console.log('กำลังเรียก API:', `${API_BASE_URL}/api/temples`);

        const response = await axios.get(`${API_BASE_URL}/api/temples`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });

        console.log('ข้อมูลที่ได้รับจาก API:', response.data);

        // ตรวจสอบว่า response.data เป็น array หรือไม่
        if (Array.isArray(response.data)) {
          setTemples(response.data);
        } else {
          console.error("ข้อมูลที่ได้รับไม่ใช่ array:", response.data);
          setTemples([]); // กำหนดเป็น array ว่าง
          setError('รูปแบบข้อมูลไม่ถูกต้อง');
        }
        setLoading(false);
      } catch (err) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", err);
        setError('ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง');
        setLoading(false);
      }
    };

    fetchTemples();
  }, []);

  // ฟังก์ชันค้นหาตามชื่อวัด
  const handleSearch = async () => {
    if (!searchLocation) return;

    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/temples/search?q=${searchLocation}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      // ตรวจสอบว่า response.data เป็น array หรือไม่
      if (Array.isArray(response.data)) {
        setTemples(response.data);
      } else {
        console.error("ข้อมูลที่ได้รับไม่ใช่ array:", response.data);
        setTemples([]); // กำหนดเป็น array ว่าง
        setError('รูปแบบข้อมูลไม่ถูกต้อง');
      }
      setLoading(false);
    } catch (err) {
      console.error("เกิดข้อผิดพลาดในการค้นหา:", err);
      setError('ไม่สามารถค้นหาข้อมูลได้ กรุณาลองใหม่อีกครั้ง');
      setLoading(false);
    }
  };

  // Filter temples by rating if a filter is selected
  const filteredTemples = filterRating && temples.length > 0
      ? temples.filter(temple => temple.rating >= filterRating)
      : temples || [];

  // แสดงข้อความกำลังโหลด
  if (loading) {
    return <div className="loading">กำลังโหลดข้อมูล...</div>;
  }

  // แสดงข้อความเมื่อมีข้อผิดพลาด
  if (error) {
    return <div className="error">{error}</div>;
  }

  // ตรวจสอบอีกครั้งว่า temples เป็น array
  if (!Array.isArray(temples)) {
    console.error("temples ไม่ใช่ array:", temples);
    return <div className="error">ข้อมูลไม่ถูกต้อง กรุณาโหลดหน้าใหม่อีกครั้ง</div>;
  }

  return (
      <div className="attractions">
        <div className="attractions-container">
          <h1 className="attractions-title">สถานที่ท่องเที่ยวสำหรับสายบุญ ในจังหวัดเชียงใหม่</h1>

          <div className="attractions-content">
            {/* Filter sidebar */}
            <div className="filter-sidebar">
              <h3>เรตติ้ง</h3>
              <div className="rating-filters">
                <div className="rating-option" onClick={() => setFilterRating(5.0)}>
                  <span className="star">⭐</span> 5.0
                </div>
                <div className="rating-option" onClick={() => setFilterRating(4.0)}>
                  <span className="star gold">⭐</span> 4.0 +
                </div>
                <div className="rating-option" onClick={() => setFilterRating(3.0)}>
                  <span className="star">⭐</span> 3.0 +
                </div>
                <div className="rating-option" onClick={() => setFilterRating(2.0)}>
                  <span className="star">⭐</span> 2.0 +
                </div>
                <div className="rating-option" onClick={() => setFilterRating(1.0)}>
                  <span className="star">⭐</span> 1.0 +
                </div>
              </div>

            </div>

            {/* Temple listings */}
            <div className="temple-listings">
              {Array.isArray(filteredTemples) && filteredTemples.length > 0 ? (
                  filteredTemples.map(temple => (
                      <div key={temple._id} className="temple-listing">
                        <div className="temple-image">
                          <img
                              src={temple.image ? `${API_BASE_URL}/uploads/${temple.image}` : '/images/temple-default.jpg'}
                              alt={temple.name}
                          />
                        </div>
                        <div className="temple-details">
                          <div className="temple-header">
                            <h2>
                              <Link to={`/attractions/${temple._id}`}>{temple.name}</Link>
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
                                {temple.location && <p className="location">ที่ตั้ง: {temple.location}</p>}
                                {temple.openingHours && <p className="opening-hours">วันเวลาเปิด-ปิด: {temple.openingHours}</p>}
                                {temple.gps && <p className="gps">GPS: <a href={temple.gps} target="_blank" rel="noopener noreferrer">{temple.gps}</a></p>}
                              </div>
                          )}
                        </div>
                      </div>
                  ))
              ) : (
                  <div className="no-results">ไม่พบข้อมูลวัดที่ค้นหา</div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
}

export default Attractions;