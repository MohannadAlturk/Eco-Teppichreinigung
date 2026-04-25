import { create } from 'zustand';
import { Order, OrderStatus } from '@/types/order';
import { mockOrders } from '@/data/mockOrders';

interface OrderStore {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrderById: (id: string) => Order | undefined;
  updateOrderStatus: (id: string, status: OrderStatus, adminNote?: string) => void;
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: mockOrders,
  addOrder: (order) =>
    set((state) => ({ orders: [...state.orders, order] })),
  getOrderById: (id) =>
    get().orders.find((order) => order.id === id),
  updateOrderStatus: (id, status, adminNote) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id
          ? {
              ...order,
              status,
              updatedAt: new Date(),
              adminNote: adminNote ?? order.adminNote,
              timeline: [
                ...order.timeline,
                {
                  status,
                  timestamp: new Date(),
                  message:
                    status === 'created'
                      ? 'Auftrag vom Admin bestätigt'
                      : status === 'rejected'
                      ? 'Auftrag vom Admin abgelehnt'
                      : `Status geändert zu: ${status}`,
                },
              ],
            }
          : order
      ),
    })),
}));
