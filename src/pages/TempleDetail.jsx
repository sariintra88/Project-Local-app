import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";

const API_BASE_URL = "http://localhost:5001";

const TempleDetail = () => {
  // ดึงชื่อวัดจาก URL โดยตรง โดยใช้ pathname แทน useParams
  const location = useLocation();
  const pathname = location.pathname;
  const templeName = pathname.split('/attractions/')[1]; // ดึงส่วนหลังจาก /attractions/
  
  const [temple, setTemple] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState({});

  useEffect(() => {
    const fetchTempleInfo = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/api/templeinfos/name/${name}`);
        setTempleInfo(res.data);
        setError(null);
      } catch (err) {
        setError("ไม่พบข้อมูลวัดนี้");
        setTempleInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTempleInfo();
  }, [pathname]);

  if (loading) return <div>กำลังโหลดข้อมูล...</div>;
  if (error) return <div>{error}</div>;
  if (!templeInfo) return <div>ไม่พบข้อมูลวัดนี้</div>;

  return (
    <div>
      <h1>{templeInfo.name}</h1>
      <p>{templeInfo.description}</p>
      <p>วันเปิด: {templeInfo.openDays}</p>
      <p>เวลาเปิด: {templeInfo.openTime}</p>
      <p>ค่าผู้ใหญ่: {templeInfo.feeAdult}</p>
      <p>ค่าเด็ก: {templeInfo.feeChild}</p>
      <p>ค่าต่างชาติ: {templeInfo.feeForeigner}</p>
      <p>ที่ตั้ง: {templeInfo.location}</p>

      {templeInfo.images && templeInfo.images.length > 0 && (
        <div>
          <h3>รูปภาพ</h3>
          {templeInfo.images.map((img, i) => (
            <img
              key={i}
              src={`${API_BASE_URL}/uploads/5-temple/${img}`}
              alt={`รูปภาพวัด ${templeInfo.name} ${i + 1}`}
              style={{ maxWidth: 300, margin: 10 }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TempleDetail;