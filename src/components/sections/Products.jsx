import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import ProductScene from '../canvas/ProductScene';
import './Products.css';

const Products = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showSpecs, setShowSpecs] = useState(false);

  useEffect(() => {
    const handleTabChange = (e) => {
      setActiveTab(e.detail.index);
      setShowSpecs(false);
    };
    
    window.addEventListener('changeProductTab', handleTabChange);
    return () => window.removeEventListener('changeProductTab', handleTabChange);
  }, []);

  const categories = [
    {
      name: "HDPE Bottles",
      specs: "10ml - 1000ml",
      desc: "High-density polyethylene solutions offering superior moisture barriers, designed for oral solids and liquids.",
      features: ["Child-Resistant Closures", "Tamper-Evident", "US FDA Approved Master File"],
      technicalData: [
        { label: "Material Grade", value: "DMF Compliant Pure Pharma HDPE" },
        { label: "Neck Finishes", value: "Standard SPI & Custom SPIL Geometries" },
        { label: "Moisture Barrier", value: "Ultra-Low Vapor Transmission Rate" },
        { label: "Volumes Available", value: "15cc to 950cc Fill Capacities" },
        { label: "Cleanroom Standard", value: "ISO 15378 Certified Manufacturing" }
      ]
    },
    {
      name: "PP Closures",
      specs: "20mm - 53mm",
      desc: "Precision-engineered polypropylene caps with optimal torque retention and seamless automated line integration.",
      features: ["Induction Sealing", "Desiccant Integrated", "Custom Color Matching"],
      technicalData: [
        { label: "Resin Composition", value: "High-Impact Medical Grade PP" },
        { label: "Liner Integrations", value: "Heat-Seal Induction Foils & EPE Liners" },
        { label: "Torque Specs", value: "Calibrated to USP <671> Integrity" },
        { label: "Safety Mechanisms", value: "Push-Down CRC & Tamper-Evident Rings" },
        { label: "Active Protection", value: "Integrated Silica Gel / Sieve Chambers" }
      ]
    },
    {
      name: "Specialty Packaging",
      specs: "Custom Dimensions",
      desc: "Advanced multi-layer barrier technologies for highly sensitive active pharmaceutical ingredients.",
      features: ["Oxygen Scavengers", "Light Protection", "Anti-Counterfeiting Tech"],
      technicalData: [
        { label: "Barrier Stack", value: "Co-extruded Active PE/EVOH/PE Layers" },
        { label: "Light Shielding", value: "<10% Transmission at 290-450nm Range" },
        { label: "Sterilization", value: "E-Beam & Gamma-Radiation Ready" },
        { label: "Target Application", value: "Highly Potent / Hygroscopic Solid APIs" },
        { label: "Security features", value: "Custom Holographic Anti-Counterfeiting" }
      ]
    }
  ];

  return (
    <section id="products" className="products-section">
      <div className="section-header">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Product <span className="text-gradient">Portfolio</span>
        </motion.h2>
      </div>

      <div className="products-showcase">
        {/* 3D Canvas Background for Products */}
        <div className="products-canvas-container">
          <Canvas 
            shadows 
            camera={{ position: [0, 0, 8], fov: 45 }}
            gl={{ antialias: true, powerPreference: "high-performance" }}
            dpr={[1, 1.2]}
          >
            <Suspense fallback={null}>
              <ProductScene activeTab={activeTab} />
            </Suspense>
          </Canvas>
        </div>

        {/* Floating UI Overlay */}
        <div className="products-ui">
          <div className="products-tabs holographic-panel">
            {categories.map((cat, index) => (
              <button 
                key={index}
                className={`tab-btn ${activeTab === index ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(index);
                  setShowSpecs(false);
                }}
              >
                <div className="tab-indicator" />
                <span className="tab-name">{cat.name}</span>
              </button>
            ))}
          </div>

          <div className="product-details holographic-card">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="product-info"
              >
                <div className="product-specs">{categories[activeTab].specs}</div>
                <h3 className="product-title">{categories[activeTab].name}</h3>
                <p className="product-desc">{categories[activeTab].desc}</p>
                
                <AnimatePresence mode="wait">
                  {!showSpecs ? (
                    <motion.div
                      key="features"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ul className="feature-list">
                        {categories[activeTab].features.map((feat, idx) => (
                          <li key={idx}>
                            <ChevronRight size={16} className="feature-icon glow" />
                            {feat}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="specs"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="specs-table-container"
                    >
                      {categories[activeTab].technicalData.map((spec, idx) => (
                        <div className="specs-row" key={idx}>
                          <div className="specs-label">{spec.label}</div>
                          <div className="specs-value">{spec.value}</div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <button 
                  className="glass-btn primary outline-glow" 
                  onClick={() => setShowSpecs(!showSpecs)}
                >
                  {showSpecs ? "Hide Specifications" : "View Specifications"}
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
