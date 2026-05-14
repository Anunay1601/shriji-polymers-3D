import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Shield, FileText, ArrowLeft, Printer, Download, ChevronRight, Lock } from 'lucide-react';
import LegalScene from '../canvas/LegalScene';
import './LegalPage.css';

const LegalPage = () => {
  const [activeDoc, setActiveDoc] = useState('privacy');
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleHashCheck = () => {
      const hash = window.location.hash;
      if (hash.includes('terms')) {
        setActiveDoc('terms');
      } else {
        setActiveDoc('privacy');
      }
      setActiveSection(0); // Reset section scroll tracker
      
      // Delay scrolling by 40ms to ensure React completely paints sub-page DOM layouts first
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 40);
    };
    
    handleHashCheck();
    window.addEventListener('hashchange', handleHashCheck);
    return () => window.removeEventListener('hashchange', handleHashCheck);
  }, []);

  const switchDoc = (doc) => {
    setActiveDoc(doc);
    window.location.hash = `#${doc}`;
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 40);
  };

  const privacySections = [
    { id: "collection", title: "1. Scope & Telemetry Collection" },
    { id: "integrity", title: "2. CFR Part 11 Electronic Records" },
    { id: "encryption", title: "3. Cryptographic Storage Frameworks" },
    { id: "compliance", title: "4. Regulatory Disclosure Protocols" },
    { id: "rights", title: "5. Corporate Account Sovereignty" }
  ];

  const termsSections = [
    { id: "specifications", title: "1. Pharmacopeia & Quality Mandates" },
    { id: "intellectual", title: "2. Custom Geometry & IP Attribution" },
    { id: "api", title: "3. Supply Chain Automation SLA" },
    { id: "indemnification", title: "4. Batch Liability & Defect Audits" },
    { id: "jurisdiction", title: "5. Governing Law & Arbitration" }
  ];

  const currentToc = activeDoc === 'privacy' ? privacySections : termsSections;

  const generatePdfPayload = (jsPDFClass) => {
    const doc = new jsPDFClass();
    
    // Document Metadata
    doc.setProperties({
      title: `Shriji Polymers - ${activeDoc === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}`,
      subject: 'Legal SLA & Data Protection Matrix',
      author: 'Shriji Polymers (India) Ltd',
      keywords: 'pharmaceutical, packaging, legal, compliance, CFR Part 11',
      creator: 'Shriji Secure Enterprise Portal'
    });

    // Premium Dark Blue Header Band
    doc.setFillColor(11, 17, 32);
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(0, 212, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text("SHRIJI POLYMERS", 15, 22);
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text("Global Legal & Regulatory Compliance Matrix", 15, 30);

    // Main Document Title
    doc.setTextColor(20, 20, 20);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    const titleText = activeDoc === 'privacy' ? "Enterprise Data Privacy Framework" : "Master Manufacturing SLA & Terms";
    doc.text(titleText, 15, 55);

    doc.setFontSize(9.5);
    doc.setTextColor(120, 120, 120);
    doc.text("Validated for US FDA DMF & ISO 15378 Compliance Architecture", 15, 62);
    doc.setDrawColor(200, 200, 200);
    doc.line(15, 65, 195, 65);

    // Paragraph content payload mapped directly to UI context
    const contentMap = {
      privacy: [
        "Shriji Polymers enforces restricted internal logging. System inputs derived from client orders, specific closure requirements (such as calibrated removal torques), and CAD geometries are captured exclusively through secure encrypted REST nodes. Non-transactional behavioral monitoring is restricted strictly to continuous platform diagnostics.",
        "In strict compliance with US FDA Title 21 CFR Part 11, all electronic records, automated batch configuration inputs, and electronic signatures authorized within the client portal maintain immutable audit trails. System transactions require secondary multi-factor authentication loops prior to execution on physical manufacturing matrices.",
        "Data rest files are localized on isolated storage targets enclosed within highly controlled corporate subnets. Databases utilize hardware-level AES-256 symmetrical keys. Transit networks enforce Transport Layer Security (TLS 1.3) protocols utilizing perfect forward secrecy.",
        "Client parameters are classified as confidential proprietary assets. Disclosure protocols strictly forbid data distribution to non-audited commercial agents. Audit logs are opened exclusively for physical review by designated regulatory auditors (e.g., ISO, CDSCO, or US FDA inspection commissions) under pre-scheduled inspection scenarios.",
        "Verified enterprise controllers retain absolute data access sovereignty. Authorized corporate administrators may file structural extraction requests or purge temporary integration logs via the authenticated API dashboard. Automated cleanup targets remove stale manufacturing staging logs after exactly 180 standard business days."
      ],
      terms: [
        "Shriji Polymers guarantees physical dimensioning, pure FDA-approved master file polymer formulations, and cleanroom production environments (Class 100,000 / ISO 8 or superior) adhering exactly to physical benchmarks ratified within USP <661> and USP <671> directives.",
        "Proprietary tooling molds, customized tamper-evident closures, and active multi-layer barrier combinations engineered by our R&D staff remain absolute intellectual assets of Shriji Polymers. Production exclusivity loops require continuous volume minimums outlined in individual commercial contracts.",
        "Automated B2B telemetry endpoints provided to corporate buyers are warranted to maintain 99.95% continuous annual uptime. Endpoint connections require authorized Webhook handshakes. Automated injection lines dynamically optimize scheduling output based on real-time ingestion calculations.",
        "Intake batches require structural visual and mass testing within 30 days of physical receipt. Defective parameters triggering automated return authorization logic must exceed standard six-sigma quality tolerance matrices. Liability is strictly bounded to the physical financial invoicing cost of the targeted shipment.",
        "Contractual conflicts, technical SLA disputes, or parameter deviations fall under international manufacturing arbitration frameworks localized at the High Court of Madhya Pradesh (Indore Bench), enforcing English language interpretation guidelines."
      ]
    };

    const paragraphs = contentMap[activeDoc];
    const items = activeDoc === 'privacy' ? privacySections : termsSections;
    
    let yPos = 75;

    items.forEach((item, idx) => {
      // Clause Heading
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 100, 150);
      doc.text(item.title, 15, yPos);
      yPos += 6;

      // Clause Body Text (Auto-wrapped to margin boundaries)
      doc.setFontSize(9.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(60, 60, 60);
      
      const splitText = doc.splitTextToSize(paragraphs[idx], 180);
      doc.text(splitText, 15, yPos);
      
      yPos += (splitText.length * 5) + 8;

      // Multi-page overflow protection logic
      if (yPos > 265 && idx < items.length - 1) {
        doc.addPage();
        yPos = 20;
      }
    });

    // Dynamic Page Numbering Footer Pass
    const pageCount = doc.internal ? doc.internal.getNumberOfPages() : doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(`Page ${i} of ${pageCount} | Shriji Polymers (India) Ltd. Secured Document Vault`, 15, 290);
    }

    // Execute Direct Native File Download
    doc.save(`Shriji_Polymers_${activeDoc.toUpperCase()}_Agreement.pdf`);
  };

  const handleExportPdf = () => {
    // If CDN library is already registered on global window object, compile directly
    if (window.jspdf && window.jspdf.jsPDF) {
      generatePdfPayload(window.jspdf.jsPDF);
      return;
    }

    // Inject CDN script asynchronously to prevent Vite module bundler lookup checks entirely
    const scriptId = 'jspdf-cdn-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
      script.async = true;
      script.onload = () => {
        if (window.jspdf && window.jspdf.jsPDF) {
          generatePdfPayload(window.jspdf.jsPDF);
        }
      };
      script.onerror = () => {
        alert("Failed to reach secure PDF generation endpoints. Please check routing permissions.");
      };
      document.body.appendChild(script);
    }
  };

  return (
    <section className="legal-page-wrapper">
      {/* 3D Background */}
      <div className="legal-canvas-container">
        <Canvas 
          camera={{ position: [0, 0, 8], fov: 45 }}
          gl={{ antialias: true, powerPreference: "high-performance" }}
          dpr={[1, 1.5]}
        >
          <Suspense fallback={null}>
            <LegalScene />
          </Suspense>
        </Canvas>
      </div>

      <div className="legal-portal-interface">
        {/* Navigation Bar */}
        <div className="legal-top-bar">
          <a href="#home" className="legal-back-btn outline-glow">
            <ArrowLeft size={16} /> Dashboard
          </a>
          
          <div className="legal-actions">
            <button onClick={() => window.print()} className="action-btn" title="Print Document">
              <Printer size={16} /> Print
            </button>
            <button onClick={handleExportPdf} className="action-btn primary" title="Export PDF Vault">
              <Download size={16} /> Export PDF
            </button>
          </div>
        </div>

        <div className="legal-dashboard-grid">
          {/* Dashboard Control Panel (Sidebar) */}
          <div className="legal-control-column">
            <div className="document-switchers glass-panel">
              <span className="sidebar-label">Document Vault</span>
              <button 
                onClick={() => switchDoc('privacy')}
                className={`switch-btn ${activeDoc === 'privacy' ? 'active' : ''}`}
              >
                <Shield size={18} className="switch-icon" />
                <div className="btn-text">
                  <strong>Privacy Policy</strong>
                  <span>Data Protection Matrix</span>
                </div>
              </button>
              
              <button 
                onClick={() => switchDoc('terms')}
                className={`switch-btn ${activeDoc === 'terms' ? 'active' : ''}`}
              >
                <FileText size={18} className="switch-icon" />
                <div className="btn-text">
                  <strong>Terms of Service</strong>
                  <span>Manufacturing SLA</span>
                </div>
              </button>
            </div>

            {/* Document Index (TOC) */}
            <div className="document-index glass-panel">
              <span className="sidebar-label">Index Matrix</span>
              <nav className="toc-list">
                {currentToc.map((item, idx) => (
                  <button 
                    key={idx} 
                    className={`toc-btn ${activeSection === idx ? 'active' : ''}`}
                    onClick={() => {
                      setActiveSection(idx);
                      const targetEl = document.getElementById(`clause-${idx}`);
                      if (targetEl) {
                        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }}
                  >
                    <ChevronRight size={14} className="toc-indicator" />
                    <span>{item.title}</span>
                  </button>
                ))}
              </nav>
            </div>
            
            {/* Regulatory Badge */}
            <div className="regulatory-compliance-card">
              <Lock size={20} className="compliance-icon" />
              <div className="compliance-details">
                <strong>21 CFR Part 11 Validated</strong>
                <span>Secured Global Architecture</span>
              </div>
            </div>
          </div>

          {/* Primary Legal Viewport */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeDoc}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="legal-document-viewport glass-panel"
            >
              {activeDoc === 'privacy' ? (
                <div className="document-flow">
                  <header className="document-title-header">
                    <div className="meta-badges">
                      <span className="badge">Version 4.2</span>
                      <span className="badge success">Audited May 2026</span>
                    </div>
                    <h1>Enterprise Data Sovereignty & Privacy Framework</h1>
                    <p className="doc-abstract">
                      Establishing data boundaries, network encryption guidelines, and client telemetry protection logic inline with US FDA Title 21 CFR Part 11 regulations and international privacy directives.
                    </p>
                  </header>

                  <div className="document-clauses">
                    <div id="clause-0" className={`clause-section ${activeSection === 0 ? 'focused' : ''}`}>
                      <h2>{privacySections[0].title}</h2>
                      <p>
                        Shriji Polymers (India) Limited enforces restricted internal logging. System inputs derived from client orders, specific closure requirements (such as calibrated removal torques), and CAD geometries are captured exclusively through secure encrypted REST nodes. Non-transactional behavioral monitoring is restricted strictly to continuous platform diagnostics.
                      </p>
                    </div>

                    <div id="clause-1" className={`clause-section ${activeSection === 1 ? 'focused' : ''}`}>
                      <h2>{privacySections[1].title}</h2>
                      <p>
                        In strict compliance with <strong>US FDA Title 21 CFR Part 11</strong>, all electronic records, automated batch configuration inputs, and electronic signatures authorized within the client portal maintain immutable audit trails. System transactions require secondary multi-factor authentication loops prior to execution on physical manufacturing matrices.
                      </p>
                    </div>

                    <div id="clause-2" className={`clause-section ${activeSection === 2 ? 'focused' : ''}`}>
                      <h2>{privacySections[2].title}</h2>
                      <p>
                        Data rest files are localized on isolated storage targets enclosed within highly controlled corporate subnets. Databases utilize hardware-level AES-256 symmetrical keys. Transit networks enforce Transport Layer Security (TLS 1.3) protocols utilizing perfect forward secrecy.
                      </p>
                    </div>

                    <div id="clause-3" className={`clause-section ${activeSection === 3 ? 'focused' : ''}`}>
                      <h2>{privacySections[3].title}</h2>
                      <p>
                        Client parameters are classified as confidential proprietary assets. Disclosure protocols strictly forbid data distribution to non-audited commercial agents. Audit logs are opened exclusively for physical review by designated regulatory auditors (e.g., ISO, CDSCO, or US FDA inspection commissions) under pre-scheduled inspection scenarios.
                      </p>
                    </div>

                    <div id="clause-4" className={`clause-section ${activeSection === 4 ? 'focused' : ''}`}>
                      <h2>{privacySections[4].title}</h2>
                      <p>
                        Verified enterprise controllers retain absolute data access sovereignty. Authorized corporate administrators may file structural extraction requests or purge temporary integration logs via the authenticated API dashboard. Automated cleanup targets remove stale manufacturing staging logs after exactly 180 standard business days.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="document-flow">
                  <header className="document-title-header">
                    <div className="meta-badges">
                      <span className="badge">SLA Rev 9.1</span>
                      <span className="badge success">Active Global Scope</span>
                    </div>
                    <h1>Master Manufacturing Agreement & Terms of Service</h1>
                    <p className="doc-abstract">
                      Standardized contractual parameters governing pharmaceutical container provisioning, cleanroom injection/blow molding specifications, and automated software line interactions.
                    </p>
                  </header>

                  <div className="document-clauses">
                    <div id="clause-0" className={`clause-section ${activeSection === 0 ? 'focused' : ''}`}>
                      <h2>{termsSections[0].title}</h2>
                      <p>
                        Shriji Polymers guarantees physical dimensioning, pure FDA-approved master file polymer formulations, and cleanroom production environments (Class 100,000 / ISO 8 or superior) adhering exactly to physical benchmarks ratified within <strong>USP &lt;661&gt;</strong> and <strong>USP &lt;671&gt;</strong> directives.
                      </p>
                    </div>

                    <div id="clause-1" className={`clause-section ${activeSection === 1 ? 'focused' : ''}`}>
                      <h2>{termsSections[1].title}</h2>
                      <p>
                        Proprietary tooling molds, customized tamper-evident closures, and active multi-layer barrier combinations engineered by our R&D staff remain absolute intellectual assets of Shriji Polymers. Production exclusivity loops require continuous volume minimums outlined in individual commercial contracts.
                      </p>
                    </div>

                    <div id="clause-2" className={`clause-section ${activeSection === 2 ? 'focused' : ''}`}>
                      <h2>{termsSections[2].title}</h2>
                      <p>
                        Automated B2B telemetry endpoints provided to corporate buyers are warranted to maintain 99.95% continuous annual uptime. Endpoint connections require authorized Webhook handshakes. Automated injection lines dynamically optimize scheduling output based on real-time ingestion calculations.
                      </p>
                    </div>

                    <div id="clause-3" className={`clause-section ${activeSection === 3 ? 'focused' : ''}`}>
                      <h2>{termsSections[3].title}</h2>
                      <p>
                        Intake batches require structural visual and mass testing within 30 days of physical receipt. Defective parameters triggering automated return authorization logic must exceed standard six-sigma quality tolerance matrices. Liability is strictly bounded to the physical financial invoicing cost of the targeted shipment.
                      </p>
                    </div>

                    <div id="clause-4" className={`clause-section ${activeSection === 4 ? 'focused' : ''}`}>
                      <h2>{termsSections[4].title}</h2>
                      <p>
                        Contractual conflicts, technical SLA disputes, or parameter deviations fall under international manufacturing arbitration frameworks localized at the High Court of Madhya Pradesh (Indore Bench), enforcing English language interpretation guidelines.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default LegalPage;
