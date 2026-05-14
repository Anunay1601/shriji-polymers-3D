import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Preload } from '@react-three/drei';
import Scene from './components/canvas/Scene';
import Hero from './components/sections/Hero';
import ValueProps from './components/sections/ValueProps';
import Products from './components/sections/Products';
import GlobalNetwork from './components/sections/GlobalNetwork';
import VirtualFactory from './components/sections/VirtualFactory';
import Sustainability from './components/sections/Sustainability';
import Credibility from './components/sections/Credibility';
import Careers from './components/sections/Careers';
import ApplyNow from './components/sections/ApplyNow';
import LegalPage from './components/sections/LegalPage';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/sections/Footer';
import Navigation from './components/ui/Navigation';

import './App.css';

function App() {
  const containerRef = useRef(null);
  const [currentHash, setCurrentHash] = useState(() => window.location.hash || '#home');

  useEffect(() => {
    const handleHashChange = () => {
      const newHash = window.location.hash || '#home';
      setCurrentHash(newHash);
      
      // Force instant scroll to top only when entering standalone dedicated route sub-pages or the base Home anchor
      const baseHash = newHash.split('?')[0]; // Handle parameters like #apply?role=xyz
      const subPages = ['#factory', '#sustainability', '#credibility', '#careers', '#apply', '#privacy', '#terms', '#home'];
      if (subPages.includes(baseHash)) {
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        // Automatically scroll to intra-page sections beautifully once DOM completes layout mounting
        setTimeout(() => {
          const targetId = newHash.replace('#', '');
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 60);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Determine which page layout view is currently active
  const baseHash = currentHash.split('?')[0];
  const isFactory = baseHash === '#factory';
  const isSustainability = baseHash === '#sustainability';
  const isCredibility = baseHash === '#credibility';
  const isCareers = baseHash === '#careers';
  const isApply = baseHash === '#apply';
  const isLegal = baseHash === '#privacy' || baseHash === '#terms';

  // If none of those specialized sub-pages is active, default to the Home page flow
  const isHome = !isFactory && !isSustainability && !isCredibility && !isCareers && !isApply && !isLegal;

  return (
    <div className="app-container" ref={containerRef}>
      <Navigation />

      {/* 1. EXCLUSIVE HOME PAGE VIEW */}
      {isHome && (
        <>
          {/* Shared Ambient Hero/Portfolio Particle Canvas */}
          <div className="canvas-container">
            <Canvas
              shadows
              camera={{ position: [0, 0, 5], fov: 45 }}
              gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
              dpr={[1, 1.2]}
            >
              <Suspense fallback={null}>
                <Scene />
                <Environment preset="city" />
                <Preload all />
              </Suspense>
            </Canvas>
          </div>

          {/* Core Scroll Modules */}
          <div className="scroll-content">
            <Hero />
            <ValueProps />
            <Products />
            <GlobalNetwork />
            <ContactSection />
            <Footer />
          </div>
        </>
      )}

      {/* 2. DEDICATED VIRTUAL FACTORY VIEW */}
      {isFactory && (
        <div className="page-view-wrapper">
          <VirtualFactory />
          <Footer />
        </div>
      )}

      {/* 3. DEDICATED SUSTAINABILITY VIEW */}
      {isSustainability && (
        <div className="page-view-wrapper">
          <Sustainability />
          <Footer />
        </div>
      )}

      {/* 4. DEDICATED CREDIBILITY VIEW */}
      {isCredibility && (
        <div className="page-view-wrapper">
          <Credibility />
          <Footer />
        </div>
      )}

      {/* 5. DEDICATED CAREERS VIEW */}
      {isCareers && (
        <div className="page-view-wrapper">
          <Careers />
          <Footer />
        </div>
      )}

      {/* 6. DEDICATED APPLY NOW VIEW */}
      {isApply && (
        <div className="page-view-wrapper">
          <ApplyNow />
          <Footer />
        </div>
      )}

      {/* 7. DEDICATED LEGAL VIEW */}
      {isLegal && (
        <div className="page-view-wrapper">
          <LegalPage />
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
