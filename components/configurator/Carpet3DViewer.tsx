// @deprecated
// Ersetzt durch CarpetRoomPreview.tsx (SVG-Größenvergleich, kein WebGL).
// Grund: WebGL-Rendering hat den MacOS WindowServer zum Einfrieren gebracht
// ("userspace watchdog timeout") — GPU-Absturz durch 2×2048px Shadow Maps + konstante Animation.
// Nicht löschen, bis sichergestellt ist dass keine anderen Stellen diesen Import noch verwenden.

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
    <div className="w-full h-full min-h-[300px] md:min-h-[400px] bg-gradient-to-b from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-inner relative">
      <Canvas
        shadows
        // Cap DPR at 1.5 — on Retina (dpr=2) the default renders 4× pixels; 1.5 cuts that by 44%
        dpr={[1, 1.5]}
        // Adaptive performance: r3f drops DPR further when frame time spikes
        performance={{ min: 0.5 }}
        // Disable MSAA — unnecessary at dpr ≥ 1.5 and saves GPU memory bandwidth
        gl={{ antialias: false, powerPreference: 'default' }}
        onCreated={({ gl }) => {
          const canvas = gl.domElement;
          const ctx = gl.getContext() as WebGL2RenderingContext;

          console.log('[3D-Viewer] WebGL Renderer initialisiert');
          console.log('[3D-Viewer] Max Texture Size:', gl.capabilities.maxTextureSize);
          console.log('[3D-Viewer] Max Samples (MSAA):', gl.capabilities.maxSamples);
          console.log('[3D-Viewer] isWebGL2:', gl.capabilities.isWebGL2);

          const debugInfo = ctx.getExtension('WEBGL_debug_renderer_info');
          if (debugInfo) {
            console.log('[3D-Viewer] GPU:', ctx.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL));
            console.log('[3D-Viewer] GPU Vendor:', ctx.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL));
          }

          // WebGL context loss = GPU hang before a full system crash
          canvas.addEventListener('webglcontextlost', (event) => {
            event.preventDefault(); // prevent browser from discarding all WebGL state immediately
            console.error('[3D-Viewer] ⚠️  WebGL Context VERLOREN – GPU möglicherweise eingefroren');
            console.error('[3D-Viewer] Renderer memory at loss:', gl.info.memory);
            console.error('[3D-Viewer] Renderer render stats:', gl.info.render);
          });

          canvas.addEventListener('webglcontextrestored', () => {
            console.log('[3D-Viewer] WebGL Context wiederhergestellt');
          });
        }}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[4, 3, 4]} fov={60} />

          <ambientLight intensity={0.6} />

          {/* Shadow map reduced from 2048→512: 16× less VRAM per shadow-casting light */}
          <directionalLight
            position={[5, 8, 5]}
            intensity={1.2}
            castShadow
            shadow-mapSize-width={512}
            shadow-mapSize-height={512}
            shadow-camera-left={-5}
            shadow-camera-right={5}
            shadow-camera-top={5}
            shadow-camera-bottom={-5}
          />
          <pointLight position={[-3, 3, -2]} intensity={0.4} color="#FFF8DC" />
          {/* castShadow removed — each shadow-casting light doubles shadow rendering cost */}
          <spotLight position={[0, 4, 0]} angle={0.5} penumbra={0.5} intensity={0.3} />

          <Carpet3DModel
            length={length}
            width={width}
            thickness={thickness}
            type={type}
          />

          <Environment preset="apartment" />

          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={3}
            maxDistance={10}
            maxPolarAngle={Math.PI / 2.2}
            minPolarAngle={Math.PI / 6}
          />
        </Suspense>
      </Canvas>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white text-xs px-3 py-1 rounded-full pointer-events-none">
        Ziehen zum Drehen • Scrollen zum Zoomen
      </div>
    </div>
  );
};
