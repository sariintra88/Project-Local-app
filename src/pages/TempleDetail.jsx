import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = 'http://localhost:5001';

const TempleDetail = () => {
  const { name } = useParams();
  const [templeInfo, setTempleInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTempleInfo = async () => {
      try {
        setLoading(true);
        const decodedName = decodeURIComponent(name);
        const res = await axios.get(`${API_BASE_URL}/api/templeInfos/name/${decodedName}`);
        setTempleInfo(res.data);
        setError(null);
      } catch (err) {
        console.error("ไม่พบ templeInfo:", err);
        setError("ไม่สามารถโหลดข้อมูลวัดได้");
        setTempleInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTempleInfo();
  }, [name]);

  if (loading) return <div>กำลังโหลดข้อมูล...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!templeInfo) return <div>ไม่พบข้อมูลวัดนี้</div>;

  return (
    <div className="temple-detail">
      <h1>{templeInfo.name}</h1>
      <p>{templeInfo.description}</p>
      <p>วันเปิด: {templeInfo.openDays}</p>
      <p>เวลาเปิด: {templeInfo.openTime}</p>
      <p>ค่าผู้ใหญ่: {templeInfo.feeAdult}</p>
      <p>ค่าเด็ก: {templeInfo.feeChild}</p>
      <p>ที่ตั้ง: {templeInfo.location}</p>

      {templeInfo.images && Array.isArray(templeInfo.images) && (
        <div className="temple-images">
          <h3>รูปภาพเพิ่มเติม</h3>
          {templeInfo.images.map((img, index) => (
            <img
              key={index}
              src={`${API_BASE_URL}/uploads/5-temple/${img}`}
              alt={`ภาพวัด ${templeInfo.name} - ${index + 1}`}
              style={{ maxWidth: "300px", margin: "10px" }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TempleDetail;
