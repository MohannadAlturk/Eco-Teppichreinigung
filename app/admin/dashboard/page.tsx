'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAdminStore } from '@/store/adminStore';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { useOrderStore } from '@/store/orderStore';
import { Order, OrderStatus } from '@/types/order';
import { formatPrice } from '@/utils/format';

const STATUS_CONFIG: Record<OrderStatus, { label: string; classes: string }> = {
  pending_admin: { label: 'Offen',          classes: 'bg-amber-100 text-amber-800 border-amber-200' },
  created:       { label: 'Bestätigt',      classes: 'bg-blue-100 text-blue-800 border-blue-200' },
  shipped_to_us: { label: 'Versendet',      classes: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
  received:      { label: 'Empfangen',      classes: 'bg-purple-100 text-purple-800 border-purple-200' },
  in_cleaning:   { label: 'In Reinigung',   classes: 'bg-orange-100 text-orange-800 border-orange-200' },
  completed:     { label: 'Abgeschlossen',  classes: 'bg-primary-100 text-primary-800 border-primary-200' },
  shipped_back:  { label: 'Zurückgesendet', classes: 'bg-gray-100 text-gray-700 border-gray-200' },
  rejected:      { label: 'Abgelehnt',      classes: 'bg-red-100 text-red-800 border-red-200' },
};

const CARPET_LABELS: Record<string, string> = {
  orient: 'Orientteppich', wool: 'Wollteppich',
  general: 'Allgemein', synthetic: 'Synthetik',
};

type FilterTab = 'all' | 'pending_admin' | 'created' | 'rejected';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { isLoggedIn } = useAdminStore();
  const { orders, updateOrderStatus } = useOrderStore();
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn) router.replace('/admin');
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  const pending   = orders.filter((o) => o.status === 'pending_admin');
  const confirmed = orders.filter((o) => o.status !== 'pending_admin' && o.status !== 'rejected');
  const rejected  = orders.filter((o) => o.status === 'rejected');

  const filtered: Order[] =
    activeTab === 'all'           ? [...orders].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()) :
    activeTab === 'pending_admin' ? pending :
    activeTab === 'created'       ? confirmed :
    rejected;

  const handleConfirm = (id: string) => { updateOrderStatus(id, 'created'); setConfirmingId(null); };
  const handleReject  = (id: string) => { updateOrderStatus(id, 'rejected', 'Auftrag durch Admin abgelehnt.'); setConfirmingId(null); };

  const tabs: { key: FilterTab; label: string; count: number }[] = [
    { key: 'all',           label: 'Alle',           count: orders.length },
    { key: 'pending_admin', label: 'Offen',           count: pending.length },
    { key: 'created',       label: 'In Bearbeitung',  count: confirmed.length },
    { key: 'rejected',      label: 'Abgelehnt',       count: rejected.length },
  ];

  return (
    <div className="bg-gray-950 text-white">
      <AdminHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {[
            { label: 'Offene Anfragen', value: pending.length,   color: 'text-amber-400', urgent: pending.length > 0 },
            { label: 'In Bearbeitung',  value: confirmed.length, color: 'text-blue-400',  urgent: false },
            { label: 'Abgelehnt',       value: rejected.length,  color: 'text-red-400',   urgent: false },
            { label: 'Gesamt',          value: orders.length,    color: 'text-gray-300',  urgent: false },
          ].map((stat) => (
            <div key={stat.label} className={`bg-gray-900 rounded-xl border p-4 sm:p-5 ${stat.urgent ? 'border-amber-700' : 'border-gray-800'}`}>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1 leading-tight">{stat.label}</p>
              <p className={`text-2xl sm:text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              {stat.urgent && stat.value > 0 && (
                <p className="text-xs text-amber-500 mt-1 leading-tight">Bestätigung nötig</p>
              )}
            </div>
          ))}
        </div>

        {/* ── Filter Tabs ── */}
        <div className="flex gap-0 mb-6 border-b border-gray-800 overflow-x-auto overflow-y-hidden scrollbar-none"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-colors -mb-px whitespace-nowrap ${
                activeTab === tab.key
                  ? 'border-primary-500 text-primary-400'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              {tab.label}
              <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                activeTab === tab.key ? 'bg-primary-900 text-primary-300' : 'bg-gray-800 text-gray-500'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* ── Leerer Zustand ── */}
        {filtered.length === 0 && (
          <div className="bg-gray-900 rounded-2xl border border-gray-800 text-center py-16 text-gray-500">
            Keine Aufträge in dieser Kategorie.
          </div>
        )}

        {/* ── Desktop Tabelle (md+) ── */}
        {filtered.length > 0 && (
          <div className="hidden md:block bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-400 text-xs uppercase tracking-wide">
                    <th className="text-left px-6 py-4">Auftrag</th>
                    <th className="text-left px-6 py-4">Kunde</th>
                    <th className="text-left px-6 py-4">Teppich</th>
                    <th className="text-left px-6 py-4">Preis</th>
                    <th className="text-left px-6 py-4">Eingegangen</th>
                    <th className="text-left px-6 py-4">Status</th>
                    <th className="text-left px-6 py-4">Aktionen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {filtered.map((order) => {
                    const cfg = STATUS_CONFIG[order.status];
                    return (
                      <tr key={order.id} className="hover:bg-gray-800/50 transition-colors">
                        <td className="px-6 py-4">
                          <Link href={`/admin/dashboard/orders/${order.id}`} className="font-mono text-primary-400 hover:text-primary-300 font-medium">
                            {order.id}
                          </Link>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-white">{order.customerName ?? '—'}</div>
                          <div className="text-gray-500 text-xs">{order.customerEmail ?? '—'}</div>
                        </td>
                        <td className="px-6 py-4 text-gray-300">
                          {CARPET_LABELS[order.carpet.type]}
                          <br />
                          <span className="text-gray-500 text-xs">{order.carpet.length}×{order.carpet.width} cm</span>
                        </td>
                        <td className="px-6 py-4 font-semibold text-white">{formatPrice(order.price)}</td>
                        <td className="px-6 py-4 text-gray-400 text-xs whitespace-nowrap">
                          {order.createdAt.toLocaleDateString('de-DE')}<br />
                          {order.createdAt.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${cfg.classes}`}>
                            {cfg.label}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {order.status === 'pending_admin' ? (
                            confirmingId === order.id ? (
                              <div className="flex items-center gap-2 flex-wrap">
                                <button onClick={() => handleConfirm(order.id)} className="px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white text-xs rounded-lg font-medium transition-colors">✓ Bestätigen</button>
                                <button onClick={() => handleReject(order.id)}  className="px-3 py-1.5 bg-red-700 hover:bg-red-600 text-white text-xs rounded-lg font-medium transition-colors">✗ Ablehnen</button>
                                <button onClick={() => setConfirmingId(null)}   className="text-gray-500 hover:text-gray-300 text-xs">Abbrechen</button>
                              </div>
                            ) : (
                              <button onClick={() => setConfirmingId(order.id)} className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs rounded-lg font-medium transition-colors">
                                Entscheiden
                              </button>
                            )
                          ) : (
                            <Link href={`/admin/dashboard/orders/${order.id}`} className="text-gray-400 hover:text-white text-xs underline underline-offset-2">
                              Details
                            </Link>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Mobile Karten (< md) ── */}
        {filtered.length > 0 && (
          <div className="md:hidden space-y-3">
            {filtered.map((order) => {
              const cfg = STATUS_CONFIG[order.status];
              return (
                <div key={order.id} className="bg-gray-900 rounded-2xl border border-gray-800 p-4">
                  {/* Kopfzeile */}
                  <div className="flex items-center justify-between mb-3">
                    <Link href={`/admin/dashboard/orders/${order.id}`} className="font-mono text-primary-400 font-semibold text-sm">
                      {order.id}
                    </Link>
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${cfg.classes}`}>
                      {cfg.label}
                    </span>
                  </div>

                  {/* Kunde */}
                  <div className="mb-3">
                    <p className="text-white font-medium text-sm">{order.customerName ?? '—'}</p>
                    <p className="text-gray-500 text-xs">{order.customerEmail ?? '—'}</p>
                  </div>

                  {/* Details */}
                  <div className="flex items-center justify-between text-sm mb-4">
                    <div>
                      <p className="text-gray-300">{CARPET_LABELS[order.carpet.type]}</p>
                      <p className="text-gray-500 text-xs">{order.carpet.length}×{order.carpet.width} cm</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">{formatPrice(order.price)}</p>
                      <p className="text-gray-500 text-xs">{order.createdAt.toLocaleDateString('de-DE')}</p>
                    </div>
                  </div>

                  {/* Aktionen */}
                  {order.status === 'pending_admin' ? (
                    confirmingId === order.id ? (
                      <div className="grid grid-cols-2 gap-2">
                        <button onClick={() => handleConfirm(order.id)} className="py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm rounded-xl font-medium transition-colors">
                          ✓ Bestätigen
                        </button>
                        <button onClick={() => handleReject(order.id)} className="py-2.5 bg-red-700 hover:bg-red-600 text-white text-sm rounded-xl font-medium transition-colors">
                          ✗ Ablehnen
                        </button>
                        <button onClick={() => setConfirmingId(null)} className="col-span-2 py-2 text-gray-500 hover:text-gray-300 text-xs transition-colors">
                          Abbrechen
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => setConfirmingId(order.id)} className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-sm rounded-xl font-medium transition-colors">
                        Entscheiden
                      </button>
                    )
                  ) : (
                    <Link href={`/admin/dashboard/orders/${order.id}`} className="block w-full py-2.5 text-center text-gray-400 hover:text-white text-sm border border-gray-700 hover:border-gray-600 rounded-xl transition-colors">
                      Details ansehen →
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
