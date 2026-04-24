// @deprecated
// Ersetzt durch CarpetRoomPreview.tsx (SVG-Größenvergleich, kein WebGL).
// Wurde zusammen mit Carpet3DViewer.tsx abgelöst — siehe dort für Hintergrund.

'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
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
  const carpetRef = useRef<Mesh>(null);
  const { gl } = useThree();

  // Log GPU memory stats on mount and unmount for crash investigation
  useEffect(() => {
    console.log('[3D-Model] Carpet3DModel montiert – Typ:', type);
    console.log('[3D-Model] Dimensionen (cm):', { length, width, thickness });
    console.log('[3D-Model] Initiale VRAM-Nutzung:', gl.info.memory);

    return () => {
      console.log('[3D-Model] Carpet3DModel demontiert');
      console.log('[3D-Model] Finale VRAM-Nutzung:', gl.info.memory);
      console.log('[3D-Model] Finale Render-Stats:', gl.info.render);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gl]);

  // FPS and memory monitor — logs every 10 seconds to detect GPU load spikes
  const lastLogRef = useRef(0);
  const frameCountRef = useRef(0);

  useFrame((state) => {
    if (carpetRef.current) {
      carpetRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }

    frameCountRef.current++;
    const elapsed = state.clock.elapsedTime;

    if (elapsed - lastLogRef.current >= 10) {
      const fps = frameCountRef.current / (elapsed - lastLogRef.current);
      console.log(
        `[3D-Model] FPS: ${fps.toFixed(1)} | Geometrien: ${gl.info.memory.geometries} | Texturen: ${gl.info.memory.textures} | Draw calls: ${gl.info.render.calls}`
      );
      frameCountRef.current = 0;
      lastLogRef.current = elapsed;
    }
  });

  const normalizedLength = Math.max(length / 100, 0.5);
  const normalizedWidth = Math.max(width / 100, 0.5);
  const normalizedThickness = Math.max(thickness / 100, 0.02);

  const carpetPatterns = useMemo(() => {
    const patterns: Record<CarpetType, { color: string; patternColor: string; roughness: number }> = {
      orient: {
        color: '#8B4513',
        patternColor: '#CD853F',
        roughness: 0.9,
      },
      wool: {
        color: '#DEB887',
        patternColor: '#F5DEB3',
        roughness: 0.85,
      },
      general: {
        color: '#A0826D',
        patternColor: '#C19A6B',
        roughness: 0.7,
      },
      synthetic: {
        color: '#696969',
        patternColor: '#A9A9A9',
        roughness: 0.6,
      },
    };
    return patterns[type] || patterns.orient;
  }, [type]);

  return (
    <group>
      {/* Rückwand */}
      <mesh position={[0, 1.25, -2.5]} receiveShadow>
        <boxGeometry args={[6, 2.5, 0.1]} />
        <meshStandardMaterial color="#E8E4DC" roughness={0.9} />
      </mesh>

      {/* Seitenwand */}
      <mesh position={[-3, 1.25, 0]} receiveShadow>
        <boxGeometry args={[0.1, 2.5, 5]} />
        <meshStandardMaterial color="#F0EBE3" roughness={0.9} />
      </mesh>

      {/* Boden */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#8B7355" roughness={0.8} />
      </mesh>

      {/* Teppich */}
      <mesh
        ref={carpetRef}
        position={[0, normalizedThickness / 2, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[normalizedWidth, normalizedThickness, normalizedLength]} />
        <meshStandardMaterial
          color={carpetPatterns.color}
          roughness={carpetPatterns.roughness}
          metalness={0.05}
        />
      </mesh>

      {/* Muster-Overlay */}
      <group position={[0, normalizedThickness + 0.001, 0]}>
        {type === 'orient' && (
          <>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[normalizedWidth * 0.15, normalizedWidth * 0.2, 32]} />
              <meshStandardMaterial color={carpetPatterns.patternColor} roughness={0.9} transparent opacity={0.6} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[normalizedWidth * 0.05, normalizedWidth * 0.08, 32]} />
              <meshStandardMaterial color={carpetPatterns.patternColor} roughness={0.9} transparent opacity={0.7} />
            </mesh>
          </>
        )}
        {type === 'wool' && (
          <>
            {[-0.3, -0.1, 0.1, 0.3].map((z, i) => (
              <mesh key={i} position={[0, 0, z * normalizedLength]} rotation={[-Math.PI / 2, 0, Math.PI / 4]}>
                <planeGeometry args={[normalizedWidth * 0.8, 0.05]} />
                <meshStandardMaterial color={carpetPatterns.patternColor} roughness={0.9} transparent opacity={0.5} />
              </mesh>
            ))}
          </>
        )}
        {type === 'general' && (
          <>
            {[-0.2, 0, 0.2].map((x, i) =>
              [-0.2, 0, 0.2].map((z, j) => (
                <mesh key={`${i}-${j}`} position={[x * normalizedWidth, 0, z * normalizedLength]} rotation={[-Math.PI / 2, 0, 0]}>
                  <planeGeometry args={[normalizedWidth * 0.15, normalizedLength * 0.15]} />
                  <meshStandardMaterial color={carpetPatterns.patternColor} roughness={0.8} transparent opacity={0.4} />
                </mesh>
              ))
            )}
          </>
        )}
      </group>

      {/* Sofa */}
      <group position={[-1.5, 0, -1.8]}>
        <mesh position={[0, 0.25, 0]} castShadow>
          <boxGeometry args={[1.5, 0.5, 0.8]} />
          <meshStandardMaterial color="#4A5568" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.6, -0.3]} castShadow>
          <boxGeometry args={[1.5, 0.6, 0.2]} />
          <meshStandardMaterial color="#4A5568" roughness={0.7} />
        </mesh>
        <mesh position={[-0.7, 0.4, 0]} castShadow>
          <boxGeometry args={[0.15, 0.5, 0.8]} />
          <meshStandardMaterial color="#4A5568" roughness={0.7} />
        </mesh>
        <mesh position={[0.7, 0.4, 0]} castShadow>
          <boxGeometry args={[0.15, 0.5, 0.8]} />
          <meshStandardMaterial color="#4A5568" roughness={0.7} />
        </mesh>
      </group>

      {/* Couchtisch */}
      <group position={[0.3, 0, 0.5]}>
        <mesh position={[0, 0.35, 0]} castShadow>
          <boxGeometry args={[0.8, 0.05, 0.5]} />
          <meshStandardMaterial color="#8B7355" roughness={0.3} metalness={0.1} />
        </mesh>
        {[[-0.35, -0.25], [0.35, -0.25], [-0.35, 0.25], [0.35, 0.25]].map(([x, z], i) => (
          <mesh key={i} position={[x, 0.175, z]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 0.35, 8]} />
            <meshStandardMaterial color="#654321" roughness={0.6} />
          </mesh>
        ))}
      </group>

      {/* Pflanze */}
      <group position={[2, 0, -1.5]}>
        <mesh position={[0, 0.15, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.12, 0.3, 16]} />
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.45, 0]} castShadow>
          <coneGeometry args={[0.2, 0.6, 8]} />
          <meshStandardMaterial color="#2D5016" roughness={0.9} />
        </mesh>
      </group>

      <gridHelper args={[8, 16, '#dddddd', '#f5f5f5']} position={[0, 0.001, 0]} />
    </group>
  );
};
