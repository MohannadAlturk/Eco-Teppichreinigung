'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useCartStore } from '@/store/cartStore';
import { useOrderStore } from '@/store/orderStore';
import { formatPrice } from '@/utils/format';
import { CreditCard, Truck } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const addOrder = useOrderStore((state) => state.addOrder);

  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    zipCode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'card'>('card');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingData({ ...shippingData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    items.forEach((item) => {
      addOrder({
        id: `ORD-${Date.now()}`,
        userId: '1',
        carpet: item.config,
        status: 'created',
        price: item.price,
        createdAt: new Date(),
        updatedAt: new Date(),
        shippingAddress: {
          street: shippingData.street,
          city: shippingData.city,
          zipCode: shippingData.zipCode,
          country: 'Deutschland',
        },
        timeline: [
          {
            status: 'created',
            timestamp: new Date(),
            message: 'Bestellung wurde erstellt',
          },
        ],
      });
    });

    clearCart();
    router.push('/success');
  };

  if (typeof window !== 'undefined' && items.length === 0) {
    router.push('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Kasse</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Address */}
              <Card>
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <Truck className="w-5 h-5 mr-2" />
                  Lieferadresse
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      name="firstName"
                      label="Vorname"
                      value={shippingData.firstName}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      name="lastName"
                      label="Nachname"
                      value={shippingData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <Input
                    name="street"
                    label="Straße und Hausnummer"
                    value={shippingData.street}
                    onChange={handleChange}
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      name="zipCode"
                      label="PLZ"
                      value={shippingData.zipCode}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      name="city"
                      label="Stadt"
                      value={shippingData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </Card>

              {/* Shipping Method */}
              <Card>
                <h2 className="text-xl font-bold mb-4">Versandart</h2>
                <div className="p-4 bg-primary-50 rounded-xl flex items-center justify-between">
                  <div className="flex items-center">
                    <Truck className="w-5 h-5 text-primary-600 mr-3" />
                    <div>
                      <p className="font-semibold">DHL Versand</p>
                      <p className="text-sm text-gray-600">2-3 Werktage</p>
                    </div>
                  </div>
                  <span className="font-semibold text-primary-600">
                    Kostenlos
                  </span>
                </div>
              </Card>

              {/* Payment Method */}
              <Card>
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Zahlungsmethode
                </h2>
                <div className="space-y-3">
                  <div
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <CreditCard className="w-5 h-5 mr-3" />
                      <span className="font-medium">Kreditkarte</span>
                    </div>
                  </div>
                  <div
                    onClick={() => setPaymentMethod('paypal')}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      paymentMethod === 'paypal'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="font-bold text-blue-600 mr-3">PP</span>
                      <span className="font-medium">PayPal</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Terms */}
              <Card>
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-1 mr-3"
                    required
                  />
                  <span className="text-sm text-gray-700">
                    Ich akzeptiere die{' '}
                    <a href="/agb" className="text-primary-600 hover:underline">
                      AGB
                    </a>{' '}
                    und{' '}
                    <a
                      href="/datenschutz"
                      className="text-primary-600 hover:underline"
                    >
                      Datenschutzerklärung
                    </a>
                  </span>
                </label>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-24">
                <h3 className="text-xl font-bold mb-4">Bestellung</h3>

                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-sm pb-3 border-b"
                    >
                      <span className="text-gray-700">
                        {item.config.type} ({item.config.length}×
                        {item.config.width}cm)
                      </span>
                      <span className="font-medium">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Zwischensumme</span>
                    <span>{formatPrice(getTotal())}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Versand</span>
                    <span className="text-primary-600 font-medium">
                      Kostenlos
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-semibold">Gesamt</span>
                    <span className="text-2xl font-bold text-primary-600">
                      {formatPrice(getTotal())}
                    </span>
                  </div>

                  <Button type="submit" className="w-full" disabled={!termsAccepted}>
                    Jetzt bezahlen
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
