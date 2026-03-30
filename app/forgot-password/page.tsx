'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <Link
          href="/login"
          className="flex items-center text-primary-600 hover:text-primary-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Zurück zum Login
        </Link>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Passwort vergessen?
          </h2>
          <p className="mt-2 text-gray-600">
            Geben Sie Ihre E-Mail-Adresse ein und wir senden Ihnen einen
            Reset-Link
          </p>
        </div>

        <Card>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                type="email"
                label="E-Mail"
                placeholder="ihre@email.de"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Button type="submit" className="w-full">
                Reset-Link senden
              </Button>
            </form>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                E-Mail wurde gesendet!
              </h3>
              <p className="text-gray-600">
                Bitte überprüfen Sie Ihr Postfach für weitere Anweisungen.
              </p>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
