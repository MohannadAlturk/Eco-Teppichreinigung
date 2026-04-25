'use client';

import { useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';

// Lädt den Warenkorb aus localStorage nach dem ersten Client-Render.
// Verhindert SSR/Client-Hydration-Mismatch durch skipHydration im Store.
export const CartHydration = () => {
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return null;
};
