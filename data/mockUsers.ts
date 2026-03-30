import { User } from '@/types/user';

export const mockUsers: User[] = [
  {
    id: '1',
    firstName: 'Max',
    lastName: 'Mustermann',
    email: 'max@example.com',
    phone: '+49 123 456789',
    address: {
      street: 'Musterstraße 123',
      city: 'Berlin',
      zipCode: '10115',
      country: 'Deutschland',
    },
  },
];

export const mockUser = mockUsers[0];
