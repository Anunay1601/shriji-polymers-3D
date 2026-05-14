import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Briefcase, MapPin, ChevronRight, GraduationCap, Globe2, Award } from 'lucide-react';
import CareerScene from '../canvas/CareerScene';
import './Careers.css';

const Careers = () => {
  const jobs = [
    { title: "Lead Polymer Material Scientist", dept: "Research & Development", location: "Pithampur, India HQ", type: "Full-Time" },
    { title: "Robotics & Automation Engineer", dept: "Advanced Engineering", location: "New Jersey, USA", type: "Full-Time" },
    { title: "Global Regulatory Affairs Manager", dept: "Quality Assurance", location: "Basel, Switzerland", type: "Full-Time" },
    { title: "Industrial IoT Systems Architect", dept: "Digital Transformation", location: "Pithampur, India HQ", type: "Full-Time" }
  ];

  return (
    <section id="careers" className="careers-section">
      {/* 3D Background */}
      <div className="careers-canvas-container">
        <Canvas 
          camera={{ position: [0, 0, 12], fov: 45 }}
          gl={{ antialias: true, powerPreference: "high-performance" }}
          dpr={[1, 1.5]}
        >
          <Suspense fallback={null}>
            <CareerScene />
          </Suspense>
        </Canvas>
      </div>

      <div className="careers-ui-overlay">
        {/* Header Area */}
        <div className="careers-header">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="careers-title-container"
          >
            <h1 className="careers-title">
              Engineering <span className="text-cyan-glow">Careers</span>
            </h1>
            <p className="careers-subtitle">
              Join a global leader in pharmaceutical packaging. We are building the future of healthcare delivery through material science, robotics, and automation.
            </p>
          </motion.div>
        </div>

        {/* Culture & Benefits Grid */}
        <div className="careers-culture-grid">
          <motion.div className="culture-card glass-panel" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Globe2 size={28} className="culture-icon" />
            <h3>Global Impact</h3>
            <p>Develop packaging solutions that protect life-saving medications distributed across 30+ countries worldwide.</p>
          </motion.div>
          <motion.div className="culture-card glass-panel" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <Award size={28} className="culture-icon" />
            <h3>Excellence Driven</h3>
            <p>Work in ISO 15378 certified cleanrooms alongside industry experts pushing the boundaries of engineering.</p>
          </motion.div>
          <motion.div className="culture-card glass-panel" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <GraduationCap size={28} className="culture-icon" />
            <h3>Continuous Growth</h3>
            <p>Structured career progression, international assignments, and continuous learning pathways.</p>
          </motion.div>
        </div>

        {/* Open Positions List */}
        <div className="open-positions-container">
          <motion.div 
            className="positions-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2>Current Opportunities</h2>
            <span className="job-count-badge">4 Open Roles</span>
          </motion.div>

          <div className="positions-list">
            {jobs.map((job, idx) => (
              <motion.div 
                key={idx} 
                className="job-card holographic-card"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="job-info">
                  <h3 className="job-title">{job.title}</h3>
                  <div className="job-meta">
                    <span className="meta-item"><Briefcase size={14}/> {job.dept}</span>
                    <span className="meta-item"><MapPin size={14}/> {job.location}</span>
                  </div>
                </div>
                
                <div className="job-action">
                  <span className="job-type">{job.type}</span>
                  <a href={`#apply?role=${encodeURIComponent(job.title)}`} className="apply-btn outline-glow inline-flex">
                    Apply Now <ChevronRight size={16} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Careers;
