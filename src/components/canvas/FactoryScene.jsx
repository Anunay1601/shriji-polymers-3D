import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Highly realistic moving bottles featuring translucent glass bodies and distinct blue closures
const MovingBottle = ({ initialZ, speed }) => {
  const groupRef = useRef();
  const startZ = -12;
  const endZ = 12;

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.position.z += speed * delta;
    groupRef.current.rotation.y += delta * 1.5;

    // Seamless looping assembly line logic
    if (groupRef.current.position.z > endZ) {
      groupRef.current.position.z = startZ;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.6, initialZ]}>
      {/* Premium Translucent Bottle Body */}
      <mesh position={[0, -0.1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.35, 0.35, 1, 24]} />
        <meshStandardMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.35} 
          metalness={0.9} 
          roughness={0.05} 
        />
      </mesh>
      
      {/* Tapered Bottle Neck */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.2, 0.35, 0.2, 24]} />
        <meshStandardMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.35} 
          metalness={0.9} 
          roughness={0.05} 
        />
      </mesh>
      
      {/* Authentic High-Precision Closure Cap */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.15, 24]} />
        <meshStandardMaterial 
          color="#00d4ff" 
          metalness={0.6} 
          roughness={0.2}
          emissive="#004466"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
};

// Hyper-realistic Industrial Articulated Manufacturing Robot
const RoboticArm = ({ position, isMirrored = false }) => {
  const shoulderRef = useRef();
  const upperArmRef = useRef();
  const foreArmRef = useRef();
  const clawRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime * (isMirrored ? 1.2 : 1.5);
    
    // Dynamic inspection sweeps mirroring actual industrial kinematics
    if (shoulderRef.current) shoulderRef.current.rotation.y = Math.sin(t * 0.5) * 0.6;
    if (upperArmRef.current) upperArmRef.current.rotation.x = Math.sin(t) * 0.35 - 0.2;
    if (foreArmRef.current) foreArmRef.current.rotation.x = Math.cos(t) * 0.4 + 0.3;
    if (clawRef.current) clawRef.current.rotation.z = t * 3;
  });

  return (
    <group position={position} rotation={[0, isMirrored ? Math.PI : 0, 0]}>
      {/* Reinforced Arm Base */}
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.9, 1.1, 0.4, 32]} />
        <meshStandardMaterial color="#0b1120" metalness={0.95} roughness={0.15} />
      </mesh>

      {/* Primary Shoulder Servo Pivot */}
      <group ref={shoulderRef} position={[0, 0.4, 0]}>
        <mesh position={[0, 0.3, 0]} castShadow>
          <boxGeometry args={[0.7, 0.9, 0.7]} />
          {/* Authentic KUKA/ABB style industrial machinery primary accent */}
          <meshStandardMaterial color="#00d4ff" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Articulated Upper Arm segment */}
        <group ref={upperArmRef} position={[0, 0.7, 0]}>
          <mesh position={[0, 1, 0]} castShadow>
            <cylinderGeometry args={[0.25, 0.25, 2.2, 24]} />
            <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.1} />
          </mesh>

          {/* Precision Forearm Pivot */}
          <group ref={foreArmRef} position={[0, 2.1, 0]}>
            <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI/2]}>
              <cylinderGeometry args={[0.35, 0.35, 0.8, 24]} />
              <meshStandardMaterial color="#00d4ff" metalness={0.7} roughness={0.2} />
            </mesh>
            
            <mesh position={[0, -0.9, 0]} castShadow>
              <cylinderGeometry args={[0.18, 0.18, 1.8, 24]} />
              <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* End Effector Tool Head with downward optical alignment laser */}
            <group ref={clawRef} position={[0, -1.8, 0]}>
              <mesh position={[0, -0.1, 0]}>
                <torusGeometry args={[0.28, 0.06, 16, 32]} />
                <meshStandardMaterial color="#ffffff" emissive="#00d4ff" emissiveIntensity={1} />
              </mesh>
              {/* Concentrated Downward Calibration Beam */}
              <mesh position={[0, -0.8, 0]}>
                <cylinderGeometry args={[0.015, 0.08, 1.4, 16]} />
                <meshBasicMaterial color="#00ffff" transparent opacity={0.25} blending={THREE.AdditiveBlending} />
              </mesh>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

// Advanced Multi-Sensor Laser Tunnel Station featuring genuine hollow architectural structures
const InspectionTunnel = ({ position }) => {
  return (
    <group position={position}>
      {/* Left Supporting Arch Pillar */}
      <mesh position={[-1.4, 1.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.4, 2.8, 2]} />
        <meshStandardMaterial color="#050810" metalness={0.95} roughness={0.15} />
      </mesh>
      
      {/* Right Supporting Arch Pillar */}
      <mesh position={[1.4, 1.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.4, 2.8, 2]} />
        <meshStandardMaterial color="#050810" metalness={0.95} roughness={0.15} />
      </mesh>
      
      {/* Top Bridging Roof Beam */}
      <mesh position={[0, 2.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.4, 2]} />
        <meshStandardMaterial color="#050810" metalness={0.95} roughness={0.15} />
      </mesh>

      {/* Internal Neon Scan Array emitting vibrant industrial illumination underneath roof */}
      <mesh position={[0, 2.3, 0]}>
        <boxGeometry args={[2.2, 0.1, 0.4]} />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={3} />
      </mesh>
      
      {/* High-output Volume SpotLight casting intensely onto conveyor passing area */}
      <spotLight 
        position={[0, 2.2, 0]} 
        intensity={6} 
        angle={0.7} 
        penumbra={0.3} 
        color="#00ffff" 
        distance={5}
        castShadow
      />
    </group>
  );
};

const FactoryScene = () => {
  return (
    <>
      {/* Enable simple drag to orbit controls so users can spin around the line beautifully */}
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        maxPolarAngle={Math.PI / 2 - 0.05} // Prevent camera going below floor
        autoRotate
        autoRotateSpeed={0.5}
      />

      <color attach="background" args={['#020408']} />
      <fog attach="fog" args={['#020408', 8, 25]} />

      {/* Vastly upgraded lighting to make metallic details perfectly crisp and clear */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 15, 12]} intensity={3} color="#ffffff" castShadow />
      <spotLight position={[-12, 12, -5]} intensity={2.5} angle={0.6} penumbra={0.5} color="#00d4ff" />
      <pointLight position={[5, 6, 8]} intensity={1.5} color="#0066cc" />

      {/* Perfectly Centered and Elevated Root Group Matrix for cinematic visibility */}
      <group position={[0, -0.6, 2]} rotation={[0.15, -0.4, 0]}>
        
        {/* Main Conveyor Assembly */}
        <group position={[0, 0, 0]}>
          {/* Main Anodized Track Bed */}
          <mesh position={[0, -0.1, 0]} receiveShadow>
            <boxGeometry args={[2.2, 0.4, 24]} />
            <meshStandardMaterial color="#080d1a" metalness={0.9} roughness={0.2} />
          </mesh>
          
          {/* Dual Cyan Glowing Guides */}
          <mesh position={[1.12, 0.1, 0]}>
            <boxGeometry args={[0.06, 0.06, 24]} />
            <meshBasicMaterial color="#00d4ff" />
          </mesh>
          <mesh position={[-1.12, 0.1, 0]}>
            <boxGeometry args={[0.06, 0.06, 24]} />
            <meshBasicMaterial color="#00d4ff" />
          </mesh>

          {/* Sequential stream of realistic standard bottles moving down the line */}
          {Array.from({ length: 12 }).map((_, i) => (
            <MovingBottle key={i} initialZ={-11 + i * 2} speed={3.5} />
          ))}
        </group>

        {/* Primary Robotic Setup Station */}
        <RoboticArm position={[-2.8, 0, 3]} />
        
        {/* Downstream Robotic Inspection Station */}
        <RoboticArm position={[2.8, 0, -2]} isMirrored={true} />

        {/* Central Laser Tunnel Hub */}
        <InspectionTunnel position={[0, 0, 5]} />

        {/* Reflective Ultra-wide Cleanroom Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.3, 0]} receiveShadow>
          <planeGeometry args={[80, 80]} />
          <meshStandardMaterial color="#03050a" metalness={0.95} roughness={0.3} />
        </mesh>
      </group>
    </>
  );
};

export default FactoryScene;
