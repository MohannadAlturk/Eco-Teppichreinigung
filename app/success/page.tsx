'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Clock, Mail, CheckCircle } from 'lucide-react';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full"
      >
        <Card className="text-center">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Clock className="w-10 h-10 text-amber-600" />
          </motion.div>

          <h1 className="text-2xl font-bold mb-2 text-gray-900">Anfrage erfolgreich übermittelt!</h1>
          <p className="text-gray-500 text-sm mb-6">
            Vielen Dank für Ihre Anfrage. Wir prüfen Ihren Auftrag und melden uns schnellstmöglich bei Ihnen.
          </p>

          {/* Info Boxes */}
          <div className="space-y-3 mb-8 text-left">
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4">
              <Mail className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-blue-800">Sie werden per E-Mail informiert</p>
                <p className="text-xs text-blue-600 mt-0.5">
                  Sobald wir Ihren Auftrag bestätigen oder ablehnen, erhalten Sie eine E-Mail mit allen weiteren Informationen.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-primary-50 border border-primary-100 rounded-xl p-4">
              <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-primary-800">Keine Kosten bis zur Bestätigung</p>
                <p className="text-xs text-primary-600 mt-0.5">
                  Ihre Zahlungsinformationen werden erst nach unserer ausdrücklichen Bestätigung verarbeitet. Bei Ablehnung entstehen Ihnen keinerlei Kosten.
                </p>
              </div>
            </div>
          </div>

          <Link href="/">
            <Button variant="outline" className="w-full">
              Zurück zur Startseite
            </Button>
          </Link>
        </Card>
      </motion.div>
    </div>
  );
}
