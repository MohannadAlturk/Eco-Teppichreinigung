'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { Carpet3DModel } from './Carpet3DModel';
import { CarpetType } from '@/types/carpet';

interface Carpet3DViewerProps {
  length: number;
  width: number;
  thickness: number;
  type: CarpetType;
}

export const Carpet3DViewer: React.FC<Carpet3DViewerProps> = ({
  length,
  width,
  thickness,
  type,
}) => {
  return (
    <div className="w-full h-full min-h-[300px] md:min-h-[400px] bg-gradient-to-b from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-inner">
      <Canvas shadows>
        <Suspense fallback={null}>
          {/* Kamera */}
          <PerspectiveCamera makeDefault position={[3, 2, 3]} fov={50} />

          {/* Licht */}
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[-5, 5, -5]} intensity={0.5} />

          {/* 3D Teppich Modell */}
          <Carpet3DModel
            length={length}
            width={width}
            thickness={thickness}
            type={type}
          />

          {/* Umgebung für Reflexionen */}
          <Environment preset="apartment" />

          {/* Orbit Controls für Interaktion */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={2}
            maxDistance={8}
            maxPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>

      {/* Hinweis für Benutzer */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white text-xs px-3 py-1 rounded-full pointer-events-none">
        Ziehen zum Drehen • Scrollen zum Zoomen
      </div>
    </div>
  );
};
