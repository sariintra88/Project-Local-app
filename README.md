
# เว็บแนะนำวัดในเชียงใหม่

# คำอธิบายโครงสร้างโปรเจกต์
ส่วนของ Front-End
```
├── node_modules/                  #
│
├── public/
│    ├── images/                   # เก็บไฟล์ภาพที่ใช้ในโปรเจกต์
│    │
│    └── vite.svg                  
│
├── src/
│    ├── assets/                   # เก็บไฟล์ภาพที่ใช้ในโปรเจกต์
│    │
│    ├── components/               # ส่วนประกอบที่สามารถนำกลับมาใช้ซ้ำได้
│    │   ├── Footer.css            # ส่วนท้ายของเว็บไซต์ (footer)
│    │   ├── Footer.jsx            # ส่วนท้ายของเว็บไซต์ (footer)
│    │   ├── Navbar.css            # แถบเมนูนำทางด้านบนของเว็บ
│    │   └── Navbar.jsx            # แถบเมนูนำทางด้านบนของเว็บ
│    │
│    ├── pages/                    # หน้าเว็บหลักแต่ละหน้า
│    │   ├── About.jsx             # เกี่ยวกับเรา
│    │   ├── About.css             # เกี่ยวกับเรา
│    │   ├── Attractions.jsx       # หน้ารวมสถานที่ท่องเที่ยวทั้งหมด
│    │   ├── Attractions.css       # หน้ารวมสถานที่ท่องเที่ยวทั้งหมด
│    │   ├── Contact.jsx           # หน้าติดต่อเรา
│    │   ├── Contact.css           # หน้าติดต่อเรา
│    │   ├── Home.jsx              # หน้าแรก
│    │   ├── Home.css              # หน้าแรก
│    │   ├── Login.jsx             # หน้าเข้าสู่ระบบ
│    │   ├── Login.css             # หน้าเข้าสู่ระบบ
│    │   ├── Register.jsx          # หน้าสมัครสมาชิก
│    │   ├── Register.css          # หน้าสมัครสมาชิก
│    │   ├── TempleDetail.jsx      # หน้ารายละเอียดสถานที่แต่ละแห่ง
│    │   └── TempleDetail.css      # หน้ารายละเอียดสถานที่แต่ละแห่ง
│    │
│    ├── App.css                   # สไตล์หลักของแอป
│    ├── App.jsx                   # ไฟล์หลักของแอป
│    ├── index.css                 # สไตล์ Global
│    ├── main.jsx                  # เริ่มรันแอป React ลงในหน้าเว็บ
│    └── responsive.css            # สไตล์เพิ่มเติมสำหรับรองรับหน้าจอหลายขนาด
│         
├── .gitignore                     # ไฟล์ที่ไม่ต้องการให้ Git ติดตาม
├── eslint.config.js               # ตั้งค่ากฎตรวจสอบโค้ด
├── index.html                     # สร้างหน้าเว็บ
├── LICENSE                        # ระบุสิทธิ์การใช้งานของโปรเจกต์
├── package-lock.json              # ล็อกเวอร์ชัน dependencies ให้ตรงกันทุกเครื่อง
├── package.json                   # จัดการ dependencies และคำสั่งรันโปรเจกต์
├── README.md                      # ไฟล์อธิบายโปรเจกต์และวิธีใช้งาน
├── vite.config.js                 # ตั้งค่าการทำงานของ Vite สำหรับ build เว็บ
```

ส่วนของ Back-End
```

├── Backend/temple-api
    ├── models/                     
    │      ├── Temple.js            # มีไว้สำหรับรับข้อมูลวัดจาก postman
    │      └── User.js              # รับข้อมูลผู้ใช้จาก postman
    ├── uploads/                    # เก็บรูปภาพที่อัพเดตรูปวัดจาก postman 
    │
    ├── db.js                       # ไฟล์ database 
    ├── package-lock.json           
    ├── package.json                
    └── server.json                 # API



```

# สิ่งที่ยังทำไม่ได้ พร้อมแนวคิดว่าจะพัฒนาต่ออย่างไร



# docker-compose
