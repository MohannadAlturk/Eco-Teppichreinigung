import { CarpetConfig } from './carpet';
import { Address } from './user';

export type OrderStatus =
  | 'created'
  | 'shipped_to_us'
  | 'received'
  | 'in_cleaning'
  | 'completed'
  | 'shipped_back';

export interface Order {
  id: string;
  userId: string;
  carpet: CarpetConfig;
  status: OrderStatus;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  shippingAddress: Address;
  timeline: OrderTimeline[];
  images?: {
    before?: string[];
    after?: string[];
  };
}

export interface OrderTimeline {
  status: OrderStatus;
  timestamp: Date;
  message: string;
}
