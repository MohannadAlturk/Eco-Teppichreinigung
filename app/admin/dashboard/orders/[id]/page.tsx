'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useAdminStore } from '@/store/adminStore';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { useOrderStore } from '@/store/orderStore';
import { OrderStatus } from '@/types/order';
import { formatPrice } from '@/utils/format';

const STATUS_CONFIG: Record<OrderStatus, { label: string; classes: string }> = {
  pending_admin: { label: 'Offen – wartet auf Bestätigung', classes: 'bg-amber-100 text-amber-800 border-amber-200' },
  created:       { label: 'Bestätigt',                      classes: 'bg-blue-100 text-blue-800 border-blue-200' },
  shipped_to_us: { label: 'Teppich versendet',              classes: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
  received:      { label: 'Teppich empfangen',              classes: 'bg-purple-100 text-purple-800 border-purple-200' },
  in_cleaning:   { label: 'In Reinigung',                   classes: 'bg-orange-100 text-orange-800 border-orange-200' },
  completed:     { label: 'Abgeschlossen',                  classes: 'bg-primary-100 text-primary-800 border-primary-200' },
  shipped_back:  { label: 'Zurückgesendet',                 classes: 'bg-gray-100 text-gray-700 border-gray-200' },
  rejected:      { label: 'Abgelehnt',                      classes: 'bg-red-100 text-red-800 border-red-200' },
};

const CARPET_LABELS: Record<string, string> = {
  orient: 'Orientteppich', wool: 'Wollteppich',
  general: 'Allgemeiner Teppich', synthetic: 'Synthetikteppich',
};

export default function AdminOrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { isLoggedIn } = useAdminStore();
  const { orders, updateOrderStatus } = useOrderStore();

  useEffect(() => {
    if (!isLoggedIn) router.replace('/admin');
  }, [isLoggedIn, router]);

  const order = orders.find((o) => o.id === params.id);

  if (!isLoggedIn) return null;
  if (!order) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
      Auftrag nicht gefunden.
    </div>
  );

  const cfg = STATUS_CONFIG[order.status];

  return (
    <div className="bg-gray-950 text-white">
      <AdminHeader subtitle={order.id} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back */}
        <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors">
          ← Zurück zur Übersicht
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white font-mono">{order.id}</h1>
            <p className="text-gray-400 text-sm mt-1">
              Eingegangen am {order.createdAt.toLocaleDateString('de-DE')} um {order.createdAt.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })} Uhr
            </p>
          </div>
          <span className={`inline-flex items-center self-start px-3 py-1.5 rounded-full text-sm font-medium border ${cfg.classes}`}>
            {cfg.label}
          </span>
        </div>

        {/* Action Buttons – nur für offene Anfragen */}
        {order.status === 'pending_admin' && (
          <div className="bg-amber-950/40 border border-amber-700 rounded-2xl p-6 mb-8">
            <h2 className="text-amber-400 font-semibold mb-1">Aktion erforderlich</h2>
            <p className="text-amber-200/70 text-sm mb-5">
              Bitte bestätigen oder lehnen Sie diesen Auftrag ab. Der Kunde wurde noch nicht belastet.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => updateOrderStatus(order.id, 'created')}
                className="flex-1 py-3 px-6 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-colors text-sm"
              >
                ✓ Auftrag bestätigen
              </button>
              <button
                onClick={() => updateOrderStatus(order.id, 'rejected', 'Auftrag durch Admin abgelehnt.')}
                className="flex-1 py-3 px-6 bg-red-700 hover:bg-red-600 text-white font-semibold rounded-xl transition-colors text-sm"
              >
                ✗ Auftrag ablehnen
              </button>
            </div>
          </div>
        )}

        {/* Rejected Notice */}
        {order.status === 'rejected' && (
          <div className="bg-red-950/40 border border-red-700 rounded-2xl p-5 mb-8">
            <p className="text-red-400 font-semibold mb-1">Abgelehnt</p>
            <p className="text-red-200/70 text-sm">{order.adminNote ?? 'Auftrag wurde abgelehnt.'}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Kundendaten */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-sm uppercase tracking-wide text-gray-500 font-medium mb-4">Kundendaten</h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500">Name</p>
                <p className="text-white font-medium">{order.customerName ?? '—'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">E-Mail</p>
                <p className="text-primary-400">{order.customerEmail ?? '—'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Lieferadresse</p>
                <p className="text-white">{order.shippingAddress.street}</p>
                <p className="text-white">{order.shippingAddress.zipCode} {order.shippingAddress.city}</p>
                <p className="text-gray-400">{order.shippingAddress.country}</p>
              </div>
            </div>
          </div>

          {/* Teppich-Details */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-sm uppercase tracking-wide text-gray-500 font-medium mb-4">Teppich-Details</h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500">Typ</p>
                <p className="text-white font-medium">{CARPET_LABELS[order.carpet.type]}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Maße</p>
                <p className="text-white">{order.carpet.length} × {order.carpet.width} cm, {order.carpet.thickness} cm dick</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Zustand</p>
                <p className="text-white">{order.carpet.condition}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Preis</p>
                <p className="text-2xl font-bold text-primary-400">{formatPrice(order.price)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mt-6">
          <h2 className="text-sm uppercase tracking-wide text-gray-500 font-medium mb-5">Verlauf</h2>
          <div className="space-y-4">
            {order.timeline.map((entry, i) => {
              const c = STATUS_CONFIG[entry.status];
              return (
                <div key={i} className="flex items-start gap-4">
                  <div className="mt-0.5 flex-shrink-0">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border ${c.classes}`}>
                      {c.label}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm">{entry.message}</p>
                    <p className="text-gray-500 text-xs mt-0.5">
                      {entry.timestamp.toLocaleDateString('de-DE')} {entry.timestamp.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
