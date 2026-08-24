'use client';
import React, { useEffect, useState } from 'react';
import { UserPreferences } from './SettingsPanel';
import { SpeechEngine } from './SpeechEngine';

interface NavigationMapProps {
  preferences: UserPreferences;
  destination: string;
  onEmergency: () => void;
}

export default function NavigationMap({ preferences, destination, onEmergency }: NavigationMapProps) {
  const [speedLimit, setSpeedLimit] = useState(130);
  const [currentRegion, setCurrentRegion] = useState('Nord (59)');
  const [zoomLevel, setZoomLevel] = useState(14);

  // Simuleer rij-events en spraakgestuurde meldingen tijdens de rit
  useEffect(() => {
    // Eerste welkomstbericht bij de start van de rit
    SpeechEngine.speakMixedSentence([
      { text: 'Navigatie gestart richting ', lang: 'nl-NL', priority: 'safety' },
      { text: destination, lang: 'fr-FR', priority: 'safety' },
      { text: '. Wij bewaken continu uw veiligheid op de route.', lang: 'nl-NL', priority: 'safety' }
    ], preferences.audioMode);

    // Na 5 seconden: Simuleer het passeren van een departementsgrens (Nice-to-know)
    const streekTimeout = setTimeout(() => {
      setCurrentRegion('Pas-de-Calais (62)');
      SpeechEngine.speakMixedSentence([
        { text: 'U rijdt nu binnen in het departement ', lang: 'nl-NL', priority: 'info' },
        { text: 'Pas-de-Calais.', lang: 'fr-FR', priority: 'info' },
        { text: ' Dit historische gebied staat bekend om zijn glooiende heuvels van Artois. Vandaag is er in deze regio een gezellige zaterdagmarkt geopend tot 13:00 uur.', lang: 'nl-NL', priority: 'info' }
      ], preferences.audioMode);
    }, 6000);

    // Na 15 seconden: Simuleer weersverandering (Regen) -> Snelheid wijzigt + Safety stem grijpt direct in
    const weerTimeout = setTimeout(() => {
      setSpeedLimit(110);
      SpeechEngine.speakMixedSentence([
        { text: 'Let op, het begint te regenen. De Franse wet verplicht een aangepaste snelheid. Uw maximumsnelheid is nu ', lang: 'nl-NL', priority: 'safety' },
        { text: '110 kilometer per uur.', lang: 'nl-NL', priority: 'safety' }
      ], preferences.audioMode);
    }, 15000);

    return () => {
      clearTimeout(streekTimeout);
      clearTimeout(weerTimeout);
      SpeechEngine.stopAll();
    };
  }, [destination, preferences.audioMode]);

  return (
    <div className="relative flex flex-col h-screen bg-slate-900 text-white overflow-hidden">

      {/* BOVENBALK: Navigatie Instructie (Hoog Contrast) */}
      <div className="bg-blue-950 p-5 shadow-lg border-b border-blue-900 z-10 flex justify-between items-center">
        <div>
          <span className="text-slate-400 text-sm font-bold uppercase tracking-wider block">Volgende afslag over 800m</span>
          <span className="text-2xl font-black block mt-1">A26 richting <span className="text-emerald-400 font-serif italic">Châlons-en-Champagne</span></span>
        </div>
        <div className="bg-white text-slate-900 p-3 rounded-full w-14 h-14 flex items-center justify-center font-extrabold text-xl shadow-md border-2 border-slate-300">
          {speedLimit}
        </div>
      </div>

      {/* MIDDEN: De Kaart-Simulator Area */}
      <div className="flex-1 bg-slate-800 relative flex items-center justify-center p-4">
        {/* Gesimuleerde grafische kaart-elementen */}
        <div className="text-center space-y-2 opacity-80">
          <p className="text-sm tracking-widest text-slate-400 uppercase font-bold">Kaartweergave (Simulatie)</p>
          <p className="text-lg font-medium text-slate-300">Locatie: Snelweg A26 Km 142.2</p>
          <p className="text-xs text-blue-400 bg-blue-950/50 inline-block px-3 py-1 rounded-full border border-blue-900">Actieve regio: {currentRegion}</p>
        </div>

        {/* SENIORNVRIENDELIJKE VERPLICHTE INZOOM-KNOPPEN (Geen touch-gestures nodig) */}
        <div className="absolute right-4 bottom-24 flex flex-col space-y-3 z-10">
          <button
            onClick={() => setZoomLevel(z => z + 1)}
            className="w-16 h-16 bg-white text-slate-900 rounded-2xl font-black text-3xl shadow-2xl flex items-center justify-center border-2 border-slate-300 active:bg-slate-100"
          >
            +
          </button>
          <button
            onClick={() => setZoomLevel(z => z - 1)}
            className="w-16 h-16 bg-white text-slate-900 rounded-2xl font-black text-3xl shadow-2xl flex items-center justify-center border-2 border-slate-300 active:bg-slate-100"
          >
            -
          </button>
        </div>

        {/* LIVE PRIVACY WAARSCHUWING / DEMO BAR */}
        <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-sm p-3 rounded-xl border border-slate-700 text-xs text-center text-slate-400">
          Modus: <span className="text-blue-400 font-bold capitalize">{preferences.audioMode.replace('-', ' ')}</span>
          {preferences.dogFriendly && ' | 🐶 Honden-laag Actief'}
          {preferences.evCharging && ' | ⚡ EV-laag Actief'}
        </div>
      </div>

      {/* ONDERBALK: Grote Pechknop & Demper */}
      <div className="p-4 bg-slate-950 border-t border-slate-800 grid grid-cols-2 gap-4 z-10">
        <button
          onClick={() => {
            SpeechEngine.stopAll();
            SpeechEngine.speakSegment({ text: 'Toergids tijdelijk gedempt.', lang: 'nl-NL', priority: 'safety' });
          }}
          className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 px-4 rounded-xl text-lg flex items-center justify-center space-x-2"
        >
          <span>🔇 Demp Gids</span>
        </button>

        <button
          onClick={onEmergency}
          className="bg-red-600 hover:bg-red-700 text-white font-black py-4 px-4 rounded-xl text-xl tracking-wide shadow-lg animate-pulse"
        >
          🚨 PANIEK / PECH
        </button>
      </div>

    </div>
  );
}
