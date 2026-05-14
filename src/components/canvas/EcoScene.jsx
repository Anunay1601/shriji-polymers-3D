import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Floating Holographic Eco Globe
const HolographicEarth = () => {
  const globeRef = useRef();
  
  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group ref={globeRef}>
      {/* Base Translucent Core */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshStandardMaterial 
          color="#002b1f" 
          transparent 
          opacity={0.8} 
          metalness={0.9} 
          roughness={0.1}
          emissive="#00ff88"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Outer Holographic Grid Overlay */}
      <mesh scale={1.02}>
        <sphereGeometry args={[1.8, 24, 24]} />
        <meshStandardMaterial 
          color="#00ffff" 
          wireframe 
          transparent 
          opacity={0.25} 
          emissive="#00ffff" 
          emissiveIntensity={0.5} 
        />
      </mesh>
    </group>
  );
};

// Concentric Orbiting Sustainability Rings
const EcoRings = () => {
  const ring1 = useRef();
  const ring2 = useRef();
  const ring3 = useRef();

  useFrame((state, delta) => {
    if (ring1.current) ring1.current.rotation.z += delta * 0.5;
    if (ring2.current) ring2.current.rotation.x -= delta * 0.3;
    if (ring3.current) ring3.current.rotation.y += delta * 0.7;
  });

  return (
    <group>
      {/* Inner Green Energy Ring */}
      <mesh ref={ring1} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.5, 0.04, 16, 64]} />
        <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={1.5} />
        {/* Orbiting Energy Packet node */}
        <mesh position={[2.5, 0, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </mesh>

      {/* Middle Cyan Tech Ring */}
      <mesh ref={ring2} rotation={[0, Math.PI / 4, 0]}>
        <torusGeometry args={[3.2, 0.03, 16, 64]} />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={1} />
        <mesh position={[0, 3.2, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </mesh>

      {/* Outer Pure Circular Ring */}
      <mesh ref={ring3} rotation={[Math.PI / 6, Math.PI / 3, 0]}>
        <torusGeometry args={[4, 0.02, 16, 64]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

// Morphing Inner Polymer Core representing Material Renewal
const MorphingCore = () => {
  const coreRef = useRef();

  useFrame((state) => {
    if (!coreRef.current) return;
    // Morph scale cyclically to simulate breathing renewal
    const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.15;
    coreRef.current.scale.setScalar(scale);
    coreRef.current.rotation.x += 0.01;
    coreRef.current.rotation.z += 0.01;
  });

  return (
    <mesh ref={coreRef}>
      <octahedronGeometry args={[1.2, 2]} />
      <meshStandardMaterial 
        color="#00ff88" 
        transparent 
        opacity={0.35} 
        metalness={0.5} 
        roughness={0.1}
        wireframe
      />
    </mesh>
  );
};

const EcoScene = () => {
  return (
    <>
      {/* Enable beautiful interactive orbiting */}
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.8}
      />

      <color attach="background" args={['#010306']} />
      <fog attach="fog" args={['#010306', 6, 25]} />

      {/* Crisp Ambient and Industrial Eco Spotlights */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 7]} intensity={2.5} color="#ffffff" castShadow />
      <spotLight position={[-8, 8, -5]} intensity={2} angle={0.6} penumbra={0.8} color="#00ff88" />
      <pointLight position={[0, -5, 0]} intensity={1.5} color="#00ffff" />

      {/* Central Assembly Group positioned perfectly in viewport */}
      <group position={[0, 0, 0]}>
        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
          <HolographicEarth />
          <MorphingCore />
          <EcoRings />
        </Float>

        {/* Ambient Flowing Eco Particles */}
        <Sparkles count={120} scale={12} size={2.5} speed={0.5} opacity={0.8} color="#00ff88" />
        <Sparkles count={60} scale={10} size={1.5} speed={0.3} opacity={0.5} color="#00ffff" />

        {/* Mirror Tech Base Plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, 0]} receiveShadow>
          <planeGeometry args={[60, 60]} />
          <meshStandardMaterial color="#02060d" metalness={0.9} roughness={0.3} />
        </mesh>
      </group>
    </>
  );
};

export default EcoScene;
