import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '@/types/carpet';

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => ({ items: [...state.items, item] })),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
      clearCart: () => set({ items: [] }),
      getTotal: () =>
        get().items.reduce((total, item) => total + item.price, 0),
    }),
    {
      name: 'eco-cart',
      skipHydration: true, // Verhindert SSR/Client-Mismatch
    }
  )
);
