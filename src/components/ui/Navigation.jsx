import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import shrijiLogo from '../../assets/shriji-logo.svg';
import './Navigation.css';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Products', href: '#products' },
    { name: 'Virtual Factory', href: '#factory' },
    { name: 'Sustainability', href: '#sustainability' },
    { name: 'Global Network', href: '#network' },
    { name: 'Credibility', href: '#credibility' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <motion.nav
        className={`navigation ${isScrolled ? 'scrolled glass-panel' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="nav-container">
          <motion.div 
            className="logo" 
            onClick={() => window.location.hash = '#home'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <img src={shrijiLogo} alt="Shriji Polymers" className="brand-logo" />
          </motion.div>

          {/* Desktop Nav */}
          <div className="desktop-links">
            {navLinks.map((link, index) => (
              <a key={index} href={link.href} className="nav-link">
                {link.name}
              </a>
            ))}
            <button className="contact-btn" onClick={() => window.location.hash = '#contact'}>
              Get in Touch
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="mobile-menu glass-panel"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="mobile-nav-items">
              {navLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.href} 
                  className="mobile-nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <button 
                className="contact-btn mobile-only touch-enlarged"
                onClick={() => {
                  window.location.hash = '#contact';
                  setIsMenuOpen(false);
                }}
              >
                Get in Touch
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
