'use client';

import { CarpetType } from '@/types/carpet';

interface CarpetDimensionsDisplayProps {
  length: number;
  width: number;
  thickness: number;
  type?: CarpetType;
}

export const CarpetDimensionsDisplay: React.FC<CarpetDimensionsDisplayProps> = ({
  length,
  width,
  thickness,
  type,
}) => {
  const area = length && width ? ((length * width) / 10000).toFixed(2) : '0.00';

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-3 rounded-xl">
        <p className="text-xs text-gray-600 mb-1">Länge</p>
        <p className="text-lg font-bold text-primary-700">{length || 0} cm</p>
      </div>
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-xl">
        <p className="text-xs text-gray-600 mb-1">Breite</p>
        <p className="text-lg font-bold text-blue-700">{width || 0} cm</p>
      </div>
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 rounded-xl">
        <p className="text-xs text-gray-600 mb-1">Dicke</p>
        <p className="text-lg font-bold text-purple-700">{thickness || 0} cm</p>
      </div>
      <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-3 rounded-xl">
        <p className="text-xs text-gray-600 mb-1">Fläche</p>
        <p className="text-lg font-bold text-orange-700">{area} m²</p>
      </div>
    </div>
  );
};
