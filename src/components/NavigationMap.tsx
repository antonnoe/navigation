'use client';
import React, { useEffect, useState, useRef } from 'react';
import { UserPreferences } from './SettingsPanel';
import { SpeechEngine } from './SpeechEngine';
import { zoekDepartement, zoekNaderendEvent } from '@/lib/navigatie/geo-helpers';
import { streekVerhalen } from '@/lib/navigatie/streek-verhalen';

interface NavigationMapProps {
  preferences: UserPreferences;
  destination: string;
  onEmergency: () => void;
}

export default function NavigationMap({ preferences, destination, onEmergency }: NavigationMapProps) {
  const [speedLimit, setSpeedLimit] = useState(130);
  const [currentRegion, setCurrentRegion] = useState('Onbekend');
  const [currentCoords, setCurrentCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [zoomLevel, setZoomLevel] = useState(14);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const geolocationOndersteund = typeof navigator !== 'undefined' && 'geolocation' in navigator;

  // Refs om de state binnen de event-listeners up-to-date te houden zonder re-triggers
  const afgespeeldeRegios = useRef<string[]>([]);
  const afgespeeldeEvents = useRef<string[]>([]);

  useEffect(() => {
    // 1. Welkomstbericht bij de start van de rit
    SpeechEngine.speakMixedSentence([
      { text: 'Navigatie actief richting ', lang: 'nl-NL', priority: 'safety' },
      { text: destination, lang: 'fr-FR', priority: 'safety' },
      { text: '. Veiligheid staat voorop.', lang: 'nl-NL', priority: 'safety' }
    ], preferences.audioMode);

    // 2. Start Live Geolocation Tracking
    if (!geolocationOndersteund) return;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentCoords({ lat: latitude, lng: longitude });
        setGpsError(null);

        // A. Check Departement (Streekinformatie) - async, want de landelijke
        // grenzen worden dynamisch opgehaald (zie lib/navigatie/departementen.ts)
        const verwerkLocatie = async () => {
          const deptCode = await zoekDepartement(longitude, latitude);
          if (deptCode) {
            const streek = streekVerhalen[deptCode];
            if (streek && !afgespeeldeRegios.current.includes(deptCode)) {
              afgespeeldeRegios.current.push(deptCode);
              setCurrentRegion(`${streek.naam} (${deptCode})`);

              SpeechEngine.speakMixedSentence([
                { text: 'U rijdt nu binnen in het departement ', lang: 'nl-NL', priority: 'info' },
                { text: streek.naam, lang: 'fr-FR', priority: 'info' },
                { text: `. ${streek.verhaal}`, lang: 'nl-NL', priority: 'info' }
              ], preferences.audioMode);
            }
          }
        };
        verwerkLocatie();

        // B. Check Wekelijkse Events (Markten / Brocantes in de buurt)
        const naderendEvent = zoekNaderendEvent(longitude, latitude);
        if (naderendEvent && !afgespeeldeEvents.current.includes(naderendEvent.id)) {
          afgespeeldeEvents.current.push(naderendEvent.id);

          SpeechEngine.speakMixedSentence([
            { text: `Let op, u nadert ${naderendEvent.dorp}. `, lang: 'nl-NL', priority: 'info' },
            { text: naderendEvent.verhaal, lang: 'nl-NL', priority: 'info' }
          ], preferences.audioMode);
        }
      },
      (error) => {
        console.error("GPS Fout:", error);
        setGpsError("Wachten op betrouwbaar GPS-signaal...");
      },
      {
        enableHighAccuracy: true, // Verplicht voor navigatie in de auto
        timeout: 10000,
        maximumAge: 0
      }
    );

    // Clean-up: stop GPS-tracking en spraak bij het verlaten van het scherm
    return () => {
      navigator.geolocation.clearWatch(watchId);
      SpeechEngine.stopAll();
    };
  }, [destination, preferences.audioMode, geolocationOndersteund]);

  return (
    <div className="relative flex flex-col h-screen bg-slate-900 text-white overflow-hidden">

      {/* BOVENBALK: Navigatie Instructie */}
      <div className="bg-blue-950 p-5 shadow-lg border-b border-blue-900 z-10 flex justify-between items-center">
        <div>
          <span className="text-slate-400 text-sm font-bold uppercase tracking-wider block">Actieve Route</span>
          <span className="text-2xl font-black block mt-1">Richting <span className="text-emerald-400 font-serif italic">{destination}</span></span>
        </div>
        <div className="bg-white text-slate-900 p-3 rounded-full w-14 h-14 flex items-center justify-center font-extrabold text-xl shadow-md border-2 border-slate-300">
          {speedLimit}
        </div>
      </div>

      {/* MIDDEN: Kaart & GPS Status Area */}
      <div className="flex-1 bg-slate-800 relative flex items-center justify-center p-4">
        <div className="text-center space-y-3 opacity-90 max-w-sm">
          <p className="text-xs tracking-widest text-slate-400 uppercase font-bold">Gegevens-Pijplijn Actief</p>

          {!geolocationOndersteund ? (
            <p className="text-amber-400 bg-amber-950/40 px-4 py-2 rounded-xl border border-amber-900 font-medium text-base">
              ⚠️ GPS wordt niet ondersteund door deze browser.
            </p>
          ) : gpsError ? (
            <p className="text-amber-400 bg-amber-950/40 px-4 py-2 rounded-xl border border-amber-900 font-medium text-base animate-pulse">
              ⚠️ {gpsError}
            </p>
          ) : currentCoords ? (
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700 font-mono text-sm space-y-1">
              <p className="text-emerald-400 font-bold text-base not-mono font-sans mb-2">🛰️ GPS Verbinding Live</p>
              <p>Breedtegraad: {currentCoords.lat.toFixed(5)}</p>
              <p>Lengtegraad: {currentCoords.lng.toFixed(5)}</p>
            </div>
          ) : (
            <p className="text-slate-400">Locatie bepalen via satelliet...</p>
          )}

          <p className="text-sm font-medium text-slate-300">Huidige regio: <span className="text-blue-400 font-bold">{currentRegion}</span></p>
          <p className="text-xs text-slate-500">Zoom-niveau: {zoomLevel} (Gebruik de knoppen rechts)</p>
        </div>

        {/* SENIORNVRIENDELIJKE VERPLICHTE INZOOM-KNOPPEN */}
        <div className="absolute right-4 bottom-24 flex flex-col space-y-3 z-10">
          <button
            onClick={() => setZoomLevel(z => Math.min(z + 1, 18))}
            className="w-16 h-16 bg-white text-slate-900 rounded-2xl font-black text-3xl shadow-2xl flex items-center justify-center border-2 border-slate-300 active:bg-slate-100"
          >
            +
          </button>
          <button
            onClick={() => setZoomLevel(z => Math.max(z - 1, 10))}
            className="w-16 h-16 bg-white text-slate-900 rounded-2xl font-black text-3xl shadow-2xl flex items-center justify-center border-2 border-slate-300 active:bg-slate-100"
          >
            -
          </button>
        </div>

        {/* REIS-STATUS BALK */}
        <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-sm p-3 rounded-xl border border-slate-700 text-xs text-center text-slate-400">
          Modus: <span className="text-blue-400 font-bold capitalize">{preferences.audioMode.replace('-', ' ')}</span>
          {preferences.dogFriendly && ' | 🐶 Honden-radar aan'}
          {preferences.evCharging && ' | ⚡ EV-radar aan'}
        </div>
      </div>

      {/* ONDERBALK: Grote Pechknop & Demper */}
      <div className="p-4 bg-slate-950 border-t border-slate-800 grid grid-cols-2 gap-4 z-10">
        <button
          onClick={() => {
            SpeechEngine.stopAll();
            SpeechEngine.speakSegment({ text: 'Informatie-gids tijdelijk gedempt.', lang: 'nl-NL', priority: 'safety' });
          }}
          className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 px-4 rounded-xl text-lg flex items-center justify-center space-x-2"
        >
          <span>Toergids Uit</span>
        </button>

        <button
          onClick={onEmergency}
          className="bg-red-600 hover:bg-red-700 text-white font-black py-4 px-4 rounded-xl text-xl tracking-wide shadow-lg"
        >
          🚨 PANIEK / PECH
        </button>
      </div>

    </div>
  );
}
