'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useOrderStore } from '@/store/orderStore';
import { formatDate, formatPrice } from '@/utils/format';
import { ChevronRight } from 'lucide-react';

export default function OrdersPage() {
  const orders = useOrderStore((state) => state.orders);

  const statusLabels: Record<string, string> = {
    created: 'Erstellt',
    shipped_to_us: 'Versendet',
    received: 'Empfangen',
    in_cleaning: 'In Reinigung',
    completed: 'Abgeschlossen',
    shipped_back: 'Zurückgesendet',
  };

  const statusColors: Record<string, string> = {
    created: 'bg-gray-100 text-gray-800',
    shipped_to_us: 'bg-blue-100 text-blue-800',
    received: 'bg-purple-100 text-purple-800',
    in_cleaning: 'bg-orange-100 text-orange-800',
    completed: 'bg-green-100 text-green-800',
    shipped_back: 'bg-green-100 text-green-800',
  };

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-2xl font-bold mb-2">Alle Bestellungen</h2>
        <p className="text-gray-600">
          Hier finden Sie eine Übersicht all Ihrer Bestellungen
        </p>
      </Card>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-semibold text-lg">{order.id}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      statusColors[order.status]
                    }`}
                  >
                    {statusLabels[order.status]}
                  </span>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>Datum: {formatDate(order.createdAt)}</p>
                  <p>
                    Teppich: {order.carpet.type} ({order.carpet.length}×
                    {order.carpet.width}cm)
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-xl font-bold text-primary-600">
                    {formatPrice(order.price)}
                  </p>
                </div>
                <Link href={`/dashboard/orders/${order.id}`}>
                  <Button variant="outline">
                    Details
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
