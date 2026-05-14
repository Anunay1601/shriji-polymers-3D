import React, { Suspense, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Award, ShieldAlert, CheckCircle, ExternalLink, Globe } from 'lucide-react';
import CredibilityScene from '../canvas/CredibilityScene';
import './Credibility.css';

const Credibility = () => {
  const [selectedPartner, setSelectedPartner] = useState(null);

  const partners = [
    { name: "Global Pharma Corp", tier: "Tier-1 Partner", region: "North America", supply: "HDPE Bottles & CR Closures", years: "15+ Years" },
    { name: "BioTherapeutics Ltd", tier: "Strategic Vendor", region: "Europe", supply: "DMF Barrier Packaging", years: "12+ Years" },
    { name: "Apex Generics", tier: "Primary Supplier", region: "Asia Pacific", supply: "High-Speed PP Caps", years: "18+ Years" },
    { name: "SolaLife Sciences", tier: "Preferred Alliance", region: "Middle East", supply: "Sterile Cleanroom Containers", years: "10+ Years" },
    { name: "NeuroMeds Inc", tier: "Tier-1 Partner", region: "North America", supply: "Specialty Active Enclosures", years: "8+ Years" },
    { name: "VerdePharma AG", tier: "Exclusive Supplier", region: "Europe", supply: "Circular Eco-Polymers", years: "5+ Years" }
  ];

  const credentials = [
    { title: "US-FDA Approved DMF", desc: "Drug Master Files maintained directly for top active oral solids." },
    { title: "ISO 15378 Certified", desc: "Primary packaging quality frameworks designed specifically for medicinal products." },
    { title: "Class 100k Cleanrooms", desc: "Absolute particulate shielding compliant with direct global pharmacopeias." }
  ];

  return (
    <section id="credibility" className="credibility-section">
      {/* 3D Canvas rendering rotating blocks and command backplanes */}
      <div className="credibility-canvas-container">
        <Canvas 
          shadows 
          camera={{ position: [0, 1.5, 11], fov: 45 }}
          gl={{ antialias: true, powerPreference: "high-performance" }}
          dpr={[1, 1.2]}
        >
          <Suspense fallback={null}>
            <CredibilityScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Glassmorphism Interactive Overlays */}
      <div className="credibility-ui-layout">
        
        {/* Left Hand Regulatory Matrix Dash */}
        <div className="regulatory-dash">
          <div className="cred-badge inline-flex items-center gap-2 mb-4">
            <Award size={16} className="text-cyan-glow" />
            <span className="text-xs uppercase tracking-widest text-cyan-glow font-bold">Global Credibility</span>
          </div>

          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Uncompromised <span className="text-cyan-gradient">Trust.</span>
          </motion.h2>

          <motion.p 
            className="section-subtitle cred-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Trusted globally by leading multi-national pharmaceutical conglomerates. We adhere strictly to zero-defect regulatory validation arrays spanning across 40+ international regulatory authorities.
          </motion.p>

          {/* Holographic Credential Panels list */}
          <div className="credentials-grid">
            {credentials.map((cred, idx) => (
              <div key={idx} className="cred-panel glass-panel outline-glow border-cyan">
                <div className="cred-header flex items-center gap-2 mb-2">
                  <CheckCircle size={16} className="text-cyan-glow" />
                  <h4 className="font-bold text-sm text-white">{cred.title}</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{cred.desc}</p>
              </div>
            ))}
          </div>

          <div className="audit-record block mt-6 p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-slate-400 mb-1">
              <ShieldAlert size={14} className="text-emerald-400" /> Continuous Audit Readiness
            </div>
            <div className="font-display text-white text-lg font-bold">
              100% Client Audit Clearance Rate
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Zero Form-483 observations across multiple sequential multi-agency facility evaluations.
            </div>
          </div>
        </div>

        {/* Right Hand Interactive Client Selector Grid */}
        <div className="client-matrix-panel holographic-panel">
          <div className="matrix-top flex justify-between items-center mb-6">
            <span className="text-xs text-slate-300 font-bold uppercase tracking-widest flex items-center gap-1.5">
              <Globe size={14} className="text-cyan-glow" /> Global Alliance Matrix
            </span>
            <span className="text-[10px] text-slate-500">Click node for alliance specs</span>
          </div>

          <div className="partners-grid">
            {partners.map((partner, idx) => {
              const isSelected = selectedPartner === idx;
              return (
                <button
                  key={idx}
                  className={`partner-node ${isSelected ? 'selected outline-glow' : ''}`}
                  onClick={() => setSelectedPartner(isSelected ? null : idx)}
                >
                  <div className="partner-name">{partner.name}</div>
                  <div className="partner-tier">{partner.tier}</div>
                </button>
              );
            })}
          </div>

          {/* Smooth alliance specs preview accordion */}
          <AnimatePresence>
            {selectedPartner !== null && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="alliance-details-card mt-6 p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 overflow-hidden"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-cyan-400">{partners[selectedPartner].region}</div>
                    <h5 className="font-bold text-white text-base">{partners[selectedPartner].name}</h5>
                  </div>
                  <span className="text-xs font-bold font-display text-slate-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                    {partners[selectedPartner].years}
                  </span>
                </div>
                
                <div className="text-xs text-slate-300 pt-2 border-t border-cyan-500/10 flex justify-between items-center">
                  <span className="text-slate-400">Primary Delivery:</span>
                  <span className="font-semibold text-white">{partners[selectedPartner].supply}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default Credibility;
