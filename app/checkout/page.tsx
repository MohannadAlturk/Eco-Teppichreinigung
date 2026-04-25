'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useCartStore } from '@/store/cartStore';
import { useOrderStore } from '@/store/orderStore';
import { formatPrice } from '@/utils/format';
import { CreditCard, Truck, AlertTriangle } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const addOrder = useOrderStore((state) => state.addOrder);

  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    zipCode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<
    'card' | 'paypal' | 'klarna' | 'sofort' | 'giropay' | 'sepa'
  >('card');
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
        customerName: `${shippingData.firstName} ${shippingData.lastName}`,
        customerEmail: shippingData.email,
        carpet: item.config,
        status: 'pending_admin',
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
            status: 'pending_admin',
            timestamp: new Date(),
            message: 'Anfrage eingegangen – wartet auf Bestätigung',
          },
        ],
      });
    });

    clearCart();
    router.push('/success');
  };

  useEffect(() => {
    if (items.length === 0) router.push('/cart');
  }, [items.length, router]);

  return (
    <motion.div
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
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
                    type="email"
                    name="email"
                    label="E-Mail-Adresse"
                    value={shippingData.email}
                    onChange={handleChange}
                    placeholder="ihre.email@beispiel.de"
                    required
                  />
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Kreditkarte */}
                  <div
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <CreditCard className="w-5 h-5 mr-3 text-gray-700" />
                      <span className="font-medium">Kreditkarte</span>
                    </div>
                  </div>

                  {/* PayPal */}
                  <div
                    onClick={() => setPaymentMethod('paypal')}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      paymentMethod === 'paypal'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="#003087">
                        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .76-.653h8.53c2.844 0 4.807.588 5.834 1.748.825.933 1.14 2.062 1.014 3.648-.13 1.653-.694 3.028-1.677 4.087-1.02 1.098-2.474 1.65-4.32 1.65h-2.14a.77.77 0 0 0-.76.653l-.437 2.769-.021.13a.328.328 0 0 1-.324.28H7.076z"/>
                      </svg>
                      <span className="font-medium">PayPal</span>
                    </div>
                  </div>

                  {/* Klarna */}
                  <div
                    onClick={() => setPaymentMethod('klarna')}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      paymentMethod === 'klarna'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="#FFB3C7">
                        <path d="M4.592 2.004h3.877v10.945c1.406-1.666 3.002-3.505 4.55-5.273.88-1.005 1.746-1.996 2.603-2.977h4.714c-2.728 3.198-5.466 6.407-8.21 9.622 2.967 4.32 5.947 8.655 8.938 13.002h-4.834c-2.05-3.035-4.11-6.08-6.178-9.136-.528.592-1.055 1.185-1.583 1.777v7.36H4.592V2.003z"/>
                      </svg>
                      <div>
                        <span className="font-medium block">Klarna</span>
                        <span className="text-xs text-gray-500">Rechnung / Ratenkauf</span>
                      </div>
                    </div>
                  </div>

                  {/* Sofortüberweisung */}
                  <div
                    onClick={() => setPaymentMethod('sofort')}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      paymentMethod === 'sofort'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="#F06C66">
                        <rect width="24" height="24" rx="4"/>
                        <path d="M7 12h10M12 7v10" stroke="white" strokeWidth="2"/>
                      </svg>
                      <span className="font-medium">Sofortüberweisung</span>
                    </div>
                  </div>

                  {/* Giropay */}
                  <div
                    onClick={() => setPaymentMethod('giropay')}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      paymentMethod === 'giropay'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="#003B7E">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M8 12l3 3 5-6" stroke="white" strokeWidth="2" fill="none"/>
                      </svg>
                      <span className="font-medium">Giropay</span>
                    </div>
                  </div>

                  {/* SEPA Lastschrift */}
                  <div
                    onClick={() => setPaymentMethod('sepa')}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      paymentMethod === 'sepa'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="#003087">
                        <path d="M3 6h18v2H3V6zm0 4h18v2H3v-2zm0 4h18v2H3v-2zm0 4h12v2H3v-2z"/>
                      </svg>
                      <span className="font-medium">SEPA Lastschrift</span>
                    </div>
                  </div>
                </div>

                {/* Zusätzliche Infos je nach Zahlungsmethode */}
                {paymentMethod === 'klarna' && (
                  <div className="mt-4 p-3 bg-pink-50 border border-pink-200 rounded-lg">
                    <p className="text-sm text-pink-800">
                      Mit Klarna können Sie bequem auf Rechnung zahlen oder in Raten bezahlen.
                    </p>
                  </div>
                )}
                {paymentMethod === 'sepa' && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      Der Betrag wird nach Bestätigung von Ihrem Konto abgebucht.
                    </p>
                  </div>
                )}
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

                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4 text-sm text-amber-800">
                    <div className="flex items-center gap-2 font-semibold mb-1">
                      <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                      Verbindliche Anfrage
                    </div>
                    <p>Mit dem Absenden erklären Sie sich verbindlich bereit, den Auftrag zu erteilen. <strong>Die Bestellung gilt erst als abgeschlossen, sobald wir Ihren Auftrag bestätigen</strong> – erst dann wird die Zahlung fällig. Lehnen wir ab, entstehen Ihnen keine Kosten.</p>
                  </div>
                  <Button type="submit" className="w-full" disabled={!termsAccepted}>
                    Auftrag verbindlich absenden
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
