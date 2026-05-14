import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, UploadCloud, CheckCircle2, ArrowLeft } from 'lucide-react';
import './ApplyNow.css';

const ApplyNow = () => {
  const [role, setRole] = useState("General Application");
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', experience: '0-2 Years', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Parse role from hash if it exists e.g. #apply?role=Lead%20Polymer
    const hash = window.location.hash;
    if (hash.includes('?role=')) {
      const roleParam = decodeURIComponent(hash.split('?role=')[1]);
      setRole(roleParam);
    }
  }, []);

  const handleInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Optionally reset after some time or keep showing success message
  };

  return (
    <section id="apply" className="apply-section pt-32 pb-20 min-h-screen bg-[#010204]">
      {/* Background decorations */}
      <div className="apply-bg-elements">
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <a href="#careers" className="back-link inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-8 text-sm font-bold uppercase tracking-wider">
          <ArrowLeft size={16} /> Back to Careers
        </a>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="apply-header text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight">
            Application <span className="text-cyan-400">Portal</span>
          </h1>
          <p className="text-slate-400">
            Applying for: <strong className="text-white bg-white/10 px-4 py-1.5 rounded-full text-sm ml-2 border border-white/5">{role}</strong>
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="apply-form-container glass-panel p-8 md:p-12 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl"
        >
          {isSubmitted ? (
            <div className="success-state text-center py-16">
               <CheckCircle2 size={64} className="text-emerald-400 mx-auto mb-6" />
               <h3 className="text-2xl font-bold text-white mb-2">Application Transmitted</h3>
               <p className="text-slate-400 max-w-md mx-auto leading-relaxed">Your credentials have been securely routed to our global talent acquisition matrix. We will evaluate your profile and contact you shortly.</p>
               <button onClick={() => window.location.hash = '#careers'} className="mt-8 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white rounded-lg font-bold transition-colors">
                 Return to Openings
               </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="apply-form grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="input-group">
                <label>Full Legal Name</label>
                <input type="text" name="name" required placeholder="John Doe" value={formState.name} onChange={handleInputChange} />
              </div>
              <div className="input-group">
                <label>Professional Email</label>
                <input type="email" name="email" required placeholder="john@example.com" value={formState.email} onChange={handleInputChange} />
              </div>
              <div className="input-group">
                <label>Contact Number</label>
                <input type="tel" name="phone" required placeholder="+1 (555) 000-0000" value={formState.phone} onChange={handleInputChange} />
              </div>
              <div className="input-group">
                <label>Years of Industry Experience</label>
                <select name="experience" value={formState.experience} onChange={handleInputChange}>
                  <option value="0-2 Years">0-2 Years</option>
                  <option value="3-5 Years">3-5 Years</option>
                  <option value="6-10 Years">6-10 Years</option>
                  <option value="10+ Years">10+ Years</option>
                </select>
              </div>

              <div className="input-group md:col-span-2">
                <label>Cover Letter / Summary</label>
                <textarea name="message" rows="4" required placeholder="Briefly describe your engineering or science expertise and why you're a perfect fit for this role..." value={formState.message} onChange={handleInputChange} />
              </div>

              <div className="input-group md:col-span-2">
                <label>Upload Credentials (Resume/CV)</label>
                <div className="file-upload-zone border-2 border-dashed border-slate-700 rounded-xl p-8 text-center hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all cursor-pointer">
                  <UploadCloud size={32} className="text-cyan-400 mx-auto mb-3" />
                  <p className="text-slate-300 font-medium mb-1">Click to upload or drag & drop</p>
                  <p className="text-slate-500 text-xs">PDF or DOCX up to 10MB</p>
                </div>
              </div>

              <div className="md:col-span-2 mt-4">
                <button type="submit" className="w-full submit-btn flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white py-4 rounded-xl font-bold transition-all text-lg">
                  <Send size={18} /> Submit Application
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ApplyNow;
