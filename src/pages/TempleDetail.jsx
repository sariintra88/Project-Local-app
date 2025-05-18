import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './TempleDetail.css';

const TempleDetail = () => {
  const { id } = useParams();
  const [temple, setTemple] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemple = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/templeInfo/${id}`);
        if (!response.ok) {
          throw new Error('ไม่พบข้อมูลวัด');
        }
        const data = await response.json();
        setTemple(data); // สมมุติ backend return temple object ตรง ๆ
      } catch (err) {
        console.error(err);
        setTemple(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTemple();
  }, [id]);

  if (loading) return <div className="loading">กำลังโหลด...</div>;
  if (!temple) return <div className="not-found">ไม่พบข้อมูลวัด</div>;

  return (
    <div className="temple-detail">
      <h1 className="temple-title">{temple.name}</h1>

      <div className="temple-image-container">
        <img src={`/uploads/${temple.image}`} alt={temple.name} className="temple-image" />
      </div>

      <p className="temple-description">{temple.description}</p>

      <div className="back-link">
        <Link to="/attractions" className="back-button">← ย้อนกลับไปหน้ารายการวัด</Link>
      </div>
    </div>
  );
};

export default TempleDetail;
