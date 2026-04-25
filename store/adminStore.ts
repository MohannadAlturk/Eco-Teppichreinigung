import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminStore {
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      login: (username, password) => {
        if (username === 'admin' && password === 'admin') {
          set({ isLoggedIn: true });
          return true;
        }
        return false;
      },
      logout: () => set({ isLoggedIn: false }),
    }),
    { name: 'eco-admin-auth' }
  )
);
