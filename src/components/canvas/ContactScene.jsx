import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Trail } from '@react-three/drei';
import * as THREE from 'three';

// Hexagonal Polymer Ring representing chemical structures
const PolymerHexagon = ({ radius = 1, tube = 0.05, color = "#00d4ff", rotation=[0,0,0] }) => {
  return (
    <mesh rotation={rotation}>
      {/* 6 tubular segments create a perfect hexagon */}
      <torusGeometry args={[radius, tube, 16, 6]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} roughness={0.2} metalness={0.8} />
    </mesh>
  );
};

// Central Polymer Communication Core
const PolymerCommunicationCore = () => {
  const coreRef = useRef();
  const ringsRef = useRef();

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.4;
      coreRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.y -= delta * 0.2;
      ringsRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.4) * 0.15;
    }
  });

  return (
    <group scale={1.2}>
      {/* Central Glowing Data Node */}
      <group ref={coreRef}>
        <mesh>
          <icosahedronGeometry args={[0.8, 1]} />
          <meshStandardMaterial color="#020813" roughness={0.1} metalness={0.9} transparent opacity={0.8} wireframe/>
        </mesh>
        {/* Core Energy Pulse */}
        <mesh>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshBasicMaterial color="#00ffff" toneMapped={false} />
        </mesh>
        
        {/* Holographic Contact/Envelope Icon Floating in Core */}
        <group position={[0, 0, 0.6]}>
          <mesh position={[0, 0, 0]}>
            <planeGeometry args={[0.5, 0.35]} />
            <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.6} />
          </mesh>
          <mesh position={[-0.12, 0.05, 0.01]} rotation={[0, 0, -0.4]}>
            <planeGeometry args={[0.28, 0.015]} />
            <meshBasicMaterial color="#00ffff" />
          </mesh>
          <mesh position={[0.12, 0.05, 0.01]} rotation={[0, 0, 0.4]}>
            <planeGeometry args={[0.28, 0.015]} />
            <meshBasicMaterial color="#00ffff" />
          </mesh>
        </group>
      </group>

      {/* Orbiting Polymer Hex Rings representing chemical bonds & network */}
      <group ref={ringsRef}>
        <PolymerHexagon radius={1.8} tube={0.03} color="#00ffff" rotation={[Math.PI/3, 0, 0]} />
        <PolymerHexagon radius={2.4} tube={0.02} color="#00ff88" rotation={[-Math.PI/4, Math.PI/2, 0]} />
        <PolymerHexagon radius={2.8} tube={0.015} color="#00d4ff" rotation={[0, Math.PI/3, Math.PI/6]} />
      </group>
    </group>
  );
};

// Orbiting Pharma Data Capsules transmitting messages
const DataCapsule = ({ orbitRadius, speed, angleOffset, color }) => {
  const groupRef = useRef();
  const capsuleRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + angleOffset;
    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(t) * orbitRadius;
      groupRef.current.position.z = Math.sin(t) * orbitRadius;
      groupRef.current.position.y = Math.sin(t * 2) * 0.8;
      
      // Face tangent to orbit
      groupRef.current.rotation.y = -t;
      groupRef.current.rotation.z = Math.sin(t * 3) * 0.2;
    }
    if (capsuleRef.current) {
      capsuleRef.current.rotation.x += 0.04;
      capsuleRef.current.rotation.y += 0.06;
    }
  });

  return (
    <group ref={groupRef}>
      <Trail width={0.6} length={6} color={color} attenuation={(t) => t * t}>
        <group ref={capsuleRef}>
          {/* Top Colored Cap */}
          <mesh position={[0, 0.1, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.2, 16]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} />
          </mesh>
          <mesh position={[0, 0.2, 0]}>
            <sphereGeometry args={[0.08, 16, 16, 0, Math.PI * 2, 0, Math.PI/2]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} />
          </mesh>
          
          {/* Bottom White Cap */}
          <mesh position={[0, -0.1, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.2, 16]} />
            <meshStandardMaterial color="#ffffff" metalness={0.6} roughness={0.2} />
          </mesh>
          <mesh position={[0, -0.2, 0]} rotation={[Math.PI, 0, 0]}>
            <sphereGeometry args={[0.08, 16, 16, 0, Math.PI * 2, 0, Math.PI/2]} />
            <meshStandardMaterial color="#ffffff" metalness={0.6} roughness={0.2} />
          </mesh>
        </group>
      </Trail>
    </group>
  );
};

// Hexagonal Polymer Lattice Ground
const PolymerGrid = () => {
  return (
    <group position={[0, -3.5, 0]}>
      {/* Absolute Dark Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#010308" roughness={0.4} metalness={0.8} />
      </mesh>
      
      {/* Foundational Tech Grid */}
      <gridHelper args={[40, 40, '#004d66', '#001a33']} position={[0, 0.01, 0]} />
      
      {/* Emissive chemical polymer bond nodes scattered on ground */}
      {Array.from({ length: 15 }).map((_, i) => {
        const angle = (i / 15) * Math.PI * 2;
        const r = 3 + Math.random() * 8;
        return (
          <group key={`node-${i}`} position={[Math.cos(angle)*r, 0.02, Math.sin(angle)*r]} rotation={[-Math.PI/2, 0, Math.random() * Math.PI]}>
             <mesh>
               <torusGeometry args={[0.6, 0.02, 8, 6]} />
               <meshBasicMaterial color="#00d4ff" transparent opacity={0.2} />
             </mesh>
             <mesh position={[0.6, 0, 0]}>
               <circleGeometry args={[0.08, 16]} />
               <meshBasicMaterial color="#00ffff" transparent opacity={0.4} />
             </mesh>
          </group>
        )
      })}
    </group>
  );
};

// Interactive wrapper that rotates 360 degrees based on mouse movement
const InteractiveCoreWrapper = ({ children }) => {
  const ref = useRef();
  
  useFrame((state) => {
    // state.pointer.x ranges from -1 to 1.
    // Multiplying by Math.PI maps it to -180 to 180 degrees (a full 360 range).
    const targetY = state.pointer.x * Math.PI; 
    const targetX = -(state.pointer.y * Math.PI * 0.15); // Slight tilt up/down

    if (ref.current) {
      // Smooth interpolation (lerp) for buttery interaction
      ref.current.rotation.y += (targetY - ref.current.rotation.y) * 0.08;
      ref.current.rotation.x += (targetX - ref.current.rotation.x) * 0.08;
    }
  });

  return <group ref={ref}>{children}</group>;
};

const ContactScene = () => {
  return (
    <>
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        maxPolarAngle={Math.PI / 2 - 0.05}
        autoRotate
        autoRotateSpeed={0.5}
      />

      <color attach="background" args={['#010204']} />
      <fog attach="fog" args={['#010204', 6, 25]} />

      {/* Cinematic Studio Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[8, 12, 10]} intensity={2} color="#ffffff" castShadow />
      <spotLight position={[-8, 10, 2]} intensity={2.5} angle={0.5} penumbra={0.8} color="#00d4ff" />
      <pointLight position={[0, 0, 0]} intensity={2} color="#00ffff" />

      <group position={[0, 0.2, 0]}>
        {/* Floating Polymer Communication Hub */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <InteractiveCoreWrapper>
            <PolymerCommunicationCore />
          </InteractiveCoreWrapper>
        </Float>

        {/* Orbiting Pharma Data Packets */}
        <DataCapsule orbitRadius={4.5} speed={0.8} angleOffset={0} color="#00ffff" />
        <DataCapsule orbitRadius={5.2} speed={0.6} angleOffset={Math.PI / 2} color="#00ff88" />
        <DataCapsule orbitRadius={4.0} speed={1.0} angleOffset={Math.PI} color="#00d4ff" />
        <DataCapsule orbitRadius={6.0} speed={0.5} angleOffset={Math.PI * 1.5} color="#ffffff" />

        {/* Polymer Lattice Ground Interface */}
        <PolymerGrid />
      </group>
    </>
  );
};

export default ContactScene;
