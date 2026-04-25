'use client';

import { useRouter } from 'next/navigation';
import { useAdminStore } from '@/store/adminStore';

interface AdminHeaderProps {
  subtitle?: string;
}

export const AdminHeader = ({ subtitle }: AdminHeaderProps) => {
  const router = useRouter();
  const { logout } = useAdminStore();

  return (
    <header className="bg-gray-900 border-b border-gray-800 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-3 min-w-0">
        <span className="font-semibold text-white text-base">Admin-Dashboard</span>
        {subtitle && (
          <span className="hidden sm:inline text-gray-500 text-sm font-mono">{subtitle}</span>
        )}
      </div>

      <button
        onClick={() => { logout(); router.push('/admin'); }}
        className="text-sm text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-800 flex-shrink-0"
      >
        Abmelden
      </button>
    </header>
  );
};
