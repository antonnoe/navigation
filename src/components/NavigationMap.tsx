'use client';
import React, { useEffect, useState, useRef } from 'react';
import type { Map as LeafletMap, Marker } from 'leaflet';
import { UserPreferences } from './SettingsPanel';
import { SpeechEngine } from './SpeechEngine';
import { zoekDepartement, zoekNaderendEvent } from '@/lib/navigatie/geo-helpers';
import { streekVerhalen } from '@/lib/navigatie/streek-verhalen';

// Zorg dat de standaard Leaflet-stijlen worden ingeladen
import 'leaflet/dist/leaflet.css';

interface NavigationMapProps {
  preferences: UserPreferences;
  destination: string;
  onEmergency: () => void;
}

export default function NavigationMap({ preferences, destination, onEmergency }: NavigationMapProps) {
  const [currentRegion, setCurrentRegion] = useState('Zoeken...');
  const [currentCoords, setCurrentCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [gpsError, setGpsError] = useState<string | null>(null);

  // Refs voor Leaflet DOM-instanties en afspeel-logs
  const mapRef = useRef<LeafletMap | null>(null);
  const markerRef = useRef<Marker | null>(null);
  const geoWatchIdRef = useRef<number | null>(null);
  const afgespeeldeRegios = useRef<string[]>([]);
  const afgespeeldeEvents = useRef<string[]>([]);

  useEffect(() => {
    // Welkomstbericht bij start van de rit. De bestemming is vrije tekst die de
    // gebruiker zelf typt (dit is een FR<->NL-tool, dus niet per se een Franse
    // plaatsnaam) - we kunnen de taal ervan niet betrouwbaar bepalen, dus lezen
    // 'm voor in het Nederlands. Alleen departementsnamen uit onze eigen
    // streekVerhalen-data zijn gegarandeerd Frans en krijgen de Franse stem
    // (zie hieronder bij B).
    SpeechEngine.speakMixedSentence([
      { text: `Navigatie gestart, richting ${destination}. Veiligheid staat voorop.`, lang: 'nl-NL', priority: 'safety' }
    ], preferences.audioMode);

    const startKaartEnGPS = async () => {
      // Lazy load Leaflet uitsluitend client-side om SSR-fouten te voorkomen
      const L = await import('leaflet');

      // Fix voor ontbrekende marker-assets in Next.js/Webpack builds
      delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      if (!("geolocation" in navigator)) {
        setGpsError("GPS wordt niet ondersteund.");
        return;
      }

      const watchId = navigator.geolocation.watchPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentCoords({ lat: latitude, lng: longitude });
          setGpsError(null);

          // A. Leaflet instantie aanmaken of positie updaten
          if (!mapRef.current) {
            // zoomControl: false dwingt ons om onze eigen grote seniorenknoppen te gebruiken
            mapRef.current = L.map('leaflet-map-container', { zoomControl: false }).setView([latitude, longitude], 14);

            // Rustige, hoog-contrast reiskaart van CartoDB Voyager (OpenStreetMap data)
            L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
              attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
              maxZoom: 18
            }).addTo(mapRef.current);

            markerRef.current = L.marker([latitude, longitude]).addTo(mapRef.current);
          } else {
            mapRef.current.setView([latitude, longitude]);
            markerRef.current?.setLatLng([latitude, longitude]);
          }

          // B. Live data-pijplijn controleren: Departementen (Streekgids)
          const deptCode = await zoekDepartement(longitude, latitude);
          if (deptCode) {
            const streek = streekVerhalen[deptCode];
            if (streek && !afgespeeldeRegios.current.includes(deptCode)) {
              afgespeeldeRegios.current.push(deptCode);
              setCurrentRegion(`${streek.naam} (${deptCode})`);

              SpeechEngine.speakMixedSentence([
                { text: 'U rijdt nu het departement', lang: 'nl-NL', priority: 'info' },
                { text: streek.naam, lang: 'fr-FR', priority: 'info' },
                { text: `binnen. ${streek.verhaal}`, lang: 'nl-NL', priority: 'info' }
              ], preferences.audioMode);
            }
          } else {
            setCurrentRegion('Frankrijk (Transit)');
          }

          // C. Live data-pijplijn controleren: Wekelijkse Markten
          const naderendEvent = zoekNaderendEvent(longitude, latitude);
          if (naderendEvent && !afgespeeldeEvents.current.includes(naderendEvent.id)) {
            afgespeeldeEvents.current.push(naderendEvent.id);

            SpeechEngine.speakMixedSentence([
              { text: `Let op, u nadert ${naderendEvent.dorp}. `, lang: 'nl-NL', priority: 'info' },
              { text: naderendEvent.verhaal, lang: 'nl-NL', priority: 'info' }
            ], preferences.audioMode);
          }

          // D. Realtime Bison Futé-verkeer: nog niet gekoppeld aan een echte bron.
          // TODO: hier de live open-data-feed van de Franse verkeerscentrale
          // (data.gouv.fr) aansluiten. Bewust geen gesimuleerde/gemockte melding
          // meer - die klonk als een echte waarschuwing terwijl het incident niet
          // op de daadwerkelijke route van de gebruiker lag.
        },
        (error) => {
          console.error("GPS Verbindingsfout:", error);
          setGpsError("Wachten op satelliet-signaal...");
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );

      geoWatchIdRef.current = watchId;
    };

    startKaartEnGPS();

    return () => {
      if (geoWatchIdRef.current !== null) {
        navigator.geolocation.clearWatch(geoWatchIdRef.current);
        geoWatchIdRef.current = null;
      }
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      SpeechEngine.stopAll();
    };
  }, [destination, preferences.audioMode]);

  const zoomIn = () => { mapRef.current?.zoomIn(); };
  const zoomOut = () => { mapRef.current?.zoomOut(); };

  return (
    <div className="relative flex flex-col h-screen bg-slate-900 text-white overflow-hidden">

      {/* BOVENBALK: Route */}
      <div className="bg-blue-950 p-5 shadow-lg border-b border-blue-900 z-20 flex justify-between items-center">
        <div className="truncate mr-4">
          <span className="text-slate-400 text-sm font-bold uppercase tracking-wider block">Actieve Route</span>
          <span className="text-2xl font-black block mt-1 truncate">Richting <span className="text-emerald-400 font-serif italic">{destination}</span></span>
        </div>
        <div className="bg-white text-slate-900 p-3 rounded-full w-14 h-14 flex items-center justify-center font-extrabold text-xl shadow-md border-2 border-slate-300 shrink-0">
          130
        </div>
      </div>

      {/* MIDDEN: Leaflet Kaart en Overlays */}
      <div className="flex-1 relative z-10">
        {/* relative + expliciete z-0 (i.p.v. auto) is bewust: zonder eigen z-index
            vormt deze div geen eigen stacking-context, waardoor Leaflet's interne
            lagen (.leaflet-top/.leaflet-bottom, z-index 1000 voor de controls)
            "lekken" naar hetzelfde niveau als de meldingen-overlay hieronder en
            die na de eerste render alsnog bedekken. */}
        <div id="leaflet-map-container" className="relative z-0 w-full h-full bg-slate-800" />

        {/* DRINGENDE WAARSCHUWINGEN OVERLAY (BISON FUTÉ) */}
        <div className="absolute top-4 left-4 right-4 z-30 space-y-2 pointer-events-none">
          {gpsError && (
            <p className="text-amber-400 bg-amber-950/95 px-4 py-2.5 rounded-xl border border-amber-900 font-bold text-sm shadow-xl animate-pulse">
              ⚠️ {gpsError}
            </p>
          )}
          {!gpsError && currentCoords && (
            <span className="inline-block text-emerald-400 bg-slate-950/90 px-3 py-1.5 rounded-lg border border-slate-800 font-sans text-xs font-bold shadow-md">
              🛰️ Regio: {currentRegion}
            </span>
          )}
        </div>

        {/* SENIORNVRIENDELIJKE VERPLICHTE INZOOM-KNOPPEN */}
        <div className="absolute right-4 bottom-6 flex flex-col space-y-3 z-30">
          <button
            onClick={zoomIn}
            className="w-16 h-16 bg-white text-slate-900 rounded-2xl font-black text-4xl shadow-2xl flex items-center justify-center border-2 border-slate-300 active:bg-slate-100 pointer-events-auto"
            aria-label="Inzoomen"
          >
            +
          </button>
          <button
            onClick={zoomOut}
            className="w-16 h-16 bg-white text-slate-900 rounded-2xl font-black text-4xl shadow-2xl flex items-center justify-center border-2 border-slate-300 active:bg-slate-100 pointer-events-auto"
            aria-label="Uitzoomen"
          >
            -
          </button>
        </div>
      </div>

      {/* ONDERBALK: Veiligheid & Pechbediening */}
      <div className="p-4 bg-slate-950 border-t border-slate-800 grid grid-cols-2 gap-4 z-20">
        <button
          onClick={() => {
            SpeechEngine.stopAll();
            SpeechEngine.speakSegment({ text: 'Informatie gids gedempt.', lang: 'nl-NL', priority: 'safety' });
          }}
          className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 px-4 rounded-xl text-lg flex items-center justify-center space-x-2"
        >
          <span>Gids Dempen</span>
        </button>

        <button
          onClick={onEmergency}
          className="bg-red-600 hover:bg-red-700 text-white font-black py-4 px-4 rounded-xl text-xl tracking-wide shadow-lg"
        >
          🚨 PECH / ALARM
        </button>
      </div>

    </div>
  );
}
