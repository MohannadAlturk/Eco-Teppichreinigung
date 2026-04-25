export type CarpetType = 'orient' | 'wool' | 'general' | 'synthetic';

export type GeneralCarpetSubtype =
  | 'polypropylene'
  | 'polyester'
  | 'nylon'
  | 'mixed'
  | 'shaggy'
  | 'tufted';

export interface CarpetConfig {
  type: CarpetType;
  generalSubtype?: GeneralCarpetSubtype; // Nur wenn type === 'general'
  length: number; // cm
  width: number; // cm
  thickness: number; // cm
  condition: string;
  images: string[];
}

export interface CartItem {
  id: string;
  config: CarpetConfig;
  price: number;
}
