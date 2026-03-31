'use client';

import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { CarpetConfig, CarpetType } from '@/types/carpet';
import { calculatePrice } from '@/utils/priceCalculator';
import { formatPrice } from '@/utils/format';
import { useCartStore } from '@/store/cartStore';
import { ChevronLeft, ChevronRight, Upload } from 'lucide-react';
import { CarpetDimensionsDisplay } from '@/components/configurator/CarpetDimensionsDisplay';

// Dynamisch laden für bessere Performance (nur Client-Side)
const Carpet3DViewer = dynamic(
  () => import('@/components/configurator/Carpet3DViewer').then((mod) => mod.Carpet3DViewer),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] bg-gray-100 rounded-2xl flex items-center justify-center">
        <p className="text-gray-500">3D-Modell wird geladen...</p>
      </div>
    )
  }
);

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

  const carpetTypes: { value: CarpetType; label: string; description: string }[] = [
    {
      value: 'orient',
      label: 'Orientteppich',
      description: 'Handgeknüpfte traditionelle Teppiche',
    },
    {
      value: 'wool',
      label: 'Wollteppich',
      description: 'Teppiche aus natürlicher Wolle',
    },
    {
      value: 'silk',
      label: 'Seidenteppich',
      description: 'Hochwertige Seidenteppiche',
    },
    {
      value: 'synthetic',
      label: 'Synthetik',
      description: 'Maschinell hergestellte Teppiche',
    },
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
                  onClick={() => setConfig({ ...config, type: type.value })}
                  className={`p-6 border-2 rounded-2xl cursor-pointer transition-all ${
                    config.type === type.value
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  <h3 className="font-semibold text-lg mb-1">{type.label}</h3>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </motion.div>
              ))}
            </div>
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
              <Input
                type="number"
                label="Länge (cm)"
                value={config.length || ''}
                onChange={(e) =>
                  setConfig({ ...config, length: Number(e.target.value) })
                }
                min="1"
                required
              />
              <Input
                type="number"
                label="Breite (cm)"
                value={config.width || ''}
                onChange={(e) =>
                  setConfig({ ...config, width: Number(e.target.value) })
                }
                min="1"
                required
              />
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
              onChange={(e) =>
                setConfig({ ...config, thickness: Number(e.target.value) })
              }
              min="0.1"
              step="0.1"
              required
            />
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
          <div>
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
          </div>

          {/* 3D Viewer Sidebar */}
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
                      3D Vorschau
                    </h3>
                    <p className="text-primary-100 text-sm">
                      Live-Ansicht Ihres Teppichs
                    </p>
                  </div>
                  <div className="relative h-[400px]">
                    <Suspense fallback={
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <p className="text-gray-500">Lädt...</p>
                      </div>
                    }>
                      <Carpet3DViewer
                        length={config.length || 200}
                        width={config.width || 150}
                        thickness={config.thickness || 2}
                        type={config.type || 'orient'}
                      />
                    </Suspense>
                  </div>
                  <div className="p-4">
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
                  3D-Vorschau
                </h3>
                <p className="text-sm text-gray-600">
                  Wählen Sie eine Teppichart aus, um die 3D-Vorschau zu sehen
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
