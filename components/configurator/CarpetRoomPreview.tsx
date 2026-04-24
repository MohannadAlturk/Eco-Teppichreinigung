'use client';

import { useId } from 'react';
import { CarpetType } from '@/types/carpet';

interface CarpetRoomPreviewProps {
  length: number;
  width: number;
  type: CarpetType;
}

const TYPE_STYLE: Record<CarpetType, { fill: string; border: string; label: string; pattern: 'orient' | 'wool' | 'synth' | 'plain' }> = {
  orient:    { fill: '#8B4513', border: '#CD853F', label: 'Orientteppich', pattern: 'orient' },
  wool:      { fill: '#C8A87A', border: '#9B7A4A', label: 'Wollteppich',   pattern: 'wool'   },
  general:   { fill: '#7A6A55', border: '#5A4A35', label: 'Teppich',       pattern: 'plain'  },
  synthetic: { fill: '#6B7280', border: '#4B5260', label: 'Synthetik',     pattern: 'synth'  },
};

export const CarpetRoomPreview: React.FC<CarpetRoomPreviewProps> = ({ length, width, type }) => {
  const uid = useId().replace(/:/g, ''); // sanitize React's colon-format IDs for SVG

  const SVG_W = 620;
  const SVG_H = 460;
  const PAD_X = 68;
  const PAD_Y = 52;

  const safeL = Math.max(length || 200, 5);
  const safeW = Math.max(width || 150, 5);

  // Person: 45cm shoulder-width, 170cm tall (front silhouette shown at same scale as carpet)
  const PERSON_W_CM = 45;
  const PERSON_H_CM = 170;
  const GAP_CM = 65; // horizontal gap between carpet and person

  const availW = SVG_W - PAD_X * 2;
  const availH = SVG_H - PAD_Y * 2;

  // Fit the scene (carpet + gap + person) into the available area
  const sceneW_cm = safeW + GAP_CM + PERSON_W_CM;
  const sceneH_cm = Math.max(safeL, PERSON_H_CM);
  const scale = Math.min(availW / sceneW_cm, availH / sceneH_cm);

  const carpetPxW = safeW * scale;
  const carpetPxH = safeL * scale;
  const personPxH = PERSON_H_CM * scale;
  const personPxW = PERSON_W_CM * scale;

  // Center the scene in the SVG
  const totalPxW = carpetPxW + GAP_CM * scale + personPxW;
  const totalPxH = Math.max(carpetPxH, personPxH);
  const originX = PAD_X + (availW - totalPxW) / 2;
  const originY = PAD_Y + (availH - totalPxH) / 2;

  // Carpet: vertically centered in the scene
  const cx = originX;
  const cy = originY + (totalPxH - carpetPxH) / 2;

  // Person: vertically bottom-aligned with carpet (feet at same level)
  const px = originX + carpetPxW + GAP_CM * scale;
  const py = originY + (totalPxH - personPxH) / 2;

  const style = TYPE_STYLE[type] || TYPE_STYLE.orient;

  // Person silhouette: 100 units tall, 40 units wide, centered at x=20
  const pS = personPxH / 100; // 1 unit in px
  const pX = (u: number) => px + personPxW / 2 - 20 * pS + u * pS;
  const pY = (u: number) => py + u * pS;

  const DIM_OFFSET = 26; // px from carpet edge to arrow line
  const fontSize = Math.max(11, Math.min(13, scale * 18));

  const scaleLabel = `1:${Math.round(100 / scale)}`;

  return (
    <div className="w-full bg-[#F0EBE3] rounded-xl overflow-hidden border border-stone-200">
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
        aria-label={`Teppich ${safeW} × ${safeL} cm im Größenvergleich mit einer Person`}
      >
        <defs>
          {/* Arrow markers — unique IDs per instance */}
          <marker id={`${uid}ae`} markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
            <polygon points="0 0, 7 2.5, 0 5" fill="#555" />
          </marker>
          <marker id={`${uid}as`} markerWidth="7" markerHeight="5" refX="0" refY="2.5" orient="auto">
            <polygon points="7 0, 0 2.5, 7 5" fill="#555" />
          </marker>

          {/* Wood floor planks */}
          <pattern id={`${uid}floor`} x="0" y="0" width="80" height="22" patternUnits="userSpaceOnUse">
            <rect width="80" height="22" fill="#E5DDD0" />
            <rect x="1" y="1" width="78" height="10" fill="#EDE5D8" rx="1" />
            <rect x="41" y="12" width="38" height="9" fill="#EDE5D8" rx="1" />
            <rect x="1" y="12" width="38" height="9" fill="#E8DFD2" rx="1" />
          </pattern>

          {/* Orient diamond pattern */}
          <pattern id={`${uid}po`} x={cx} y={cy} width="24" height="24" patternUnits="userSpaceOnUse">
            <rect width="24" height="24" fill={style.fill} />
            <path d="M12 3 L21 12 L12 21 L3 12 Z" fill="none" stroke={style.border} strokeWidth="1" opacity="0.55" />
            <circle cx="12" cy="12" r="2.5" fill={style.border} opacity="0.4" />
          </pattern>

          {/* Wool diagonal lines */}
          <pattern id={`${uid}pw`} x={cx} y={cy} width="14" height="14" patternUnits="userSpaceOnUse">
            <rect width="14" height="14" fill={style.fill} />
            <line x1="0" y1="14" x2="14" y2="0" stroke={style.border} strokeWidth="1" opacity="0.35" />
            <line x1="-7" y1="14" x2="7" y2="0" stroke={style.border} strokeWidth="1" opacity="0.35" />
            <line x1="7" y1="14" x2="21" y2="0" stroke={style.border} strokeWidth="1" opacity="0.35" />
          </pattern>

          {/* Synthetic checkerboard */}
          <pattern id={`${uid}ps`} x={cx} y={cy} width="12" height="12" patternUnits="userSpaceOnUse">
            <rect width="12" height="12" fill={style.fill} />
            <rect x="0" y="0" width="6" height="6" fill={style.border} opacity="0.18" />
            <rect x="6" y="6" width="6" height="6" fill={style.border} opacity="0.18" />
          </pattern>

          {/* Drop shadow filter */}
          <filter id={`${uid}sh`} x="-8%" y="-8%" width="116%" height="116%">
            <feDropShadow dx="3" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.18" />
          </filter>
        </defs>

        {/* ── Floor ── */}
        <rect x={0} y={0} width={SVG_W} height={SVG_H} fill={`url(#${uid}floor)`} />

        {/* ── Scale label (bottom left) ── */}
        <text x={10} y={SVG_H - 8} fontSize={10} fill="#AAA" fontFamily="system-ui, sans-serif">
          Maßstab ca. {scaleLabel}
        </text>

        {/* ── Header ── */}
        <text
          x={SVG_W / 2} y={20}
          textAnchor="middle" fontSize={11}
          fill="#888" fontFamily="system-ui, sans-serif"
        >
          Größenvergleich – Teppich neben einer Person (170 cm)
        </text>

        {/* ── Carpet shadow ── */}
        <rect
          x={cx + 4} y={cy + 4}
          width={carpetPxW} height={carpetPxH}
          rx={4} fill="rgba(0,0,0,0.20)"
        />

        {/* ── Carpet fill ── */}
        <rect
          x={cx} y={cy}
          width={carpetPxW} height={carpetPxH}
          rx={4}
          fill={
            style.pattern === 'orient' ? `url(#${uid}po)` :
            style.pattern === 'wool'   ? `url(#${uid}pw)` :
            style.pattern === 'synth'  ? `url(#${uid}ps)` :
            style.fill
          }
        />

        {/* ── Carpet border ── */}
        <rect
          x={cx} y={cy}
          width={carpetPxW} height={carpetPxH}
          rx={4} fill="none"
          stroke={style.border} strokeWidth={2}
        />

        {/* Orient inner frame */}
        {style.pattern === 'orient' && carpetPxW > 24 && carpetPxH > 24 && (
          <rect
            x={cx + 8} y={cy + 8}
            width={carpetPxW - 16} height={carpetPxH - 16}
            rx={2} fill="none"
            stroke={style.border} strokeWidth={1.2}
            opacity={0.6}
          />
        )}

        {/* Carpet type label */}
        {carpetPxW > 50 && carpetPxH > 22 && (
          <text
            x={cx + carpetPxW / 2}
            y={cy + carpetPxH / 2}
            textAnchor="middle" dominantBaseline="middle"
            fontSize={Math.min(13, carpetPxW / 10, carpetPxH / 3)}
            fill="white" fontFamily="system-ui, sans-serif"
            fontWeight="600" opacity={0.85}
          >
            {style.label}
          </text>
        )}

        {/* ── Dimension: Width (bottom) ── */}
        <line
          x1={cx} y1={cy + carpetPxH + DIM_OFFSET}
          x2={cx + carpetPxW} y2={cy + carpetPxH + DIM_OFFSET}
          stroke="#555" strokeWidth={1.2}
          markerStart={`url(#${uid}as)`} markerEnd={`url(#${uid}ae)`}
        />
        <line x1={cx} y1={cy + carpetPxH + DIM_OFFSET - 6} x2={cx} y2={cy + carpetPxH + DIM_OFFSET + 6} stroke="#555" strokeWidth={1} />
        <line x1={cx + carpetPxW} y1={cy + carpetPxH + DIM_OFFSET - 6} x2={cx + carpetPxW} y2={cy + carpetPxH + DIM_OFFSET + 6} stroke="#555" strokeWidth={1} />
        <text
          x={cx + carpetPxW / 2} y={cy + carpetPxH + DIM_OFFSET + 15}
          textAnchor="middle" fontSize={fontSize}
          fill="#333" fontFamily="system-ui, sans-serif" fontWeight="600"
        >
          {safeW} cm
        </text>

        {/* ── Dimension: Length (left) ── */}
        <line
          x1={cx - DIM_OFFSET} y1={cy}
          x2={cx - DIM_OFFSET} y2={cy + carpetPxH}
          stroke="#555" strokeWidth={1.2}
          markerStart={`url(#${uid}as)`} markerEnd={`url(#${uid}ae)`}
        />
        <line x1={cx - DIM_OFFSET - 6} y1={cy} x2={cx - DIM_OFFSET + 6} y2={cy} stroke="#555" strokeWidth={1} />
        <line x1={cx - DIM_OFFSET - 6} y1={cy + carpetPxH} x2={cx - DIM_OFFSET + 6} y2={cy + carpetPxH} stroke="#555" strokeWidth={1} />
        <text
          x={cx - DIM_OFFSET - 15} y={cy + carpetPxH / 2}
          textAnchor="middle" fontSize={fontSize}
          fill="#333" fontFamily="system-ui, sans-serif" fontWeight="600"
          transform={`rotate(-90, ${cx - DIM_OFFSET - 15}, ${cy + carpetPxH / 2})`}
        >
          {safeL} cm
        </text>

        {/* ── Person silhouette (front view, 100 units = 170 cm) ── */}
        {/* Head */}
        <circle cx={pX(20)} cy={pY(10)} r={9 * pS} fill="#C8956A" stroke="#A87050" strokeWidth={1} />
        {/* Neck */}
        <rect x={pX(17)} y={pY(19)} width={6 * pS} height={6 * pS} rx={1 * pS} fill="#C8956A" stroke="#A87050" strokeWidth={1} />
        {/* Torso */}
        <rect x={pX(9)} y={pY(25)} width={22 * pS} height={32 * pS} rx={3 * pS} fill="#C8956A" stroke="#A87050" strokeWidth={1} />
        {/* Left arm */}
        <rect
          x={pX(3)} y={pY(25)} width={6 * pS} height={24 * pS}
          rx={2 * pS} fill="#C8956A" stroke="#A87050" strokeWidth={1}
          transform={`rotate(-6, ${pX(3)}, ${pY(25)})`}
        />
        {/* Right arm */}
        <rect
          x={pX(31)} y={pY(25)} width={6 * pS} height={24 * pS}
          rx={2 * pS} fill="#C8956A" stroke="#A87050" strokeWidth={1}
          transform={`rotate(6, ${pX(37)}, ${pY(25)})`}
        />
        {/* Left leg */}
        <rect x={pX(10)} y={pY(57)} width={9 * pS} height={40 * pS} rx={2 * pS} fill="#C8956A" stroke="#A87050" strokeWidth={1} />
        {/* Right leg */}
        <rect x={pX(21)} y={pY(57)} width={9 * pS} height={40 * pS} rx={2 * pS} fill="#C8956A" stroke="#A87050" strokeWidth={1} />
        {/* Shoes (slightly wider than legs) */}
        <rect x={pX(8)}  y={pY(93)} width={12 * pS} height={7 * pS} rx={2 * pS} fill="#A87050" />
        <rect x={pX(20)} y={pY(93)} width={12 * pS} height={7 * pS} rx={2 * pS} fill="#A87050" />

        {/* ── Person height measurement line ── */}
        <line
          x1={pX(42)} y1={py}
          x2={pX(42)} y2={py + personPxH}
          stroke="#888" strokeWidth={1} strokeDasharray="3,3"
        />
        <line x1={pX(39)} y1={py} x2={pX(45)} y2={py} stroke="#888" strokeWidth={1} />
        <line x1={pX(39)} y1={py + personPxH} x2={pX(45)} y2={py + personPxH} stroke="#888" strokeWidth={1} />
        <text
          x={pX(48)} y={py + personPxH / 2 - 6}
          textAnchor="start" fontSize={fontSize}
          fill="#555" fontFamily="system-ui, sans-serif" fontWeight="600"
        >
          170 cm
        </text>
        <text
          x={pX(48)} y={py + personPxH / 2 + 8}
          textAnchor="start" fontSize={Math.max(9, fontSize - 2)}
          fill="#888" fontFamily="system-ui, sans-serif"
        >
          Person
        </text>
      </svg>
    </div>
  );
};
