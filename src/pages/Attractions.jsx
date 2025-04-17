import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Attractions.css';

const templesData = [
  {
    id: 1,
    name: 'วัดพระสิงห์วรมหาวิหาร',
    mainImage: '/images/wat-phra-singh.jpg',
    description: 'วัดพระสิงห์ เป็นวัดประจำคนเกิดปีมะโรงที่ประดิษฐาน พระสิงห์ (พระพุทธสิกิงค์) พระพุทธรูปศักดิ์สิทธิ์คู่เมืองเชียงใหม่และแผ่นดินล้านนา เป็นศูนย์รวม ...อ่านต่อ',
    location: '2 ถนน สามล้าน ตำบล พระสิงห์ อำเภอเมืองเชียงใหม่ เชียงใหม่ 50280',
    openingHours: '09:00-18:00 น.',
    gps: 'https://goo.gl/maps/qXEBfKU4aVmV8DZW8',
    images: [
      '/images/wat1.jpg',
      '/images/wat2.jpg',
      '/images/wat3.jpg'
    ],
    rating: 4.5
  },
  {
    id: 2,
    name: 'วัดพระธาตุดอยสุเทพ',
    mainImage: '/images/doi-suthep.jpg',
    description: 'มาเที่ยวเชียงใหม่ก็ต้องไปพลาดที่จะมาสักการะพระธาตุดอยสุเทพ วัดพระธาตุเมืองเชียงใหม่ ที่ตั้งบนบนเขาสูงที่รายล้อมสนฟ้าขอจำนุ่งสิริโชคเงินอยู่ ...อ่านต่อ',
    location: '9 หมู่ที่ 9 อำเภอเมืองเชียงใหม่ เชียงใหม่ 50200',
    openingHours: '06:00-20:00 น.',
    gps: 'https://goo.gl/maps/FsbJY5BKEBnNEt5A6',
    images: [
      '/images/doi1.jpg',
      '/images/doi2.jpg'
    ],
    rating: 4.9
  }
];

function Attractions() {
  const [filterRating, setFilterRating] = useState(null);
  const [searchDistance, setSearchDistance] = useState('1 กม.');
  
  // Filter temples by rating if a filter is selected
  const filteredTemples = filterRating 
    ? templesData.filter(temple => temple.rating >= filterRating)
    : templesData;

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
            
            <h3 className="distance-title">ค้นหาตามระยะทาง</h3>
            <div className="distance-filter">
              <input type="text" placeholder="สถานที่" className="location-input" />
              <div className="distance-dropdown">
                <span>{searchDistance}</span>
                <span className="dropdown-arrow">▼</span>
              </div>
            </div>
          </div>
          
          {/* Temple listings */}
          <div className="temple-listings">
            {filteredTemples.map(temple => (
              <div key={temple.id} className="temple-listing">
                <div className="temple-image">
                  <img src={temple.mainImage} alt={temple.name} />
                </div>
                <div className="temple-details">
                  <div className="temple-header">
                    <h2>
                      <Link to={`/attractions/${temple.id}`}>{temple.name}</Link>
                    </h2>
                    <div className="rating-display">
                      <span className="star gold">⭐</span>
                      <span className="rating-value">{temple.rating}</span>
                    </div>
                  </div>
                  <p className="temple-description">{temple.description}</p>
                  <div className="temple-info">
                    <p className="location">ที่ตั้ง: {temple.location}</p>
                    <p className="opening-hours">วันเวลาเปิด-ปิด: {temple.openingHours}</p>
                    <p className="gps">GPS: <a href={temple.gps} target="_blank" rel="noopener noreferrer">{temple.gps}</a></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Attractions;