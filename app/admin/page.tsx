'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminStore } from '@/store/adminStore';

export default function AdminLoginPage() {
  const router = useRouter();
  const { isLoggedIn, login } = useAdminStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isLoggedIn) router.replace('/admin/dashboard');
  }, [isLoggedIn, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const ok = login(username, password);
    if (ok) {
      router.push('/admin/dashboard');
    } else {
      setError('Benutzername oder Passwort falsch.');
    }
  };

  return (
    <div className="flex-1 bg-gray-950 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        {/* Logo / Branding */}
        <div className="text-center mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1400 180"
            fill="none"
            className="w-full max-h-12 mb-4 block"
            aria-label="Eco Teppichreinigung"
          >
            <defs>
              <style>{`@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');`}</style>
            </defs>
            <text x="700" y="130"
              fontFamily="'Dancing Script', cursive"
              fontWeight="700"
              fontSize="110"
              textAnchor="middle"
              fill="#1a1a1a"
              stroke="#1a1a1a"
              strokeWidth="6"
              paintOrder="stroke fill"
              fontStyle="italic"
            >Eco Teppich-Reinigung</text>
            <text x="700" y="130"
              fontFamily="'Dancing Script', cursive"
              fontWeight="700"
              fontSize="110"
              textAnchor="middle"
              fill="#E8612D"
              stroke="#2a2a2a"
              strokeWidth="2.5"
              paintOrder="stroke fill"
              fontStyle="italic"
            >Eco Teppich-Reinigung</text>
          </svg>
          <p className="text-sm font-medium text-gray-500 tracking-widest uppercase mt-1">Admin-Bereich</p>
        </div>

        {/* Login Card */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Benutzername
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="admin"
                required
                autoComplete="username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Passwort
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="bg-red-900/40 border border-red-700 rounded-xl px-4 py-3 text-red-300 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-colors duration-200"
            >
              Anmelden
            </button>
          </form>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          Nur für autorisierte Mitarbeiter
        </p>
      </div>
    </div>
  );
}
