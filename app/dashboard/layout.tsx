/**
 * @deprecated Dashboard-Layout wurde entfernt - keine Benutzer-Authentifizierung mehr erforderlich
 */

'use client';

import { DashboardNav } from '@/components/dashboard/DashboardNav'; // deprecated

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <DashboardNav />
          </div>
          <div className="lg:col-span-3">{children}</div>
        </div>
      </div>
    </div>
  );
}
