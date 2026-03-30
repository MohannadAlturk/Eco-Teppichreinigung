import { create } from 'zustand';
import { Order } from '@/types/order';
import { mockOrders } from '@/data/mockOrders';

interface OrderStore {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrderById: (id: string) => Order | undefined;
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: mockOrders,
  addOrder: (order) =>
    set((state) => ({
      orders: [...state.orders, order],
    })),
  getOrderById: (id) => {
    return get().orders.find((order) => order.id === id);
  },
}));
