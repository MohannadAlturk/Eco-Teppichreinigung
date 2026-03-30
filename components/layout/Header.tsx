'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ShoppingCart, User } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useUserStore } from '@/store/userStore';

export const Header = () => {
  const items = useCartStore((state) => state.items);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              Eco Teppichreinigung
            </span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Startseite
            </Link>
            <Link
              href="/#service"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Service
            </Link>
            {isAuthenticated ? (
              <Link
                href="/dashboard"
                className="text-gray-700 hover:text-primary-600 transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-gray-700 hover:text-primary-600 transition-colors"
              >
                Login
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-primary-600 transition-colors" />
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
    </header>
  );
};
