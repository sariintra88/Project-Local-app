import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useLocation, Link } from "react-router-dom";
import './TempleDetail.css';
import Review from "../components/Review";
import TempleReviews from "../components/TempleReview";

const API_BASE_URL = 'http://localhost:5001';

const TempleDetail = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const templeName = pathname.split('/attractions/')[1];

  const [temple, setTemple] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewRefreshTrigger, setReviewRefreshTrigger] = useState(0);
  const [averageRating, setAverageRating] = useState(0.0);


  useEffect(() => {
    const fetchTempleInfo = async () => {
      try {
        const decodedName = decodeURIComponent(templeName);
        const allTemples = await axios.get(`${API_BASE_URL}/api/templeInfos`);
        const foundTemple = allTemples.data.find(
          (t) => t.name.toLowerCase() === decodedName.toLowerCase()
        );
        if (foundTemple) {
          setTemple(foundTemple);
        } else {
          setError("ไม่พบข้อมูลวัดที่ต้องการ");
        }
      } catch (err) {
        setError("เกิดข้อผิดพลาดในการโหลดข้อมูล");
      } finally {
        setLoading(false);
      }
    };
    fetchTempleInfo();
  }, [pathname]);

  useEffect(() => {
  const fetchAverageRating = async () => {
    if (!temple?._id) return;
    try {
      const response = await axios.get(`${API_BASE_URL}/api/reviews/temple/${temple._id}/average-rating`);
      setAverageRating(response.data.averageRating ?? 0.0); // ใช้ ?? กัน undefined/null
    } catch (err) {
      console.warn("ดึงคะแนนเฉลี่ยไม่สำเร็จ:", err);
      setAverageRating(0.0); // fallback แบบเงียบ
    }
  };

  fetchAverageRating();
}, [temple?._id, reviewRefreshTrigger]);


  // Function to handle successful review submission
  const handleReviewSubmitted = () => {
    // Close the modal
    setIsReviewModalOpen(false);
    setActiveButton(null);
    
    // Trigger reviews refresh
    setReviewRefreshTrigger(prev => prev + 1);
  };

  if (loading) return <div className="loading">กำลังโหลดข้อมูล...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!temple) return null;

  return (
    <div className="page-layout">
      <div className="temple-gallery">
        {temple.images.slice(0, 5).map((img, i) => (
          <div key={i} className={`gallery-image ${i === 1 ? 'active' : ''}`}>
            <img
              src={`${API_BASE_URL}/uploads/5-temple/${img}`}
              alt={`วัด ${temple.name} - ${i + 1}`}
            />
          </div>
        ))}
      </div>

      <div className="temple-header">
            <h1>{temple.name}</h1>
            <div className="rating">
                <span className="star">⭐</span>
                <span className="rating-value">{averageRating.toFixed(1)}</span>
            </div>
            </div>


      <div className="temple-detail-main">
        <div className="temple-description">
          <p>{temple.description}</p>
          {temple.longDescription && (
            <div className="temple-long-description">
              <p>{temple.longDescription}</p>
            </div>
          )}
          <div className="main-temple-image">
            <img
              src={`${API_BASE_URL}/uploads/5-temple/${temple.images?.[0]}`}
              alt={temple.name}
            />
          </div>
          <div className="temple-action-buttons">
            {[
              { label: "💬 เขียนรีวิว", key: "review", onClick: () => { setActiveButton("review"); setIsReviewModalOpen(true); }},
              { label: "🔖 บันทึก", key: "save", onClick: () => setActiveButton("save") },
              { label: "📍 เส้นทาง", key: "map", onClick: () => setActiveButton("map") },
              { label: "📤 แชร์", key: "share", onClick: () => setActiveButton("share") }
            ].map((btn) => (
              <button
                key={btn.key}
                className={`action-btn ${activeButton === btn.key ? "primary" : ""}`}
                onClick={btn.onClick}
              >
                {btn.label}
              </button>
            ))}
          </div>
          
          {/* Add the reviews section here */}
          <TempleReviews 
            templeId={temple._id} 
            refreshTrigger={reviewRefreshTrigger}
          />
        </div>

        <div className="temple-info-sidebar">
          <div className="info-section">
            <h3>อัตราค่าบริการ</h3>
            <div className="pricing-info">
              <div className="price-row">
                <span>ผู้ใหญ่</span>
                <span>{temple.feeAdult}</span>
              </div>
              <div className="price-row">
                <span>เด็ก</span>
                <span>{temple.feeChild}</span>
              </div>
            </div>
          </div>

          <div className="info-section">
            <h3>เวลาเปิดทำการ</h3>
            <div className="hours-info">
              <div className="hours-row">
                <span>{temple.openDays}</span>
                <span>{temple.openTime}</span>
              </div>
            </div>
          </div>

          <div className="info-section">
            <h3>ที่ตั้ง</h3>
            <div className="location-info">
              <p>{temple.location}</p>
              {temple.gps && (
                <div className="gps-link">
                  <a href={temple.gps} target="_blank" rel="noopener noreferrer">
                    {temple.gps}
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="info-section facilities">
            <h3>สิ่งอำนวยความสะดวก</h3>
            <div className="facility">
              <div className="facility-icon">✔</div>
              <div className="facility-name">ที่จอดรถ (มีที่จอดรถ)</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* ปุ่มย้อนกลับ */}
      <div className="back-link">
        <Link to="/attractions">ย้อนกลับไปหน้ารายการวัด</Link>
      </div>

      {isReviewModalOpen && (
        <Review 
          templeId={temple._id}
          templeName={temple.name}
          onClose={() => {
            setIsReviewModalOpen(false);
            setActiveButton(null);
          }} 
          onSubmitSuccess={handleReviewSubmitted}
        />
      )}
    </div>
  );
};

export default TempleDetail;