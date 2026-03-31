'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Leaf, Truck, Award, Package, Droplet, CheckCircle } from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: Leaf,
      title: 'Umweltfreundlich',
      description: 'Wir verwenden nur biologisch abbaubare Reinigungsmittel',
    },
    {
      icon: Truck,
      title: 'Kostenloser Versand',
      description: 'Hin- und Rückversand komplett kostenlos',
    },
    {
      icon: Award,
      title: 'Qualitätsgarantie',
      description: '100% Zufriedenheitsgarantie oder Geld zurück',
    },
  ];

  const process = [
    {
      step: 1,
      icon: Package,
      title: 'Konfigurieren',
      description: 'Beschreiben Sie Ihren Teppich und erhalten Sie ein Angebot',
    },
    {
      step: 2,
      icon: Truck,
      title: 'Versenden',
      description: 'Wir senden Ihnen ein kostenloses Versandlabel',
    },
    {
      step: 3,
      icon: Droplet,
      title: 'Reinigen',
      description: 'Professionelle Reinigung mit eco-freundlichen Mitteln',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 px-2">
              Teppich<wbr />reinigung
              <span className="text-primary-600"> neu gedacht</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Professionelle, umweltfreundliche Teppichreinigung mit kostenlosem
              Versand. Einfach, schnell und nachhaltig.
            </p>
            <Link href="/configurator">
              <Button size="lg">Teppich reinigen lassen</Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20" id="service">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Unsere Vorteile
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center">
                      <feature.icon className="w-8 h-8 text-primary-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50" id="process">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            So einfach geht's
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {process.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="text-center h-full">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex justify-center mb-4 mt-8">
                    <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center">
                      <item.icon className="w-8 h-8 text-primary-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Bereit für einen sauberen Teppich?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Starten Sie jetzt und erhalten Sie Ihr individuelles Angebot in
            wenigen Minuten.
          </p>
          <Link href="/configurator">
            <Button size="lg">Jetzt starten</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
