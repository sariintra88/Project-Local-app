import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MuteluTrip from './components/MuteluTrip';
import Home from './components/MuteluTrip';
import About from './pages/About';
import Attractions from './pages/Attractions';
import Contact from './pages/Contact';
import TempleDetail from './pages/TempleDetail';
import Login from './pages/Login';
import Regis from './pages/Register';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        {/* หน้าแรกแบบ one-page scroll */}
        <Route path="/" element={<MuteluTrip />} />

        {/* ครอบหน้าทั่วไปด้วย Layout เดียวกับหน้าแรก */}
        <Route path="/home" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/attractions" element={<Layout><Attractions /></Layout>} />
        {/* เปลี่ยนพารามิเตอร์เป็น id */}
        <Route path="/attractions/:id" element={<Layout><TempleDetail /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Regis />} />
      </Routes>
    </Router>
  );
}

export default App;
