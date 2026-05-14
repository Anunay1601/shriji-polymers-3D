import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, Sparkles, Text } from '@react-three/drei';
import * as THREE from 'three';

const PharmaBottle = ({ position, scale }) => {
  const bottleRef = useRef();
  const capRef = useRef();
  const holoRef = useRef();
  const { pointer } = useThree();
  
  useFrame((state, delta) => {
    // Map pointer.x to a full 360-degree rotation (Math.PI * 2) for maximum interactivity
    const targetRotationX = (pointer.y * Math.PI * 0.15) + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    // Add a very subtle ambient time spin so it slowly rotates when idle
    const targetRotationY = (pointer.x * Math.PI * 2.5) + (state.clock.elapsedTime * 0.15);

    // Buttery smooth lerp
    bottleRef.current.rotation.x = THREE.MathUtils.lerp(bottleRef.current.rotation.x, targetRotationX, 0.08);
    bottleRef.current.rotation.y = THREE.MathUtils.lerp(bottleRef.current.rotation.y, targetRotationY, 0.08);
    
    if (capRef.current) {
      capRef.current.rotation.y += delta * 1.5; // Cap rotates faster independently
    }

    if (holoRef.current) {
      // Subtle premium holographic depth and light modulation
      holoRef.current.material.opacity = 0.08 + Math.sin(state.clock.elapsedTime * 2) * 0.04;
      holoRef.current.material.emissiveIntensity = 0.25 + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
    }
  });

  return (
    <group ref={bottleRef} position={position} scale={scale}>
      {/* Premium Metallic Bottle Body */}
      <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1, 1, 3, 32]} />
        <meshStandardMaterial 
          color="#0b1120"
          metalness={0.92}
          roughness={0.08}
          envMapIntensity={2.5}
        />
      </mesh>
      
      {/* Tapered Bottle Neck */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.7, 1, 0.4, 32]} />
        <meshStandardMaterial 
          color="#0b1120"
          metalness={0.92}
          roughness={0.08}
        />
      </mesh>
      
      {/* High-Precision Cap Closure */}
      <mesh ref={capRef} position={[0, 1.6, 0]} castShadow>
        <cylinderGeometry args={[0.75, 0.75, 0.5, 32]} />
        <meshStandardMaterial 
          color="#00d4ff"
          metalness={0.8}
          roughness={0.2}
          emissive="#004d66"
          emissiveIntensity={0.8}
        />
      </mesh>
      
      {/* Subtle Dynamic Label Hologram Sleeve */}
      <mesh ref={holoRef} position={[0, -0.5, 0]} scale={[1.02, 0.9, 1.02]}>
        <cylinderGeometry args={[1, 1, 2, 32]} />
        <meshStandardMaterial 
          color="#ffffff"
          transparent
          opacity={0.1}
          metalness={0.5}
          roughness={0.2}
          emissive="#00d4ff"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* --- PREMIUM BRANDING OVERLAYS --- */}
      {/* Front Label Matrix */}
      <group position={[0, -0.2, 1.03]}>
        <Text
          fontSize={0.26}
          color="#00d4ff"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
          letterSpacing={0.15}
        >
          SHRIJI
        </Text>
        <Text
          position={[0, -0.3, 0]}
          fontSize={0.12}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.25}
        >
          POLYMERS
        </Text>
        <Text
          position={[0, -0.55, 0]}
          fontSize={0.065}
          color="#00ff88"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.1}
        >
          USP &lt;661&gt; DMF CERTIFIED
        </Text>
      </group>

      {/* Back Label Matrix (Mirrored perfectly for 360-degree rotation view mapping) */}
      <group position={[0, -0.2, -1.03]} rotation={[0, Math.PI, 0]}>
        <Text
          fontSize={0.26}
          color="#00d4ff"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
          letterSpacing={0.15}
        >
          SHRIJI
        </Text>
        <Text
          position={[0, -0.3, 0]}
          fontSize={0.12}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.25}
        >
          POLYMERS
        </Text>
        <Text
          position={[0, -0.55, 0]}
          fontSize={0.065}
          color="#00ff88"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.1}
        >
          ISO 15378 CLEANROOM
        </Text>
      </group>
    </group>
  );
};

const CameraRig = () => {
  const { camera, pointer } = useThree();
  useFrame(() => {
    // Parallax effect based on mouse pointer
    const targetX = (pointer.x * 2);
    const targetY = (pointer.y * 2) + 2; // Offset Y to look slightly up/down from center

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
    camera.lookAt(0, 0, 0);
  });
  return null;
};

const Scene = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <CameraRig />
      
      <color attach="background" args={['#050810']} />
      <fog attach="fog" args={['#050810', 5, 20]} />
      
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow color="#ffffff" />
      <directionalLight position={[-5, -5, -5]} intensity={1} color="#00d4ff" />
      <spotLight position={[0, 5, 5]} intensity={3} angle={0.6} penumbra={1} color="#00d4ff" />
      <spotLight position={[0, -5, -5]} intensity={2} angle={0.8} penumbra={1} color="#0066ff" />

      {/* Futuristic Particles (Dynamically gated for extreme smooth FPS scrolling on mobile targets) */}
      <Sparkles 
        count={isMobile ? 40 : 150} 
        scale={15} 
        size={2} 
        speed={0.4} 
        opacity={0.6} 
        color="#00d4ff" 
      />
      <Sparkles 
        count={isMobile ? 15 : 50} 
        scale={10} 
        size={1} 
        speed={0.2} 
        opacity={0.4} 
        color="#ffffff" 
      />
      
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <PharmaBottle 
          position={[0, isMobile ? -0.1 : -0.2, 0]} 
          scale={isMobile ? 0.72 : 0.95} 
        />
      </Float>
    </>
  );
};

export default Scene;
