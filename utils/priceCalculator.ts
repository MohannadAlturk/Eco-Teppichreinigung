import { CarpetConfig, CarpetType, GeneralCarpetSubtype } from '@/types/carpet';

/**
 * Preisberechnung basierend auf der offiziellen Preisliste
 *
 * Handgewebte Teppiche (Orient, Wolle, Natürliche):
 * - 0,5 cm Kilim: 16 € pro m²
 * - 1,1 cm Teppiche: 20 € pro m²
 * - 1,3 cm Teppiche: 22 € pro m²
 *
 * Maschinengefertigte Polyester-Teppiche:
 * - 0,5 cm dünne Teppiche: 8 € pro m²
 * - 1,1 cm Teppiche: 9 € pro m²
 * - 1,3 cm Teppiche: 10 € pro m²
 * - 5,0 cm Shaggy-Teppiche: 15 € pro m²
 */

export function calculatePrice(config: CarpetConfig): number {
  const { type, generalSubtype, length, width, thickness } = config;

  // Fläche in m²
  const area = (length * width) / 10000;

  let pricePerSqm = 0;

  // Handgewebte Teppiche (Orient, Wolle, Natürliche fallen darunter)
  const isHandwoven = type === 'orient' || type === 'wool';

  if (isHandwoven) {
    // Handgewebte Teppiche
    if (thickness <= 0.5) {
      // Kilim
      pricePerSqm = 16;
    } else if (thickness <= 1.1) {
      // Standard Teppiche
      pricePerSqm = 20;
    } else {
      // Dickere Teppiche
      pricePerSqm = 22;
    }
  } else if (type === 'general' || type === 'synthetic') {
    // Maschinengefertigte Polyester-Teppiche / Allgemein

    // Spezialfall: Shaggy-Teppiche haben eigenen Preis
    if (generalSubtype === 'shaggy' || thickness >= 5.0) {
      pricePerSqm = 15;
    } else if (thickness <= 0.5) {
      // Dünne Teppiche
      pricePerSqm = 8;
    } else if (thickness <= 1.1) {
      // Standard Teppiche
      pricePerSqm = 9;
    } else {
      // Dickere Teppiche
      pricePerSqm = 10;
    }
  }

  // Berechnung
  const price = area * pricePerSqm;

  // Auf 2 Dezimalstellen runden
  return Math.round(price * 100) / 100;
}
