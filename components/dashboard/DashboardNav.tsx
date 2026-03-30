'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Package, User, Settings } from 'lucide-react';

export const DashboardNav = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Übersicht', icon: Package },
    { href: '/dashboard/orders', label: 'Bestellungen', icon: Package },
    { href: '/dashboard/profile', label: 'Profil', icon: User },
    { href: '/dashboard/settings', label: 'Einstellungen', icon: Settings },
  ];

  return (
    <nav className="bg-white rounded-2xl shadow-lg p-4">
      <ul className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
