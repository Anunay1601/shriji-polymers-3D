import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Globe2, MapPin, Truck, Factory, ShieldCheck, Box } from 'lucide-react';
import GlobeScene from '../canvas/GlobeScene';
import './GlobalNetwork.css';

const locationDetails = {
  india: {
    name: "India (Headquarters)",
    desc: "Our primary manufacturing hub equipped with state-of-the-art robotic automation.",
    stats: [
      { label: "Facilities", value: "3", icon: <Factory size={16}/> },
      { label: "Capacity", value: "5M/day", icon: <Box size={16}/> },
      { label: "Certifications", value: "US FDA, ISO", icon: <ShieldCheck size={16}/> }
    ]
  },
  usa: {
    name: "United States",
    desc: "Advanced distribution and specialty packaging center serving North America.",
    stats: [
      { label: "Facilities", value: "1", icon: <Factory size={16}/> },
      { label: "Capacity", value: "2M/day", icon: <Box size={16}/> },
      { label: "Certifications", value: "FDA DMF", icon: <ShieldCheck size={16}/> }
    ]
  },
  uae: {
    name: "United Arab Emirates",
    desc: "Strategic logistics gateway for Europe and the Middle East.",
    stats: [
      { label: "Facilities", value: "1", icon: <Factory size={16}/> },
      { label: "Capacity", value: "1.5M/day", icon: <Box size={16}/> },
      { label: "Certifications", value: "ISO 9001", icon: <ShieldCheck size={16}/> }
    ]
  },
  china: {
    name: "China",
    desc: "High-volume component manufacturing and supply chain support.",
    stats: [
      { label: "Facilities", value: "1", icon: <Factory size={16}/> },
      { label: "Capacity", value: "3M/day", icon: <Box size={16}/> },
      { label: "Certifications", value: "CFDA", icon: <ShieldCheck size={16}/> }
    ]
  }
};

const GlobalNetwork = () => {
  const [activeLocation, setActiveLocation] = useState('india');

  const globalStats = [
    { value: "30+", label: "Countries Served", icon: <Globe2 size={24} /> },
    { value: "6", label: "Manufacturing Hubs", icon: <MapPin size={24} /> },
    { value: "100%", label: "Supply Chain Reliability", icon: <Truck size={24} /> }
  ];

  return (
    <section id="network" className="network-section">
      {/* 3D Canvas Background */}
      <div className="globe-canvas-container">
        <Canvas 
          camera={{ position: [0, 0, 7], fov: 45 }}
          gl={{ antialias: true, powerPreference: "high-performance" }}
          dpr={[1, 1.5]}
        >
          <Suspense fallback={null}>
            <GlobeScene 
              activeLocationId={activeLocation} 
              onLocationHover={setActiveLocation} 
            />
          </Suspense>
        </Canvas>
      </div>

      <div className="network-ui-overlay">
        <div className="network-header glass-panel">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Global <span className="text-cyan-glow">Reach</span>
          </motion.h2>
          
          <motion.p 
            className="section-subtitle network-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Operating a synchronized network of state-of-the-art manufacturing facilities. Delivering critical packaging solutions without interruption.
          </motion.p>

          <div className="global-stats">
            {globalStats.map((stat, index) => (
              <div key={index} className="global-stat-item">
                <div className="global-stat-icon">{stat.icon}</div>
                <div>
                  <div className="global-stat-value">{stat.value}</div>
                  <div className="global-stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Location Details Panel */}
        <div className="location-details-panel holographic-card">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLocation}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="location-info"
            >
              <h3 className="location-title text-cyan-glow">{locationDetails[activeLocation].name}</h3>
              <p className="location-desc">{locationDetails[activeLocation].desc}</p>
              
              <div className="location-stats-grid">
                {locationDetails[activeLocation].stats.map((stat, idx) => (
                  <div key={idx} className="loc-stat-box outline-glow">
                    <div className="loc-stat-header">
                      <span className="loc-stat-icon">{stat.icon}</span>
                      <span className="loc-stat-label">{stat.label}</span>
                    </div>
                    <div className="loc-stat-value">{stat.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default GlobalNetwork;
