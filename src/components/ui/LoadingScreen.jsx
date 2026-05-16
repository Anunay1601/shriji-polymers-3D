import React, { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';
import './LoadingScreen.css';

const LoadingScreen = () => {
  const { progress, active } = useProgress();
  const [shouldRender, setShouldRender] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (!active && progress === 100) {
      // Small delay for smooth transition
      const timeout = setTimeout(() => {
        setIsFading(true);
        setTimeout(() => setShouldRender(false), 800);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [active, progress]);

  const getStatusText = (prog) => {
    if (prog < 30) return "CALIBRATING PHOTONICS...";
    if (prog < 60) return "SYNCING NEURAL INTERFACES...";
    if (prog < 90) return "OPTIMIZING 3D GEOMETRIES...";
    return "DECOMPRESSING ASSETS...";
  };

  if (!shouldRender) return null;

  return (
    <div className={`loading-screen ${isFading ? 'fade-out' : ''}`}>
      <div className="loader-content">
        <div className="loader-logo">
          <div className="logo-ring"></div>
          <div className="logo-center"></div>
        </div>
        
        <div className="loader-text">
          <h2 className="loading-title">SHRIJI POLYMERS</h2>
          <div className="loading-bar-container">
            <div 
              className="loading-bar" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="loading-stats">
            <span className="loading-status">{getStatusText(progress)}</span>
            <span className="loading-percentage">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
