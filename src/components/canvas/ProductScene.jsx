import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshReflectorMaterial, Float, Environment, Stage } from '@react-three/drei';
import * as THREE from 'three';

const HDPEBottle = ({ hovered, active }) => {
  const group = useRef();
  const capGroup = useRef();
  const payloadGroup = useRef();
  const holoLabel = useRef();
  
  useFrame((state, delta) => {
    // Cinematic smooth inertia orbiting
    const baseSpeed = hovered ? 1.5 : 0.4;
    group.current.rotation.y += delta * baseSpeed;
    
    // Smooth inspection camera presentation tilt
    const targetRotationX = active ? 0.3 : 0.1;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRotationX, 0.05);

    // Dynamic child-resistant double closure unscrewing / lifting mechanics
    if (capGroup.current) {
      const targetCapY = (active || hovered) ? 2.1 : 1.55;
      capGroup.current.position.y = THREE.MathUtils.lerp(capGroup.current.position.y, targetCapY, 0.08);
      capGroup.current.rotation.y += delta * (hovered ? 3 : 1);
    }

    // Mesmerizing inner active solid-dose capsule matrix counter-spinning
    if (payloadGroup.current) {
      payloadGroup.current.rotation.y -= delta * 0.6;
      payloadGroup.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05 - 0.4;
    }

    // High-end ambient holographic label depth breathing
    if (holoLabel.current) {
      holoLabel.current.material.opacity = 0.15 + Math.sin(state.clock.elapsedTime * 3) * 0.05;
      holoLabel.current.material.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.15;
    }
  });

  return (
    <group ref={group} scale={1.2} position={[0, -0.2, 0]}>
      {/* Recessed HDPE Support Base Rim */}
      <mesh position={[0, -1.4, 0]} castShadow>
        <cylinderGeometry args={[0.95, 0.92, 0.2, 32]} />
        <meshStandardMaterial color="#0c1424" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* High-Performance Anodized HDPE Container Body */}
      <mesh position={[0, -0.4, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1, 0.95, 1.8, 32]} />
        <meshStandardMaterial 
          color="#040914"
          transparent
          opacity={0.65}
          metalness={0.95}
          roughness={0.05}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Polished Sloped Shoulder Transition */}
      <mesh position={[0, 0.65, 0]}>
        <cylinderGeometry args={[0.7, 1, 0.3, 32]} />
        <meshStandardMaterial color="#0c1424" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Solid Threaded Container Neck Assembly */}
      <mesh position={[0, 1.05, 0]}>
        <cylinderGeometry args={[0.65, 0.7, 0.5, 32]} />
        <meshStandardMaterial color="#040914" metalness={0.95} roughness={0.05} />
      </mesh>
      {/* Precision Exterior Thread Rings */}
      <mesh position={[0, 1.15, 0]} rotation={[Math.PI/2, 0, 0]}>
        <torusGeometry args={[0.66, 0.03, 16, 32]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0, 0.95, 0]} rotation={[Math.PI/2, 0, 0]}>
        <torusGeometry args={[0.66, 0.03, 16, 32]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.3} />
      </mesh>

      {/* Interactive Child-Resistant Cap (CRC) Wrapper Core */}
      <group ref={capGroup} position={[0, 1.55, 0]}>
        {/* Outer Grip Sleeve Shield */}
        <mesh castShadow>
          <cylinderGeometry args={[0.75, 0.75, 0.55, 32]} />
          <meshStandardMaterial 
            color="#00d4ff"
            metalness={0.5}
            roughness={0.2}
            transparent
            opacity={0.85}
            emissive="#004d66"
            emissiveIntensity={hovered ? 0.6 : 0.2}
          />
        </mesh>
        {/* Inner Pressure Liner Core */}
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.68, 0.68, 0.5, 32]} />
          <meshStandardMaterial color="#0b1325" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Embossed Top Instructions Alignment Rim */}
        <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, 0.28, 0]}>
          <ringGeometry args={[0.3, 0.65, 32]} />
          <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.5} emissive="#00d4ff" emissiveIntensity={hovered ? 0.5 : 0.1} />
        </mesh>
      </group>
      
      {/* Mesmerizing Internal Active Solid-Dose Drug Simulators */}
      <group ref={payloadGroup} position={[0, -0.4, 0]}>
        {/* Orbiting Encapsulated Product Matrix */}
        {Array.from({ length: 8 }).map((_, idx) => {
          const angle = (idx / 8) * Math.PI * 2;
          const radius = 0.55;
          const yPos = (idx % 2 === 0) ? 0.3 : -0.3;
          return (
            <mesh key={`pill-${idx}`} position={[Math.cos(angle) * radius, yPos, Math.sin(angle) * radius]} rotation={[0.2, angle, 0.5]}>
              <capsuleGeometry args={[0.08, 0.22, 16, 16]} />
              <meshStandardMaterial color="#ffffff" emissive={idx % 2 === 0 ? "#00d4ff" : "#00ff88"} emissiveIntensity={1.5} />
            </mesh>
          );
        })}
        {/* Central Cleanroom Telemetry Stabilization Core */}
        <mesh>
          <cylinderGeometry args={[0.15, 0.15, 1.2, 16]} />
          <meshBasicMaterial color="#00ffff" wireframe transparent opacity={0.3} />
        </mesh>
      </group>

      {/* Advanced Dynamic Hologram Label Sleeve */}
      <mesh ref={holoLabel} position={[0, -0.4, 0]} scale={[1.02, 0.85, 1.02]}>
        <cylinderGeometry args={[1, 0.95, 1.6, 32]} />
        <meshStandardMaterial 
          color="#00ffff"
          transparent
          opacity={0.15}
          metalness={0.5}
          roughness={0.2}
          emissive="#00d4ff"
          emissiveIntensity={0.3}
          wireframe={active}
        />
      </mesh>
    </group>
  );
};

const PPClosure = ({ hovered, active }) => {
  const group = useRef();
  const innerSeal = useRef();
  
  useFrame((state, delta) => {
    // Cinematic orbital spinning speed adaptation
    const targetRotationY = hovered ? state.clock.elapsedTime * 2 : state.clock.elapsedTime * 0.8;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotationY, 0.05);
    
    // Smooth angle tilt displaying internal threads clearly
    const targetRotationX = active ? 0.6 : 0.2;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRotationX, 0.05);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, active ? -0.15 : 0, 0.05);

    if (innerSeal.current) {
      // Precision unscrewing / internal seal levitation mechanic on hover
      const targetY = hovered ? 0.75 : 0.15;
      innerSeal.current.position.y = THREE.MathUtils.lerp(innerSeal.current.position.y, targetY, 0.08);
      innerSeal.current.rotation.y += delta * 3;
    }
  });

  return (
    <group ref={group} scale={1.8}>
      {/* Outer Tapered Rim Cap Shell */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.05, 1.05, 1.1, 64, 1, true]} />
        <meshStandardMaterial 
          color="#0b1325"
          metalness={0.95}
          roughness={0.12}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Internal Core Base Wall */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.95, 0.95, 1.05, 64]} />
        <meshStandardMaterial 
          color="#040812"
          metalness={0.9}
          roughness={0.3}
        />
      </mesh>

      {/* Perfectly Flat Solid Top Plate */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, 0.55, 0]}>
        <circleGeometry args={[1.05, 64]} />
        <meshStandardMaterial color="#0b1325" metalness={0.95} roughness={0.12} />
      </mesh>

      {/* Outer Grip Rib Knurls (Precision Array) */}
      {Array.from({ length: 24 }).map((_, idx) => {
        const angle = (idx / 24) * Math.PI * 2;
        return (
          <mesh key={`rib-${idx}`} position={[Math.cos(angle) * 1.06, 0, Math.sin(angle) * 1.06]}>
            <boxGeometry args={[0.03, 0.95, 0.03]} />
            <meshStandardMaterial 
              color="#00d4ff" 
              metalness={0.8} 
              roughness={0.2} 
              emissive="#004d66" 
              emissiveIntensity={0.4} 
            />
          </mesh>
        );
      })}

      {/* Internal Levitating Security Foil Liner & Desiccant Capsule */}
      <group ref={innerSeal} position={[0, 0.15, 0]}>
        {/* High-Reflectance Induction Sealing Disc */}
        <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, 0, 0]}>
          <circleGeometry args={[0.85, 32]} />
          <meshStandardMaterial 
            color="#ffffff" 
            metalness={1} 
            roughness={0.05} 
            emissive="#00d4ff" 
            emissiveIntensity={hovered ? 0.7 : 0.2} 
          />
        </mesh>
        {/* Desiccant core matrix container beneath foil */}
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
          <meshStandardMaterial color="#00ffff" wireframe transparent opacity={0.6} />
        </mesh>
      </group>

      {/* Seamless Internal Screw Thread Rings */}
      <mesh position={[0, -0.1, 0]} rotation={[Math.PI/2, 0, 0]}>
        <torusGeometry args={[0.88, 0.04, 16, 64]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0, -0.35, 0]} rotation={[Math.PI/2, 0, 0]}>
        <torusGeometry args={[0.88, 0.04, 16, 64]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
};

const SpecialtyPackaging = ({ hovered, active }) => {
  const group = useRef();
  const innerRef = useRef();

  useFrame((state) => {
    group.current.rotation.y = state.clock.elapsedTime * 0.5;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    
    if (innerRef.current) {
      innerRef.current.rotation.z = state.clock.elapsedTime * (hovered ? -2 : -0.5);
    }
    
    const targetScale = active ? 1.2 : 1;
    group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, targetScale, 0.1));
  });

  return (
    <group ref={group} scale={1.5}>
      {/* Outer Shell */}
      <mesh>
        <octahedronGeometry args={[1.5, 2]} />
        <meshStandardMaterial 
          color="#00d4ff"
          transparent
          opacity={0.35}
          metalness={0.6}
          roughness={0.1}
        />
      </mesh>
      {/* Inner Active Ingredient */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.8, 1]} />
        <meshStandardMaterial 
          color="#ffffff"
          emissive="#00d4ff"
          emissiveIntensity={hovered ? 1 : 0.5}
          wireframe
        />
      </mesh>
    </group>
  );
};

const ProductScene = ({ activeTab }) => {
  const [hovered, setHovered] = useState(false);
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
      <color attach="background" args={['#030508']} />
      <fog attach="fog" args={['#030508', 5, 20]} />

      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 10, 5]} intensity={1} color="#ffffff" castShadow />
      <spotLight position={[-5, 5, -5]} intensity={2} angle={0.5} penumbra={1} color="#00d4ff" castShadow />
      <spotLight position={[0, -5, 0]} intensity={1} angle={0.8} penumbra={1} color="#0066cc" />

      <group 
        position={[0, isMobile ? -0.5 : -1, 0]} 
        scale={isMobile ? 0.65 : 1}
        onPointerOver={() => setHovered(true)} 
        onPointerOut={() => setHovered(false)}
      >
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          {activeTab === 0 && <HDPEBottle hovered={hovered} active={activeTab === 0} />}
          {activeTab === 1 && <PPClosure hovered={hovered} active={activeTab === 1} />}
          {activeTab === 2 && <SpecialtyPackaging hovered={hovered} active={activeTab === 2} />}
        </Float>
      </group>

      {/* Reflective Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={256}
          mixBlur={1}
          mixStrength={50}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050810"
          metalness={0.5}
        />
      </mesh>
      
      <Environment preset="city" />
    </>
  );
};

export default ProductScene;
