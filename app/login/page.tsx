/**
 * @deprecated Login-System wurde entfernt - keine Authentifizierung mehr erforderlich
 * Diese Seite wird nicht mehr verwendet und sollte aus der Navigation entfernt werden.
 * Kunden können direkt ohne Login bestellen und werden über E-Mail identifiziert.
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useUserStore } from '@/store/userStore'; // deprecated

export default function LoginPage() {
  const router = useRouter();
  const login = useUserStore((state) => state.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
    router.push('/dashboard');
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
          <h2 className="text-3xl font-bold text-gray-900">Willkommen zurück</h2>
          <p className="mt-2 text-gray-600">
            Melden Sie sich in Ihrem Konto an
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="email"
              label="E-Mail"
              placeholder="ihre@email.de"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              type="password"
              label="Passwort"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center justify-between">
              <Link
                href="/forgot-password"
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                Passwort vergessen?
              </Link>
            </div>

            <Button type="submit" className="w-full">
              Anmelden
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Noch kein Konto?{' '}
              <Link
                href="/register"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Jetzt registrieren
              </Link>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
