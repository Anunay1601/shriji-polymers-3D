import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ParticleSwarm = () => {
  const ref = useRef();
  
  const particleCount = 2000;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos((Math.random() * 2) - 1);
      const r = 10 + Math.random() * 2;
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [particleCount]);

  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.05;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#00d4ff" size={0.05} sizeAttenuation={true} depthWrite={false} opacity={0.4} />
    </Points>
  );
};

const AbstractDNA = () => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.2;
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
  });

  return (
    <group ref={meshRef}>
      <mesh>
        <torusKnotGeometry args={[3, 0.4, 256, 32, 2, 5]} />
        <meshStandardMaterial 
          color="#0b1120" 
          metalness={0.9} 
          roughness={0.1} 
          wireframe={true} 
          transparent 
          opacity={0.15} 
        />
      </mesh>
      <mesh scale={0.99}>
        <torusKnotGeometry args={[3, 0.4, 256, 32, 2, 5]} />
        <meshStandardMaterial 
          color="#00d4ff" 
          emissive="#004d66" 
          emissiveIntensity={0.5} 
          wireframe={false} 
          transparent 
          opacity={0.05} 
        />
      </mesh>
    </group>
  );
};

const CareerScene = () => {
  return (
    <>
      <color attach="background" args={['#010204']} />
      <fog attach="fog" args={['#010204', 10, 30]} />
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-5, 5, -5]} intensity={2} color="#00d4ff" />

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
        <AbstractDNA />
      </Float>
      
      <ParticleSwarm />
    </>
  );
};

export default CareerScene;
