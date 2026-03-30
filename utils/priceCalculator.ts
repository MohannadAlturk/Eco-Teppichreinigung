import { CarpetConfig, CarpetType } from '@/types/carpet';

const BASE_PRICES: Record<CarpetType, number> = {
  orient: 1.2,
  wool: 0.8,
  silk: 1.5,
  synthetic: 0.5,
};

const THICKNESS_MULTIPLIER = 1.1;

export function calculatePrice(config: CarpetConfig): number {
  const { type, length, width, thickness } = config;

  // Fläche in m²
  const area = (length * width) / 10000;

  // Basispreis pro m²
  const basePrice = BASE_PRICES[type];

  // Dicken-Zuschlag
  const thicknessMultiplier = thickness > 2 ? THICKNESS_MULTIPLIER : 1;

  // Berechnung
  const price = area * basePrice * 50 * thicknessMultiplier;

  // Mindestpreis 39.99€
  return Math.max(39.99, Math.round(price * 100) / 100);
}
