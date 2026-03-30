'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useUserStore } from '@/store/userStore';

export default function RegisterPage() {
  const router = useRouter();
  const register = useUserStore((state) => state.register);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    street: '',
    city: '',
    zipCode: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: {
        street: formData.street,
        city: formData.city,
        zipCode: formData.zipCode,
        country: 'Deutschland',
      },
    });
    router.push('/dashboard');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Konto erstellen</h2>
          <p className="mt-2 text-gray-600">
            Registrieren Sie sich für ein neues Konto
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                name="firstName"
                label="Vorname"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <Input
                name="lastName"
                label="Nachname"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <Input
              name="email"
              type="email"
              label="E-Mail"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Input
              name="password"
              type="password"
              label="Passwort"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <Input
              name="phone"
              type="tel"
              label="Telefon"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <Input
              name="street"
              label="Straße und Hausnummer"
              value={formData.street}
              onChange={handleChange}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                name="zipCode"
                label="PLZ"
                value={formData.zipCode}
                onChange={handleChange}
                required
              />
              <Input
                name="city"
                label="Stadt"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Konto erstellen
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Bereits ein Konto?{' '}
              <Link
                href="/login"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Jetzt anmelden
              </Link>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
