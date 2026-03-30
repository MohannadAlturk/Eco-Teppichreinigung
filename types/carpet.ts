export type CarpetType = 'orient' | 'wool' | 'silk' | 'synthetic';

export interface CarpetConfig {
  type: CarpetType;
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
