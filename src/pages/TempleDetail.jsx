const TempleDetail = () => {
  const { id } = useParams();
  const [temple, setTemple] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeButton, setActiveButton] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const templeId = parseInt(id);
    const foundTemple = templesData.find(t => t.id === templeId);
    setTemple(foundTemple);
    setLoading(false);
  }, [id]);

  if (loading) return <div className="loading">กำลังโหลด.</div>;
  if (!temple) return <div className="not-found">ไม่พบข้อมูลวัด</div>;

  return (
    <>
      <div className="temple-detail">
        {/* แกลเลอรี่ */}
        <div className="temple-gallery">
          {temple.galleryImages.map((img, index) => (
            <div key={index} className="gallery-image">
              <img src={img} alt={`${temple.name} - รูปที่ ${index + 1}`} />
            </div>
          ))}
        </div>

        {/* รายละเอียด */}
        <div className="temple-detail-content">
          <div className="temple-header">
            <h1>{temple.name}</h1>
            <div className="rating">
              <span className="star">⭐</span>
              <span className="rating-value">{temple.rating}</span>
            </div>
          </div>

          <div className="temple-detail-main">
            <div className="temple-description">
              <p>{temple.description}</p>
              <div className="main-temple-image">
                <img src={temple.mainImage} alt={temple.name} />
              </div>
              <div className="temple-long-description">
                <p>{temple.longDescription}</p>
              </div>
            </div>

            <div className="temple-info-sidebar">
              <div className="info-section">
                <h3>อัตราค่าบริการ</h3>
                <div className="pricing-info">
                  <div className="price-row"><span>ผู้ใหญ่</span><span>{temple.pricing.adult}</span></div>
                  <div className="price-row"><span>เด็ก</span><span>{temple.pricing.child}</span></div>
                  <div className="price-row"><span>ต่างชาติ</span><span>{temple.pricing.foreign}</span></div>
                </div>
              </div>

              <div className="info-section">
                <h3>เวลาเปิดทำการ</h3>
                <div className="hours-info">
                  <div className="hours-row"><span>ทุกวัน</span><span>{temple.openingHours.weekday}</span></div>
                </div>
              </div>

              <div className="info-section">
                <h3>ที่ตั้ง</h3>
                <div className="location-info">
                  <p>{temple.location.address}</p>
                  <p>{temple.location.district}</p>
                  <p>{temple.location.province}</p>
                  <div className="gps-link">
                    <a href={temple.gps} target="_blank" rel="noopener noreferrer">{temple.gps}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* รีวิว */}
          <div className="temple-reviews">
            {temple.reviews.map((review, index) => (
              <div className="review-card" key={index}>
                <div className="review-header">
                  <div className="review-profile">
                    <div className="avatar-placeholder">👤</div>
                    <div>
                      <div className="review-user">{review.user}</div>
                      <div className="review-stars">{'⭐'.repeat(review.rating)}</div>
                    </div>
                  </div>
                </div>
                <p className="review-comment">{review.comment}</p>
              </div>
            ))}
          </div>

          {/* ปุ่มย้อนกลับ */}
          <div className="back-link">
            <Link to="/attractions">ย้อนกลับไปหน้ารายการวัด</Link>
          </div>

          {/* โมดัลรีวิว */}
          {isReviewModalOpen && <Review isOpen={true} onClose={() => setIsReviewModalOpen(false)} />}
        </div>
      </div>
    </>
  );
};

export default TempleDetail;
