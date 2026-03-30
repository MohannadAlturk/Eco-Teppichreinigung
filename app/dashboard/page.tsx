'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useOrderStore } from '@/store/orderStore';
import { formatDate, formatPrice } from '@/utils/format';
import { Package, Clock, CheckCircle } from 'lucide-react';

export default function DashboardPage() {
  const orders = useOrderStore((state) => state.orders);

  const statusLabels: Record<string, string> = {
    created: 'Erstellt',
    shipped_to_us: 'Versendet',
    received: 'Empfangen',
    in_cleaning: 'In Reinigung',
    completed: 'Abgeschlossen',
    shipped_back: 'Zurückgesendet',
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'shipped_back':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in_cleaning':
        return <Clock className="w-5 h-5 text-blue-600" />;
      default:
        return <Package className="w-5 h-5 text-orange-600" />;
    }
  };

  const recentOrders = orders.slice(0, 3);

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-2xl font-bold mb-4">Willkommen zurück!</h2>
        <p className="text-gray-600">
          Hier ist eine Übersicht Ihrer aktuellen Bestellungen.
        </p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Aktive Bestellungen</p>
              <p className="text-3xl font-bold mt-1">
                {orders.filter((o) => o.status !== 'shipped_back').length}
              </p>
            </div>
            <Package className="w-12 h-12 text-primary-600" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Reinigung</p>
              <p className="text-3xl font-bold mt-1">
                {orders.filter((o) => o.status === 'in_cleaning').length}
              </p>
            </div>
            <Clock className="w-12 h-12 text-blue-600" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Abgeschlossen</p>
              <p className="text-3xl font-bold mt-1">
                {orders.filter((o) => o.status === 'shipped_back').length}
              </p>
            </div>
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Letzte Bestellungen</h3>
          <Link href="/dashboard/orders">
            <Button variant="outline" size="sm">
              Alle anzeigen
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          {recentOrders.map((order) => (
            <Link key={order.id} href={`/dashboard/orders/${order.id}`}>
              <div className="p-4 border-2 border-gray-200 rounded-xl hover:border-primary-300 transition-all cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(order.status)}
                    <div>
                      <p className="font-semibold">{order.id}</p>
                      <p className="text-sm text-gray-600">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatPrice(order.price)}</p>
                    <p className="text-sm text-gray-600">
                      {statusLabels[order.status]}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
