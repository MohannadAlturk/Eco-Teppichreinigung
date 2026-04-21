'use client';

import { use } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useOrderStore } from '@/store/orderStore';
import { formatDate, formatPrice } from '@/utils/format';
import { ArrowLeft, CheckCircle, Circle } from 'lucide-react';

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const getOrderById = useOrderStore((state) => state.getOrderById);
  const order = getOrderById(id);

  if (!order) {
    return (
      <div className="space-y-6">
        <Card>
          <h2 className="text-2xl font-bold mb-2">Bestellung nicht gefunden</h2>
          <p className="text-gray-600 mb-4">
            Die angeforderte Bestellung existiert nicht.
          </p>
          <Link href="/dashboard/orders">
            <Button>Zurück zu Bestellungen</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const statusLabels: Record<string, string> = {
    created: 'Bestellung erstellt',
    shipped_to_us: 'An uns versendet',
    received: 'Von uns empfangen',
    in_cleaning: 'In Reinigung',
    completed: 'Reinigung abgeschlossen',
    shipped_back: 'Zurückgesendet',
  };

  const carpetTypeLabels: Record<string, string> = {
    orient: 'Orientteppich',
    wool: 'Wollteppich',
    general: 'Allgemein',
    synthetic: 'Synthetik',
  };

  const generalSubtypeLabels: Record<string, string> = {
    polypropylene: 'Polypropylen (PP)',
    polyester: 'Polyester (weich)',
    nylon: 'Nylon (Polyamid)',
    mixed: 'Mischfasern',
    shaggy: 'Shaggy (Langfaser & flauschig)',
    tufted: 'Tufted',
  };

  const allStatuses: typeof order.status[] = [
    'created',
    'shipped_to_us',
    'received',
    'in_cleaning',
    'completed',
    'shipped_back',
  ];

  const currentStatusIndex = allStatuses.indexOf(order.status);

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard/orders"
        className="flex items-center text-primary-600 hover:text-primary-700"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Zurück zu Bestellungen
      </Link>

      <Card>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">{order.id}</h2>
            <p className="text-gray-600">
              Bestellt am {formatDate(order.createdAt)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Gesamtbetrag</p>
            <p className="text-2xl font-bold text-primary-600">
              {formatPrice(order.price)}
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-8">
          <h3 className="font-semibold text-lg mb-4">Bestellstatus</h3>
          <div className="space-y-4">
            {allStatuses.map((status, index) => {
              const isCompleted = index <= currentStatusIndex;
              const timelineItem = order.timeline.find(
                (t) => t.status === status
              );

              return (
                <div key={status} className="flex items-start">
                  <div className="flex flex-col items-center mr-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isCompleted
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Circle className="w-6 h-6" />
                      )}
                    </div>
                    {index < allStatuses.length - 1 && (
                      <div
                        className={`w-0.5 h-12 ${
                          isCompleted ? 'bg-primary-600' : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <p
                      className={`font-semibold ${
                        isCompleted ? 'text-gray-900' : 'text-gray-400'
                      }`}
                    >
                      {statusLabels[status]}
                    </p>
                    {timelineItem && (
                      <p className="text-sm text-gray-600 mt-1">
                        {formatDate(timelineItem.timestamp)}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Teppich Details */}
        <div className="border-t pt-6">
          <h3 className="font-semibold text-lg mb-4">Teppich Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600">Teppichart</p>
              <p className="font-semibold">
                {carpetTypeLabels[order.carpet.type]}
                {order.carpet.type === 'general' && order.carpet.generalSubtype && (
                  <span className="text-gray-600 font-normal">
                    {' '}
                    - {generalSubtypeLabels[order.carpet.generalSubtype]}
                  </span>
                )}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600">Größe</p>
              <p className="font-semibold">
                {order.carpet.length} × {order.carpet.width} cm
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600">Fläche</p>
              <p className="font-semibold">
                {((order.carpet.length * order.carpet.width) / 10000).toFixed(2)} m²
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600">Dicke</p>
              <p className="font-semibold">{order.carpet.thickness} cm</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600 mb-1">Zustand</p>
            <p className="font-semibold">{order.carpet.condition}</p>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="border-t pt-6 mt-6">
          <h3 className="font-semibold text-lg mb-4">Lieferadresse</h3>
          <div className="p-4 bg-gray-50 rounded-xl">
            <p>{order.shippingAddress.street}</p>
            <p>
              {order.shippingAddress.zipCode} {order.shippingAddress.city}
            </p>
            <p>{order.shippingAddress.country}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
