import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Cpu, Leaf } from 'lucide-react';
import './ValueProps.css';

const ValueProps = () => {
  const props = [
    {
      icon: <Activity size={32} />,
      title: "Automated Precision",
      desc: "State-of-the-art robotic manufacturing ensuring zero-defect packaging at global scale."
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Regulatory Compliance",
      desc: "Exceeding FDA and ISO standards with continuous quality monitoring systems."
    },
    {
      icon: <Cpu size={32} />,
      title: "Smart Integration",
      desc: "IoT-enabled production lines providing real-time analytics and predictive maintenance."
    },
    {
      icon: <Leaf size={32} />,
      title: "Sustainable Future",
      desc: "Pioneering eco-friendly polymers and closed-loop recycling processes."
    }
  ];

  return (
    <section id="about" className="value-props-section">
      <div className="section-header">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Engineering <span className="text-gradient">Excellence</span>
        </motion.h2>
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Our manufacturing ecosystem combines advanced robotics with AI-driven quality control to deliver pharmaceutical packaging that defines industry standards.
        </motion.p>
      </div>

      <div className="props-grid">
        {props.map((prop, index) => (
          <motion.div 
            key={index} 
            className="prop-card glass-panel"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="prop-icon-wrapper">
              {prop.icon}
            </div>
            <h3 className="prop-title">{prop.title}</h3>
            <p className="prop-desc">{prop.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ValueProps;
