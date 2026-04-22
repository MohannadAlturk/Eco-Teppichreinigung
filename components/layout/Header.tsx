'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
// deprecated - Login/Auth System wurde entfernt
// import { useUserStore } from '@/store/userStore';

export const Header = () => {
  const items = useCartStore((state) => state.items);
  // deprecated - Login/Auth System wurde entfernt
  // const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  const handleServiceClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const serviceSection = document.getElementById('service');
    if (serviceSection) {
      serviceSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="bg-gray-900 shadow-md sticky top-0 z-50 relative overflow-hidden">
      {/* Dezenter Shimmer-Effekt */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="shimmer-effect"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className="text-xl font-bold text-white">
              Eco Teppichreinigung
            </span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-white hover:text-primary-400 transition-colors"
            >
              Startseite
            </Link>
            <a
              href="#service"
              onClick={handleServiceClick}
              className="text-white hover:text-primary-400 transition-colors cursor-pointer"
            >
              Service
            </a>
            {/* deprecated - Login/Dashboard wurde entfernt */}
            {/* {isAuthenticated ? (
              <Link
                href="/dashboard"
                className="text-white hover:text-primary-400 transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-white hover:text-primary-400 transition-colors"
              >
                Login
              </Link>
            )} */}
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-white hover:text-primary-400 transition-colors" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>
            <Link href="/configurator">
              <Button size="md">Jetzt reinigen</Button>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .shimmer-effect {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            transparent 40%,
            rgba(255, 255, 255, 0.05) 50%,
            transparent 60%,
            transparent 100%
          );
          animation: shimmer 8s infinite linear;
          transform: rotate(30deg);
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%) rotate(30deg);
          }
          100% {
            transform: translateX(100%) rotate(30deg);
          }
        }
      `}</style>
    </header>
  );
};
