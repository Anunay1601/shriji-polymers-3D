import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const SecureCore = () => {
  const outerRef = useRef();
  const innerRef = useRef();

  useFrame((state, delta) => {
    outerRef.current.rotation.y += delta * 0.1;
    outerRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    innerRef.current.rotation.y -= delta * 0.2;
    innerRef.current.rotation.x += delta * 0.15;
  });

  return (
    <group>
      {/* Outer Protective Cage */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[2.5, 1]} />
        <meshStandardMaterial 
          color="#0b1120" 
          metalness={0.9} 
          roughness={0.1} 
          wireframe={true} 
          transparent
          opacity={0.2}
        />
      </mesh>
      
      {/* Inner Cryptographic Data Hub */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial 
          color="#00d4ff" 
          emissive="#004d66"
          emissiveIntensity={0.6}
          metalness={0.8}
          roughness={0.2}
          wireframe={false}
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  );
};

const LegalScene = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[0, 0, 0]} intensity={2} color="#00d4ff" />

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <SecureCore />
      </Float>
      
      <Sparkles count={100} scale={10} size={1} speed={0.2} opacity={0.3} color="#00d4ff" />
    </>
  );
};

export default LegalScene;
