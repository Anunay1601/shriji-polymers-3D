import React from 'react';
import shrijiLogo from '../../assets/shriji-logo.svg';
import './Footer.css';

const Footer = () => {
  const handleProductClick = (e, index) => {
    e.preventDefault();
    const section = document.getElementById('products');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    window.dispatchEvent(new CustomEvent('changeProductTab', { detail: { index } }));
  };

  const handleRouteClick = (e, targetHash) => {
    if (window.location.hash === targetHash) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 40);
    }
  };

  return (
    <footer className="footer-section">
      <div className="footer-content">
        <div className="footer-brand">
          <img src={shrijiLogo} alt="Shriji Polymers" className="footer-brand-logo" />
          <p className="footer-desc">
            Next-generation pharmaceutical packaging solutions engineered for global healthcare.
          </p>
        </div>
        
        <div className="footer-links">
          <div className="link-group">
            <h4>Products</h4>
            <a href="#products" onClick={(e) => handleProductClick(e, 0)}>HDPE Bottles</a>
            <a href="#products" onClick={(e) => handleProductClick(e, 1)}>PP Closures</a>
            <a href="#products" onClick={(e) => handleProductClick(e, 2)}>Specialty Packaging</a>
            <a href="#products">Custom Solutions</a>
          </div>
          <div className="link-group">
            <h4>Company</h4>
            <a href="#about">About Us</a>
            <a href="#network">Global Network</a>
            <a href="#sustainability" onClick={(e) => handleRouteClick(e, '#sustainability')}>Sustainability</a>
            <a href="#careers" onClick={(e) => handleRouteClick(e, '#careers')}>Careers</a>
          </div>
          <div className="link-group">
            <h4>Legal</h4>
            <a href="#privacy" onClick={(e) => handleRouteClick(e, '#privacy')}>Privacy Policy</a>
            <a href="#terms" onClick={(e) => handleRouteClick(e, '#terms')}>Terms of Service</a>
            <a href="#credibility" onClick={(e) => handleRouteClick(e, '#credibility')}>Quality Certifications</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Shriji Polymers (India) Limited. All rights reserved.</p>
        <div className="footer-socials">
          <a href="#">LinkedIn</a>
          <a href="#">Twitter</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
