// src/features/PlanetDetail/components/Interactive3D.jsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';

function PlanetMesh({ textureUrl }) {
  const texture = useTexture(textureUrl);
  return (
    <mesh>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

export default function Interactive3D({ textureUrl }) {
  return (
    <div className="w-full h-96 mb-6 rounded-2xl overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5] }} frameloop="demand">
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} />
        <Suspense fallback={null}>
          <PlanetMesh textureUrl={textureUrl} />
        </Suspense>
        <OrbitControls enableZoom />
      </Canvas>
    </div>
  );
}
