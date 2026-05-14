import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, QuadraticBezierLine, Html, Stars, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Utility to convert lat/lon to 3D Cartesian coordinates
const getCoordinates = (lat, lng, radius) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = (radius * Math.sin(phi) * Math.sin(theta));
  const y = (radius * Math.cos(phi));
  
  return new THREE.Vector3(x, y, z);
};

const locations = [
  { id: 'india', name: 'India (HQ)', lat: 20.5937, lng: 78.9629, color: '#00d4ff' },
  { id: 'usa', name: 'USA', lat: 37.0902, lng: -95.7129, color: '#ff0055' },
  { id: 'uae', name: 'UAE', lat: 23.4241, lng: 53.8478, color: '#00ff88' },
  { id: 'china', name: 'China', lat: 35.8617, lng: 104.1954, color: '#ffaa00' }
];

const Marker = ({ position, color, isActive, onHover, onClick }) => {
  const meshRef = useRef();
  const ringRef = useRef();

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 4) * 0.3);
      ringRef.current.material.opacity = 0.4 + Math.sin(state.clock.elapsedTime * 4) * 0.2;
    }
  });

  return (
    <group 
      position={position} 
      onPointerOver={(e) => { e.stopPropagation(); onHover(); }}
      onClick={(e) => { e.stopPropagation(); onClick && onClick(); }}
    >
      <mesh ref={meshRef}>
        <sphereGeometry args={[isActive ? 0.08 : 0.05, 32, 32]} />
        <meshBasicMaterial color={isActive ? "#ffffff" : color} toneMapped={false} />
      </mesh>
      <mesh ref={ringRef}>
        <ringGeometry args={[0.08, 0.15, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
      
      {/* Inner glowing aura for active state */}
      {isActive && (
        <mesh>
          <sphereGeometry args={[0.12, 32, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.3} toneMapped={false} blending={THREE.AdditiveBlending} />
        </mesh>
      )}
    </group>
  );
};

const ConnectionLines = ({ earthRadius }) => {
  const indiaPos = getCoordinates(locations[0].lat, locations[0].lng, earthRadius);
  
  return (
    <group>
      {locations.slice(1).map((loc, i) => {
        const destPos = getCoordinates(loc.lat, loc.lng, earthRadius);
        const midPoint = new THREE.Vector3().addVectors(indiaPos, destPos).multiplyScalar(0.5);
        const distance = indiaPos.distanceTo(destPos);
        midPoint.normalize().multiplyScalar(earthRadius + distance * 0.3);

        return (
          <QuadraticBezierLine
            key={i}
            start={indiaPos}
            end={destPos}
            mid={midPoint}
            color={loc.color}
            lineWidth={2}
            transparent
            opacity={0.5}
            dashed={false} /* Disabling CPU dash array recalculations for buttery smoothness */
          />
        );
      })}
    </group>
  );
};

const RealisticEarth = ({ radius }) => {
  const [colorMap, normalMap, specularMap, cloudsMap] = useTexture([
    'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
    'https://unpkg.com/three-globe/example/img/earth-topology.png',
    'https://unpkg.com/three-globe/example/img/earth-water.png',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png'
  ]);

  const cloudsRef = useRef();
  useFrame((state, delta) => {
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.015; // Smooth slow clouds
    }
  });

  return (
    <group>
      {/* Earth Core - Upgraded to 64x64 segments for perfect roundness */}
      <Sphere args={[radius, 64, 64]}>
        <meshPhongMaterial
          map={colorMap}
          normalMap={normalMap}
          normalScale={new THREE.Vector2(0.8, 0.8)}
          specularMap={specularMap}
          shininess={50}
        />
      </Sphere>
      {/* Clouds - Smooth and glowing */}
      <Sphere ref={cloudsRef} args={[radius * 1.008, 64, 64]}>
        <meshPhongMaterial
          map={cloudsMap}
          transparent
          opacity={0.6}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </Sphere>
      {/* Rich Atmosphere Glow */}
      <Sphere args={[radius * 1.03, 64, 64]}>
        <meshPhongMaterial 
          color="#00aaff"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Sphere>
    </group>
  );
};

const GlobeScene = ({ activeLocationId, onLocationHover }) => {
  const globeRef = useRef();
  const earthRadius = 2.5;

  useFrame((state, delta) => {
    // Smoother and slightly faster rotation for realism
    globeRef.current.rotation.y += delta * 0.06; 
  });

  return (
    <>
      <color attach="background" args={['#010308']} />
      {/* Reduced Stars count from 3000 to 1200 to boost GPU fill rate */}
      <Stars radius={100} depth={50} count={1200} factor={4} saturation={0} fade speed={1} />
      
      {/* Upgraded realistic lighting setup */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[15, 10, 8]} intensity={2.5} color="#ffffff" />
      <directionalLight position={[-10, -5, -5]} intensity={0.8} color="#0066cc" />
      <pointLight position={[0, 0, 10]} intensity={0.3} color="#00d4ff" />

      <group ref={globeRef} rotation={[0.2, 0, 0]}>
        <React.Suspense fallback={
          <Sphere args={[earthRadius, 64, 64]}>
            <meshBasicMaterial color="#020813" wireframe transparent opacity={0.3} />
          </Sphere>
        }>
          <RealisticEarth radius={earthRadius} />
        </React.Suspense>

        {/* Markers */}
        {locations.map((loc) => {
          const pos = getCoordinates(loc.lat, loc.lng, earthRadius);
          const normal = pos.clone().normalize();
          const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
          
          return (
            <group key={loc.id} position={pos} quaternion={quaternion}>
               <Marker 
                position={[0,0,0]}
                color={loc.color}
                isActive={activeLocationId === loc.id}
                onHover={() => onLocationHover(loc.id)}
              />
            </group>
          );
        })}

        {/* Connections */}
        <ConnectionLines earthRadius={earthRadius} />
      </group>
    </>
  );
};

export default GlobeScene;
