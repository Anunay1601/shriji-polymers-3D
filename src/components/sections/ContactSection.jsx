import React, { Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Send, CheckCircle2, Globe2, MapPin, Mail, Phone, Building2 } from 'lucide-react';
import ContactScene from '../canvas/ContactScene';
import './ContactSection.css';

const ContactSection = () => {
  const [formState, setFormState] = useState({ name: '', email: '', region: 'North America', inquiry: 'Packaging Requirements', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('HQ');

  const handleInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Automatically reset visual confirmation state after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const regionalOffices = {
    HQ: { title: "Global Corporate HQ", addr: "Shriji Polymers (India) Limited, Industrial Area, Pithampur", phone: "+91 731 4255000", email: "info@shrijipolymers.com", spec: "Central DMF Administration Desk" },
    US: { title: "North America DMF Liaison", addr: "Pharmaceutical Corridor, Suite 400, New Jersey, USA", phone: "+1 (609) 555-0198", email: "usa.desk@shrijipolymers.com", spec: "Tier-1 Active Oral Solids Support" },
    EU: { title: "Europe & Regulatory Desk", addr: "BioPharma Center, Basel, Switzerland", phone: "+41 61 555 0122", email: "europe@shrijipolymers.com", spec: "Circular Polymer Cleanroom Desk" }
  };

  return (
    <section id="contact" className="contact-premium-section">
      {/* 3D Immersive Global Telemetry Background Canvas */}
      <div className="contact-canvas-container">
        <Canvas 
          shadows 
          camera={{ position: [0, 1.5, 11], fov: 45 }}
          gl={{ antialias: true, powerPreference: "high-performance" }}
          dpr={[1, 1.2]}
        >
          <Suspense fallback={null}>
            <ContactScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Overlaid Interactive Form Hub Overlays */}
      <div className="contact-ui-layout">
        
        {/* Left Form Portal Console */}
        <div className="contact-form-panel glassmorphism-console">
          <div className="flex items-center gap-2 mb-3">
            <Globe2 size={16} className="text-cyan-glow" />
            <span className="text-xs uppercase tracking-widest text-cyan-glow font-bold">Secure Telemetry Interface</span>
          </div>

          <motion.h2 
            className="section-title text-white"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Initiate <span className="text-cyan-gradient">Connection.</span>
          </motion.h2>

          <p className="text-xs text-slate-300 mb-6 leading-relaxed">
            Direct routing to appropriate regional compliance engineering and bulk manufacturing account managers. Secure encrypted inquiry transmission array.
          </p>

          {isSubmitted ? (
            <motion.div 
              className="transmission-success-card block p-6 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <CheckCircle2 size={40} className="text-emerald-400 mx-auto mb-3" />
              <h4 className="text-white font-bold text-base mb-1">Inquiry Transmitted Successfully</h4>
              <p className="text-xs text-slate-300">
                Encrypted communication bundle mapped directly to dedicated client executive queues. Expect formal validation responses shortly.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form-grid">
              <div className="input-field-group">
                <label>Operator / Corporate Entity</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  placeholder="e.g. Pfizer Global Supply"
                  value={formState.name} 
                  onChange={handleInputChange} 
                />
              </div>

              <div className="input-field-group">
                <label>Secure Response Address</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  placeholder="e.g. procurement@pfizer.com"
                  value={formState.email} 
                  onChange={handleInputChange} 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="input-field-group">
                  <label>Command Jurisdiction</label>
                  <select name="region" value={formState.region} onChange={handleInputChange}>
                    <option value="North America">North America</option>
                    <option value="Europe">Europe</option>
                    <option value="Asia Pacific">Asia Pacific</option>
                    <option value="Middle East">Middle East</option>
                  </select>
                </div>
                <div className="input-field-group">
                  <label>Primary Matrix</label>
                  <select name="inquiry" value={formState.inquiry} onChange={handleInputChange}>
                    <option value="Packaging Requirements">Bulk Packaging</option>
                    <option value="DMF Filing Access">DMF Tier Filing</option>
                    <option value="Regulatory Audits">Facility Evaluation</option>
                    <option value="Specialty Enclosures">Specialty Closures</option>
                  </select>
                </div>
              </div>

              <div className="input-field-group">
                <label>Inquiry Payload Details</label>
                <textarea 
                  name="message" 
                  rows="3" 
                  required 
                  placeholder="Provide precise container volume scales, annual targets, and regulatory standards required..."
                  value={formState.message} 
                  onChange={handleInputChange} 
                />
              </div>

              <button type="submit" className="secure-transmit-btn inline-flex items-center justify-center gap-2">
                <Send size={14} /> Transmit Inquiry Bundle
              </button>
            </form>
          )}
        </div>

        {/* Right Dynamic Regional Offices Panel Hub */}
        <div className="regional-liaison-panel holographic-panel">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs text-slate-300 font-bold uppercase tracking-widest flex items-center gap-1.5">
              <Building2 size={14} className="text-cyan-glow" /> Regional Telemetry Nodes
            </span>
          </div>

          {/* Location Toggle switchbar */}
          <div className="location-tabs flex gap-2 mb-6 bg-slate-950/80 p-1 rounded-lg border border-slate-800">
            {Object.keys(regionalOffices).map((key) => (
              <button
                key={key}
                type="button"
                className={`tab-btn ${activeTab === key ? 'active' : ''}`}
                onClick={() => setActiveTab(key)}
              >
                {key === 'HQ' ? 'India HQ' : key === 'US' ? 'USA DMF Liaison' : 'Europe Desk'}
              </button>
            ))}
          </div>

          {/* Smooth Details Readout */}
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="office-readout-card p-5 rounded-xl bg-slate-950/90 border border-slate-800"
          >
            <div className="text-[10px] uppercase font-bold text-cyan-400 mb-1">{regionalOffices[activeTab].spec}</div>
            <h4 className="font-bold text-white text-base mb-3">{regionalOffices[activeTab].title}</h4>
            
            <div className="flex items-start gap-2.5 text-xs text-slate-300 mb-3 leading-relaxed">
              <MapPin size={14} className="text-cyan-glow mt-0.5 shrink-0" />
              <span>{regionalOffices[activeTab].addr}</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-slate-300 mb-2">
              <Phone size={14} className="text-emerald-400 shrink-0" />
              <span>{regionalOffices[activeTab].phone}</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <Mail size={14} className="text-cyan-glow shrink-0" />
              <span className="text-cyan-400 underline">{regionalOffices[activeTab].email}</span>
            </div>
          </motion.div>

          <div className="global-map-summary mt-6 p-4 rounded-xl bg-cyan-950/10 border border-cyan-500/20 text-xs text-slate-400">
            <div className="flex items-center gap-2 text-white font-bold mb-1">
              <Globe2 size={14} className="text-cyan-glow" /> 24/7 Global Synchronization
            </div>
            Direct digital routing maps all inquiries securely to continuous operating hubs. Expect strict pharmacopeial confidentiality guarantees.
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
