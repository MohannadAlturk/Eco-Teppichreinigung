'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { AlertTriangle } from 'lucide-react';

export default function SettingsPage() {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Passwort wurde geändert (Mock)');
    setShowPasswordForm(false);
  };

  const handleDeleteAccount = () => {
    alert('Account wurde gelöscht (Mock)');
  };

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-2xl font-bold mb-2">Einstellungen</h2>
        <p className="text-gray-600">
          Verwalten Sie Ihre Konto-Einstellungen und Sicherheit
        </p>
      </Card>

      <Card>
        <h3 className="font-semibold text-lg mb-4">Passwort ändern</h3>
        {!showPasswordForm ? (
          <Button onClick={() => setShowPasswordForm(true)}>
            Passwort ändern
          </Button>
        ) : (
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <Input
              type="password"
              label="Aktuelles Passwort"
              placeholder="••••••••"
              required
            />
            <Input
              type="password"
              label="Neues Passwort"
              placeholder="••••••••"
              required
            />
            <Input
              type="password"
              label="Neues Passwort bestätigen"
              placeholder="••••••••"
              required
            />
            <div className="flex space-x-3">
              <Button type="submit">Passwort ändern</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowPasswordForm(false)}
              >
                Abbrechen
              </Button>
            </div>
          </form>
        )}
      </Card>

      <Card className="border-2 border-red-200">
        <div className="flex items-start space-x-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-red-600 mt-1" />
          <div>
            <h3 className="font-semibold text-lg text-red-900">
              Account löschen
            </h3>
            <p className="text-sm text-red-700 mt-1">
              Diese Aktion kann nicht rückgängig gemacht werden. Alle Ihre
              Daten werden permanent gelöscht.
            </p>
          </div>
        </div>

        {!showDeleteConfirm ? (
          <Button variant="danger" onClick={() => setShowDeleteConfirm(true)}>
            Account löschen
          </Button>
        ) : (
          <div className="space-y-4">
            <p className="font-medium text-red-900">
              Sind Sie sicher, dass Sie Ihren Account löschen möchten?
            </p>
            <div className="flex space-x-3">
              <Button variant="danger" onClick={handleDeleteAccount}>
                Ja, Account löschen
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Abbrechen
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
