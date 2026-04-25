'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { LoadingScreen } from '@/components/LoadingScreen';
import { useCartStore } from '@/store/cartStore';

export const ConditionalLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  const [cartReady, setCartReady] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isAdmin) {
      root.style.backgroundColor = '#030712';
      document.body.style.backgroundColor = '#030712';
    } else {
      root.style.backgroundColor = '';
      document.body.style.backgroundColor = '';
    }
  }, [isAdmin]);

  useEffect(() => {
    if (isAdmin) {
      setCartReady(true);
      return;
    }
    // Warenkorb aus localStorage laden und Loading-Screen danach ausblenden
    const unsubscribe = useCartStore.persist.onFinishHydration(() => {
      setCartReady(true);
    });
    useCartStore.persist.rehydrate();
    return () => unsubscribe();
  }, [isAdmin]);

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <LoadingScreen visible={!cartReady} />
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
};
