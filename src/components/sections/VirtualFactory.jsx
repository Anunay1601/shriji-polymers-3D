import React, { Suspense, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Cpu, Gauge, CheckCircle2, AlertTriangle, Activity } from 'lucide-react';
import FactoryScene from '../canvas/FactoryScene';
import './VirtualFactory.css';

const VirtualFactory = () => {
  const [lineSpeed, setLineSpeed] = useState(420);
  const [efficiency, setEfficiency] = useState(99.4);
  const [activeStage, setActiveStage] = useState('Molding & Extrusion');

  // Simulate subtle real-time telemetry fluctuations to wow the user
  useEffect(() => {
    const interval = setInterval(() => {
      setLineSpeed(prev => Math.floor(410 + Math.random() * 20));
      setEfficiency(prev => +(99.1 + Math.random() * 0.7).toFixed(1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const stages = [
    "Resin Dehumidification",
    "Precision Injection Molding",
    "High-Speed Conveyor Transit",
    "Automated Laser Inspection",
    "Sterile Particulate Sealing"
  ];

  return (
    <section id="factory" className="factory-section">
      {/* Embedded 3D Canvas Background optimized for maximum FPS */}
      <div className="factory-canvas-container">
        <Canvas 
          shadows 
          camera={{ position: [0, 2, 10], fov: 45 }}
          gl={{ antialias: true, powerPreference: "high-performance" }}
          dpr={[1, 1.2]}
        >
          <Suspense fallback={null}>
            <FactoryScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Futuristic Telemetry HUD Overlay */}
      <div className="factory-hud-overlay">
        
        {/* Cinematic Section Title Card */}
        <div className="factory-header glass-panel">
          <div className="hud-badge inline-flex items-center gap-2 mb-4">
            <span className="live-dot"></span>
            <span className="text-xs uppercase tracking-widest text-cyan-glow font-semibold">Live Telemetry Feed</span>
          </div>

          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Smart <span className="text-cyan-glow">Factory</span>
          </motion.h2>
          
          <motion.p 
            className="section-subtitle factory-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Step inside our Class 100,000 cleanroom manufacturing environments. Fully autonomous robotics guarantee zero human-touch contamination across multi-million daily output cycles.
          </motion.p>

          {/* Key Metrics Dashboard */}
          <div className="metrics-grid">
            <div className="metric-card outline-glow">
              <div className="metric-header">
                <Gauge size={16} className="text-cyan-glow" />
                <span>Line Speed</span>
              </div>
              <div className="metric-value font-display">{lineSpeed} <span className="metric-unit">u/min</span></div>
            </div>

            <div className="metric-card outline-glow">
              <div className="metric-header">
                <Activity size={16} className="text-cyan-glow" />
                <span>OEE Efficiency</span>
              </div>
              <div className="metric-value font-display">{efficiency}%</div>
            </div>

            <div className="metric-card outline-glow">
              <div className="metric-header">
                <Cpu size={16} className="text-cyan-glow" />
                <span>Automation</span>
              </div>
              <div className="metric-value font-display text-cyan-glow">100%</div>
            </div>
          </div>
        </div>

        {/* Real-time Operations Sequence list Panel */}
        <div className="operations-panel holographic-card">
          <h3 className="panel-title text-cyan-glow flex items-center gap-2">
            <CheckCircle2 size={20} /> Active Operations
          </h3>
          
          <div className="stages-list">
            {stages.map((stage, idx) => (
              <div 
                key={idx} 
                className={`stage-item ${idx === 2 || idx === 3 ? 'active outline-glow' : ''}`}
                onClick={() => setActiveStage(stage)}
              >
                <div className="stage-num">{idx + 1}</div>
                <div className="stage-details">
                  <div className="stage-name">{stage}</div>
                  <div className="stage-status">
                    {idx === 2 || idx === 3 ? 'Processing Line Active' : 'Automated Standby'}
                  </div>
                </div>
                {idx === 2 || idx === 3 ? (
                  <span className="pulse-indicator"></span>
                ) : null}
              </div>
            ))}
          </div>

          <div className="security-notice mt-6 p-3 rounded-lg bg-slate-950/60 border border-cyan-500/20 flex items-start gap-3">
            <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
            <span className="text-xs text-slate-400 leading-relaxed">
              Continuous multi-axis optical scanners enforce absolute structural uniformity. Deviations are rejected under 12 milliseconds.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default VirtualFactory;
