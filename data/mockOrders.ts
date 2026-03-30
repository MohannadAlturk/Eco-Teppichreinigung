import { Order } from '@/types/order';

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    userId: '1',
    carpet: {
      type: 'orient',
      length: 200,
      width: 150,
      thickness: 2,
      condition: 'Guter Zustand, kleine Flecken',
      images: [],
    },
    status: 'in_cleaning',
    price: 89.99,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    shippingAddress: {
      street: 'Musterstraße 123',
      city: 'Berlin',
      zipCode: '10115',
      country: 'Deutschland',
    },
    timeline: [
      {
        status: 'created',
        timestamp: new Date('2024-01-15'),
        message: 'Bestellung wurde erstellt',
      },
      {
        status: 'shipped_to_us',
        timestamp: new Date('2024-01-16'),
        message: 'Paket wurde an uns versendet',
      },
      {
        status: 'received',
        timestamp: new Date('2024-01-18'),
        message: 'Teppich wurde von uns empfangen',
      },
      {
        status: 'in_cleaning',
        timestamp: new Date('2024-01-20'),
        message: 'Reinigung ist im Gange',
      },
    ],
    images: {
      before: [],
      after: [],
    },
  },
  {
    id: 'ORD-002',
    userId: '1',
    carpet: {
      type: 'wool',
      length: 180,
      width: 120,
      thickness: 1.5,
      condition: 'Sehr guter Zustand',
      images: [],
    },
    status: 'completed',
    price: 69.99,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-10'),
    shippingAddress: {
      street: 'Musterstraße 123',
      city: 'Berlin',
      zipCode: '10115',
      country: 'Deutschland',
    },
    timeline: [
      {
        status: 'created',
        timestamp: new Date('2024-01-01'),
        message: 'Bestellung wurde erstellt',
      },
      {
        status: 'shipped_to_us',
        timestamp: new Date('2024-01-02'),
        message: 'Paket wurde an uns versendet',
      },
      {
        status: 'received',
        timestamp: new Date('2024-01-04'),
        message: 'Teppich wurde von uns empfangen',
      },
      {
        status: 'in_cleaning',
        timestamp: new Date('2024-01-05'),
        message: 'Reinigung ist im Gange',
      },
      {
        status: 'completed',
        timestamp: new Date('2024-01-08'),
        message: 'Reinigung abgeschlossen',
      },
      {
        status: 'shipped_back',
        timestamp: new Date('2024-01-10'),
        message: 'Teppich wurde zurückgesendet',
      },
    ],
    images: {
      before: [],
      after: [],
    },
  },
];
