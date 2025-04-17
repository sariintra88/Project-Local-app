# คำอธิบายโปรเจค
# เว็บแนะนำวัดในเชียงใหม่

# ส่วนของ Front-End
├── node_modules/                  #
│
├── public/
│    ├── images/                   # เก็บไฟล์ภาพที่ใช้ในโปรเจกต์
│    │
│    └── vite.svg                  #
│
├── src/
│    ├── assets/                   # เก็บไฟล์ภาพที่ใช้ในโปรเจกต์
│    │
│    ├── components/               # ส่วนประกอบ UI ที่สามารถนำกลับมาใช้ซ้ำได้
│    │   ├── Footer.css            # ส่วนท้ายของเว็บไซต์ (footer)
│    │   ├── Footer.jsx            # ส่วนท้ายของเว็บไซต์ (footer)
│    │   ├── Navbar.css            # แถบเมนูนำทาง (navigation bar)
│    │   └── Navbar.jsx            # แถบเมนูนำทาง (navigation bar)
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
│    ├── App.css                   # 
│    ├── App.jsx                   # 
│    ├── index.css                 #
│    ├── main.jsx                  #
│    └── responsive.css            #
│         
├── .gitignore                     #
├── eslint.config.js               #
├── index.html                     #
├── LICENSE                        #
├── package-lock.json              #
├── package.json                   #
├── README.md                      # เอกสารโปรเจกต์
├── vite.config.js                 #

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# วิธีการรันโปรเจกต์
npm install

npm run dev


