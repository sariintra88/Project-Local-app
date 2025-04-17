import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './TempleDetail.css';

// This would typically come from an API or context
// For now, we'll use sample data matching your screenshots
const templesData = [
  {
    id: 1,
    name: 'วัดพระสิงห์วรมหาวิหาร (วัดพระสิงห์)',
    mainImage: '/images/wat-phra-singh.jpg',
    description: 'วัดพระสิงห์ เป็นวัดประจำคนเกิดปีมะโรงที่ประดิษฐาน พระสิงห์ (พระพุทธสิหิงค์) พระพุทธรูปศักดิ์สิทธิ์คู่เมืองเชียงใหม่และแผ่นดินล้านนา เป็นศูนย์รวมจิตใจของชาวเชียงใหม่ที่สำคาญยิ่งและเป็นมาอย่างยาวนาน การก่อสร้างศิลปะแบบไปล้านนา โดยกษัตริย์เชียงใหม่คนแรกพญาเม็งรายที่ทรงสถาปนา ความสวยงาม จะเห็นได้ชัยจากศิลปกรรมต่าง ๆ',
    longDescription: 'วัดพระสิงห์ เป็นที่ประดิษฐานพระสิงห์หรือพระพุทธสิหิงค์ ซึ่งเป็นพระพุทธรูปปางมารวิชัย ขนาดสูง 79 เซนติเมตร หน้าตักกว้าง 63 เซนติเมตร สร้างขึ้นเมื่อ พ.ศ. 700 และเป็นที่รู้จักกันในชื่อ "ลิ้นคำแดง ศิลปะสิงห์" มาจากที่พระสิงห์นั้นจะ มาจากใต้ฐานพระจะมีจารึกอักษรสิงห์ อยู่ ทำให้พระองค์นี้เป็นที่รู้จักกันอย่างมากในวงกว้าง อีกทั้งยังมีความงามอย่างมากเมื่อง สำหรับรายละเอียดอื่นๆก็แนะนำให้มาหาอ่านและแวะมาไหว้บูชานะ และเชิญชวนทุกคนแบบนี้นามา ซะมากเพราะรอคุณอยู่แน่นอน',
    location: {
      address: 'ถนนสามล้าน ตำบลพระสิงห์',
      district: 'อำเภอเมืองเชียงใหม่',
      province: 'จังหวัดเชียงใหม่'
    },
    pricing: {
      adult: 'ไม่เสียค่าเข้าชม',
      child: 'ไม่เสียค่าเข้าชม',
      foreign: 'ฟรี/ไม่มี'
    },
    openingHours: {
      weekday: '08:00 - 17:00'
    },
    gps: 'https://goo.gl/maps/qXEBfKU4aVmV8DZW8',
    parking: true,
    galleryImages: [
      '/images/wat1.jpg',
      '/images/wat2.jpg',
      '/images/wat3.jpg',
      '/images/wat4.jpg'
    ],
    rating: 4.8
  },
  {
    id: 2,
    name: 'วัดพระธาตุดอยสุเทพ',
    mainImage: '/images/doi-suthep.jpg',
    description: 'มาเที่ยวเชียงใหม่ก็ต้องไปพลาดที่จะมาสักการะพระธาตุดอยสุเทพ วัดพระธาตุเมืองเชียงใหม่ ที่ตั้งบนบนเขาสูงที่รายล้อมสนฟ้าขอจำนุ่งสิริโชคเงินอยู่ ...อ่านต่อ',
    longDescription: 'วัดพระธาตุดอยสุเทพราชวรวิหาร เป็นวัดที่มีความสำคัญมากที่สุดในจังหวัดเชียงใหม่ ประดิษฐานอยู่บนดอยสุเทพ เป็นสถานที่ศักดิ์สิทธิ์และแหล่งท่องเที่ยวที่สำคัญของเมืองเชียงใหม่...',
    location: {
      address: '9 หมู่ที่ 9',
      district: 'อำเภอเมืองเชียงใหม่',
      province: 'เชียงใหม่ 50200'
    },
    pricing: {
      adult: 'คนไทย ฟรี / ชาวต่างชาติ 30 บาท',
      child: 'ฟรี',
      foreign: '30 บาท'
    },
    openingHours: {
      weekday: '06:00 - 20:00'
    },
    gps: 'https://goo.gl/maps/FsbJY5BKEBnNEt5A6',
    parking: true,
    galleryImages: [
      '/images/doi1.jpg',
      '/images/doi2.jpg'
    ],
    rating: 4.9
  }
];

const TempleDetail = () => {
  const { id } = useParams();
  const [temple, setTemple] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, you'd fetch this data from an API
    // For now, we'll just simulate that by finding the temple in our data
    const templeId = parseInt(id);
    const foundTemple = templesData.find(t => t.id === templeId);
    
    setTemple(foundTemple);
    setLoading(false);
  }, [id]);
  
  if (loading) {
    return <div className="loading">กำลังโหลด...</div>;
  }
  
  if (!temple) {
    return <div className="not-found">ไม่พบข้อมูลวัด</div>;
  }
  
  return (
    <div className="temple-detail">
      {/* Gallery header */}
      <div className="temple-gallery">
        {temple.galleryImages.map((img, index) => (
          <div key={index} className="gallery-image">
            <img src={img} alt={`${temple.name} - รูปที่ ${index + 1}`} />
          </div>
        ))}
      </div>
      
      <div className="temple-detail-content">
        {/* Temple name and rating */}
        <div className="temple-header">
          <h1>{temple.name}</h1>
          <div className="rating">
            <span className="star">⭐</span>
            <span className="rating-value">{temple.rating}</span>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="temple-detail-main">
          <div className="temple-description">
            <p>{temple.description}</p>
            <div className="temple-long-description">
              <p>{temple.longDescription}</p>
            </div>
          </div>
          
          {/* Info sidebar */}
          <div className="temple-info-sidebar">
            <div className="info-section">
              <h3>อัตราค่าบริการ</h3>
              <div className="pricing-info">
                <div className="price-row">
                  <span>ผู้ใหญ่</span>
                  <span>{temple.pricing.adult}</span>
                </div>
                <div className="price-row">
                  <span>เด็ก</span>
                  <span>{temple.pricing.child}</span>
                </div>
                <div className="price-row">
                  <span>ต่างชาติ</span>
                  <span>{temple.pricing.foreign}</span>
                </div>
              </div>
            </div>
            
            <div className="info-section">
              <h3>เวลาเปิดทำการ</h3>
              <div className="hours-info">
                <div className="hours-row">
                  <span>ทุกวัน</span>
                  <span>{temple.openingHours.weekday}</span>
                </div>
              </div>
            </div>
            
            <div className="info-section">
              <h3>ที่ตั้ง</h3>
              <div className="location-info">
                <p>{temple.location.address}</p>
                <p>{temple.location.district}</p>
                <p>{temple.location.province}</p>
                <div className="gps-link">
                  <p>GPS:</p>
                  <a href={temple.gps} target="_blank" rel="noopener noreferrer">
                    {temple.gps}
                  </a>
                </div>
              </div>
            </div>
            
            {temple.parking && (
              <div className="info-section facilities">
                <div className="facility">
                  <span className="facility-icon">✓</span>
                  <span className="facility-name">ที่จอดรถ (เพียงพอ)</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="back-link">
        <Link to="/attractions">ย้อนกลับไปหน้ารายการวัด</Link>
      </div>
    </div>
  );
};

export default TempleDetail;