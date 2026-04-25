'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

export const ConditionalLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  // Setzt den Body/HTML-Hintergrund dunkel für Admin-Seiten,
  // damit beim Overscroll auf Mobil kein weißer Bereich sichtbar ist.
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

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
};
