'use client';
import React from 'react';

export interface UserPreferences {
  audioMode: 'toergids' | 'alleen-pois' | 'stil';
  evCharging: boolean;
  dogFriendly: boolean;
  radioCast: boolean;
}

interface SettingsPanelProps {
  prefs: UserPreferences;
  setPrefs: React.Dispatch<React.SetStateAction<UserPreferences>>;
  onStartRoute: () => void;
}

export default function SettingsPanel({ prefs, setPrefs, onStartRoute }: SettingsPanelProps) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 p-6 text-slate-900 justify-between">
      <div className="space-y-6">
        <header className="mt-4">
          <h2 className="text-2xl font-extrabold text-blue-900">Uw Persoonlijke Voorkeuren</h2>
          <p className="text-slate-600 text-base">Stel in wat u onderweg wilt horen en zien.</p>
        </header>

        {/* STANDEN SCHAKELAAR */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold mb-3 text-slate-800">🎧 Spraak-assistent modus</h3>
          <div className="grid grid-cols-1 gap-3">
            {(['toergids', 'alleen-pois', 'stil'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setPrefs(p => ({ ...p, audioMode: mode }))}
                className={`p-4 rounded-xl text-left border-2 font-bold flex justify-between items-center ${
                  prefs.audioMode === mode ? 'border-blue-600 bg-blue-50 text-blue-900' : 'border-slate-200 bg-slate-50'
                }`}
              >
                <div>
                  <span className="capitalize text-lg block">{mode.replace('-', ' ')}</span>
                  <span className="text-sm font-normal text-slate-500">
                    {mode === 'toergids' && 'Vertelt geschiedenis, markten en veiligheid.'}
                    {mode === 'alleen-pois' && 'Alleen waarschuwingen bij noodweer/laadpalen.'}
                    {mode === 'stil' && 'Geen extra audioberichten onderweg.'}
                  </span>
                </div>
                <span className="text-xl">{prefs.audioMode === mode ? '🟢' : '⚪'}</span>
              </button>
            ))}
          </div>
        </div>

        {/* EXTRA COMFORT OPTIES */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-4">
          <h3 className="text-lg font-bold text-slate-800">🚗 Reis-instellingen</h3>

          <button
            onClick={() => setPrefs(p => ({ ...p, dogFriendly: !p.dogFriendly }))}
            className={`w-full p-4 rounded-xl border-2 font-bold flex justify-between items-center ${prefs.dogFriendly ? 'border-emerald-600 bg-emerald-50' : 'border-slate-200'}`}
          >
            <span className="text-lg">🐶 Toon Hondenuitlaatplekken</span>
            <span className="text-2xl">{prefs.dogFriendly ? '✅' : '❌'}</span>
          </button>

          <button
            onClick={() => setPrefs(p => ({ ...p, evCharging: !p.evCharging }))}
            className={`w-full p-4 rounded-xl border-2 font-bold flex justify-between items-center ${prefs.evCharging ? 'border-emerald-600 bg-emerald-50' : 'border-slate-200'}`}
          >
            <span className="text-lg">⚡ Toon EV-Laadstations</span>
            <span className="text-2xl">{prefs.evCharging ? '✅' : '❌'}</span>
          </button>

          <button
            onClick={() => setPrefs(p => ({ ...p, radioCast: !p.radioCast }))}
            className={`w-full p-4 rounded-xl border-2 font-bold flex justify-between items-center ${prefs.radioCast ? 'border-blue-600 bg-blue-50' : 'border-slate-200'}`}
          >
            <div>
              <span className="text-lg block text-left">📻 Snelwegradio 107.7 FM</span>
              <span className="text-xs font-normal text-slate-500 block text-left">Schakelt audio automatisch in bij acute incidenten.</span>
            </div>
            <span className="text-2xl">{prefs.radioCast ? '🔊' : '🔇'}</span>
          </button>
        </div>
      </div>

      <button
        onClick={onStartRoute}
        className="w-full bg-emerald-600 text-white font-bold py-5 rounded-2xl text-2xl shadow-lg active:scale-95 transition-transform mb-4 mt-6"
      >
        🏁 Start Navigatie
      </button>
    </div>
  );
}
