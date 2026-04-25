'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { CarpetConfig, CarpetType, GeneralCarpetSubtype } from '@/types/carpet';
import { Select } from '@/components/ui/Select';
import { calculatePrice } from '@/utils/priceCalculator';
import { formatPrice } from '@/utils/format';
import { useCartStore } from '@/store/cartStore';
import { ChevronLeft, ChevronRight, Upload } from 'lucide-react';
import { CarpetDimensionsDisplay } from '@/components/configurator/CarpetDimensionsDisplay';
import { CarpetRoomPreview } from '@/components/configurator/CarpetRoomPreview';

export default function ConfiguratorPage() {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const [currentStep, setCurrentStep] = useState(1);
  const [config, setConfig] = useState<Partial<CarpetConfig>>({
    type: undefined,
    length: 0,
    width: 0,
    thickness: 0,
    condition: '',
    images: [],
  });

  const totalSteps = 6;

  const carpetTypes: { value: CarpetType; label: string; description: string; image: string }[] = [
    {
      value: 'orient',
      label: 'Orientteppich',
      description: 'Handgeknüpfte traditionelle Teppiche',
      image: '/images/carpets/orient.png',
    },
    {
      value: 'wool',
      label: 'Wollteppich',
      description: 'Teppiche aus natürlicher Wolle',
      image: '/images/carpets/wool.png',
    },
    {
      value: 'general',
      label: 'Allgemein',
      description: '',
      image: '/images/carpets/general.png',
    },
    {
      value: 'synthetic',
      label: 'Synthetik',
      description: 'Maschinell hergestellte Teppiche',
      image: '/images/carpets/synthetic.png',
    },
  ];

  const generalSubtypes: { value: GeneralCarpetSubtype; label: string }[] = [
    { value: 'polypropylene', label: 'Polypropylen (PP)' },
    { value: 'polyester', label: 'Polyester (weich)' },
    { value: 'nylon', label: 'Nylon (Polyamid)' },
    { value: 'mixed', label: 'Mischfasern' },
    { value: 'shaggy', label: 'Shaggy (Langfaser & flauschig)' },
    { value: 'tufted', label: 'Tufted' },
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAddToCart = () => {
    if (config.type && config.length && config.width && config.thickness) {
      const price = calculatePrice(config as CarpetConfig);
      addItem({
        id: Date.now().toString(),
        config: config as CarpetConfig,
        price,
      });
      router.push('/cart');
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        // Wenn 'general' ausgewählt ist, muss auch ein Subtyp gewählt sein
        if (config.type === 'general') {
          return config.generalSubtype !== undefined;
        }
        return config.type !== undefined;
      case 2:
        return config.length && config.width && config.length > 0 && config.width > 0;
      case 3:
        return config.thickness && config.thickness > 0;
      case 4:
        return config.condition && config.condition.trim() !== '';
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-2">Teppichart auswählen</h2>
            <p className="text-gray-600 mb-6">
              Wählen Sie die Art Ihres Teppichs
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {carpetTypes.map((type) => (
                <motion.div
                  key={type.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    // Wenn ein anderer Typ ausgewählt wird, generalSubtype zurücksetzen
                    if (type.value !== 'general') {
                      setConfig({ ...config, type: type.value, generalSubtype: undefined });
                    } else {
                      setConfig({ ...config, type: type.value });
                    }
                  }}
                  className={`relative p-6 border-2 rounded-2xl cursor-pointer transition-all overflow-hidden ${
                    config.type === type.value
                      ? 'border-primary-600 ring-4 ring-primary-100'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                  style={{
                    minHeight: '180px',
                  }}
                >
                  {/* Hintergrundbild mit Fade-Effekt */}
                  <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{
                      backgroundImage: `url(${type.image})`,
                      maskImage: 'radial-gradient(circle at center, black 30%, transparent 100%)',
                      WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 100%)',
                    }}
                  />

                  {/* Dunkles Overlay für bessere Lesbarkeit */}
                  <div className="absolute inset-0 bg-black/40 z-10" />

                  {/* Inhalt */}
                  <div className="relative z-20">
                    <h3 className="font-bold text-xl mb-2 text-white drop-shadow-lg">
                      {type.label}
                    </h3>
                    <p className="text-sm text-white drop-shadow-md font-medium">
                      {type.description}
                    </p>
                  </div>

                  {/* Ausgewählt-Indikator */}
                  {config.type === type.value && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-4 right-4 z-20 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center"
                    >
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Zusatzfeld für Allgemein-Auswahl */}
            {config.type === 'general' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6"
              >
                <Select
                  label="Welche Art von Teppich haben Sie?"
                  options={[
                    { value: '', label: 'Bitte auswählen...' },
                    ...generalSubtypes,
                  ]}
                  value={config.generalSubtype || ''}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      generalSubtype: e.target.value as GeneralCarpetSubtype,
                    })
                  }
                  required
                />
              </motion.div>
            )}
          </div>
        );

      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-2">Größe angeben</h2>
            <p className="text-gray-600 mb-6">
              Geben Sie die Maße Ihres Teppichs in cm an
            </p>
            <div className="space-y-4">
              <div>
                <Input
                  type="number"
                  label="Länge (cm)"
                  value={config.length || ''}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    // Begrenze den Wert zwischen 1 und 400
                    if (value <= 400 || e.target.value === '') {
                      setConfig({ ...config, length: value });
                    }
                  }}
                  onBlur={(e) => {
                    const value = Number(e.target.value);
                    // Bei Verlassen des Feldes: Korrigiere ungültige Werte
                    if (value < 1 || isNaN(value)) {
                      setConfig({ ...config, length: 1 });
                    } else if (value > 400) {
                      setConfig({ ...config, length: 400 });
                    }
                  }}
                  min="1"
                  max="400"
                  required
                />
                {(config.length ?? 0) > 400 && (
                  <p className="text-xs text-red-600 mt-1">
                    Maximale Länge: 400 cm
                  </p>
                )}
              </div>
              <div>
                <Input
                  type="number"
                  label="Breite (cm)"
                  value={config.width || ''}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    // Begrenze den Wert zwischen 1 und 300
                    if (value <= 300 || e.target.value === '') {
                      setConfig({ ...config, width: value });
                    }
                  }}
                  onBlur={(e) => {
                    const value = Number(e.target.value);
                    // Bei Verlassen des Feldes: Korrigiere ungültige Werte
                    if (value < 1 || isNaN(value)) {
                      setConfig({ ...config, width: 1 });
                    } else if (value > 300) {
                      setConfig({ ...config, width: 300 });
                    }
                  }}
                  min="1"
                  max="300"
                  required
                />
                {(config.width ?? 0) > 300 && (
                  <p className="text-xs text-red-600 mt-1">
                    Maximale Breite: 300 cm
                  </p>
                )}
              </div>
            </div>
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <span className="font-semibold">Hinweis:</span> Maximale Größe: 300 × 400 cm
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-2">Dicke angeben</h2>
            <p className="text-gray-600 mb-6">
              Wie dick ist Ihr Teppich ungefähr? (in cm)
            </p>
            <Input
              type="number"
              label="Dicke (cm)"
              value={config.thickness || ''}
              onChange={(e) => {
                const value = Number(e.target.value);
                // Begrenze den Wert zwischen 0.2 und 5
                if (value <= 5 || e.target.value === '') {
                  setConfig({ ...config, thickness: value });
                }
              }}
              onBlur={(e) => {
                const value = Number(e.target.value);
                // Bei Verlassen des Feldes: Korrigiere ungültige Werte
                if (value < 0.2 || isNaN(value)) {
                  setConfig({ ...config, thickness: 1 });
                } else if (value > 5) {
                  setConfig({ ...config, thickness: 5 });
                }
              }}
              min="0.2"
              max="5"
              step="0.1"
              required
            />
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <span className="font-semibold">Hinweis:</span>
                <span className="block mt-1">
                  • 0,2 cm = sehr dünn (Kilim)
                </span>
                <span className="block">
                  • 0,5–1,5 cm = Standard
                </span>
                <span className="block">
                  • 2–5 cm = Hochflor/Shaggy
                </span>
              </p>
            </div>
          </div>
        );

      case 4:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-2">Zustand beschreiben</h2>
            <p className="text-gray-600 mb-6">
              Beschreiben Sie den aktuellen Zustand Ihres Teppichs
            </p>
            <Textarea
              label="Beschreibung"
              value={config.condition || ''}
              onChange={(e) =>
                setConfig({ ...config, condition: e.target.value })
              }
              rows={5}
              placeholder="z.B. Einige Flecken, allgemein guter Zustand..."
              required
            />

            {/* Juristisches Hinweisfeld */}
            <div className="mt-6 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-amber-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-amber-800 leading-relaxed">
                    Wir garantieren eine gründliche und fachgerechte Reinigung Ihres Teppichs.
                    Bitte beachten Sie, dass eine vollständige Entfernung sämtlicher Flecken
                    nicht in jedem Fall gewährleistet werden kann. Dies ist abhängig von Art,
                    Alter und Beschaffenheit der Verschmutzung sowie des Materials.
                  </p>
                  <p className="mt-3 text-xs text-amber-700">
                    Weitere Informationen finden Sie in unseren{' '}
                    <a
                      href="/agb"
                      className="font-semibold underline hover:text-amber-900 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      AGB
                    </a>
                    , der{' '}
                    <a
                      href="/widerruf"
                      className="font-semibold underline hover:text-amber-900 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Widerrufsbelehrung
                    </a>
                    {' '}sowie der{' '}
                    <a
                      href="/datenschutz"
                      className="font-semibold underline hover:text-amber-900 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Datenschutzerklärung
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-2">Fotos hochladen</h2>
            <p className="text-gray-600 mb-6">
              Laden Sie Fotos Ihres Teppichs hoch (optional)
            </p>
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-primary-500 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">
                Klicken Sie hier oder ziehen Sie Bilder hierher
              </p>
              <p className="text-sm text-gray-500">PNG, JPG bis zu 10MB</p>
            </div>
          </div>
        );

      case 6:
        const price = config.type && config.length && config.width && config.thickness
          ? calculatePrice(config as CarpetConfig)
          : 0;

        return (
          <div>
            <h2 className="text-2xl font-bold mb-2">Zusammenfassung</h2>
            <p className="text-gray-600 mb-6">
              Überprüfen Sie Ihre Angaben und fügen Sie den Teppich zum Warenkorb hinzu
            </p>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600">Teppichart</p>
                <p className="font-semibold">
                  {carpetTypes.find((t) => t.value === config.type)?.label}
                  {config.type === 'general' && config.generalSubtype && (
                    <span className="text-gray-600 font-normal">
                      {' '}
                      - {generalSubtypes.find((s) => s.value === config.generalSubtype)?.label}
                    </span>
                  )}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600">Größe</p>
                <p className="font-semibold">
                  {config.length} × {config.width} cm (
                  {config.length && config.width
                    ? ((config.length * config.width) / 10000).toFixed(2)
                    : 0}{' '}
                  m²)
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600">Dicke</p>
                <p className="font-semibold">{config.thickness} cm</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600">Zustand</p>
                <p className="font-semibold">{config.condition}</p>
              </div>
            </div>

            <div className="p-6 bg-primary-50 rounded-2xl">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Geschätzter Preis:</span>
                <span className="text-3xl font-bold text-primary-600">
                  {formatPrice(price)}
                </span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Zeige 3D-Modell ab Schritt 2 (wenn Typ ausgewählt wurde)
  const show3DModel = config.type && currentStep >= 2;

  // Berechne aktuellen Preis
  const currentPrice = config.type && config.length && config.width && config.thickness
    ? calculatePrice(config as CarpetConfig)
    : null;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Schritt {currentStep} von {totalSteps}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round((currentStep / totalSteps) * 100)}%
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary-600"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Step Content */}
          <div className="space-y-6">
            <Card>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Zurück
                </Button>

                {currentStep < totalSteps ? (
                  <Button onClick={handleNext} disabled={!canProceed()}>
                    Weiter
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={handleAddToCart}>
                    In den Warenkorb
                  </Button>
                )}
              </div>
            </Card>

            {/* Preis-Kasten - Unter den Schritt-Inhalten */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg text-gray-900">
                    Preis
                  </h3>
                  <svg
                    className="w-6 h-6 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>

                <AnimatePresence mode="wait">
                  {currentPrice !== null ? (
                    <motion.div
                      key="price-display"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-6 text-center">
                        <p className="text-sm text-gray-600 mb-1">Reinigungspreis</p>
                        <p className="text-4xl font-bold text-primary-600">
                          {formatPrice(currentPrice)}
                        </p>
                        {config.length && config.width && (
                          <p className="text-xs text-gray-500 mt-2">
                            Fläche: {((config.length * config.width) / 10000).toFixed(2)} m²
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="price-placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="bg-gray-50 rounded-xl p-6 text-center"
                    >
                      <p className="text-gray-500 text-sm">
                        Geben Sie die Maße ein, um den Preis zu berechnen
                      </p>
                      <div className="mt-3 flex items-center justify-center space-x-1">
                        <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse delay-75"></div>
                        <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse delay-150"></div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Der Preis wird automatisch basierend auf Teppichart, Größe und Dicke berechnet.
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* 3D Viewer Sidebar - Nur für 3D Vorschau */}
          <div className="lg:sticky lg:top-24 h-fit">
            {show3DModel ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="p-0 overflow-hidden">
                  <div className="p-4 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl">
                    <h3 className="text-white font-bold text-lg">
                      Teppich-Vorschau
                    </h3>
                    <p className="text-primary-100 text-sm">
                      Größenvergleich mit einer Person (170 cm)
                    </p>
                  </div>
                  <div className="p-4">
                    <CarpetRoomPreview
                      length={config.length || 200}
                      width={config.width || 150}
                      type={config.type || 'orient'}
                    />
                  </div>
                  <div className="p-4 pt-0">
                    <CarpetDimensionsDisplay
                      length={config.length || 0}
                      width={config.width || 0}
                      thickness={config.thickness || 0}
                      type={config.type}
                    />
                  </div>
                </Card>
              </motion.div>
            ) : (
              <Card className="p-8 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-10 h-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Teppich-Vorschau
                </h3>
                <p className="text-sm text-gray-600">
                  Wählen Sie eine Teppichart aus, um den Größenvergleich zu sehen
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
