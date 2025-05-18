import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";

const API_BASE_URL = 'http://localhost:5001';

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
        
        if (!templeName) {
          setError("ไม่พบชื่อวัดใน URL");
          return;
        }
        
        // เก็บข้อมูลดีบัก
        const debug = {
          rawPathname: pathname,
          rawTempleName: templeName
        };
        
        // ถอดรหัส URL encoded string กลับเป็นข้อความปกติ
        const decodedTempleName = decodeURIComponent(templeName);
        debug.decodedTempleName = decodedTempleName;
        
        console.log("กำลังค้นหาวัด:", decodedTempleName);
        
        // ดึงข้อมูลวัดทั้งหมด
        const allTemplesRes = await axios.get(`${API_BASE_URL}/api/templeInfos`);
        debug.allTemples = allTemplesRes.data.map(t => t.name);
        
        // ค้นหาวัดที่ตรงกับชื่อที่ต้องการ
        const foundTemple = allTemplesRes.data.find(t => 
          t.name.toLowerCase() === decodedTempleName.toLowerCase()
        );
        
        if (foundTemple) {
          console.log("พบวัดที่ตรงกับชื่อ:", foundTemple.name);
          setTemple(foundTemple);
          setError(null);
        } else {
          // ถ้าไม่พบที่ตรงกันแบบเป๊ะๆ ให้ลองหาแบบคล้ายๆ กัน
          console.log("ไม่พบวัดที่ตรงกับชื่อ กำลังค้นหาแบบคล้ายคลึง...");
          const partialMatches = allTemplesRes.data.filter(t => 
            t.name.toLowerCase().includes(decodedTempleName.toLowerCase()) ||
            decodedTempleName.toLowerCase().includes(t.name.toLowerCase())
          );
          
          debug.partialMatches = partialMatches.map(t => t.name);
          
          if (partialMatches.length > 0) {
            console.log("พบวัดที่คล้ายคลึง:", partialMatches[0].name);
            setTemple(partialMatches[0]);
            setError(null);
          } else {
            console.log("ไม่พบวัดที่คล้ายคลึงเลย");
            setError("ไม่พบข้อมูลวัดที่ต้องการ");
            setTemple(null);
          }
        }
        
        setDebugInfo(debug);
      } catch (err) {
        console.error("เกิดข้อผิดพลาดในการโหลดข้อมูล:", err);
        setError("ไม่สามารถโหลดข้อมูลวัดได้");
        setTemple(null);
        setDebugInfo({ error: err.message });
      } finally {
        setLoading(false);
      }
    };

    fetchTempleInfo();
  }, [pathname]);

  if (loading) return <div className="loading">กำลังโหลดข้อมูล...</div>;
  
  if (error) return (
    <div className="error">
      <h3>{error}</h3>
      <p>URL ที่ใช้: {pathname}</p>
      <p>ชื่อวัดที่ค้นหา: {templeName ? decodeURIComponent(templeName) : 'ไม่ระบุ'}</p>
      
      {debugInfo && Object.keys(debugInfo).length > 0 && (
        <div className="debug-info" style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
          <h4>ข้อมูลสำหรับการแก้ไขปัญหา:</h4>
          <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
        </div>
      )}
    </div>
  );
  
  if (!temple) return <div>ไม่พบข้อมูลวัด</div>;

  return (
    <div className="temple-detail">
      <h2>{temple.name}</h2>
      <p>{temple.description}</p>
      <p>วันเปิด: {temple.openDays}</p>
      <p>เวลาเปิด: {temple.openTime}</p>
      <p>ค่าผู้ใหญ่: {temple.feeAdult}</p>
      <p>ค่าเด็ก: {temple.feeChild}</p>
      <p>ที่ตั้ง: {temple.location}</p>

      {temple.images && Array.isArray(temple.images) && (
        <div className="temple-images">
          <h4>รูปภาพเพิ่มเติม</h4>
          {temple.images.map((img, index) => (
            <img
              key={index}
              src={`${API_BASE_URL}/uploads/5-temple/${img}`}
              alt={`ภาพวัด ${temple.name} - ${index + 1}`}
              style={{ maxWidth: "200px", margin: "5px" }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TempleDetail;