import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Multi-layered glassmorphism Client Logo Cube with an internal glowing core
const ClientLogoCube = ({ position, speed = 1, color = "#00d4ff", coreScale = 0.5 }) => {
  const outerRef = useRef();
  const innerRef = useRef();

  useFrame((state, delta) => {
    if (outerRef.current) {
      outerRef.current.rotation.x += delta * 0.4 * speed;
      outerRef.current.rotation.y += delta * 0.6 * speed;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x -= delta * 0.8 * speed;
      innerRef.current.rotation.z += delta * 1.0 * speed;
      // Breathe core scale cyclically
      const scale = coreScale + Math.sin(state.clock.elapsedTime * 3) * 0.08;
      innerRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group position={position}>
      {/* Outer Holographic Glass Shell */}
      <mesh ref={outerRef} castShadow receiveShadow>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.2} 
          metalness={0.9} 
          roughness={0.1}
          wireframe={false}
        />
        {/* Wireframe Outline accent mapping */}
        <mesh scale={1.01}>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.4} />
        </mesh>
      </mesh>

      {/* Internal High-energy Laser Core */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={2} 
        />
      </mesh>

      {/* Downward Ground Reflection shadow alignment pillar */}
      <mesh position={[0, -1.8, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1.8, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.15} />
      </mesh>
    </group>
  );
};

// Holographic Certification Banners
const CertificationBanner = ({ position, title, subtitle, color = "#00ffff", rotation = [0, 0, 0] }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Back Glass Plate */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[3.2, 1.8, 0.1]} />
        <meshStandardMaterial color="#050812" metalness={0.9} roughness={0.2} transparent opacity={0.8} />
      </mesh>
      {/* Glowing Inner Perimeter */}
      <mesh position={[0, 0, 0.06]}>
        <boxGeometry args={[3.0, 1.6, 0.02]} />
        <meshBasicMaterial color={color} wireframe />
      </mesh>
      {/* High-contrast Corner Accents */}
      <mesh position={[-1.4, 0.7, 0.08]}>
        <boxGeometry args={[0.1, 0.1, 0.02]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[1.4, -0.7, 0.08]}>
        <boxGeometry args={[0.1, 0.1, 0.02]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      {/* Floating Center Seal symbol */}
      <mesh position={[0, 0, 0.1]}>
        <torusGeometry args={[0.3, 0.05, 16, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
      </mesh>
    </group>
  );
};

// Glowing Command-Center Data Wall Backplane
const DataWall = () => {
  return (
    <group position={[0, 0, -5]}>
      {/* Large Anodized Steel Retaining Wall */}
      <mesh receiveShadow>
        <boxGeometry args={[24, 12, 0.5]} />
        <meshStandardMaterial color="#020408" metalness={0.95} roughness={0.4} />
      </mesh>
      
      {/* Glowing Neon Horizontal Server Sweeps */}
      {Array.from({ length: 5 }).map((_, idx) => (
        <mesh key={idx} position={[0, -4 + idx * 2, 0.3]}>
          <boxGeometry args={[22, 0.05, 0.05]} />
          <meshBasicMaterial color={idx % 2 === 0 ? "#00d4ff" : "#00ff88"} transparent opacity={0.4} />
        </mesh>
      ))}

      {/* Abstract Glowing Wall Matrix Nodes */}
      {Array.from({ length: 12 }).map((_, idx) => (
        <mesh key={`node-${idx}`} position={[-9 + idx * 1.6, 3.5, 0.35]}>
          <boxGeometry args={[0.2, 0.6, 0.05]} />
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={idx % 3 === 0 ? 2 : 0.5} />
        </mesh>
      ))}
    </group>
  );
};

const CredibilityScene = () => {
  return (
    <>
      {/* Simple smooth Orbiting to inspect the floating trust elements */}
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        maxPolarAngle={Math.PI / 2 - 0.05}
        autoRotate
        autoRotateSpeed={0.4}
      />

      <color attach="background" args={['#010204']} />
      <fog attach="fog" args={['#010204', 6, 25]} />

      {/* High-fidelity Industrial Cinematic Multi-Point Lights */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[8, 12, 10]} intensity={2.5} color="#ffffff" castShadow />
      <spotLight position={[-10, 10, 2]} intensity={2} angle={0.6} penumbra={0.8} color="#00d4ff" />
      <pointLight position={[0, -4, 4]} intensity={1.5} color="#00ff88" />

      {/* Main Assembly View Matrix */}
      <group position={[0, -0.2, 0]}>
        
        {/* Dynamic Client Cubes Assembly */}
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <ClientLogoCube position={[-4, 1, 1]} speed={1.2} color="#00d4ff" coreScale={0.55} />
          <ClientLogoCube position={[0, -0.5, 2]} speed={0.8} color="#00ff88" coreScale={0.6} />
          <ClientLogoCube position={[4, 1, 1]} speed={1.5} color="#00ffff" coreScale={0.45} />
        </Float>

        {/* Floating Certification Banners arraying directly behind client blocks */}
        <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
          <CertificationBanner position={[-4.5, 3.2, -1.5]} rotation={[0.1, 0.2, 0]} color="#00ffff" />
          <CertificationBanner position={[0, 2.5, -2]} rotation={[0.05, 0, 0]} color="#00ff88" />
          <CertificationBanner position={[4.5, 3.2, -1.5]} rotation={[0.1, -0.2, 0]} color="#00d4ff" />
        </Float>

        {/* Backplane Databoard */}
        <DataWall />

        {/* Polished Mirror Surface Ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.5, 0]} receiveShadow>
          <planeGeometry args={[60, 60]} />
          <meshStandardMaterial color="#020408" metalness={0.95} roughness={0.25} />
        </mesh>
      </group>
    </>
  );
};

export default CredibilityScene;
