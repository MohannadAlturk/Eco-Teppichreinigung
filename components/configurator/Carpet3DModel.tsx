'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { CarpetType } from '@/types/carpet';

interface Carpet3DModelProps {
  length: number;
  width: number;
  thickness: number;
  type: CarpetType;
}

export const Carpet3DModel: React.FC<Carpet3DModelProps> = ({
  length,
  width,
  thickness,
  type,
}) => {
  const meshRef = useRef<Mesh>(null);

  // Sanfte Rotation für bessere Visualisierung
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  // Normalisiere Dimensionen für 3D-Ansicht (cm zu Metern für bessere Darstellung)
  const normalizedLength = Math.max(length / 100, 0.5);
  const normalizedWidth = Math.max(width / 100, 0.5);
  const normalizedThickness = Math.max(thickness / 100, 0.02);

  // Farben basierend auf Teppichart
  const carpetColors: Record<CarpetType, string> = {
    orient: '#8B4513', // Braun
    wool: '#DEB887', // Beige
    general: '#A0826D', // Mittelbraun
    synthetic: '#696969', // Grau
  };

  const carpetColor = carpetColors[type] || '#8B4513';

  return (
    <group>
      {/* Hauptteppich */}
      <mesh ref={meshRef} position={[0, normalizedThickness / 2, 0]} castShadow>
        <boxGeometry args={[normalizedWidth, normalizedThickness, normalizedLength]} />
        <meshStandardMaterial
          color={carpetColor}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Boden für Referenz */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.01, 0]}
        receiveShadow
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#f0f0f0" roughness={1} metalness={0} />
      </mesh>

      {/* Gitter für Größen-Referenz */}
      <gridHelper
        args={[10, 20, '#cccccc', '#eeeeee']}
        position={[0, 0, 0]}
      />
    </group>
  );
};
