'use client';
import React, { useState } from 'react';

interface PreDrivePanelProps {
  onRouteSelected: (route: string) => void;
}

export default function PreDrivePanel({ onRouteSelected }: PreDrivePanelProps) {
  const [destination, setDestination] = useState('');
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<{ status: 'safe' | 'warning'; text: string; alternative?: string } | null>(null);

  const checkRouteSecurity = () => {
    if (!destination) return;
    setLoading(true);

    // Gesimuleerde check op Météo-France (code oranje) en live Bison Futé data
    setTimeout(() => {
      if (destination.toLowerCase().includes('reims') || destination.toLowerCase().includes('champagne')) {
        setAdvice({
          status: 'warning',
          text: 'Météo-France meldt Code Oranje (Zware hagelbuien & windstoten) rondom Haute-Marne op uw standaard route.',
          alternative: 'Live Advies: Rijd via Reims/Charleroi om het noodweer volledig te omzeilen (+15 min).'
        });
      } else {
        setAdvice({
          status: 'safe',
          text: 'Route is momenteel optimaal. Geen extreme weerswaarschuwingen of grote Bison Futé blokkades gedetecteerd.',
        });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 p-6 text-slate-900 justify-between">
      <div>
        <header className="mb-8 mt-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-blue-900">Frankrijk Reis-Assistent</h1>
          <p className="text-lg text-slate-600 mt-2">Veilig en comfortabel navigeren tussen FR en NL.</p>
        </header>

        <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200 mb-6">
          <label className="block text-xl font-bold mb-3 text-slate-800">Waar rijdt u naartoe?</label>
          <input
            type="text"
            placeholder="Bijv. Châlons-en-Champagne"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full p-4 text-xl border-2 border-slate-300 rounded-xl focus:outline-none focus:border-blue-600 bg-slate-50"
          />
          <button
            onClick={checkRouteSecurity}
            disabled={loading}
            className="w-full mt-4 bg-blue-950 text-white font-bold py-4 rounded-xl text-lg active:scale-98 transition-transform"
          >
            {loading ? 'Route controleren...' : '🔍 Controleer Live Veiligheid'}
          </button>
        </div>

        {advice && (
          <div className={`rounded-2xl p-6 border-2 shadow-sm ${advice.status === 'warning' ? 'bg-amber-50 border-amber-500' : 'bg-emerald-50 border-emerald-500'}`}>
            <h3 className="text-xl font-bold mb-2 flex items-center">
              {advice.status === 'warning' ? '⚠️ Live Reisadvies' : '✅ Route Veilig'}
            </h3>
            <p className="text-lg leading-relaxed text-slate-800">{advice.text}</p>
            {advice.alternative && (
              <p className="text-lg font-bold text-blue-900 mt-4 border-t border-amber-200 pt-3 bg-amber-100/50 p-2 rounded-lg">{advice.alternative}</p>
            )}
          </div>
        )}
      </div>

      {advice && (
        <button
          onClick={() => onRouteSelected(destination)}
          className="w-full bg-blue-600 text-white font-bold py-5 rounded-2xl text-2xl shadow-lg active:scale-95 transition-transform mt-6 mb-4"
        >
          🚀 Ga naar Instellingen
        </button>
      )}
    </div>
  );
}
