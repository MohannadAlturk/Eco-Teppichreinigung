import { create } from 'zustand';
import { User } from '@/types/user';
import { mockUser } from '@/data/mockUsers';

interface UserStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (userData: Partial<User>) => void;
  updateUser: (userData: Partial<User>) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (email, password) => {
    // Mock-Login
    set({
      user: mockUser,
      isAuthenticated: true,
    });
  },
  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
    });
  },
  register: (userData) => {
    // Mock-Registrierung
    set({
      user: { ...mockUser, ...userData } as User,
      isAuthenticated: true,
    });
  },
  updateUser: (userData) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...userData } : null,
    }));
  },
}));
