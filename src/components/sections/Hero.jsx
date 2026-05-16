import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="hero-text-container"
        >
          <div className="badge glass-panel">Shriji Polymers</div>
          <h1 className="hero-title">
            Engineering Precision Packaging<br />
            <span className="text-cyan-glow">For The Future</span>
          </h1>
          <p className="hero-subtitle">
            Experience the pinnacle of intelligent design, robotic automation, and uncompromised quality standards.
          </p>
          <div className="hero-actions">
            <a href="#products" className="glass-btn primary">Explore Products</a>
            <a href="#sustainability" className="glass-btn secondary">Our Vision</a>
          </div>
        </motion.div>
      </div>

      <div className="scroll-indicator">
        <motion.div 
          className="mouse"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="wheel"></div>
        </motion.div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
};

export default Hero;
