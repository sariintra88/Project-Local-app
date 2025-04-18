
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
│    ├── main.jsx                  # 
│    └── responsive.css            # สไตล์เพิ่มเติมสำหรับรองรับหน้าจอหลายขนาด
│         
├── .gitignore                     # 
├── eslint.config.js               # 
├── index.html                     # 
├── LICENSE                        # 
├── package-lock.json              # 
├── package.json                   # 
├── README.md                      # เอกสารโปรเจกต์
├── vite.config.js                 # 
```

ส่วนของ Back-End
```

├── Backend/temple-api
    ├── models/                     # 
    │      ├── Temple.js            # 
    │      └── User.js              # 
    ├── uploads/                    # 
    │
    ├── db.js
    ├── package-lock.json           #
    ├── package.json                #
    └── server.json                 #



```

# วิธีการรันโปรเจกต์
npm install

npm run dev


