'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CheckCircle } from 'lucide-react';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <Card className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12 text-primary-600" />
          </motion.div>

          <h1 className="text-3xl font-bold mb-3">Bestellung erfolgreich!</h1>
          <p className="text-gray-600 mb-8">
            Vielen Dank für Ihre Bestellung. Wir senden Ihnen in Kürze ein
            Versandlabel per E-Mail zu.
          </p>

          <div className="space-y-3">
            <Link href="/dashboard">
              <Button className="w-full">Zum Dashboard</Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full">
                Zurück zur Startseite
              </Button>
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
