'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/utils/format';
import { Trash2, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, getTotal } = useCartStore();
  const [checkingOut, setCheckingOut] = useState(false);

  const handleCheckout = async () => {
    setCheckingOut(true);
    await new Promise((r) => setTimeout(r, 600));
    router.push('/checkout');
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

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <Card className="max-w-md w-full text-center">
          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Ihr Warenkorb ist leer</h2>
          <p className="text-gray-600 mb-6">
            Fügen Sie einen Teppich zur Reinigung hinzu
          </p>
          <Link href="/configurator">
            <Button>Teppich konfigurieren</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Warenkorb</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">
                        {carpetTypeLabels[item.config.type]}
                        {item.config.type === 'general' && item.config.generalSubtype && (
                          <span className="text-gray-600 font-normal text-base">
                            {' '}
                            - {generalSubtypeLabels[item.config.generalSubtype]}
                          </span>
                        )}
                      </h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>
                          Größe: {item.config.length} × {item.config.width} cm
                        </p>
                        <p>
                          Fläche:{' '}
                          {(
                            (item.config.length * item.config.width) /
                            10000
                          ).toFixed(2)}{' '}
                          m²
                        </p>
                        <p>Dicke: {item.config.thickness} cm</p>
                        <p>Zustand: {item.config.condition}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary-600 mb-2">
                        {formatPrice(item.price)}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div>
            <Card className="sticky top-24">
              <h3 className="text-xl font-bold mb-4">Zusammenfassung</h3>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Zwischensumme</span>
                  <span>{formatPrice(getTotal())}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Versand</span>
                  <span className="text-primary-600 font-medium">Kostenlos</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-semibold">Gesamt</span>
                  <span className="text-2xl font-bold text-primary-600">
                    {formatPrice(getTotal())}
                  </span>
                </div>

                <Button
                  className="w-full"
                  onClick={handleCheckout}
                  disabled={checkingOut}
                >
                  {checkingOut ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                      Wird geladen…
                    </span>
                  ) : (
                    'Zur Kasse'
                  )}
                </Button>
              </div>

              <Link href="/configurator">
                <Button variant="outline" className="w-full mt-3">
                  Weiteren Teppich hinzufügen
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
