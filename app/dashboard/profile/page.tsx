'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useUserStore } from '@/store/userStore';

export default function ProfilePage() {
  const { user, updateUser } = useUserStore();

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    street: user?.address.street || '',
    city: user?.address.city || '',
    zipCode: user?.address.zipCode || '',
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
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
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-2xl font-bold mb-2">Profil bearbeiten</h2>
        <p className="text-gray-600">
          Verwalten Sie Ihre persönlichen Informationen
        </p>
      </Card>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-4">Persönliche Daten</h3>
            <div className="space-y-4">
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
                name="phone"
                type="tel"
                label="Telefon"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-semibold text-lg mb-4">Adresse</h3>
            <div className="space-y-4">
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
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button type="submit">Speichern</Button>
            {saved && (
              <span className="text-green-600 font-medium">
                Änderungen gespeichert!
              </span>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
}
