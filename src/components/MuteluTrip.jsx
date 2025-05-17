import React, { useRef, useState, useEffect } from 'react';
import Home from '../pages/Home';
import About from '../pages/About';
import Attractions from '../pages/Attractions';
import Contact from '../pages/Contact';
import TempleDetail from '../pages/TempleDetail';
import CustomNavbar from './CustomNavbar';
import Footer from './Footer';
import './MuteluTrip.css';

function MuteluTrip({ isDetailPage }) {
  const [activeSection, setActiveSection] = useState('home');
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const attractionsRef = useRef(null);
  const contactRef = useRef(null);

  const sectionRefs = {
    home: homeRef,
    about: aboutRef,
    attractions: attractionsRef,
    contact: contactRef,
  };

  const handleNavClick = (section) => {
    const ref = sectionRefs[section];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref?.current) observer.observe(ref.current);
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref?.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  return (
    <div className="one-page-scroll">
      <CustomNavbar onNavClick={handleNavClick} activeSection={activeSection} />

      {!isDetailPage ? (
        <>
          <section id="home" ref={homeRef}><Home /></section>
          <section id="about" ref={aboutRef}><About /></section>
          <section id="attractions" ref={attractionsRef}><Attractions /></section>
          <section id="contact" ref={contactRef}><Contact /></section>
        </>
      ) : (
        <>
          <TempleDetail />
        </>
      )}
    </div>
  );
}

export default MuteluTrip;
